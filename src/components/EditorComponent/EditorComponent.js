import { useCallback, useMemo, useState } from 'react';
import './EditorComponent.css';
import { useThrottle } from '../../hooks/useThrottle';
import { Scheme } from '../../models/Scheme';
import { hitTestElement, hitTestFrame, hitTestLine, hitTestLinePoint, hitTestPoint } from '../../tools/hitTest';
import { Point } from '../../models/Point';
import SelectLayerComponent from '../Selections/SelectLayerComponent/SelectLayerComponent';
import { SelectLayer } from '../../models/SelectLayer';
import SchemeComponent from '../SchemeComponent/SchemeComponent';
import { Editor } from '../../models/Editor';
import { SizeControl } from '../../models/Controls/SizeControl';
import { useContextMenu } from '../../hooks';
import { Branch } from '../../models/Elements/Branch';
import { Terminal } from '../../models/Elements/Terminal';
import { TerminalNode } from '../../models/Elements/TerminalNode';
import { Node } from '../../models/Elements/Node';
import { PointControl } from '../../models/Controls/PointControl';

// TODO:
// Чистить SVGPanel и реализовывать функционал обратно
// Вынести цвета элементов в поля класса, чтобы их было можно менять
// Подключение линий к элементам
// Перевод всего этого на TS

function EditorComponent(props) {

  const [editor, setEditor] = useState(new Editor());
  const [scheme] = useState(new Scheme());
  const [selectLayer, setSelectLayer] = useState(new SelectLayer());
  const { setContextMenu } = useContextMenu();

  const svgMouseDownHandler = (e) => {

    const elem = hitTestElement(scheme.elements, new Point(e.clientX, e.clientY), 20);

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

        editor.select.points = [...editor.select.points.slice(0, indexOfPoint),
        new Point(e.clientX, e.clientY), ...editor.select.points.slice(indexOfPoint)]

      }
      let control = null;
      for (let i = 0; i < selectLayer.box.controls.length; i++) {
        if (hitTestFrame(selectLayer.box.controls[i].getFrame(), new Point(e.clientX, e.clientY), 5)) {
          control = selectLayer.box.controls[i];
        }
      }
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

            //let nodes = scheme.elements.filter(x => x instanceof Node);

            let indexTerminal = selectLayer.box.controls.filter(x => x instanceof PointControl).findIndex(x => x.id === control.id)
            for (let i = 0; i < scheme.elements.length; i++) {
              if (scheme.elements[i] instanceof Node) {
                if (indexTerminal !== -1) {
                  if (editor.select.terminals[indexTerminal]) {
                    let index = scheme.elements[i].terminals.findIndex(x => x.id === editor.select.terminals[indexTerminal].id)
                    if (index !== -1) {
                      scheme.elements[i].terminals = [...scheme.elements[i].terminals.slice(0, index), ...scheme.elements[i].terminals.slice(index + 1)]
                      editor.select.terminals = [...editor.select.terminals.slice(0, indexTerminal), ...editor.select.terminals.slice(indexTerminal + 1)]

                    }
                  }


                }



              }

            }

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
    if (editor.mode === Editor.Modes.Move) {
      let delta = new Point(e.clientX - editor.lastCursor.x, e.clientY - editor.lastCursor.y);
      editor.select.position = new Point(editor.select.position.x + delta.x, editor.select.position.y + delta.y);
      setEditor({
        ...editor,
        lastCursor: new Point(e.clientX, e.clientY)
      });
      selectLayer.select(editor.select);
    }
    if (editor.mode === Editor.Modes.Edit) {
      let delta = new Point(e.clientX - editor.lastCursor.x, e.clientY - editor.lastCursor.y);
      if (editor.selectControl.type === SizeControl.Types.Right) {
        editor.select.widthRight += delta.x;
      }

      if (editor.selectControl.type === SizeControl.Types.Left) {
        editor.select.widthLeft -= delta.x;
      }

      if (editor.select.widthLeft < 50)
        editor.select.widthLeft = 50;
      if (editor.select.widthRight < 50)
        editor.select.widthRight = 50;
      setEditor({
        ...editor,
        lastCursor: new Point(e.clientX, e.clientY)
      });
      selectLayer.select(editor.select);
    }




    if (editor.mode === Editor.Modes.Connect) {

      let elems = scheme.elements.filter(x => !(x instanceof Branch));

      for (let i = 0; i < elems.length; i++) {
        if (hitTestFrame(elems[i].getFrame(), new Point(e.clientX, e.clientY), 50)) {
          elems[i].isShowTerminals = true;

          if (elems[i] instanceof Node) {
            if (hitTestLine(
              new Point(elems[i].position.x - elems[i].widthLeft, elems[i].position.y),
              new Point(elems[i].position.x + elems[i].widthRight, elems[i].position.y),
              new Point(e.clientX, e.clientY), 20)) {
              console.log("HITTEST NODE")
              editor.connectNode = elems[i];
              // let newTerminal = new Terminal(elems[i].terminals[j].name, elems[i].terminals[j].position);
              // newTerminal.canConnect = true;
              // newTerminal.id = elems[i].terminals[j].id;

              // elems[i].terminals = [...elems[i].terminals.slice(0, j),
              //   newTerminal, ...elems[i].terminals.slice(j + 1)]


            } else {
              editor.connectNode = null;
            }
          }
          // for (let j = 0; j < elems[i].terminals.length; j++) {
          //   if (hitTestFrame(elems[i].terminals[j].getFrame(), new Point(e.clientX, e.clientY), 10)) {

          //     let newTerminal = new Terminal(elems[i].terminals[j].name, elems[i].terminals[j].position);
          //     newTerminal.canConnect = true;
          //     newTerminal.id = elems[i].terminals[j].id;

          //     elems[i].terminals = [...elems[i].terminals.slice(0, j),
          //       newTerminal, ...elems[i].terminals.slice(j + 1)]


          //   } else {
          //     let newTerminal = new Terminal(elems[i].terminals[j].name, elems[i].terminals[j].position);
          //     newTerminal.canConnect = false;
          //     newTerminal.id = elems[i].terminals[j].id;

          //     elems[i].terminals = [...elems[i].terminals.slice(0, j),
          //       newTerminal, ...elems[i].terminals.slice(j + 1)]
          //   }

          // }

        }
        else {
          elems[i].isShowTerminals = false;
        }

      }

      let delta = new Point(e.clientX - editor.lastCursor.x, e.clientY - editor.lastCursor.y);
      let indexOfPoint = selectLayer.box.controls.findIndex(x => x === editor.selectControl);
      let indexOfBranch = scheme.elements.findIndex(x => x === editor.select);
      let newPoint = new Point(scheme.elements[indexOfBranch].points[indexOfPoint].x + delta.x,
        scheme.elements[indexOfBranch].points[indexOfPoint].y + delta.y);

      scheme.elements[indexOfBranch].points = [...scheme.elements[indexOfBranch].points.slice(0, indexOfPoint),
        newPoint, ...scheme.elements[indexOfBranch].points.slice(indexOfPoint + 1)]

      setEditor({
        ...editor,
        lastCursor: new Point(e.clientX, e.clientY)
      });
    }





  }, 10);


  const svgMouseUpHandler = (e) => {

    const elem = hitTestElement(scheme.elements, new Point(e.clientX, e.clientY), 20);

    if (elem && (editor.mode === Editor.Modes.Default || editor.mode === Editor.Modes.Select)) {
      setEditor({
        ...editor,
        mode: Editor.Modes.Select,
        select: elem,
        lastCursor: new Point(e.clientX, e.clientY)
      });
      selectLayer.select(elem);
    }
    if (editor.mode === Editor.Modes.Move || editor.mode === Editor.Modes.Connect) {



      if (editor.connectNode) {
        let terminal = "";
        for (let i = 0; i < editor.connectNode.terminals.length; i++) {
          if (hitTestPoint(editor.connectNode.terminals[i].position, new Point(e.clientX, e.clientY), 10)) {
            terminal = editor.connectNode.terminals[i];
          }
        }
        if (!terminal) {
          console.log("ADD TERMINAL")
          terminal = new Terminal("Терминал " + Math.random(), new Point(e.clientX, editor.connectNode.position.y))
          editor.connectNode.terminals.push(terminal);
          console.log(terminal)

        }
        console.log(terminal.position)
        let indexOfPoint = selectLayer.box.controls.findIndex(x => x === editor.selectControl);
        editor.select.points = [...editor.select.points.slice(0, indexOfPoint),
        terminal.position, ...editor.select.points.slice(indexOfPoint + 1)]
        editor.select.terminals.push(terminal);
      }





      let elems = scheme.elements.filter(x => !(x instanceof Branch));

      for (let i = 0; i < elems.length; i++) {
        elems[i].isShowTerminals = false;
      }

      setEditor({
        ...editor,
        mode: Editor.Modes.Select,
        lastCursor: new Point(e.clientX, e.clientY)
      });
      selectLayer.select(editor.select);
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


  const removeBranchPointHandler = useCallback(() => {
    let indexOfPoint = selectLayer.box.controls.findIndex(x => x === editor.selectControl);
    editor.select.points = [...editor.select.points.slice(0, indexOfPoint),
    ...editor.select.points.slice(indexOfPoint + 1)]
    setEditor({
      ...editor,
      mode: Editor.Modes.Select
    })
    selectLayer.select(editor.select);
  }, [selectLayer, editor])

  const contextMenuBranchPoint = useMemo(() => [
    { text: "Remove point", onClick: () => removeBranchPointHandler() }
  ], [removeBranchPointHandler])


  //console.log("render EditorComponent")

  return (
    <>
      <svg id='svg' onContextMenu={(e) => e.preventDefault()} onMouseDown={svgMouseDownHandler} onMouseMove={svgMouseMoveHandler} onMouseUp={svgMouseUpHandler} viewBox="0 0 1400 1000">
        <SchemeComponent scheme={scheme} />
        <SelectLayerComponent selectElement={editor.select} selectLayer={selectLayer} />
      </svg>
    </>


  );
}

export default EditorComponent;