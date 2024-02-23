import { useContext, useRef } from 'react';
import './SVGPanel.css';
import { SelectContext } from '../../context/selectContext';
import Node from '../Node/Node';
import Branch from '../Branch/Branch';
import { SVGContext } from '../../context/SVGContext';



function SVGPanel(props) {
  const scheme = {
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

  const SVGRef = useRef();

  const onMD = (e) => {
    console.log(e.target)
  }

  return (
    <svg ref={SVGRef} id='svg' onMouseDown={onMD}>
      <SVGContext.Provider value={SVGRef}>
        {scheme.nodes.map((node) => <Node point={{ "x": node.coordinates.x, "y": node.coordinates.y }} width="300" number={node.number} />)}
        {scheme.branches.map((branch) => <Branch points={branch.image.list} />)}
      </SVGContext.Provider>

    </svg>
  );
}

export default SVGPanel;