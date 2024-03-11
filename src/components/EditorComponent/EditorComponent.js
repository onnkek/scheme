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
        if (elem && editor.select === elem && !(elem instanceof Branch)) {
          editor.mode = Editor.Modes.Move;
        }
        if (editor.select instanceof Branch && e.shiftKey) {
          editor.select.addPoint(cursor);
        }
        let control = editor.selectLayer.getSelectControl(cursor);
        console.log(control)
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

      case Editor.Modes.Edit:
        if (editor.select instanceof Node) {
          editor.select.changeSize(editor.selectControl.type, delta);
        }
        if (editor.selectControl instanceof RotateControl) {
          editor.select.rotate(cursor);
        }
        editor.selectLayer.select(editor.select);
        break;

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

      case Editor.Modes.Move:
      case Editor.Modes.Connect:
        let elems = editor.scheme.elements.filter(x => !(x instanceof Branch));
        for (let i = 0; i < elems.length; i++) {
          elems[i].isShowTerminals = false;
        }
        if (editor.button) {
          editor.newElement.emptyTerminal2.position = cursor;
          editor.newElement.canDraw = true;

          editor.selectControl = editor.selectLayer.box.controls[1];

          if (editor.selectLayer.box.controls[1] === editor.selectControl) {
            const newBranch = editor.scheme.createBranch();
            editor.selectLayer.select(newBranch);
            editor.select = newBranch;
            editor.selectControl = editor.selectLayer.box.controls[0];
            editor.newElement = newBranch;
            editor.mode = Editor.Modes.Connect;
            editor.button = true;
          }
        } else {
          editor.mode = Editor.Modes.Select;
          editor.connectNode = null;
          editor.selectLayer.select(editor.select);
        }
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
    if (editor.button) {
      // remove newBranch and node terminals
      if (!editor.newElement.terminal2) {
        if (editor.newElement.terminal1) {
          let elementIndex = editor.scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.newElement.terminal1.id));

          let terminalIndex = editor.scheme.elements[elementIndex].terminals.findIndex(x => x.id === editor.newElement.terminal1.id);
          if (editor.scheme.elements[elementIndex] instanceof Node) {
            editor.scheme.elements[elementIndex].terminals = [
              ...editor.scheme.elements[elementIndex].terminals.slice(0, terminalIndex),
              ...editor.scheme.elements[elementIndex].terminals.slice(terminalIndex + 1)
            ]
          } else {
            editor.scheme.elements[elementIndex].terminals[terminalIndex].canConnect = true;
          }

        }

        const index = editor.scheme.elements.findIndex(x => x.id === editor.newElement.id);
        editor.scheme.elements = [...editor.scheme.elements.slice(0, index), ...editor.scheme.elements.slice(index + 1)]
      }
      editor.selectControl = null;
      editor.mode = Editor.Modes.Default;
      editor.button = false;
    } else {
      const newBranch = editor.scheme.createBranch();
      editor.selectLayer.select(newBranch);
      editor.select = newBranch;
      editor.selectControl = editor.selectLayer.box.controls[0];
      editor.newElement = newBranch;
      editor.mode = Editor.Modes.Connect;
      editor.button = true;
    };

  }, [editor])

  const removeBranchPointHandler = useCallback(() => {
    let indexOfPoint = editor.selectLayer.box.controls.filter(x => x instanceof SquareControl).findIndex(x => x === editor.selectControl);
    editor.select.points = [...editor.select.points.slice(0, indexOfPoint),
    ...editor.select.points.slice(indexOfPoint + 1)]
    editor.mode = Editor.Modes.Select;
    editor.selectLayer.select(editor.select);
  }, [editor])

  const removeBranchHandler = useCallback(() => {
    if (editor.select.terminal1) {
      const elementIndex = editor.scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.select.terminal1.id));
      const terminalIndex = editor.scheme.elements[elementIndex].terminals.findIndex(x => x.id === editor.select.terminal1.id);
      if (editor.scheme.elements[elementIndex] instanceof Node) {
        editor.scheme.elements[elementIndex].terminals = [
          ...editor.scheme.elements[elementIndex].terminals.slice(0, terminalIndex),
          ...editor.scheme.elements[elementIndex].terminals.slice(terminalIndex + 1)
        ]
      } else {
        editor.scheme.elements[elementIndex].terminals[terminalIndex].canConnect = true;
      }
    }
    if (editor.select.terminal2) {
      const elementIndex = editor.scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.select.terminal2.id));
      const terminalIndex = editor.scheme.elements[elementIndex].terminals.findIndex(x => x.id === editor.select.terminal2.id);
      if (editor.scheme.elements[elementIndex] instanceof Node) {
        editor.scheme.elements[elementIndex].terminals = [
          ...editor.scheme.elements[elementIndex].terminals.slice(0, terminalIndex),
          ...editor.scheme.elements[elementIndex].terminals.slice(terminalIndex + 1)
        ]
      } else {
        editor.scheme.elements[elementIndex].terminals[terminalIndex].canConnect = true;
      }
    }

    const index = editor.scheme.elements.findIndex(x => x.id === editor.select.id);
    editor.scheme.elements = [...editor.scheme.elements.slice(0, index), ...editor.scheme.elements.slice(index + 1)]

    editor.mode = Editor.Modes.Default;
    editor.select = null;
    editor.selectLayer = new SelectLayer();

  }, [editor])


  const svgKeyUpHandler = useCallback((e) => {
    if (e.key === "Escape") {
      connectModeClickHandler();
    }
  }, [connectModeClickHandler])




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
    { text: "Remove branch", onClick: () => removeBranchHandler() }
  ], [removeBranchHandler])

  //console.log("render EditorComponent")

  return (
    <>
      <div className='edit-panel'>
        <button className={`edit-panel__button ${editor.button ? "edit-panel__button_active" : ""}`} onClick={connectModeClickHandler}>
          <img src={connectIcon} alt="Connect"></img>
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