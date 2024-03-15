import { useCallback, useEffect, useMemo, useState } from 'react';
import './EditorComponent.css';
import { useThrottle } from '../../hooks/useThrottle';
import { hitTestElement, polyPoly, polyPolyContain } from '../../utils/hitTest';
import { Point } from '../../utils/Point';
import SelectLayerComponent from '../Selections/SelectLayerComponent/SelectLayerComponent';
import { SelectLayer } from '../../models/SelectLayer';
import SchemeComponent from '../SchemeComponent/SchemeComponent';
import { Editor } from '../../models/Editor';
import { useContextMenu } from '../../hooks';
import { Branch } from '../../models/Elements/Branch';
import { Node } from '../../models/Elements/Node';
import { SquareControl } from '../../models/Controls/SquareControl';
import { RotateControl } from '../../models/Controls/RotateControl';
import connectIcon from '../../assets/icons/connect.svg'
import { getGridDelta } from '../../utils/grid';
import testScheme from '../../testScheme.json';
import { Scheme } from '../../models/Scheme';
import { Switch } from '../../models/Elements/Switch';
import { Transformer } from '../../models/Elements/Transformer';
import { Load } from '../../models/Elements/Load';
import { Generation } from '../../models/Elements/Generation';
import { Terminal } from '../../models/Elements/Terminal';
import { Serializer } from '../../utils/Serializer';
import { SelectionFrame } from '../../models/SelectionFrame';

// TODO:
// Чистить SVGPanel и реализовывать функционал обратно
// Перевод всего этого на TS

function EditorComponent(props) {

  const [editor] = useState(new Editor());
  const [lastCursor, setLastCursor] = useState(new Point(0, 0));
  const { setContextMenu } = useContextMenu();

  const svgMouseDownHandler = (e) => {
    const cursor = new Point(e.clientX, e.clientY);
    const elem = hitTestElement(editor.scheme.elements, cursor, 5);

    switch (editor.mode) {

      case Editor.Modes.Default:
        if (!elem) {
          editor.mode = Editor.Modes.SelectMany;
          editor.selectLayer.selectionFrame = new SelectionFrame(cursor, cursor);
          editor.selected = [];
        }

        break;
      case Editor.Modes.Select:
      case Editor.Modes.ContextMenu:
        if (elem && editor.select === elem && !(elem instanceof Branch) && e.button === 0) {
          editor.mode = Editor.Modes.Move;
        }
        if (editor.select instanceof Branch && e.shiftKey) {
          editor.select.addPoint(cursor);
        }
        let control = editor.selectLayer.getSelectControl(cursor);
        if (control) {
          if (editor.select instanceof Branch) {
            if (e.button === 2 && control instanceof SquareControl) {
              editor.mode = Editor.Modes.ContextMenu;
              setContextMenu(contextMenuBranchPoint, cursor);
            }
            else {
              editor.mode = Editor.Modes.Connect;
            }
          }
          else {
            editor.mode = Editor.Modes.Edit;
          }
          editor.selectControl = control;
        }
        break;

      default:
        break;
    }
    setLastCursor(cursor);
  }

  const svgMouseMoveHandler = useThrottle((e) => {
    console.log(`%c mode %c ${editor.mode} %c`, 'background:green ; padding: 0px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#c3e6f0 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #222;', 'background:transparent');
    const cursor = new Point(e.clientX, e.clientY);
    const delta = getGridDelta(cursor, lastCursor);

    switch (editor.mode) {

      case Editor.Modes.SelectMany:

        if (cursor.y - editor.selectLayer.selectionFrame.startPoint.y > 0) {
          editor.selectLayer.selectionFrame.mode = SelectionFrame.Modes.Contain;
          editor.selectLayer.selectionFrame.height = cursor.y - editor.selectLayer.selectionFrame.startPoint.y;
        } else {
          editor.selectLayer.selectionFrame.mode = SelectionFrame.Modes.Intersect;
          editor.selectLayer.selectionFrame.height = editor.selectLayer.selectionFrame.startPoint.y - cursor.y;
          editor.selectLayer.selectionFrame.position.y = cursor.y;
        }
        if (cursor.x - editor.selectLayer.selectionFrame.startPoint.x > 0) {
          editor.selectLayer.selectionFrame.width = cursor.x - editor.selectLayer.selectionFrame.startPoint.x;
        } else {
          editor.selectLayer.selectionFrame.width = editor.selectLayer.selectionFrame.startPoint.x - cursor.x;
          editor.selectLayer.selectionFrame.position.x = cursor.x;
        }

        break;
      case Editor.Modes.Move:
        editor.select.move(delta);
        editor.selectLayer.select(editor.select);
        break;
      case Editor.Modes.AddElement:
        editor.select.move(delta);
        editor.selectLayer.select(editor.select);
        break;
      case Editor.Modes.Edit:
        if (editor.select instanceof Node) {
          editor.select.changeSize(editor.selectControl.type, delta);
        }
        if (editor.selectControl instanceof RotateControl) {
          editor.select.rotate(cursor);
        }
        editor.selectLayer.select(editor.select);
        break;

      case Editor.Modes.AddBranch:
      case Editor.Modes.Connect:
        editor.connect(cursor, delta);
        break;

      default:
        break
    }
    setLastCursor(cursor);
  }, 1);


  const svgMouseUpHandler = (e) => {
    const cursor = new Point(e.clientX, e.clientY);
    const elem = hitTestElement(editor.scheme.elements, cursor, 5);
    switch (editor.mode) {

      case Editor.Modes.SelectMany:
        let elements = editor.scheme.elements;
        let selectionVertices = [
          editor.selectLayer.selectionFrame.position,
          new Point(editor.selectLayer.selectionFrame.position.x + editor.selectLayer.selectionFrame.width, editor.selectLayer.selectionFrame.position.y),
          new Point(editor.selectLayer.selectionFrame.position.x + editor.selectLayer.selectionFrame.width, editor.selectLayer.selectionFrame.position.y + editor.selectLayer.selectionFrame.height),
          new Point(editor.selectLayer.selectionFrame.position.x, editor.selectLayer.selectionFrame.position.y + editor.selectLayer.selectionFrame.height),
        ];
        console.log(selectionVertices)

        for (let i = 0; i < elements.length; i++) {
          if (editor.selectLayer.selectionFrame.mode === SelectionFrame.Modes.Contain) {
            let containElement = polyPolyContain(selectionVertices, elements[i].getFrame());
            if (containElement) {
              //console.log(elements[i])
              editor.selected.push(elements[i]);
            }
          }
          if (editor.selectLayer.selectionFrame.mode === SelectionFrame.Modes.Intersect) {
            let containElement = polyPoly(selectionVertices, elements[i].getFrame());
            if (containElement) {
              console.log(elements[i])
              editor.selected.push(elements[i]);
            }
          }

        }
        console.log(editor.selected)
        editor.selectLayer.selectMany(editor.selected);



        editor.selectLayer.selectionFrame = null;
        editor.mode = Editor.Modes.Default;
        break;
      case Editor.Modes.Default:
      case Editor.Modes.Select:
        if (elem) {
          if (e.button === 2) {
            editor.mode = Editor.Modes.ContextMenu;
            setContextMenu(contextMenuRemoveBranch, cursor);
          }
          editor.mode = Editor.Modes.Select;
          editor.select = elem;
          editor.selectLayer.select(elem);
        } else {
          editor.mode = Editor.Modes.Default;
          editor.select = null;
          editor.selectLayer = new SelectLayer();
        }
        break;

      case Editor.Modes.AddElement:
        editor.mode = Editor.Modes.Select;
        editor.addMode = null;
        break;
      case Editor.Modes.AddBranch:
        if (!editor.select.terminals[1]) {

          if (editor.selectControl === editor.selectLayer.box.controls[1]) {
            editor.select.junctions[1].position = cursor;
            editor.hideTerminals();
            editor.onAddBranchMode();
          }
          else if (editor.selectControl === editor.selectLayer.box.controls[0]) {
            editor.select.junctions[1].position = cursor;
            editor.select.canDraw = true;
            editor.selectControl = editor.selectLayer.box.controls[1];
          }
        } else {
          editor.hideTerminals();
          editor.onAddBranchMode();
        }


        break;
      case Editor.Modes.Move:
      case Editor.Modes.Connect:
        editor.mode = Editor.Modes.Select;
        editor.connectNode = null;
        editor.hideTerminals();
        editor.selectLayer.select(editor.select);
        break;

      case Editor.Modes.Edit:
        editor.mode = Editor.Modes.Select;
        break;

      default:
        break;
    }
    setLastCursor(cursor);
  }

  const connectModeClickHandler = useCallback((e) => {
    if (editor.mode === Editor.Modes.AddElement) {
      editor.mode = Editor.Modes.Default;
      editor.removeElement();
      editor.hideTerminals();
      editor.addMode = null;
      editor.onAddBranchMode();
    }
    else if (editor.mode === Editor.Modes.AddBranch) {
      editor.mode = Editor.Modes.Default;
      editor.removeElement();
      editor.hideTerminals();
    } else {
      editor.onAddBranchMode();
    }
  }, [editor])

  const removeBranchPointHandler = useCallback(() => {
    editor.removeBranchPoint();
  }, [editor])

  const removeBranchHandler = useCallback(() => {
    editor.removeElement();
  }, [editor])


  const svgKeyUpHandler = useCallback((e) => {
    if (e.key === "Escape") {
      if (editor.mode === Editor.Modes.AddBranch) {
        connectModeClickHandler();

      }
      if (editor.mode === Editor.Modes.AddElement) {
        editor.mode = Editor.Modes.Default;
        editor.removeElement();
        editor.addMode = null;

      }
      if (editor.mode === Editor.Modes.Select) {
        editor.mode = Editor.Modes.Default;
        editor.select = null;
        editor.selectLayer = new SelectLayer();
      }
      setLastCursor(new Point(e.clientX, e.clientY))
    }
  }, [connectModeClickHandler, editor])

  const addElement = useCallback((e, addMode) => {
    if (editor.mode === Editor.Modes.AddBranch || editor.mode === Editor.Modes.AddElement) {
      editor.mode = Editor.Modes.Default;
      editor.removeElement();
      editor.hideTerminals();
    }
    editor.addElement(addMode, new Point(e.clientX, e.clientY));
  }, [editor])


  //let test = "";
  const save = useCallback((e) => {
    // let a = document.createElement("a");
    // let file = new Blob([JSON.stringify(editor.scheme)], { type: 'application/json' });
    // a.href = URL.createObjectURL(file);
    // a.download = "scheme.json";
    // a.click();

    const serializer = new Serializer([Scheme, Node, Branch, Switch, Transformer, Load, Generation, Terminal, Array, Point]);
    editor.test = serializer.serialize(editor.scheme);
    console.log(editor.test)

  }, [editor])

  const load = useCallback((e) => {
    const serializer = new Serializer([Scheme, Node, Branch, Switch, Transformer, Load, Generation, Terminal, Array, Point]);
    let des = serializer.deserialize(JSON.stringify(testScheme));
    //console.log(des)
    editor.scheme = des;
    let terminals = [];
    for (let i = 0; i < editor.scheme.elements.length; i++) {
      editor.scheme.elements[i].addTerminals();
      for (let j = 0; j < editor.scheme.elements[i].terminals.length; j++) {
        let index = terminals.findIndex(x => x.id === editor.scheme.elements[i].terminals[j].id)
        if (index !== -1) {
          editor.scheme.elements[i].terminals[j] = terminals[index];
        } else {
          let newTerminal = new Terminal("Терм " + Math.random(), new Point(710, 210), 0);
          for (let key in editor.scheme.elements[i].terminals[j]) {
            newTerminal[key] = editor.scheme.elements[i].terminals[j][key];
          }
          editor.scheme.elements[i].terminals[j] = newTerminal;
          terminals.push(newTerminal);
        }
      }
    }
    setLastCursor(new Point(e.clientX, e.clientY))
  }, [editor])

  useEffect(() => {
    window.addEventListener("keyup", svgKeyUpHandler);
    return () => {
      window.removeEventListener("keyup", svgKeyUpHandler);
    };
  }, [svgKeyUpHandler]);



  const contextMenuBranchPoint = useMemo(() => [
    { text: "Remove point", onClick: () => removeBranchPointHandler() }
  ], [removeBranchPointHandler])

  const contextMenuRemoveBranch = useMemo(() => [
    { text: "Remove element", onClick: () => removeBranchHandler() }
  ], [removeBranchHandler])

  //console.log("render EditorComponent")

  return (
    <>
      <div className='edit-panel'>
        <button
          className={`edit-panel__button ${editor.mode === Editor.Modes.AddBranch ? "edit-panel__button_active" : ""}`}
          onClick={connectModeClickHandler}
        >
          <img src={connectIcon} alt="Connect"></img>
        </button>
        <button
          className={`edit-panel__button ${editor.addMode === Editor.AddModes.Node ? "edit-panel__button_active" : ""}`}
          onClick={(e) => addElement(e, Editor.AddModes.Node)}
        >
          <div style={{ width: 35, fontSize: 35, color: "white" }}>N</div>
          {/* <img src={connectIcon} alt="Connect"></img> */}
        </button>
        <button
          className={`edit-panel__button ${editor.addMode === Editor.AddModes.Switch ? "edit-panel__button_active" : ""}`}
          onClick={(e) => addElement(e, Editor.AddModes.Switch)}
        >
          <div style={{ width: 35, fontSize: 35, color: "white" }}>S</div>
          {/* <img src={connectIcon} alt="Connect"></img> */}
        </button>
        <button
          className={`edit-panel__button ${editor.addMode === Editor.AddModes.Transformer ? "edit-panel__button_active" : ""}`}
          onClick={(e) => addElement(e, Editor.AddModes.Transformer)}
        >
          <div style={{ width: 35, fontSize: 35, color: "white" }}>T</div>
          {/* <img src={connectIcon} alt="Connect"></img> */}
        </button>
        <button
          className={`edit-panel__button ${editor.addMode === Editor.AddModes.Load ? "edit-panel__button_active" : ""}`}
          onClick={(e) => addElement(e, Editor.AddModes.Load)}
        >
          <div style={{ width: 35, fontSize: 35, color: "white" }}>L</div>
          {/* <img src={connectIcon} alt="Connect"></img> */}
        </button>
        <button
          className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
          onClick={(e) => addElement(e, Editor.AddModes.Generation)}
        >
          <div style={{ width: 35, fontSize: 35, color: "white" }}>G</div>
          {/* <img src={connectIcon} alt="Connect"></img> */}
        </button>
        <button
          className="edit-panel__button"
          onClick={save}
        >
          <div style={{ width: 100, fontSize: 35, color: "white" }}>SAVE</div>
          {/* <img src={connectIcon} alt="Connect"></img> */}
        </button>
        <button
          className="edit-panel__button"
          onClick={load}
        >
          <div style={{ width: 100, fontSize: 35, color: "white" }}>LOAD</div>
          {/* <img src={connectIcon} alt="Connect"></img> */}
        </button>
      </div>
      <svg id='svg'
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={svgMouseDownHandler}
        onMouseMove={svgMouseMoveHandler}
        onMouseUp={svgMouseUpHandler}
        viewBox="10 40 1400 1000"
      >
        <SchemeComponent scheme={editor.scheme} />
        <SelectLayerComponent selectElement={editor.select} selectLayer={editor.selectLayer} />
      </svg>
    </>


  );
}

export default EditorComponent;