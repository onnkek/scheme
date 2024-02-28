import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import './SVGPanel.css';
import { SelectContext } from '../../context/selectContext';
import Node from '../Node/Node';
import Branch from '../Branch/Branch';
import { SVGContext } from '../../context/SVGContext';
import { useThrottle } from '../../hooks/useThrottle';

function SVGPanel(props) {
  const initialSchemeState = {
    "nodes": [
      {
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

  // for (let i = 0; i < 1000; i++) {
  //   initialSchemeState.nodes.push({
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

  const SVGRef = useRef();

  const [select, setSelect] = useState(false);

  const hitTestLine = function (point1, point2, cursor, r) {
    let x1 = point1.x - cursor.x;
    let y1 = point1.y - cursor.y;
    let x2 = point2.x - cursor.x;
    let y2 = point2.y - cursor.y;
    let a = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
    let b = 2 * (x1 * (x2 - x1) + y1 * (y2 - y1));
    let c = Math.pow(x1, 2) + Math.pow(y1, 2) - Math.pow(r, 2);

    // get discriminant
    let disc = Math.pow(b, 2) - 4 * a * c;

    // check if discriminant has real values
    if (disc <= 0) return;

    // find intersection points
    let sqrtdisc = Math.sqrt(disc);
    let t1 = (-b + sqrtdisc) / (2 * a);
    let t2 = (-b - sqrtdisc) / (2 * a);
    if ((0 < t1 && t1 < 1) || (0 < t2 && t2 < 1)) return true;
  }
  const hitTestBranch = function (cursor, r) {
    for (let i = 0; i < schemeState.branches.length; i++) {
      for (let j = 0; j < schemeState.branches[i].image.list.length - 1; j++) {
        if (hitTestLine(schemeState.branches[i].image.list[j].coordinates, schemeState.branches[i].image.list[j + 1].coordinates, cursor, r)) {
          console.log("true");
          return schemeState.branches[i];
        }
      }
    }
    return false;
  };
  const hitTestNode = function (cursor, r) {
    for (let i = 0; i < schemeState.nodes.length; i++) {
      if (hitTestLine({
        x: schemeState.nodes[i].coordinates.x - schemeState.nodes[i].image.width / 2,
        y: schemeState.nodes[i].coordinates.y
      }, {
        x: schemeState.nodes[i].coordinates.x + schemeState.nodes[i].image.width / 2,
        y: schemeState.nodes[i].coordinates.y
      }, cursor, r)) {
        return schemeState.nodes[i];
      }
    }
    return false;
  };

  const onMD = (e) => {
    let node = hitTestNode({ x: e.clientX, y: e.clientY }, 15);
    if (node) {
      setSelect(node);
      setLastCursor({ x: e.clientX, y: e.clientY });
      console.log(lastCursor)
    }
  }



  const onMM = useThrottle((event) => {
    if (select) {
      let delta = { x: event.clientX - lastCursor.x, y: event.clientY - lastCursor.y };
      console.log(lastCursor)
      console.log(event.clientX)
      let indexOfNode = schemeState.nodes.findIndex(x => x.number === select.number);
      let newNode = { ...schemeState.nodes[indexOfNode] };
      newNode.coordinates = { x: schemeState.nodes[indexOfNode].coordinates.x + delta.x, y: schemeState.nodes[indexOfNode].coordinates.y + delta.y };
      setSchemeState({
        ...schemeState,
        nodes: [...schemeState.nodes.slice(0, indexOfNode), newNode, ...schemeState.nodes.slice(indexOfNode + 1)]
      });
    }
    setLastCursor({ x: event.clientX, y: event.clientY });
  }, 20);

  const onMU = (e) => {
    setSelect(false);
    setLastCursor({ x: 0, y: 0 });
  }



  console.log("render SVG")
  return (
    <svg ref={SVGRef} id='svg' onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU}>
      <SVGContext.Provider value={SVGRef}>
        {schemeState.nodes.map((node) => <Node key={node.number} x={node.coordinates.x} y={node.coordinates.y} width={node.image.width} number={node.number} />)}
        {schemeState.branches.map((branch) => <Branch key={branch.name} points={branch.image.list} />)}
      </SVGContext.Provider>

    </svg>
  );
}

export default SVGPanel;