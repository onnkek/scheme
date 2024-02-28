import { useRef, useState } from 'react';
import './SVGPanel.css';
import Node from '../Node/Node';
import Branch from '../Branch/Branch';
import { SVGContext } from '../../context/SVGContext';
import { useThrottle } from '../../hooks/useThrottle';
import { hitTestBranch, hitTestNode } from '../../tools/hitTest';
import SelectLayer from '../SelectLayer/SelectLayer';

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

  const SVGRef = useRef();

  const [select, setSelect] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const onMD = (e) => {
    let node = hitTestNode(schemeState.nodes, { x: e.clientX, y: e.clientY }, 15);
    if (node && node.number === select.number) {
      setIsDown(true);
      setLastCursor({ x: e.clientX, y: e.clientY });
    }
  }

  const onMM = useThrottle((event) => {
    console.log(isDown)
    if(isDown) {
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
      setSelect(newNode);
    }
    setLastCursor({ x: event.clientX, y: event.clientY });
    }
    
  }, 1);

  const onMU = (e) => {
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
  }



  console.log("render SVG")
  return (
    <svg ref={SVGRef} id='svg' onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} viewBox="0 0 1400 1000">
      
      <SVGContext.Provider value={SVGRef}>
        {schemeState.nodes.map((node) => <Node key={node.number} x={node.coordinates.x} y={node.coordinates.y} width={node.image.width} number={node.number} />)}
        {schemeState.branches.map((branch) => <Branch key={branch.name} points={branch.image.list} />)}
      </SVGContext.Provider>
      <SelectLayer select={select}/>

    </svg>
  );
}

export default SVGPanel;