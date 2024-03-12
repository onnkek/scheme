import { useCallback, useEffect, useMemo, useState } from 'react';
import './EditorComponent.css';
import { useThrottle } from '../../hooks/useThrottle';
import { hitTestElement } from '../../utils/hitTest';
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

      case Editor.Modes.Select:
      case Editor.Modes.ContextMenu:
        if (elem && editor.select === elem && !(elem instanceof Branch) && e.button === 0) {
          editor.mode = Editor.Modes.Move;
        }
        if (editor.select instanceof Branch && e.shiftKey) {
          editor.select.addPoint(cursor);
        }
        let control = editor.selectLayer.getSelectControl(cursor);
        // console.log(control)
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
    const delta = new Point(cursor.x - lastCursor.x, cursor.y - lastCursor.y);

    switch (editor.mode) {

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
    console.log("UP")
    console.log(editor.mode);
    switch (editor.mode) {

      case Editor.Modes.Default:
      case Editor.Modes.Select:
        console.log("SELECT OR DEFAULT")
        console.log(elem)
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