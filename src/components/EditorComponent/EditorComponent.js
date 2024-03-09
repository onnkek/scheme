import { useCallback, useEffect, useMemo, useState } from 'react';
import './EditorComponent.css';
import { useThrottle } from '../../hooks/useThrottle';
import { Scheme } from '../../models/Scheme';
import { hitTestElement, hitTestFrame, hitTestLine, hitTestPoint } from '../../utils/hitTest';
import { Point } from '../../utils/Point';
import SelectLayerComponent from '../Selections/SelectLayerComponent/SelectLayerComponent';
import { SelectLayer } from '../../models/SelectLayer';
import SchemeComponent from '../SchemeComponent/SchemeComponent';
import { Editor } from '../../models/Editor';
import { SizeControl } from '../../models/Controls/SizeControl';
import { useContextMenu } from '../../hooks';
import { Branch } from '../../models/Elements/Branch';
import { Terminal } from '../../models/Elements/Terminal';
import { Node } from '../../models/Elements/Node';
import { SquareControl } from '../../models/Controls/SquareControl';
import { RotateControl } from '../../models/Controls/RotateControl';
import { getRotateTransformPoint } from '../../utils/Transform';
import connectIcon from '../../assets/icons/connect.svg'

// TODO:
// Чистить SVGPanel и реализовывать функционал обратно
// Перевод всего этого на TS

function EditorComponent(props) {

  const [editor, setEditor] = useState(new Editor());
  const [scheme] = useState(new Scheme());
  const [selectLayer, setSelectLayer] = useState(new SelectLayer());
  const { setContextMenu } = useContextMenu();

  const svgMouseDownHandler = (e) => {

    const elem = hitTestElement(scheme.elements, new Point(e.clientX, e.clientY), 5);

    if (elem && editor.mode === Editor.Modes.Select && editor.select === elem && !(elem instanceof Branch)) {
      setEditor({
        ...editor,
        mode: Editor.Modes.Move,
        lastCursor: new Point(e.clientX, e.clientY)
      });
    }
    if (editor.mode === Editor.Modes.Select || editor.mode === Editor.Modes.ContextMenu) {
      if (editor.select instanceof Branch && e.shiftKey) {

        let indexOfPoint = editor.select.getIndexAddPoint(new Point(e.clientX, e.clientY));
        if (indexOfPoint === 1) {
          editor.select.points = [new Point(e.clientX, e.clientY), ...editor.select.points.slice(indexOfPoint - 1)]
        } else if (indexOfPoint === editor.select.getFrame().length - 1) {
          editor.select.points = [...editor.select.points.slice(0, indexOfPoint - 1), new Point(e.clientX, e.clientY)]
        } else {
          editor.select.points = [...editor.select.points.slice(0, indexOfPoint - 1),
          new Point(e.clientX, e.clientY), ...editor.select.points.slice(indexOfPoint - 1)]
        }


      }
      let control = null;
      for (let i = 0; i < selectLayer.box.controls.length; i++) {
        if (hitTestFrame(selectLayer.box.controls[i].getFrame(), new Point(e.clientX, e.clientY), 10)) {
          control = selectLayer.box.controls[i];
        }
      }
      console.log(control)
      if (control) {
        if (editor.select instanceof Branch) {
          if (e.button === 2) {
            setEditor({
              ...editor,
              selectControl: control,
              mode: Editor.Modes.ContextMenu
            });
            editor.selectControl = control;
            setContextMenu(contextMenuBranchPoint, new Point(e.clientX, e.clientY));
          }
          else {

            setEditor({
              ...editor,
              mode: Editor.Modes.Connect,
              selectControl: control,
              lastCursor: new Point(e.clientX, e.clientY)
            });
          }

        }
        else {
          setEditor({
            ...editor,
            mode: Editor.Modes.Edit,
            selectControl: control,
            lastCursor: new Point(e.clientX, e.clientY)
          });
        }
      }
    }
  }

  const svgMouseMoveHandler = useThrottle((e) => {
    console.log(`%c mode %c ${editor.mode} %c`, 'background:green ; padding: 0px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#c3e6f0 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #222;', 'background:transparent');
    const cursor = new Point(e.clientX, e.clientY);
    const delta = new Point(cursor.x - editor.lastCursor.x, cursor.y - editor.lastCursor.y);
    if (editor.mode === Editor.Modes.Move) {
      editor.select.position = new Point(editor.select.position.x + delta.x, editor.select.position.y + delta.y);

      for (let i = 0; i < editor.select.terminals.length; i++) {
        editor.select.terminals[i].position = new Point(editor.select.terminals[i].position.x + delta.x, editor.select.terminals[i].position.y + delta.y);
      }

      setEditor({
        ...editor,
        lastCursor: cursor
      });
      selectLayer.select(editor.select);
    }
    if (editor.mode === Editor.Modes.Edit) {
      if (editor.selectControl.type === SizeControl.Types.RightTop || editor.selectControl.type === SizeControl.Types.RightBottom) {
        editor.select.widthRight += delta.x;
      }

      if (editor.selectControl.type === SizeControl.Types.LeftTop || editor.selectControl.type === SizeControl.Types.LeftBottom) {
        editor.select.widthLeft -= delta.x;
      }

      if (editor.selectControl instanceof RotateControl) {
        let angle = Math.atan2(cursor.y - editor.select.position.y, cursor.x - editor.select.position.x);
        editor.select.angle = Math.round((angle * 180 / Math.PI + 90) / 90) * 90;

        for (let i = 0; i < editor.select.terminals.length; i++) {
          console.log(editor.select.angle);
          console.log(editor.select.terminals[i].angle);
          if (Math.abs(editor.select.angle) !== Math.abs(editor.select.terminals[i].angle)) {

            editor.select.terminals[i].position = getRotateTransformPoint(editor.select.terminals[i].position,
              editor.select.angle - editor.select.terminals[i].angle, editor.select.position);
            editor.select.terminals[i].angle = editor.select.angle;
          }

        }
        editor.select.terminals = [...editor.select.terminals]

      }

      if (editor.select.widthLeft < 50)
        editor.select.widthLeft = 50;
      if (editor.select.widthRight < 50)
        editor.select.widthRight = 50;
      setEditor({
        ...editor,
        lastCursor: cursor
      });
      selectLayer.select(editor.select);
    }




    if (editor.mode === Editor.Modes.Connect) {

      let elems = scheme.elements.filter(x => !(x instanceof Branch));
      //console.log(editor.connectTerminal)
      for (let i = 0; i < elems.length; i++) {
        if (hitTestFrame(elems[i].getFrame(), cursor, 50)) {
          elems[i].isShowTerminals = true;

          if (elems[i] instanceof Node) {
            if (hitTestLine(
              new Point(elems[i].position.x - elems[i].widthLeft, elems[i].position.y),
              new Point(elems[i].position.x + elems[i].widthRight, elems[i].position.y),
              cursor, 20)) {
              editor.connectNode = elems[i];

            } else {
              editor.connectNode = null;
            }




            if (editor.connectNode) {
              let indexOfPoint = selectLayer.box.controls.findIndex(x => x === editor.selectControl);

              let indexOfBranch = scheme.elements.findIndex(x => x === editor.select);
              let newPoint = new Point(scheme.elements[indexOfBranch].getFrame()[indexOfPoint].x + delta.x, //points
                editor.connectNode.position.y);

              if (selectLayer.box.controls.findIndex(x => x === editor.selectControl) === 0) {
                if (editor.select.terminal1) {
                  let nodeIndex = scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.select.terminal1.id));
                  let terminalIndex = scheme.elements[nodeIndex].terminals.findIndex(x => x.id === editor.select.terminal1.id);

                  // Change massive, not change terminal
                  scheme.elements[nodeIndex].terminals[terminalIndex].position = newPoint;
                  scheme.elements[nodeIndex].terminals = [
                    ...scheme.elements[nodeIndex].terminals.slice(0, terminalIndex),
                    scheme.elements[nodeIndex].terminals[terminalIndex],
                    ...scheme.elements[nodeIndex].terminals.slice(terminalIndex + 1)
                  ]

                } else {
                  let terminal = editor.connectNode.addTerminal(cursor.x);
                  editor.select.terminal1 = terminal;
                }
              }
              if (selectLayer.box.controls.findIndex(x => x === editor.selectControl) === selectLayer.box.controls.length - 1) {
                if (editor.select.terminal2) {
                  let nodeIndex = scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.select.terminal2.id));
                  let terminalIndex = scheme.elements[nodeIndex].terminals.findIndex(x => x.id === editor.select.terminal2.id);

                  // Change massive, not change terminal
                  scheme.elements[nodeIndex].terminals[terminalIndex].position = newPoint;
                  scheme.elements[nodeIndex].terminals = [
                    ...scheme.elements[nodeIndex].terminals.slice(0, terminalIndex),
                    scheme.elements[nodeIndex].terminals[terminalIndex],
                    ...scheme.elements[nodeIndex].terminals.slice(terminalIndex + 1)
                  ]

                } else {
                  let terminal = editor.connectNode.addTerminal(cursor.x);
                  editor.select.terminal2 = terminal;
                }
              }



            } else { // remove terminal at node
              if (editor.select.terminal1 && selectLayer.box.controls.findIndex(x => x === editor.selectControl) === 0) {
                let nodeIndex = scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.select.terminal1.id));
                let terminalIndex = scheme.elements[nodeIndex].terminals.findIndex(x => x.id === editor.select.terminal1.id);

                scheme.elements[nodeIndex].terminals = [
                  ...scheme.elements[nodeIndex].terminals.slice(0, terminalIndex),
                  ...scheme.elements[nodeIndex].terminals.slice(terminalIndex + 1)
                ]

                editor.select.emptyTerminal1 = new Terminal("Терминал " + Math.random(), cursor);
                editor.select.terminal1 = null;
              }
              if (editor.select.terminal2 && selectLayer.box.controls.findIndex(x => x === editor.selectControl) === selectLayer.box.controls.length - 1) {
                let nodeIndex = scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.select.terminal2.id));
                let terminalIndex = scheme.elements[nodeIndex].terminals.findIndex(x => x.id === editor.select.terminal2.id);

                scheme.elements[nodeIndex].terminals = [
                  ...scheme.elements[nodeIndex].terminals.slice(0, terminalIndex),
                  ...scheme.elements[nodeIndex].terminals.slice(terminalIndex + 1)
                ]
                editor.select.emptyTerminal2 = new Terminal("Терминал " + Math.random(), cursor);
                editor.select.terminal2 = null;
              }



            }





          } else { // not node element
            //console.log(elems[i])

            let terminal = null;
            for (let j = 0; j < elems[i].terminals.length; j++) {
              let findTerminal = hitTestPoint(elems[i].terminals[j].position, cursor, 10);
              if (findTerminal) {
                terminal = elems[i].terminals[j];

              } else {

              }
            }
            elems[i].terminals = [...elems[i].terminals] // that change element state
            if (selectLayer.box.controls.findIndex(x => x === editor.selectControl) === 0) {
              if (terminal) {
                if (terminal.canConnect) {
                  editor.select.terminal1 = terminal;
                  terminal.canConnect = false;
                }

              } else {

                if (editor.select.terminal1) {
                  let element = scheme.elements.find(x => x.terminals.find(x => x === editor.select.terminal1));
                  if (element) {
                    let terminal = element.terminals.find(x => x === editor.select.terminal1);
                    terminal.canConnect = true;
                  }
                  editor.select.emptyTerminal1 = new Terminal("Терминал " + Math.random(), cursor);
                  editor.select.terminal1 = null;
                }
              }
            }
            if (selectLayer.box.controls.findIndex(x => x === editor.selectControl) === selectLayer.box.controls.length - 1) {
              if (terminal) {
                if (terminal.canConnect) {
                  editor.select.terminal2 = terminal;
                  terminal.canConnect = false;
                }

              } else {

                if (editor.select.terminal2) {
                  let element = scheme.elements.find(x => x.terminals.find(x => x === editor.select.terminal2));
                  if (element) {
                    let terminal = element.terminals.find(x => x === editor.select.terminal2);
                    terminal.canConnect = true;
                  }
                  editor.select.emptyTerminal2 = new Terminal("Терминал " + Math.random(), cursor);
                  editor.select.terminal2 = null;
                }
              }
            }


          }


        }
        else {
          elems[i].isShowTerminals = false;
        }

      }

      if (editor.select && editor.selectControl) {
        let indexOfPoint = selectLayer.box.controls.findIndex(x => x === editor.selectControl);
        let indexOfBranch = scheme.elements.findIndex(x => x === editor.select);

        if (indexOfPoint === 0) {
          scheme.elements[indexOfBranch].emptyTerminal1.position = cursor;
        } else if (indexOfPoint === scheme.elements[indexOfBranch].getFrame().length - 1) {
          scheme.elements[indexOfBranch].emptyTerminal2.position = cursor;
        } else {
          scheme.elements[indexOfBranch].points = [...scheme.elements[indexOfBranch].points.slice(0, indexOfPoint - 1),
            cursor, ...scheme.elements[indexOfBranch].points.slice(indexOfPoint)]
        }
      }



      setEditor({
        ...editor,
        lastCursor: cursor
      });
    }





  }, 1);


  const svgMouseUpHandler = (e) => {

    const elem = hitTestElement(scheme.elements, new Point(e.clientX, e.clientY), 10);

    if (elem && (editor.mode === Editor.Modes.Default || editor.mode === Editor.Modes.Select)) {
      if (e.button === 2) {
        setEditor({
          ...editor,
          mode: Editor.Modes.ContextMenu
        });
        setContextMenu(contextMenuRemoveBranch, new Point(e.clientX, e.clientY));
      }

      setEditor({
        ...editor,
        mode: Editor.Modes.Select,
        select: elem,
        lastCursor: new Point(e.clientX, e.clientY)
      });
      selectLayer.select(elem);
    }
    if (editor.mode === Editor.Modes.Move || editor.mode === Editor.Modes.Connect) {
      let elems = scheme.elements.filter(x => !(x instanceof Branch));

      for (let i = 0; i < elems.length; i++) {
        elems[i].isShowTerminals = false;
      }

      if (editor.button) {
        editor.newElement.emptyTerminal2.position = new Point(e.clientX, e.clientY);
        editor.newElement.canDraw = true;

        setEditor({
          ...editor,
          selectControl: selectLayer.box.controls[1]
        });

        if (selectLayer.box.controls[1] === editor.selectControl) {
          const newBranch = new Branch("New branch " + Math.random(), 1, 2, null, null, [], 500)
          newBranch.emptyTerminal1 = new Terminal("New terminal " + Math.random(), new Point(0, 0), 0);
          newBranch.emptyTerminal2 = new Terminal("New terminal " + Math.random(), new Point(0, 0), 0);
          newBranch.canDraw = false;
          scheme.elements.unshift(newBranch);
          selectLayer.select(newBranch);
          setEditor({
            ...editor,
            select: newBranch,
            selectControl: selectLayer.box.controls[0],
            newElement: newBranch,
            mode: Editor.Modes.Connect,
            button: true
          });
        }
      } else {
        setEditor({
          ...editor,
          mode: Editor.Modes.Select,
          connectNode: null,
          lastCursor: new Point(e.clientX, e.clientY)
        });
        selectLayer.select(editor.select);
      }

    }
    if (!elem && editor.mode === Editor.Modes.Select) {
      setEditor({
        ...editor,
        mode: Editor.Modes.Default,
        select: null
      });
      setSelectLayer(new SelectLayer());
    }
    if (editor.mode === Editor.Modes.Edit) {
      setEditor({
        ...editor,
        mode: Editor.Modes.Select
      });
    }
  }

  const connectModeClickHandler = useCallback((e) => {
    console.log(scheme.elements);
    if (editor.button) {
      // remove newBranch and node terminals
      if (!editor.newElement.terminal2) {
        if (editor.newElement.terminal1) {
          let elementIndex = scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.newElement.terminal1.id));

          let terminalIndex = scheme.elements[elementIndex].terminals.findIndex(x => x.id === editor.newElement.terminal1.id);
          if (scheme.elements[elementIndex] instanceof Node) {
            scheme.elements[elementIndex].terminals = [
              ...scheme.elements[elementIndex].terminals.slice(0, terminalIndex),
              ...scheme.elements[elementIndex].terminals.slice(terminalIndex + 1)
            ]
          } else {
            scheme.elements[elementIndex].terminals[terminalIndex].canConnect = true;
          }

        }

        const index = scheme.elements.findIndex(x => x.id === editor.newElement.id);
        scheme.elements = [...scheme.elements.slice(0, index), ...scheme.elements.slice(index + 1)]
      }
      setEditor({
        ...editor,
        selectControl: null,
        mode: Editor.Modes.Default,
        button: false
      });
    } else {
      const newBranch = new Branch("New branch " + Math.random(), 1, 2, null, null, [], 500)
      newBranch.emptyTerminal1 = new Terminal("New terminal " + Math.random(), new Point(0, 0), 0);
      newBranch.emptyTerminal2 = new Terminal("New terminal " + Math.random(), new Point(0, 0), 0);
      newBranch.canDraw = false;
      scheme.elements.unshift(newBranch);
      selectLayer.select(newBranch);
      setEditor({
        ...editor,
        select: newBranch,
        selectControl: selectLayer.box.controls[0],
        newElement: newBranch,
        mode: Editor.Modes.Connect,
        button: true
      });
    } console.log(scheme.elements);

  }, [editor, selectLayer, scheme])

  const removeBranchPointHandler = useCallback(() => {
    let indexOfPoint = selectLayer.box.controls.filter(x => x instanceof SquareControl).findIndex(x => x === editor.selectControl);
    editor.select.points = [...editor.select.points.slice(0, indexOfPoint),
    ...editor.select.points.slice(indexOfPoint + 1)]
    setEditor({
      ...editor,
      mode: Editor.Modes.Select
    })
    selectLayer.select(editor.select);
  }, [selectLayer, editor])

  const removeBranchHandler = useCallback(() => {

    let elementIndex = scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.select.terminal1.id));
    let terminalIndex = scheme.elements[elementIndex].terminals.findIndex(x => x.id === editor.select.terminal1.id);
    if (scheme.elements[elementIndex] instanceof Node) {
      scheme.elements[elementIndex].terminals = [
        ...scheme.elements[elementIndex].terminals.slice(0, terminalIndex),
        ...scheme.elements[elementIndex].terminals.slice(terminalIndex + 1)
      ]
    } else {
      scheme.elements[elementIndex].terminals[terminalIndex].canConnect = true;
    }
    elementIndex = scheme.elements.findIndex(x => x.terminals.find(x => x.id === editor.select.terminal2.id));
    terminalIndex = scheme.elements[elementIndex].terminals.findIndex(x => x.id === editor.select.terminal2.id);
    if (scheme.elements[elementIndex] instanceof Node) {
      scheme.elements[elementIndex].terminals = [
        ...scheme.elements[elementIndex].terminals.slice(0, terminalIndex),
        ...scheme.elements[elementIndex].terminals.slice(terminalIndex + 1)
      ]
    } else {
      scheme.elements[elementIndex].terminals[terminalIndex].canConnect = true;
    }
    const index = scheme.elements.findIndex(x => x.id === editor.select.id);
    scheme.elements = [...scheme.elements.slice(0, index), ...scheme.elements.slice(index + 1)]

    setEditor({
      ...editor,
      mode: Editor.Modes.Default,
      select: null
    });
    setSelectLayer(new SelectLayer());

  }, [scheme, editor])


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
        <SchemeComponent scheme={scheme} />
        <SelectLayerComponent selectElement={editor.select} selectLayer={selectLayer} />
      </svg>
    </>


  );
}

export default EditorComponent;