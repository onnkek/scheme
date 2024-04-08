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
import { Button } from 'reactstrap';
import openIcon from '../../assets/icons/open.svg';
import downloadIcon from '../../assets/icons/download.svg';
import GridComponent from '../GridComponent/GridComponent';
import { Polyline } from '../../models/Elements/Shapes/Polyline';
import { Polygon } from '../../models/Elements/Shapes/Polygon';
import { Line } from '../../models/Elements/Shapes/Line';
import { Ellipse } from '../../models/Elements/Shapes/Ellipse';
import { Rectangle } from '../../models/Elements/Shapes/Rectangle';
import { Path } from '../../models/Elements/Shapes/Path';
import { PointControl } from '../../models/Controls/PointControl';
import { SplineControl } from '../../models/Controls/SplineControl';
import ColorPicker from '../Controls/ColorPicker/ColorPicker';

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
          // console.log(elem)
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
              setContextMenu(contextMenuBranchPoint, new Point(e.clientX, e.clientY));
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
    console.log(`%c mode %c ${editor.mode} %c`, 'background:green ; padding: 0px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#c3e6f0 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #222;', 'background:transparent');
  }

  const svgMouseMoveHandler = useThrottle((e) => {
    console.log(`%c mode %c ${editor.mode} %c`, 'background:green ; padding: 0px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#c3e6f0 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #222;', 'background:transparent');
    const cursor = new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y);
    editor.cursor = cursor;
    const delta = getGridDelta(cursor, lastCursor, editor.grid);
    let cursorGrid = new Point(Math.round(cursor.x / editor.grid.stepX) * editor.grid.stepX, Math.round(cursor.y / editor.grid.stepY) * editor.grid.stepY);
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

      // New logic create ------------------------------------------------
      case Editor.Modes.AddPolyline:
      case Editor.Modes.ChangePolyline:
        if (editor.newElement) {
          switch (editor.addMode) {
            case Editor.AddModes.Circle:
              console.log(editor.newElement)
              if (cursorGrid.y - editor.newElement.startPosition.y > 0) {
                editor.newElement.radius.y = cursorGrid.y - editor.newElement.startPosition.y;
              } else {
                editor.newElement.radius.y = editor.newElement.startPosition.y - cursorGrid.y;
                editor.newElement.position.y = cursorGrid.y;
              }
              if (cursorGrid.x - editor.newElement.startPosition.x > 0) {
                editor.newElement.radius.x = cursorGrid.x - editor.newElement.startPosition.x;
              } else {
                editor.newElement.radius.x = editor.newElement.startPosition.x - cursorGrid.x;
                editor.newElement.position.x = cursorGrid.x;
              }

              break;
            case Editor.AddModes.Rectangle:
              if (cursorGrid.y - editor.newElement.startPosition.y > 0) {
                editor.newElement.height = cursorGrid.y - editor.newElement.startPosition.y;
              } else {
                editor.newElement.height = editor.newElement.startPosition.y - cursorGrid.y;
                editor.newElement.position.y = cursorGrid.y;
              }
              if (cursorGrid.x - editor.newElement.startPosition.x > 0) {
                editor.newElement.width = cursorGrid.x - editor.newElement.startPosition.x;
              } else {
                editor.newElement.width = editor.newElement.startPosition.x - cursorGrid.x;
                editor.newElement.position.x = cursorGrid.x;
              }
              break;
            case Editor.AddModes.Line:
              editor.newElement.points = [...editor.newElement.points.slice(0, editor.newElement.points.length - 1), cursorGrid];
              break;
            case Editor.AddModes.Polyline:
              editor.newElement.points = [...editor.newElement.points.slice(0, editor.newElement.points.length - 1), cursorGrid];
              break;
            case Editor.AddModes.Polygon:
              editor.newElement.points = [...editor.newElement.points.slice(0, editor.newElement.points.length - 1), cursorGrid];
              break;
            case Editor.AddModes.Path:
              // console.log(editor.newElement.points)
              if (editor.newElement.points.length === 4) {
                // console.log(editor.newElement.points)
                const point1 = editor.newElement.points[0];
                const point2 = editor.newElement.points[editor.newElement.points.length - 1];
                const c1 = 1 / 3;
                const c1Point = new Point((point1.x + c1 * point2.x) / (1 + c1), (point1.y + c1 * point2.y) / (1 + c1));
                const c2Point = new Point((point2.x + c1 * point1.x) / (1 + c1), (point2.y + c1 * point1.y) / (1 + c1));

                editor.newElement.points[editor.newElement.points.length - 1] = cursorGrid;
                editor.newElement.points[editor.newElement.points.length - 2] = c2Point;
                editor.newElement.points[editor.newElement.points.length - 3] = c1Point;
                // console.log(editor.newElement.points)
                editor.newElement.path = Path.getSpline(editor.newElement.points);

              } else {
                const point1 = editor.newElement.points[editor.newElement.points.length - 1 - 2];
                const point2 = editor.newElement.points[editor.newElement.points.length - 1];
                const midPoint = new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);

                editor.newElement.points[editor.newElement.points.length - 1] = cursorGrid;
                editor.newElement.points[editor.newElement.points.length - 2] = midPoint;
                editor.newElement.path = Path.getSpline(editor.newElement.points);

              }

              break;
            default:
              break;
          }
        }


        break;
      // New logic create ------------------------------------------------

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


        // New logic create ------------------------------------------------

        if (editor.selectLayer.selected.length === 1 && editor.selectControl instanceof SplineControl) {
          const index = editor.selectLayer.box[0].controls.findIndex(x => x === editor.selectControl);
          editor.selectLayer.selected[0].points[index] = cursorGrid;
          editor.selectLayer.selected[0].path = Path.getSpline(editor.selectLayer.selected[0].points);
          editor.selectLayer.box[0].initSelectLine();
          editor.selectLayer.box[0].updateControls();
        }

        if (editor.selectLayer.selected.length === 1 && editor.selectControl) {
          if (editor.selectLayer.selected[0] instanceof Polyline || editor.selectLayer.selected[0] instanceof Polygon || editor.selectLayer.selected[0] instanceof Line || editor.selectLayer.selected[0] instanceof Path) {
            let indexOfPoint = editor.selectLayer.box[0].controls.findIndex(x => x === editor.selectControl);
            editor.selectLayer.selected[0].points = [
              ...editor.selectLayer.selected[0].points.slice(0, indexOfPoint),
              new Point(Math.round(cursor.x / editor.grid.stepX) * editor.grid.stepX, Math.round(cursor.y / editor.grid.stepY) * editor.grid.stepY),
              ...editor.selectLayer.selected[0].points.slice(indexOfPoint + 1)
            ]
            if (editor.selectLayer.selected[0] instanceof Path) {
              editor.selectLayer.selected[0].path = Path.getSpline(editor.selectLayer.selected[0].points);
            }
            editor.selectLayer.box[0].frame = editor.selectLayer.selected[0].getFrame();
            editor.selectLayer.box[0].initSelectLine();
            editor.selectLayer.box[0].updateControls();
          }

        }
        // New logic create ------------------------------------------------


        if (editor.selectLayer.selected.length === 1 && editor.selectLayer.selected[0] instanceof Node) {
          editor.selectLayer.selected[0].changeSize(editor.selectControl.type, delta);
        }

        if (editor.selectControl instanceof RotateControl) {
          if (editor.selectLayer.selected.length === 1) {
            editor.selectLayer.selected[0].rotate(cursor);
          } else {
            editor.selectLayer.rotate(cursor);
          }
          editor.selectLayer.select();
        }

        break;

      case Editor.Modes.AddBranch:
      case Editor.Modes.Connect:
        editor.connect(cursor, delta);
        break;

      default:
        break
    }
    setLastCursor(cursor);
    console.log(`%c mode %c ${editor.mode} %c`, 'background:green ; padding: 0px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#c3e6f0 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #222;', 'background:transparent');
  }, 1);


  const svgMouseUpHandler = (e) => {
    console.log(`%c mode %c ${editor.mode} %c`, 'background:green ; padding: 0px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#c3e6f0 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #222;', 'background:transparent');
    const cursor = new Point(e.clientX + editor.svgOffset.x, e.clientY + editor.svgOffset.y);
    editor.cursor = cursor;
    const elem = hitTestElement(editor.scheme.elements, cursor, 5);
    let cursorGrid = new Point(Math.round(cursor.x / editor.grid.stepX) * editor.grid.stepX, Math.round(cursor.y / editor.grid.stepY) * editor.grid.stepY);

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
            let containElement = null;
            if (editor.scheme.elements[i] instanceof Path) {
              ////
              const points = [];
              const path = document.getElementById(editor.scheme.elements[i].id);
              const length = path.getTotalLength();
              for (let i = 0; i < 1; i += 0.005) {
                const SVGPoint = path.getPointAtLength(length * i);
                points.push(new Point(SVGPoint.x, SVGPoint.y));
              }
              // console.log(points)
              containElement = polyPolyContain(selectionVertices, points);
              // console.log(containElement)
              ////
            } else {
              containElement = polyPolyContain(selectionVertices, editor.scheme.elements[i].getFrame());
            }

            if (containElement) {
              selectElements.push(editor.scheme.elements[i]);
            }
          }
          if (editor.selectLayer.selectionFrame.mode === SelectionFrame.Modes.Intersect) {
            let containElement = null;
            if (editor.scheme.elements[i] instanceof Path) {
              ////
              const points = [];
              const path = document.getElementById(editor.scheme.elements[i].id);
              const length = path.getTotalLength();
              for (let i = 0; i < 1; i += 0.005) {
                const SVGPoint = path.getPointAtLength(length * i);
                points.push(new Point(SVGPoint.x, SVGPoint.y));
              }
              // console.log(points)
              containElement = polyPoly(selectionVertices, points);
              // console.log(containElement)
              ////
            } else {
              containElement = polyPoly(selectionVertices, editor.scheme.elements[i].getFrame());
            }
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
            setContextMenu(contextMenuRemoveBranch, new Point(e.clientX, e.clientY));
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
      // New logic create ------------------------------------------------
      case Editor.Modes.AddPolyline:
        switch (editor.addMode) {
          case Editor.AddModes.Circle:
            editor.newElement = new Ellipse("Ellipse", cursorGrid, new Point(1, 1), "#FFFFFF", 3, "#FFFF0020");
            editor.scheme.elements.unshift(editor.newElement);
            editor.mode = Editor.Modes.ChangePolyline;
            break;
          case Editor.AddModes.Rectangle:
            editor.newElement = new Rectangle("Rectangle", cursorGrid, 0, 0, "#FFFFFF", 3, "#FFFF0020");
            editor.scheme.elements.unshift(editor.newElement);
            editor.mode = Editor.Modes.ChangePolyline;
            break;
          case Editor.AddModes.Line:
            editor.newElement = new Line("Line", "#FFFFFF", 3);
            editor.newElement.points.push(cursorGrid);
            editor.newElement.points.push(cursorGrid);
            editor.scheme.elements.unshift(editor.newElement);
            editor.mode = Editor.Modes.ChangePolyline;
            break;
          case Editor.AddModes.Polyline:
            editor.newElement = new Polyline("Polyline", "#FFFFFF", 3, "none");
            editor.newElement.points.push(cursorGrid);
            editor.newElement.points.push(cursorGrid);
            editor.scheme.elements.unshift(editor.newElement);
            editor.mode = Editor.Modes.ChangePolyline;
            break;
          case Editor.AddModes.Polygon:
            editor.newElement = new Polygon("Polygon", "#FFFFFF", 3, "#FFFF0020");
            editor.newElement.points.push(cursorGrid);
            editor.newElement.points.push(cursorGrid);
            editor.scheme.elements.unshift(editor.newElement);
            editor.mode = Editor.Modes.ChangePolyline;
            break;
          case Editor.AddModes.Path:
            editor.newElement = new Path("Path", cursorGrid, "", "#FFFFFF", 3, "none");
            editor.newElement.points.push(new Point(cursorGrid.x, cursorGrid.y));
            editor.newElement.points.push(new Point(cursorGrid.x, cursorGrid.y));
            editor.newElement.points.push(new Point(cursorGrid.x, cursorGrid.y));
            editor.newElement.points.push(new Point(cursorGrid.x, cursorGrid.y));
            editor.newElement.path = Path.getSpline(editor.newElement.points);

            editor.scheme.elements.unshift(editor.newElement);
            editor.mode = Editor.Modes.ChangePolyline;
            break;
          default:
            break;
        }


        break;
      case Editor.Modes.ChangePolyline:
        switch (editor.addMode) {
          case Editor.AddModes.Circle:
          case Editor.AddModes.Rectangle:
            if (e.button === 2) {
              // remove element if right click
              editor.removeNewElement();
            }
            editor.mode = Editor.Modes.Selected;
            editor.selectLayer.selectElement(editor.newElement);
            editor.newElement = null;
            break;
          case Editor.AddModes.Line:
            if (e.button === 2) {
              // remove element if right click
              editor.removeNewElement();
            }
            editor.mode = Editor.Modes.Selected;
            editor.selectLayer.selectElement(editor.newElement);
            editor.newElement = null;
            break;
          case Editor.AddModes.Polyline:
            if (e.button === 2) {
              if (editor.newElement.points.length < 3) {
                // remove element if count of points < 3 (2 point and 1 move point)
                editor.removeNewElement();
                editor.mode = Editor.Modes.Default;
              } else {
                // remove last point in cursor position
                editor.newElement.points = editor.newElement.points.slice(0, editor.newElement.points.length - 1);
                editor.mode = Editor.Modes.Selected;
                editor.selectLayer.selectElement(editor.newElement);
              }
              editor.newElement = null;
            } else {
              editor.newElement.points.push(cursorGrid);
            }
            break;
          case Editor.AddModes.Polygon:
            if (e.button === 2) {
              if (editor.newElement.points.length < 3) {
                // remove element if count of points < 3 (2 point and 1 move point)
                editor.removeNewElement();
                editor.mode = Editor.Modes.Default;
              } else {
                // remove last point in cursor position
                editor.newElement.points = editor.newElement.points.slice(0, editor.newElement.points.length - 1);
                editor.mode = Editor.Modes.Selected;
                editor.selectLayer.selectElement(editor.newElement);
              }

              editor.newElement = null;
            } else {
              editor.newElement.points.push(cursorGrid);
            }
            break;
          case Editor.AddModes.Path:
            if (e.button === 2) {
              if (editor.newElement.points.length < 4) {
                // remove element if count of points < 4 (2 point and 1 move point)
                editor.removeNewElement();
                editor.mode = Editor.Modes.Default;
              } else {
                // remove 2 last point in cursor position
                editor.newElement.points = editor.newElement.points.slice(0, editor.newElement.points.length - 2);
                editor.newElement.path = Path.getSpline(editor.newElement.points);
                editor.mode = Editor.Modes.Selected;
                editor.selectLayer.selectElement(editor.newElement);
              }

              editor.newElement = null;
            } else {
              editor.newElement.points.push(cursorGrid);
              editor.newElement.points.push(cursorGrid);
            }
            break;
          default:
            break;
        }



        break;
      // New logic create ------------------------------------------------
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
    console.log(`%c mode %c ${editor.mode} %c`, 'background:green ; padding: 0px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#c3e6f0 ; padding: 0px; border-radius: 0 3px 3px 0;  color: #222;', 'background:transparent');
  }


  const addPolylineHandler = useCallback((e, mode) => {
    editor.mode = Editor.Modes.AddPolyline; // TODO: rename AddPolyline
    switch (mode) {
      case Editor.AddModes.Circle:
        editor.addMode = Editor.AddModes.Circle;
        break;
      case Editor.AddModes.Rectangle:
        editor.addMode = Editor.AddModes.Rectangle;
        break;
      case Editor.AddModes.Line:
        editor.addMode = Editor.AddModes.Line;
        break;
      case Editor.AddModes.Polyline:
        editor.addMode = Editor.AddModes.Polyline;
        break;
      case Editor.AddModes.Polygon:
        editor.addMode = Editor.AddModes.Polygon;
        break;
      case Editor.AddModes.Path:
        editor.addMode = Editor.AddModes.Path;
        break;
      default:
        break;
    }



    setLastCursor(e.clientX, e.clientY);
  }, [editor])



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
    editor.addElement(addMode, lastCursor);
  }, [editor, lastCursor])


  //let test = "";
  const save = useCallback((e) => {
    // let a = document.createElement("a");
    // let file = new Blob([JSON.stringify(editor.scheme)], { type: 'application/json' });
    // a.href = URL.createObjectURL(file);
    // a.download = "scheme.json";
    // a.click();

    const serializer = new Serializer([Scheme, Node, Branch, Switch, Transformer, Load, Generation, Terminal, Array, Point]);
    editor.test = serializer.serialize(editor.scheme);
    // console.log(editor.test)

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



  const editorMouseDownHandler = (e) => {
    const cursor = new Point(e.clientX, e.clientY);
    if (Math.abs(cursor.x - window.innerWidth + editor.propertyBarWidth) < 10) {
      editor.mode = Editor.Modes.ResizeBar;
      setLastCursor(cursor);
    }

  }
  const editorMouseMoveHandler = (e) => {
    const cursor = new Point(e.clientX, e.clientY);

    // document.getElementsByTagName("body")[0].style.cursor = "pointer";
    if (editor.mode === Editor.Modes.ResizeBar) {
      if (editor.propertyBarWidth >= 200) {
        editor.propertyBarWidth += lastCursor.x - cursor.x;
      }
      if (editor.propertyBarWidth < 200) {
        editor.propertyBarWidth = 200;
      }
      setLastCursor(cursor);
    }

  }
  const editorMouseUpHandler = (e) => {
    const cursor = new Point(e.clientX, e.clientY);
    if (editor.mode === Editor.Modes.ResizeBar) {
      editor.mode = Editor.Modes.Default;
      setLastCursor(cursor);
    }

  }

  return (
    <div className='editor'
      onMouseDown={editorMouseDownHandler}
      onMouseMove={editorMouseMoveHandler}
      onMouseUp={editorMouseUpHandler}>

      <div className='edit-panel'>

        <Button
          outline
          className="add-btn m-1"
          onClick={save}
        >
          <div className='add-btn'>
            <img className="me-2" src={downloadIcon} alt="Connect"></img>
            <div>SAVE</div>
          </div>

        </Button>
        <Button
          outline
          className="add-btn"
          onClick={load}
        >
          <div className='add-btn'>
            <img className="me-2" src={openIcon} alt="Connect"></img>
            <div>LOAD</div>
          </div>
        </Button>
      </div>
      <svg id='svg'
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={svgMouseDownHandler}
        onMouseMove={svgMouseMoveHandler}
        onMouseUp={svgMouseUpHandler}
        viewBox="0 0 1400 1000"
        style={{ backgroundColor: editor.backgroundColor }}
      >

        <SchemeComponent scheme={editor.scheme} />
        <SelectLayerComponent selectLayer={editor.selectLayer} />
        <GridComponent grid={editor.grid} backgroundColor={editor.grid.backgroundColor} stepX={editor.grid.stepX} stepY={editor.grid.stepY} strokeWidth={editor.grid.strokeWidth} />
      </svg>
      <PropertiesBar
        width={editor.propertyBarWidth}
        editor={editor}
        connectModeHandler={connectModeClickHandler}
        add={addElement}
        selected={editor.selectLayer.selected}
        polyline={addPolylineHandler}
      />
      <Explorer selected={editor.selectLayer.selected} scheme={editor.scheme} onSelect={explorerSelectHandler} />
      
    </div>


  );
}

export default EditorComponent;