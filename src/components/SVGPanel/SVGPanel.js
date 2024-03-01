import { useRef, useState } from 'react';
import './SVGPanel.css';
import { useThrottle } from '../../hooks/useThrottle';
import { Scheme } from '../../models/Scheme';
import { hitTestBranch, hitTestLine, hitTestLinePoint, hitTestNode } from '../../tools/hitTest';
import { Point } from '../../models/Point';
import { Node } from '../../models/Node';
import { Branch } from '../../models/Branch';
import SelectLayer from '../Selections/SelectLayer/SelectLayer';

function SVGPanel(props) {

  const [scheme, setScheme] = useState(new Scheme());
  const [lastCursor, setLastCursor] = useState({ x: 0, y: 0 });
  const [select, setSelect] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [selectLinePoint, setSelectLinePoint] = useState(false);
  const [controlsPoints, setControlsPoints] = useState([]);
  const [selectControl, setSelectControl] = useState();

  const SVGRef = useRef();

  const svgMouseDownHandler = (e) => {
    let node = hitTestNode(scheme.elements.filter(x => x instanceof Node), new Point(e.clientX, e.clientY), 15);

    if (node && node.id === select.id) {
      setIsDown(true);
      setLastCursor(new Point(e.clientX, e.clientY));
    }
    if (select && select instanceof Branch) {
      let linePoint = hitTestLinePoint(select.points, new Point(e.clientX, e.clientY), 15);
      setSelectLinePoint(linePoint);
      setLastCursor(new Point(e.clientX, e.clientY));
    }
    if (select && select instanceof Node) {
      for (let i = 0; i < controlsPoints[1].length - 1; i++) {
        let control = hitTestLine(controlsPoints[1][i], controlsPoints[1][i + 1], new Point(e.clientX, e.clientY), 5)
        if (control) {
          setSelectControl(e.clientX);
          setLastCursor(new Point(e.clientX, e.clientY));
        }
      }
      for (let i = 0; i < controlsPoints[3].length - 1; i++) {
        let control = hitTestLine(controlsPoints[3][i], controlsPoints[3][i + 1], new Point(e.clientX, e.clientY), 5)
        if (control) {
          setSelectControl(e.clientX);
          setLastCursor(new Point(e.clientX, e.clientY));
        }
      }
      for (let i = 0; i < controlsPoints[0].length - 1; i++) {
        let control = hitTestLine(controlsPoints[0][i], controlsPoints[0][i + 1], new Point(e.clientX, e.clientY), 5)
        if (control) {
          setSelectControl(e.clientX);
          setLastCursor(new Point(e.clientX, e.clientY));
        }
      }
      for (let i = 0; i < controlsPoints[2].length - 1; i++) {
        let control = hitTestLine(controlsPoints[2][i], controlsPoints[2][i + 1], new Point(e.clientX, e.clientY), 5)
        if (control) {
          setSelectControl(e.clientX);
          setLastCursor(new Point(e.clientX, e.clientY));
        }
      }
    }
  }

  const svgMouseMoveHandler = useThrottle((e) => {
    if (select) {

      if (isDown && !selectControl) {
        let delta = new Point(e.clientX - lastCursor.x, e.clientY - lastCursor.y);
        let indexOfNode = scheme.elements.findIndex(x => x.id === select.id);
        let newNode = scheme.elements[indexOfNode].copy();
        newNode.position = new Point(scheme.elements[indexOfNode].position.x + delta.x, scheme.elements[indexOfNode].position.y + delta.y);
        scheme.elements[indexOfNode] = newNode;
        setScheme(scheme);
        setSelect(newNode);
        setControlsPoints(getControls(newNode.position, newNode.widthLeft, newNode.widthRight, 30, 8, 12))
        setLastCursor(new Point(e.clientX, e.clientY));
      }
      else if (selectControl) {
        let delta = new Point(e.clientX - lastCursor.x, e.clientY - lastCursor.y);
        let indexOfNode = scheme.elements.findIndex(x => x.id === select.id);
        let newNode = scheme.elements[indexOfNode].copy();

        if (selectControl >= newNode.position.x) {
          newNode.widthRight += delta.x;
        }

        if (selectControl <= newNode.position.x) {
          newNode.widthLeft -= delta.x;
        }

        if (newNode.widthLeft < 50)
          newNode.widthLeft = 50;
        if (newNode.widthRight < 50)
          newNode.widthRight = 50;
        
        scheme.elements[indexOfNode] = newNode;
        setScheme(scheme);
        setSelect(newNode);
        setControlsPoints(getControls(newNode.position, newNode.widthLeft, newNode.widthRight, 30, 8, 12))
        setLastCursor(new Point(e.clientX, e.clientY));
      }
      else if (selectLinePoint) {
        let delta = new Point(e.clientX - lastCursor.x, e.clientY - lastCursor.y);
        let indexOfBranch = scheme.elements.findIndex(x => x.name === select.name);
        let indexOfLinePoint = scheme.elements[indexOfBranch].points.findIndex(point => point.x === selectLinePoint.x
          && point.y === selectLinePoint.y);
        let newPoint = new Point(scheme.elements[indexOfBranch].points[indexOfLinePoint].x + delta.x,
          scheme.elements[indexOfBranch].points[indexOfLinePoint].y + delta.y);

        scheme.elements[indexOfBranch].points = [...scheme.elements[indexOfBranch].points.slice(0, indexOfLinePoint),
          newPoint, ...scheme.elements[indexOfBranch].points.slice(indexOfLinePoint + 1)]
        setScheme(scheme);
        setSelect(scheme.elements[indexOfBranch]);
        setSelectLinePoint(newPoint)
        setLastCursor(new Point(e.clientX, e.clientY));
      }


    }



  }, 10);


  const getControls = (point, widthLeft, widthRight, height, selectControlPadding, selectControlLength) => {
    let result = [];
    result.push([
      new Point(point.x - widthLeft - selectControlPadding + selectControlLength, point.y - height / 2 - selectControlPadding),
      new Point(point.x - widthLeft - selectControlPadding, point.y - height / 2 - selectControlPadding),
      new Point(point.x - widthLeft - selectControlPadding, point.y - height / 2 - selectControlPadding + selectControlLength)
    ]);
    result.push([
      new Point(point.x + widthRight + selectControlPadding - selectControlLength, point.y - height / 2 - selectControlPadding),
      new Point(point.x + widthRight + selectControlPadding, point.y - height / 2 - selectControlPadding),
      new Point(point.x + widthRight + selectControlPadding, point.y - height / 2 - selectControlPadding + selectControlLength)
    ]);
    result.push([
      new Point(point.x - widthLeft - selectControlPadding + selectControlLength, point.y + height / 2 + selectControlPadding),
      new Point(point.x - widthLeft - selectControlPadding, point.y + height / 2 + selectControlPadding),
      new Point(point.x - widthLeft - selectControlPadding, point.y + height / 2 + selectControlPadding - selectControlLength)
    ]);
    result.push([
      new Point(point.x + widthRight + selectControlPadding - selectControlLength, point.y + height / 2 + selectControlPadding),
      new Point(point.x + widthRight + selectControlPadding, point.y + height / 2 + selectControlPadding),
      new Point(point.x + widthRight + selectControlPadding, point.y + height / 2 + selectControlPadding - selectControlLength)
    ]);
    return result;
  }

  const svgMouseUpHandler = (e) => {
    setIsDown(false);
    let node = hitTestNode(scheme.elements.filter(x => x instanceof Node), new Point(e.clientX, e.clientY), 25);
    let branch = hitTestBranch(scheme.elements.filter(x => x instanceof Branch), new Point(e.clientX, e.clientY), 10);

    if (selectControl) {
      setSelectControl(false);
    } else if (branch) {
      setSelect(branch);
      setLastCursor(new Point(e.clientX, e.clientY));
    } else if (node) {
      setSelect(node);
      setControlsPoints(getControls(node.position, node.widthLeft, node.widthRight, 30, 8, 12))
      setLastCursor(new Point(e.clientX, e.clientY));
    } else if (!selectControl) {
      setSelect(false);
      setLastCursor(new Point(0, 0));
    }
    if (select) {
      setSelectLinePoint(false);
    }

  }


  console.log("render SVG")
  return (
    <svg ref={SVGRef} id='svg' onMouseDown={svgMouseDownHandler} onMouseMove={svgMouseMoveHandler} onMouseUp={svgMouseUpHandler} viewBox="0 0 1400 1000">
      {scheme.elements.map(e => e.drawComponent())}
      <SelectLayer cp={controlsPoints} selectElement={select} svg={SVGRef} />

    </svg>
  );
}

export default SVGPanel;