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
import PropertiesBar from '../PropertiesBar/PropertiesBar';
import Explorer from '../Explorer/Explorer';

// TODO:
// Чистить SVGPanel и реализовывать функционал обратно
// Перевод всего этого на TS

function EditorComponent(props) {

  const [editor] = useState(new Editor());
  const [lastCursor, setLastCursor] = useState(new Point(0, 0));
  const { setContextMenu } = useContextMenu();

  const svgMouseDownHandler = (e) => {
    console.log(`%c mode %c ${editor.mode} %c`, 'background:green ; padding: 0px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#c3e6f0 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #222;', 'background:transparent');
    const cursor = new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y);
    editor.cursor = cursor;
    const elem = hitTestElement(editor.scheme.elements, cursor, 5);

    switch (editor.mode) {

      case Editor.Modes.Default:
        if (!elem) {
          editor.mode = Editor.Modes.Selection;
          editor.selectLayer.selectionFrame = new SelectionFrame(cursor, cursor);
        }
        break;
      case Editor.Modes.Selected:
      case Editor.Modes.ContextMenu:
        if (!elem) {
          console.log(elem)
          editor.mode = Editor.Modes.Selection;
          editor.selectLayer.selectionFrame = new SelectionFrame(cursor, cursor);
        }

        // MOVE
        if (editor.selectLayer.selected.length === 1) {
          if (elem && editor.selectLayer.selected[0] === elem && e.button === 0) {
            editor.mode = Editor.Modes.Move;
          }
        } else {
          if (elem && e.button === 0) {
            editor.mode = Editor.Modes.Move;
          }
        }

        //
        if (editor.selectLayer.selected.length === 1 && editor.selectLayer.selected[0] instanceof Branch && e.shiftKey) {
          editor.selectLayer.selected[0].addPoint(cursor);
          editor.mode = Editor.Modes.Selected;
        }

        let control = editor.selectLayer.getSelectControl(cursor);
        console.log(control)
        if (control) {
          if (editor.selectLayer.selected.length === 1 && editor.selectLayer.selected[0] instanceof Branch) {
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
    const cursor = new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y);
    editor.cursor = cursor;
    const delta = getGridDelta(cursor, lastCursor);

    switch (editor.mode) {

      case Editor.Modes.Selection:

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
        for (let i = 0; i < editor.selectLayer.selected.length; i++) {
          editor.selectLayer.selected[i].move(delta);
          editor.selectLayer.select();
        }
        break;
      case Editor.Modes.AddElement:
        editor.selectLayer.selected[0].move(delta);
        editor.selectLayer.select();
        break;
      case Editor.Modes.Edit:

        if (editor.selectLayer.selected.length === 1 && editor.selectLayer.selected[0] instanceof Node) {
          editor.selectLayer.selected[0].changeSize(editor.selectControl.type, delta);
        }

        if (editor.selectControl instanceof RotateControl) {
          if (editor.selectLayer.selected.length === 1) {
            editor.selectLayer.selected[0].rotate(cursor);
          } else {
            editor.selectLayer.rotate(cursor);
          }

        }
        editor.selectLayer.select();
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
    console.log(`%c mode %c ${editor.mode} %c`, 'background:green ; padding: 0px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#c3e6f0 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #222;', 'background:transparent');
    const cursor = new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y);
    editor.cursor = cursor;
    const elem = hitTestElement(editor.scheme.elements, cursor, 5);


    switch (editor.mode) {

      case Editor.Modes.Selection:
        let selectionVertices = [
          editor.selectLayer.selectionFrame.position,
          new Point(editor.selectLayer.selectionFrame.position.x + editor.selectLayer.selectionFrame.width, editor.selectLayer.selectionFrame.position.y),
          new Point(editor.selectLayer.selectionFrame.position.x + editor.selectLayer.selectionFrame.width, editor.selectLayer.selectionFrame.position.y + editor.selectLayer.selectionFrame.height),
          new Point(editor.selectLayer.selectionFrame.position.x, editor.selectLayer.selectionFrame.position.y + editor.selectLayer.selectionFrame.height),
        ];

        let selectElements = [];
        for (let i = 0; i < editor.scheme.elements.length; i++) {
          if (editor.selectLayer.selectionFrame.mode === SelectionFrame.Modes.Contain) {
            let containElement = polyPolyContain(selectionVertices, editor.scheme.elements[i].getFrame());
            if (containElement) {
              selectElements.push(editor.scheme.elements[i]);
            }
          }
          if (editor.selectLayer.selectionFrame.mode === SelectionFrame.Modes.Intersect) {
            let containElement = polyPoly(selectionVertices, editor.scheme.elements[i].getFrame());
            if (containElement) {
              //console.log(editor.scheme.elements[i])
              selectElements.push(editor.scheme.elements[i]);
            }
          }
        }
        //console.log(selectElements)
        if (selectElements.length > 0) {
          editor.selectLayer.selectElements(selectElements);

        }
        editor.selectLayer.selectionFrame = null;
        if (selectElements.length) {
          editor.mode = Editor.Modes.Selected;
        } else {
          editor.mode = Editor.Modes.Default;
          editor.selectLayer.clear();
        }

        break;
      case Editor.Modes.Default:
      case Editor.Modes.Selected:
        if (elem) {
          if (e.button === 2) {
            editor.mode = Editor.Modes.ContextMenu;
            setContextMenu(contextMenuRemoveBranch, cursor);
          }
          editor.mode = Editor.Modes.Selected;
          editor.selectLayer.selectElement(elem);
        }
        break;

      case Editor.Modes.AddElement:
        editor.mode = Editor.Modes.Selected;
        editor.addMode = null;
        break;
      case Editor.Modes.AddBranch:
        if (editor.selectLayer.selected.length === 1 && !editor.selectLayer.selected[0].terminals[1]) {

          if (editor.selectControl === editor.selectLayer.box[0].controls[1]) {
            editor.selectLayer.selected[0].junctions[1].position = cursor;
            editor.hideTerminals();
            editor.onAddBranchMode();
          }
          else if (editor.selectControl === editor.selectLayer.box[0].controls[0]) {
            editor.selectLayer.selected[0].junctions[1].position = cursor;
            editor.selectLayer.selected[0].canDraw = true;
            editor.selectControl = editor.selectLayer.box[0].controls[1];
          }
        } else {
          editor.hideTerminals();
          editor.onAddBranchMode();
        }


        break;
      case Editor.Modes.Move:
      case Editor.Modes.Connect:
        editor.mode = Editor.Modes.Selected;
        editor.connectNode = null;
        editor.hideTerminals();
        editor.selectLayer.select();
        break;

      case Editor.Modes.Edit:
        editor.mode = Editor.Modes.Selected;
        break;

      default:
        break;
    }
    //console.log(editor.selectLayer.selected)
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
    if (e.keyCode === 17) {
      editor.modKey = null;
    }
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
    }
    // C 67
    // V 86
    // CTRL 17
    // SHIFT 16

    if (editor.modKey === Editor.ModKeys.Ctrl && e.keyCode === 67) {

      const serializer = new Serializer([Node, Branch, Switch, Transformer, Load, Generation, Terminal, Array, Point]);

      editor.buffer = serializer.serialize(editor.selectLayer.selected);


      let points = [];

      for (let i = 0; i < editor.selectLayer.selected.length; i++) {
        if (!(editor.selectLayer.selected[i] instanceof Branch)) {
          points.push(editor.selectLayer.selected[i].position);
        }
        if (editor.selectLayer.selected[i] instanceof Branch) {
          for (let j = 0; j < editor.selectLayer.selected[i].points.length; j++) {
            points.push(editor.selectLayer.selected[i].points[j]);
          }

        }

        for (let j = 0; j < editor.selectLayer.selected[i].terminals.length; j++) {
          if (editor.selectLayer.selected[i].terminals[j]) {
            points.push(editor.selectLayer.selected[i].terminals[j].position);
          } else {
            points.push(editor.selectLayer.selected[i].junctions[j].position);
          }
        }

      }
      const minX = Math.min(...points.map(x => x.x))
      const maxX = Math.max(...points.map(x => x.x))
      const minY = Math.min(...points.map(x => x.y))
      const maxY = Math.max(...points.map(x => x.y))
      let x = 0;
      let y = 0;
      if (maxX === minX) {
        x = maxX;
        y = (maxY + minY) / 2;
      }
      if (maxY === minY) {
        x = (maxX + minX) / 2;
        y = minY;
      }
      if (maxX === minX && maxY === minY) {
        x = minX;
        y = minY;
      }
      if (maxX !== minX && maxY !== minY) {
        x = (maxX + minX) / 2;
        y = (maxY + minY) / 2;
      }
      const newPoint = new Point(x, y);

      editor.bufferPoint = newPoint;

    }
    if (editor.modKey === Editor.ModKeys.Ctrl && e.keyCode === 86) {

      const serializer = new Serializer([Node, Branch, Switch, Transformer, Load, Generation, Terminal, Array, Point]);
      const delta = new Point(editor.cursor.x - editor.bufferPoint.x, editor.cursor.y - editor.bufferPoint.y);

      let des = serializer.deserialize(editor.buffer);
      for (let i = 0; i < des.length; i++) {
        des[i].id = Math.random();
      }


      let terminals = [];
      const elements = des.filter(x => !(x instanceof Branch));
      for (let i = 0; i < elements.length; i++) {
        elements[i].position.x += delta.x;
        elements[i].position.y += delta.y;
        for (let j = 0; j < elements[i].terminals.length; j++) {
          let index = terminals.findIndex(x => x.id === elements[i].terminals[j].id)
          if (index === -1) {
            terminals.push(elements[i].terminals[j]);
          }
        }
      }

      const branches = des.filter(x => x instanceof Branch);

      for (let i = 0; i < branches.length; i++) {
        for (let j = 0; j < branches[i].terminals.length; j++) {
          let index = terminals.findIndex(x => x.id === branches[i].terminals[j].id)
          if (index !== -1) {
            branches[i].terminals[j] = terminals[index];
          }
        }
      }



      for (let i = 0; i < branches.length; i++) {
        for (let j = 0; j < branches[i].points.length; j++) {
          branches[i].points[j].x += delta.x;
          branches[i].points[j].y += delta.y;
        }
        for (let j = 0; j < branches[i].terminals.length; j++) {
          if (!terminals.find(x => x === branches[i].terminals[j])) {
            if (branches[i].terminals[j]) {
              branches[i].junctions[j] = new Terminal("Терминал " + Math.random(), branches[i].terminals[j].position);
            } else {
              branches[i].junctions[j] = new Terminal("Терминал " + Math.random(), branches[i].junctions[j].position);
            }


            branches[i].junctions[j].position.x += delta.x;
            branches[i].junctions[j].position.y += delta.y;
            branches[i].terminals[j] = null;
          }
        }
      }


      for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < elements[i].terminals.length; j++) {
          elements[i].terminals[j].id = Math.random();
          elements[i].terminals[j].position.x += delta.x;
          elements[i].terminals[j].position.y += delta.y;
        }
      }






      for (let i = 0; i < des.length; i++) {
        if (des[i] instanceof Node) {
          des[i].number = "N" + des[i].number;
        }
        editor.scheme.elements.push(des[i]);
      }



    }
    setLastCursor(new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y))
  }, [connectModeClickHandler, editor])

  const svgKeyDownHandler = useCallback((e) => {
    if (e.keyCode === 17) {
      editor.modKey = Editor.ModKeys.Ctrl;
    }
    if (editor.mode === Editor.Modes.Selected) {
      if (e.key === "ArrowLeft") {
        for (let i = 0; i < editor.selectLayer.selected.length; i++) {
          editor.selectLayer.selected[i].move(new Point(-5, 0));
          editor.selectLayer.select();
        }
      }
      if (e.key === "ArrowUp") {
        for (let i = 0; i < editor.selectLayer.selected.length; i++) {
          editor.selectLayer.selected[i].move(new Point(0, -5));
          editor.selectLayer.select();
        }
      }
      if (e.key === "ArrowRight") {
        for (let i = 0; i < editor.selectLayer.selected.length; i++) {
          editor.selectLayer.selected[i].move(new Point(5, 0));
          editor.selectLayer.select();
        }
      }
      if (e.key === "ArrowDown") {
        for (let i = 0; i < editor.selectLayer.selected.length; i++) {
          editor.selectLayer.selected[i].move(new Point(0, 5));
          editor.selectLayer.select();
        }
      }
    }


    setLastCursor(new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y))
  }, [editor])

  const addElement = useCallback((e, addMode) => {
    if (editor.mode === Editor.Modes.AddBranch || editor.mode === Editor.Modes.AddElement) {
      editor.mode = Editor.Modes.Default;
      editor.removeElement();
      editor.hideTerminals();
    }
    editor.addElement(addMode, new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y));
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
    setLastCursor(new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y))
  }, [editor])

  useEffect(() => {
    window.addEventListener("keyup", svgKeyUpHandler);
    window.addEventListener("keydown", svgKeyDownHandler);
    return () => {
      window.removeEventListener("keyup", svgKeyUpHandler);
      window.removeEventListener("keydown", svgKeyDownHandler);
    };
  }, [svgKeyUpHandler, svgKeyDownHandler]);



  const contextMenuBranchPoint = useMemo(() => [
    { text: "Remove point", onClick: () => removeBranchPointHandler() }
  ], [removeBranchPointHandler])

  const contextMenuRemoveBranch = useMemo(() => [
    { text: "Remove element", onClick: () => removeBranchHandler() }
  ], [removeBranchHandler])

  //console.log("render EditorComponent")

  const explorerSelectHandler = useMemo(() => (e) => {

    const uid = e.target.getAttribute("uid");
    const element = editor.scheme.elements.find(x => x.id === Number(uid));
    if (element) {
      editor.selectLayer.selectElement(element);
      setLastCursor(new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y))
    }

  }, [editor.scheme.elements, editor.selectLayer, editor.svgOffset])
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
        viewBox="0 0 1400 1000"
      >
        <SchemeComponent scheme={editor.scheme} />
        <SelectLayerComponent selectLayer={editor.selectLayer} />
      </svg>
      <PropertiesBar selected={editor.selectLayer.selected} />
      <Explorer selected={editor.selectLayer.selected} scheme={editor.scheme} onSelect={explorerSelectHandler} />
    </>


  );
}

export default EditorComponent;