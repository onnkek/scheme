import { useRef, useState } from 'react';
import './SVGPanel.css';
import Node from '../Node/Node';
import Branch from '../Branch/Branch';
import { SVGContext } from '../../context/SVGContext';
import { useThrottle } from '../../hooks/useThrottle';
import { hitTestBranch, hitTestLinePoint, hitTestNode } from '../../tools/hitTest';
import SelectLayer from '../Selections/SelectLayer/SelectLayer';

function SVGPanel(props) {
  const initialSchemeState = {
    "nodes": [
      {
        "type": "node",
        "name": "1",
        "number": 1,
        "coordinates":
        {
          "x": 350,
          "y": 110
        }
        ,
        "image": {
          "width": 300,
          "line": {},
          "text": {},
          "cp": [
            {
              "coordinates": {
                "x": 250,
                "y": 110
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 300,
                "y": 110
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 350,
                "y": 110
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 400,
                "y": 110
              },
              "circle": {},
              "animateIn": 1,
              "animateOut": 0
            },
            {
              "coordinates": {
                "x": 450,
                "y": 110
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            }
          ],
          "animateIn": 0,
          "animateOut": 0
        },
        "animateOut": 1,
        "animateIn": 0
      },
      {
        "type": "node",
        "name": "2",
        "number": 2,
        "coordinates":
        {
          "x": 400,
          "y": 660
        }
        ,
        "image": {
          "width": 300,
          "line": {},
          "text": {},
          "cp": [
            {
              "coordinates": {
                "x": 300,
                "y": 660
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 350,
                "y": 660
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 400,
                "y": 660
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 450,
                "y": 660
              },
              "circle": {},
              "animateIn": 1,
              "animateOut": 0
            },
            {
              "coordinates": {
                "x": 500,
                "y": 660
              },
              "circle": {},
              "animateIn": 1,
              "animateOut": 0
            }
          ],
          "animateIn": 0,
          "animateOut": 0
        },
        "animateIn": 0,
        "animateOut": 1
      },
      {
        "type": "node",
        "name": "3",
        "number": 3,
        "coordinates":
        {
          "x": 710,
          "y": 210
        }
        ,
        "image": {
          "width": 300,
          "line": {},
          "text": {},
          "cp": [
            {
              "coordinates": {
                "x": 610,
                "y": 210
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 660,
                "y": 210
              },
              "circle": {},
              "animateIn": 1,
              "animateOut": 0
            },
            {
              "coordinates": {
                "x": 710,
                "y": 210
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 760,
                "y": 210
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 810,
                "y": 210
              },
              "circle": {},
              "animateIn": 1,
              "animateOut": 0
            }
          ],
          "animateIn": 0,
          "animateOut": 0
        },
        "animateIn": 0,
        "animateOut": 1
      },
      {
        "type": "node",
        "name": "4",
        "number": 4,
        "coordinates":
        {
          "x": 860,
          "y": 660
        }
        ,
        "image": {
          "width": 300,
          "line": {},
          "text": {},
          "cp": [
            {
              "coordinates": {
                "x": 760,
                "y": 660
              },
              "circle": {},
              "animateIn": 1,
              "animateOut": 0
            },
            {
              "coordinates": {
                "x": 810,
                "y": 660
              },
              "circle": {},
              "animateIn": 1,
              "animateOut": 0
            },
            {
              "coordinates": {
                "x": 860,
                "y": 660
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 910,
                "y": 660
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            },
            {
              "coordinates": {
                "x": 960,
                "y": 660
              },
              "circle": {},
              "animateIn": 0,
              "animateOut": 1
            }
          ],
          "animateIn": 0,
          "animateOut": 0
        },
        "animateIn": 0,
        "animateOut": 1
      }
    ],
    "branches": [
      {
        "type": "branch",
        "name": "12",
        "number1": 1,
        "number2": 2,
        "pole1": [],
        "pole2": [],
        "image": {
          "line": {},
          "list": [
            {
              "coordinates": {
                "x": 400,
                "y": 110
              }
            },
            {
              "coordinates": {
                "x": 400,
                "y": 660
              }
            }
          ],
          "pole1": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": ""
                }
              ],
              "circle": "",
              "nodePole": ""
            }
          ],
          "pole2": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": ""
                }
              ],
              "circle": "",
              "nodePole": ""
            }
          ]
        }
      },
      {
        "type": "branch",
        "name": "23",
        "number1": 2,
        "number2": 3,
        "pole1": [],
        "pole2": [],
        "image": {
          "line": {},
          "list": [
            {
              "coordinates": {
                "x": 450,
                "y": 660
              }
            },
            {
              "coordinates": {
                "x": 450,
                "y": 380
              }
            },
            {
              "coordinates": {
                "x": 660,
                "y": 380
              }
            },
            {
              "coordinates": {
                "x": 660,
                "y": 210
              }
            }
          ],
          "pole1": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": ""
                }
              ],
              "circle": "",
              "nodePole": ""
            }
          ],
          "pole2": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": ""
                }
              ],
              "circle": "",
              "nodePole": ""
            }
          ]
        }
      },
      {
        "type": "branch",
        "name": "34",
        "number1": 3,
        "number2": 4,
        "pole1": [],
        "pole2": [],
        "image": {
          "line": {},
          "list": [
            {
              "coordinates": {
                "x": 810,
                "y": 210
              }
            },
            {
              "coordinates": {
                "x": 810,
                "y": 660
              }
            }
          ],
          "pole1": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": ""
                }
              ],
              "circle": "",
              "nodePole": ""
            }
          ],
          "pole2": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": ""
                }
              ],
              "circle": "",
              "nodePole": ""
            }
          ]
        }
      },
      {
        "type": "branch",
        "name": "41",
        "number1": 4,
        "number2": 2,
        "pole1": [],
        "pole2": [],
        "image": {
          "line": {},
          "list": [
            {
              "coordinates": {
                "x": 760,
                "y": 660
              }
            },
            {
              "coordinates": {
                "x": 760,
                "y": 580
              }
            },
            {
              "coordinates": {
                "x": 500,
                "y": 580
              }
            },
            {
              "coordinates": {
                "x": 500,
                "y": 660
              }
            }
          ],
          "pole1": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": ""
                }
              ],
              "circle": "",
              "nodePole": ""
            }
          ],
          "pole2": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": ""
                }
              ],
              "circle": "",
              "nodePole": ""
            }
          ]
        }
      }
    ]
  };

  // for (let i = 0; i < 2000; i++) {
  //   initialSchemeState.nodes.push({
  //     "type": "node",
  //     "name": "1",
  //     "number": i + 5,
  //     "coordinates":
  //     {
  //       "x": Math.random() * 700,
  //       "y": Math.random() * 1000
  //     }
  //     ,
  //     "image": {
  //       "width": 300,
  //       "line": {},
  //       "text": {}
  //     }
  //   })
  // }


  const [lastCursor, setLastCursor] = useState({ x: 0, y: 0 });
  const [schemeState, setSchemeState] = useState(initialSchemeState);
  const [select, setSelect] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const SVGRef = useRef();

  const [selectLinePoint, setSelectLinePoint] = useState(false);

  const svgMouseDownHandler = (e) => {
    let node = hitTestNode(schemeState.nodes, { x: e.clientX, y: e.clientY }, 15);
    if (node && node.number === select.number) {
      setIsDown(true);
      setLastCursor({ x: e.clientX, y: e.clientY });
    }
    if (select && select.type === "branch") {
      let linePoint = hitTestLinePoint(select.image.list, { x: e.clientX, y: e.clientY }, 15);
      setSelectLinePoint(linePoint);
    }
  }

  const svgMouseMoveHandler = useThrottle((event) => {
    if (select) {
      if (isDown) {
        let delta = { x: event.clientX - lastCursor.x, y: event.clientY - lastCursor.y };
        let indexOfNode = schemeState.nodes.findIndex(x => x.number === select.number);
        let newNode = { ...schemeState.nodes[indexOfNode] };
        newNode.coordinates = { x: schemeState.nodes[indexOfNode].coordinates.x + delta.x, y: schemeState.nodes[indexOfNode].coordinates.y + delta.y };
        setSchemeState({
          ...schemeState,
          nodes: [...schemeState.nodes.slice(0, indexOfNode), newNode, ...schemeState.nodes.slice(indexOfNode + 1)]
        });
        setSelect(newNode);
      }

      if (selectLinePoint) {
        let delta = { x: event.clientX - lastCursor.x, y: event.clientY - lastCursor.y };
        let indexOfBranch = schemeState.branches.findIndex(x => x.name === select.name);

        let newBranch = { ...schemeState.branches[indexOfBranch] }
        newBranch.image.list = [...schemeState.branches[indexOfBranch].image.list]
        let indexOfLinePoint = schemeState.branches[indexOfBranch].image.list.findIndex(x => x.coordinates.x === selectLinePoint.coordinates.x
          && x.coordinates.y === selectLinePoint.coordinates.y);
        let newPoint = {
          "coordinates": {
            "x": newBranch.image.list[indexOfLinePoint].coordinates.x + delta.x,
            "y": newBranch.image.list[indexOfLinePoint].coordinates.y + delta.y
          }
        };
        newBranch.image.list = [...newBranch.image.list.slice(0, indexOfLinePoint), newPoint, ...newBranch.image.list.slice(indexOfLinePoint + 1)]
        setSchemeState({
          ...schemeState,
          branches: [...schemeState.branches.slice(0, indexOfBranch), newBranch, ...schemeState.branches.slice(indexOfBranch + 1)]
        });
        setSelect(newBranch);
        setSelectLinePoint(newPoint)
      }



      setLastCursor({ x: event.clientX, y: event.clientY });
    }



  }, 1);

  const svgMouseUpHandler = (e) => {
    setIsDown(false);
    let node = hitTestNode(schemeState.nodes, { x: e.clientX, y: e.clientY }, 25);
    let branch = hitTestBranch(schemeState.branches, { x: e.clientX, y: e.clientY }, 10);
    if (branch) {
      setSelect(branch);
      setLastCursor({ x: e.clientX, y: e.clientY });
    } else if (node) {
      setSelect(node);
      setLastCursor({ x: e.clientX, y: e.clientY });
    } else {
      setSelect(false);
      setLastCursor({ x: 0, y: 0 });
    }
    if (select) {
      setSelectLinePoint(false);
    }
  }



  console.log("render SVG")
  return (
    <svg ref={SVGRef} id='svg' onMouseDown={svgMouseDownHandler} onMouseMove={svgMouseMoveHandler} onMouseUp={svgMouseUpHandler} viewBox="0 0 1400 1000">

      <SVGContext.Provider value={SVGRef}>
        {schemeState.nodes.map((node) => <Node key={node.number} x={node.coordinates.x} y={node.coordinates.y} width={node.image.width} number={node.number} />)}
        {schemeState.branches.map((branch) => <Branch key={branch.name} name={branch.name} points={branch.image.list} />)}
      </SVGContext.Provider>
      <SelectLayer select={select} />

    </svg>
  );
}

export default SVGPanel;