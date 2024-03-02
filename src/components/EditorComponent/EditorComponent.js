import { useState } from 'react';
import './EditorComponent.css';
import { useThrottle } from '../../hooks/useThrottle';
import { Scheme } from '../../models/Scheme';
import { hitTestElement, hitTestFrame } from '../../tools/hitTest';
import { Point } from '../../models/Point';
import { Branch } from '../../models/Elements/Branch';
import SelectLayerComponent from '../Selections/SelectLayerComponent/SelectLayerComponent';
import { SelectLayer } from '../../models/SelectLayer';
import SchemeComponent from '../SchemeComponent/SchemeComponent';
import { Editor } from '../../models/Editor';

// TODO:
// Чистить SVGPanel и реализовывать функционал обратно
// Вынести цвета элементов в поля класса, чтобы их было можно менять
// Создание разрывов линии, удаление разрывов
// Подключение линий к элементам
// Перевод всего этого на TS

function EditorComponent(props) {

  const [editor, setEditor] = useState(new Editor());
  const [scheme] = useState(new Scheme());
  const [selectLayer, setSelectLayer] = useState(new SelectLayer());

  const svgMouseDownHandler = (e) => {

    const elem = hitTestElement(scheme.elements, new Point(e.clientX, e.clientY), 20);

    if (elem && editor.mode === Editor.Modes.Select && editor.select === elem && !(elem instanceof Branch)) {
      setEditor({
        ...editor,
        mode: Editor.Modes.Move,
        lastCursor: new Point(e.clientX, e.clientY)
      });
    }
    if (editor.mode === Editor.Modes.Select) {
      let control = null;
      for (let i = 0; i < selectLayer.box.controls.length; i++) {
        if (hitTestFrame(selectLayer.box.controls[i].getFrame(), new Point(e.clientX, e.clientY), 5)) {
          control = selectLayer.box.controls[i];
        }
      }
      if (control) {
        if (editor.select instanceof Branch) {
          setEditor({
            ...editor,
            mode: Editor.Modes.EditBranch,
            selectControl: control,
            lastCursor: new Point(e.clientX, e.clientY)
          });
        } else {
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

    if (editor.mode === Editor.Modes.Move) {
      let delta = new Point(e.clientX - editor.lastCursor.x, e.clientY - editor.lastCursor.y);
      editor.select.position = new Point(editor.select.position.x + delta.x, editor.select.position.y + delta.y);
      setEditor({
        ...editor,
        lastCursor: new Point(e.clientX, e.clientY)
      });
    }
    if (editor.mode === Editor.Modes.Edit) {
      let delta = new Point(e.clientX - editor.lastCursor.x, e.clientY - editor.lastCursor.y);

      if (editor.lastCursor.x >= editor.select.position.x) {
        editor.select.widthRight += delta.x;
      }

      if (editor.lastCursor.x <= editor.select.position.x) {
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
    }
    if (editor.mode === Editor.Modes.EditBranch) {
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
    console.log(editor.mode)
    if (elem && (editor.mode === Editor.Modes.Default || editor.mode === Editor.Modes.Select)) {
      setEditor({
        ...editor,
        mode: Editor.Modes.Select,
        select: elem,
        lastCursor: new Point(e.clientX, e.clientY)
      });
      selectLayer.select(elem);
    }
    if (editor.mode === Editor.Modes.Move || editor.mode === Editor.Modes.EditBranch) {
      selectLayer.select(elem);
      setEditor({
        ...editor,
        mode: Editor.Modes.Select,
        lastCursor: new Point(e.clientX, e.clientY)
      });
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

  console.log("render EditorComponent")
  return (
    <svg id='svg' onMouseDown={svgMouseDownHandler} onMouseMove={svgMouseMoveHandler} onMouseUp={svgMouseUpHandler} viewBox="0 0 1400 1000">
      <SchemeComponent scheme={scheme} />
      <SelectLayerComponent selectElement={editor.select} selectLayer={selectLayer} />
    </svg>

  );
}

export default EditorComponent;