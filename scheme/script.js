window.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("svg");



  const scheme = {
    "nodes": [
      {
        "name": "1",
        "number": 1,
        "coordinates": [
          {
            "x": "",
            "y": "",
          }
        ],
        "image": {
          "line": "",
          "text": "",
          "cp": [],
          "animateIn": 0,
          "animateOut": 0
        }
      },
      {
        "name": "2",
        "number": 2,
        "coordinates": [
          {
            "x": "",
            "y": "",
          }
        ],
        "image": {
          "line": "",
          "text": "",
          "cp": [],
          "animateIn": 0,
          "animateOut": 0
        }
      },
      {
        "name": "3",
        "number": 3,
        "coordinates": [
          {
            "x": "",
            "y": "",
          }
        ],
        "image": {
          "line": "",
          "text": "",
          "cp": [],
          "animateIn": 0,
          "animateOut": 0
        }
      },
      {
        "name": "4",
        "number": 4,
        "coordinates": [
          {
            "x": "",
            "y": "",
          }
        ],
        "image": {
          "line": "",
          "text": "",
          "cp": [],
          "animateIn": 0,
          "animateOut": 0
        }
      },
    ],




    "branches": [
      {
        "name": "12",
        "number1": 1,
        "number2": 2,
        "pole1": [],
        "pole2": [],
        "image": {
          "line": "",
          "pole1": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": "",
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
                  "y": "",
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
          "line": "",
          "pole1": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": "",
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
                  "y": "",
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
          "line": "",
          "pole1": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": "",
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
                  "y": "",
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
        "number2": 1,
        "pole1": [],
        "pole2": [],
        "image": {
          "line": "",
          "pole1": [
            {
              "coordinates": [
                {
                  "x": "",
                  "y": "",
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
                  "y": "",
                }
              ],
              "circle": "",
              "nodePole": ""
            }
          ]
        }
      },
    ]
  }
  const radius = 8;
  const nodeWidth = 300;
  const nodeHeight = 30;
  const cpWidth = 50;
  const nodeColor = "darkred";
  const cpNodeColor = "white";

  scheme.nodes.map(x => {
    DrawNode(x);
  })
  scheme.branches.map(x => {
    DrawBranch(x);
  })

  let select = null;
  let selectBranchCP = null;
  let point = null;
  let selectNodeCP = null;
  let aIn = 0;
  let aOut = 0;
  let durIn = 0;
  let durOut = 0;
  let lastNode = null;
  let aBranch = null;
  let aNode = null;
  let selectNode = null;
  let aIn1 = 0;
  let aOut2 = 0;
  let selNodeCP = [];
  let nodeLogic1 = null;

  //let test = null;

  function DrawNode(node) {
    node.coordinates.x = Math.random() * (svg.clientWidth - radius);
    node.coordinates.y = Math.random() * (svg.clientHeight - radius);

    let p1 = { "x": node.coordinates.x - nodeWidth / 2, "y": node.coordinates.y };
    let p2 = { "x": node.coordinates.x + nodeWidth / 2, "y": node.coordinates.y };
    let pText = { "x": node.coordinates.x - nodeWidth / 2 - 20, "y": node.coordinates.y + 7 };
    let line = DrawLine(p1, p2, nodeHeight, nodeColor);
    node.image.line = line;

    let text = DrawText(pText, node.number, 20, "white");
    node.image.text = text;
    for (let i = 0; i < nodeWidth / cpWidth - 1; i++) {
      let p = { "x": node.coordinates.x - nodeWidth / 2 + (i + 1) * cpWidth, "y": node.coordinates.y };
      let circle = DrawCircle(p, radius, 0, "lime", "lime");
      circle.setAttribute("filter", "url(#f1)");
      node.image.cp.push({ "coordinates": p, "circle": circle, "animateIn": 0, "animateOut": 1 });
      circle.setAttribute("opacity", 0);
    }
  }
  function funcIn(timeFraction) {
    return -12 * Math.pow(timeFraction, 2) + 15 * timeFraction + 8;
  }
  function funcOut(timeFraction) {
    return 12 * Math.pow(timeFraction, 2) - 14 * timeFraction + 10;
  }

  function funcIn1(timeFraction) {
    return -6 * Math.pow(timeFraction, 2) + 10 * timeFraction + 4;
  }
  function funcOut1(timeFraction) {
    return 6 * Math.pow(timeFraction, 2) - 12 * timeFraction + 8;
  }
  function MoveNode(cursor) {
    if (select && point) {

      select.coordinates.x += cursor.x - point.x;
      select.coordinates.y += cursor.y - point.y;

      let p1 = { "x": select.coordinates.x - nodeWidth / 2, "y": select.coordinates.y };
      let p2 = { "x": select.coordinates.x + nodeWidth / 2, "y": select.coordinates.y };
      select.image.line.setAttribute("x1", p1.x);
      select.image.line.setAttribute("y1", p1.y);
      select.image.line.setAttribute("x2", p2.x);
      select.image.line.setAttribute("y2", p2.y);


      let pText = { "x": select.coordinates.x - nodeWidth / 2 - 20, "y": select.coordinates.y + 7 };
      select.image.text.setAttribute("x", pText.x);
      select.image.text.setAttribute("y", pText.y);

      for (let i = 0; i < select.image.cp.length; i++) {
        let pCircle = { "x": select.coordinates.x - nodeWidth / 2 + (i + 1) * cpWidth, "y": select.coordinates.y };
        select.image.cp[i].circle.setAttribute("cx", pCircle.x);
        select.image.cp[i].circle.setAttribute("cy", pCircle.y);
        select.image.cp[i].coordinates = pCircle;
      }

      let branches1 = scheme.branches.filter(x => x.number1 == select.number);
      for (let i = 0; i < branches1.length; i++) {
        if (branches1[i].image.pole1.nodePole) {
          branches1[i].image.line.setAttribute("x1", branches1[i].image.pole1.nodePole.coordinates.x);
          branches1[i].image.line.setAttribute("y1", branches1[i].image.pole1.nodePole.coordinates.y);
          branches1[i].image.pole1.circle.setAttribute("cx", branches1[i].image.pole1.nodePole.coordinates.x);
          branches1[i].image.pole1.circle.setAttribute("cy", branches1[i].image.pole1.nodePole.coordinates.y);
          branches1[i].image.pole1.coordinates = { "x": branches1[i].image.pole1.nodePole.coordinates.x, "y": branches1[i].image.pole1.nodePole.coordinates.y };
        }
      }
      let branches2 = scheme.branches.filter(x => x.number2 == select.number);
      for (let i = 0; i < branches2.length; i++) {
        if (branches2[i].image.pole2.nodePole) {
          branches2[i].image.line.setAttribute("x2", branches2[i].image.pole2.nodePole.coordinates.x);
          branches2[i].image.line.setAttribute("y2", branches2[i].image.pole2.nodePole.coordinates.y);
          branches2[i].image.pole2.circle.setAttribute("cx", branches2[i].image.pole2.nodePole.coordinates.x);
          branches2[i].image.pole2.circle.setAttribute("cy", branches2[i].image.pole2.nodePole.coordinates.y);
          branches2[i].image.pole2.coordinates = { "x": branches2[i].image.pole2.nodePole.coordinates.x, "y": branches2[i].image.pole2.nodePole.coordinates.y };
        }
      }
    }
    else if (selectBranchCP && point) {



      selectBranchCP.coordinates.x += cursor.x - point.x;
      selectBranchCP.coordinates.y += cursor.y - point.y;

      let branch1 = scheme.branches.find(x => x.image.pole1 == selectBranchCP);
      if (branch1) {
        branch1.image.line.setAttribute("x1", selectBranchCP.coordinates.x);
        branch1.image.line.setAttribute("y1", selectBranchCP.coordinates.y);
      }
      let branch2 = scheme.branches.find(x => x.image.pole2 == selectBranchCP);
      if (branch2) {
        branch2.image.line.setAttribute("x2", selectBranchCP.coordinates.x);
        branch2.image.line.setAttribute("y2", selectBranchCP.coordinates.y);
      }

      selectBranchCP.circle.setAttribute("cx", selectBranchCP.coordinates.x);
      selectBranchCP.circle.setAttribute("cy", selectBranchCP.coordinates.y);





      const hitRadiusNode = 200;
      let nodeLogic = scheme.nodes.filter(x => x.image.cp.find(cp => Math.abs(cp.coordinates.x - selectBranchCP.coordinates.x) < hitRadiusNode && Math.abs(cp.coordinates.y - selectBranchCP.coordinates.y) < hitRadiusNode));
      nodeLogic1 = nodeLogic;
      for (let j = 0; j < nodeLogic.length; j++) {
        selectNode = nodeLogic;
        for (let i = 0; i < nodeLogic[j].image.cp.length; i++) {
          nodeLogic[j].image.cp[i].circle.setAttribute("opacity", 1);
          nodeLogic[j].animateOut = 0;
          if (nodeLogic[j].animateIn < 1) {
            animate({
              duration: 150,
              timing: funcIn1,
              draw: function (progress) {
                nodeLogic[j].image.cp[i].circle.setAttribute("r", progress);
              },
              callback: function () { }
            });

          }
        }
        nodeLogic[j].animateIn = 1;
      }
      if (nodeLogic.length === 0) {
        for (let j = 0; j < scheme.nodes.length; j++) {
          for (let i = 0; i < scheme.nodes[j].image.cp.length; i++) {
            scheme.nodes[j].animateIn = 0;
            if (scheme.nodes[j].animateOut < 1) {
              animate({
                duration: 200,
                timing: funcOut1,
                draw: function (progress) {
                  scheme.nodes[j].image.cp[i].circle.setAttribute("r", progress);
                },
                callback: function () {
                  scheme.nodes[j].image.cp[i].circle.setAttribute("opacity", 0);
                }
              });

            }
          }
          scheme.nodes[j].animateOut = 1;
        }
      }
      let node = scheme.nodes.find(x => x.image.cp.find(cp => Math.abs(cp.coordinates.x - selectBranchCP.coordinates.x) < 20 && Math.abs(cp.coordinates.y - selectBranchCP.coordinates.y) < 20));
      if (node) {

        selectNodeCP = node.image.cp.find(cp => Math.abs(cp.coordinates.x - selectBranchCP.coordinates.x) < 20 && Math.abs(cp.coordinates.y - selectBranchCP.coordinates.y) < 20);
        selectBranchCP.circle.setAttribute("fill", "lime");
        selectBranchCP.circle.setAttribute("filter", "url(#f1)");
        aBranch = selectBranchCP;
        let currentNode = selectNodeCP;
        currentNode.animateOut = 0;
        if (currentNode.animateIn < 1) {
          animate({
            duration: 150,
            timing: funcIn,
            draw: function (progress) {
              aBranch.circle.setAttribute("r", progress);
              currentNode.circle.setAttribute("r", progress);
            },
            callback: function () {
              if (!selectNodeCP) {
                currentNode.circle.setAttribute("r", radius);
                aBranch.circle.setAttribute("r", radius);
              }
            }
          });
          currentNode.animateIn = 1;
        }
      } else {
        let currentNode = selectNodeCP;
        if (currentNode) {
          currentNode.animateIn = 0;
          if (currentNode.animateOut < 1) {
            animate({
              duration: 200,
              timing: funcOut,
              draw: function (progress) {
                if (aBranch) {
                  aBranch.circle.setAttribute("r", progress);
                }
                currentNode.circle.setAttribute("r", progress);
              },
              callback: function () { }
            });
            currentNode.animateOut = 1;
          }
        }

        selectNodeCP = null;
        selectBranchCP.circle.setAttribute("fill", "red");
        selectBranchCP.nodePole = null;

      }


    }
    point = { "x": cursor.x, "y": cursor.y };
  }


  window.addEventListener('mousemove', (e) => {
    MoveNode({ "x": e.clientX, "y": e.clientY });
  })
  window.addEventListener('mouseup', () => {

    if (nodeLogic1) {
      for (let j = 0; j < scheme.nodes.length; j++) {
        for (let i = 0; i < scheme.nodes[j].image.cp.length; i++) {
          scheme.nodes[j].animateIn = 0;
          if (scheme.nodes[j].animateOut < 1) {
            animate({
              duration: 200,
              timing: funcOut1,
              draw: function (progress) {
                scheme.nodes[j].image.cp[i].circle.setAttribute("r", progress);
              },
              callback: function () {
                scheme.nodes[j].image.cp[i].circle.setAttribute("opacity", 0);
              }
            });

          }
        }
        scheme.nodes[j].animateOut = 1;
      }
    }


    if (selectNodeCP && selectBranchCP) {
      selectBranchCP.nodePole = selectNodeCP;
      test = selectBranchCP;
      test2 = selectNodeCP;



      selectBranchCP.circle.setAttribute("cx", selectNodeCP.coordinates.x);
      selectBranchCP.circle.setAttribute("cy", selectNodeCP.coordinates.y);
      let branch1 = scheme.branches.find(x => x.image.pole1 == selectBranchCP);
      let numBus = scheme.nodes.find(x => x.image.cp.find(cp => cp == selectNodeCP)).number;
      if (branch1) {
        branch1.image.line.setAttribute("x1", branch1.image.pole1.nodePole.coordinates.x);
        branch1.image.line.setAttribute("y1", branch1.image.pole1.nodePole.coordinates.y);
        branch1.number1 = numBus;
        console.log(numBus);
      }
      let branch2 = scheme.branches.find(x => x.image.pole2 == selectBranchCP);
      if (branch2) {
        branch2.image.line.setAttribute("x2", branch2.image.pole2.nodePole.coordinates.x);
        branch2.image.line.setAttribute("y2", branch2.image.pole2.nodePole.coordinates.y);
        branch2.number2 = numBus;
      }
      selectBranchCP.circle.setAttribute("fill", cpNodeColor);
      selectBranchCP.circle.setAttribute("r", radius);
      selectNodeCP.circle.setAttribute("r", radius);
      selectBranchCP.circle.removeAttribute("filter");
    }
    selectNodeCP = null;
    select = null;
    selectBranchCP = null;
  })




  function animate({ duration, timing, draw, callback }) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);

      draw(progress); // отрисовать её

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
      if (timeFraction === 1) {
        callback();
      }
    });

  }

  scheme.nodes.map(x => {
    x.image.line.addEventListener('mousedown', (e) => {
      select = scheme.nodes.find(x => x.image.line == e.target);
    })
  })

  scheme.branches.map(x => {
    x.image.pole1.circle.addEventListener('mousedown', (e) => {
      selectBranchCP = scheme.branches.find(x => x.image.pole1.circle == e.target).image.pole1;

    })
    x.image.pole2.circle.addEventListener('mousedown', (e) => {
      selectBranchCP = scheme.branches.find(x => x.image.pole2.circle == e.target).image.pole2;
    })
  })


  function DrawBranch(branch) {
    node1 = scheme.nodes.find(x => x.number == branch.number1);
    node2 = scheme.nodes.find(x => x.number == branch.number2);

    branch.image.pole1.nodePole = node1.image.cp[2];
    branch.image.pole2.nodePole = node2.image.cp[2];

    branch.image.pole1.coordinates = { "x": node1.image.cp[2].coordinates.x, "y": node1.image.cp[2].coordinates.y };
    branch.image.pole2.coordinates = { "x": node2.image.cp[2].coordinates.x, "y": node2.image.cp[2].coordinates.y };


    let line = DrawLine(branch.image.pole1.coordinates, branch.image.pole2.coordinates, 4, "red");
    branch.image.line = line;

    let circle1 = DrawCircle(node1.coordinates, 8, 0, cpNodeColor, cpNodeColor);
    let circle2 = DrawCircle(node2.coordinates, 8, 0, cpNodeColor, cpNodeColor);
    branch.image.pole1.coordinates = { "x": node1.coordinates.x, "y": node1.coordinates.y };
    branch.image.pole2.coordinates = { "x": node2.coordinates.x, "y": node2.coordinates.y };
    branch.image.pole1.circle = circle1;
    branch.image.pole2.circle = circle2;
  }












  function DrawLine(point1, point2, sw, s) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", point1.x);
    line.setAttribute("y1", point1.y);
    line.setAttribute("x2", point2.x);
    line.setAttribute("y2", point2.y);
    line.setAttribute("stroke-width", sw);
    line.setAttribute("stroke", s);
    svg.append(line);
    return line;
  }

  function DrawCircle(point, radius, sw, s, fill) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", point.x);
    circle.setAttribute("cy", point.y);
    circle.setAttribute("r", radius);
    circle.setAttribute("stroke", s);
    circle.setAttribute("stroke-width", sw);
    circle.setAttribute("fill", fill);
    svg.append(circle);
    return circle;
  }

  function DrawText(point, content, size, fill) {
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("fill", fill);
    text.setAttribute("font-size", `${size}px`);
    text.setAttribute("font-family", "Verdana");
    text.setAttribute("x", point.x);
    text.setAttribute("y", point.y);
    text.textContent = content;
    svg.append(text);
    return text;
  }






















});
