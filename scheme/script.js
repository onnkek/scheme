window.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("svg");
  


const scheme =  {
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
        "cp": []
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
        "cp": []
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
        "cp": []
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
        "cp": []
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
const radius = 10;
const nodeWidth = 300;
const nodeHeight = 30;
const cpWidth = 50;

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


function DrawNode(node) {
  node.coordinates.x = Math.random() * (svg.clientWidth - radius);
  node.coordinates.y = Math.random() * (svg.clientHeight - radius);

  let p1 = {"x": node.coordinates.x - nodeWidth / 2, "y": node.coordinates.y};
  let p2 = {"x": node.coordinates.x + nodeWidth / 2, "y": node.coordinates.y};
  let pText = {"x": node.coordinates.x - nodeWidth / 2 - 20, "y": node.coordinates.y + 7};
  let line = DrawLine(p1, p2, nodeHeight, "white");
  node.image.line = line;
  
  let text = DrawText(pText, node.number, 20, "white");
  node.image.text = text;
  for(let i = 0; i < nodeWidth / cpWidth - 1; i++) {
    let p = {"x": node.coordinates.x - nodeWidth / 2 + (i + 1) * cpWidth, "y": node.coordinates.y};
    let circle = DrawCircle(p, radius, 0, "green", "green");
    node.image.cp.push({ "coordinates": p, "circle": circle });
  }
}

function MoveNode(cursor) {
  if(select && point){

    select.coordinates.x += cursor.x - point.x;
    select.coordinates.y += cursor.y - point.y;

    let p1 = {"x": select.coordinates.x - nodeWidth / 2, "y": select.coordinates.y};
    let p2 = {"x": select.coordinates.x + nodeWidth / 2, "y": select.coordinates.y};
    select.image.line.setAttribute("x1", p1.x);
    select.image.line.setAttribute("y1", p1.y);
    select.image.line.setAttribute("x2", p2.x);
    select.image.line.setAttribute("y2", p2.y);


    let pText = {"x": select.coordinates.x - nodeWidth / 2 - 20, "y": select.coordinates.y + 7};
    select.image.text.setAttribute("x", pText.x);
    select.image.text.setAttribute("y", pText.y);

    for(let i = 0; i < select.image.cp.length; i++) {
      let pCircle = {"x": select.coordinates.x - nodeWidth / 2 + (i + 1) * cpWidth, "y": select.coordinates.y};
      select.image.cp[i].circle.setAttribute("cx", pCircle.x);
      select.image.cp[i].circle.setAttribute("cy", pCircle.y);
      select.image.cp[i].coordinates = pCircle;
    }
    
    let branches1 = scheme.branches.filter(x => x.number1 == select.number);
    for(let i = 0; i < branches1.length; i++){
      if(branches1[i].image.pole1.nodePole) {
        branches1[i].image.line.setAttribute("x1", branches1[i].image.pole1.nodePole.coordinates.x);
        branches1[i].image.line.setAttribute("y1", branches1[i].image.pole1.nodePole.coordinates.y);
        branches1[i].image.pole1.circle.setAttribute("cx", branches1[i].image.pole1.nodePole.coordinates.x);
        branches1[i].image.pole1.circle.setAttribute("cy", branches1[i].image.pole1.nodePole.coordinates.y);
        branches1[i].image.pole1.coordinates = { "x": branches1[i].image.pole1.nodePole.coordinates.x, "y": branches1[i].image.pole1.nodePole.coordinates.y};
      }
    }
    let branches2 = scheme.branches.filter(x => x.number2 == select.number);
    for(let i = 0; i < branches2.length; i++){
      if(branches2[i].image.pole2.nodePole ) {
        branches2[i].image.line.setAttribute("x2", branches2[i].image.pole2.nodePole.coordinates.x);
        branches2[i].image.line.setAttribute("y2", branches2[i].image.pole2.nodePole.coordinates.y);
        branches2[i].image.pole2.circle.setAttribute("cx", branches2[i].image.pole2.nodePole.coordinates.x);
        branches2[i].image.pole2.circle.setAttribute("cy", branches2[i].image.pole2.nodePole.coordinates.y);
        branches2[i].image.pole2.coordinates = { "x": branches2[i].image.pole2.nodePole.coordinates.x, "y": branches2[i].image.pole2.nodePole.coordinates.y};
      }
    }
  }
  else if(selectBranchCP && point){
    
    

    selectBranchCP.coordinates.x += cursor.x - point.x;
    selectBranchCP.coordinates.y += cursor.y - point.y;
   
    let branch1 = scheme.branches.find(x => x.image.pole1 == selectBranchCP);
    if(branch1) {
      branch1.image.line.setAttribute("x1", selectBranchCP.coordinates.x);
      branch1.image.line.setAttribute("y1", selectBranchCP.coordinates.y);
    }
    let branch2 = scheme.branches.find(x => x.image.pole2 == selectBranchCP);
    if(branch2) {
      branch2.image.line.setAttribute("x2", selectBranchCP.coordinates.x);
      branch2.image.line.setAttribute("y2", selectBranchCP.coordinates.y);
    }

    selectBranchCP.circle.setAttribute("cx", selectBranchCP.coordinates.x);
    selectBranchCP.circle.setAttribute("cy", selectBranchCP.coordinates.y);

    function back1(timeFraction) {
      return -20 * Math.pow(timeFraction, 2) + 26 * timeFraction + 6;
    }
    function back2(timeFraction) {
      return 18 * Math.pow(timeFraction, 2) - 22 * timeFraction + 12;
    }

    let node = scheme.nodes.find(x => x.image.cp.find(cp => Math.abs(cp.coordinates.x - selectBranchCP.coordinates.x) < 20 && Math.abs(cp.coordinates.y - selectBranchCP.coordinates.y) < 20));
    if(node) {
      selectNodeCP = node.image.cp.find(cp => Math.abs(cp.coordinates.x - selectBranchCP.coordinates.x) < 20 && Math.abs(cp.coordinates.y - selectBranchCP.coordinates.y) < 20);
      selectBranchCP.circle.setAttribute("fill", "blue");
      aBranch = selectBranchCP;
      aNode = selectNodeCP;
      aOut = 0;
      if(aIn < 1) {
        animate({
          duration: 150,
          timing: back1,
          draw: function(progress) {
            
            aBranch.circle.setAttribute("r", progress);
            aNode.circle.setAttribute("r", progress);
          },
          callback: function() {
            console.log("CALLBACK ВХОД");
          }
        });
        aIn = 1;
      }
    } else {
      aIn = 0;
      if(aOut < 1) {
        animate({
          duration: 200,
          timing: back2,
          draw: function(progress) {
            if(aBranch) {
              aBranch.circle.setAttribute("r", progress);
            }
            if(aNode) {
              aNode.circle.setAttribute("r", progress);
            }
            //console.log(timeFraction);
          },
          callback: function() {
            console.log("CALLBACK ВЫХОД");
          }
        });
        aOut = 1;
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
  
  if(selectNodeCP && selectBranchCP) {
    let sb = selectBranchCP;
    //selectBranchCP.coordinates = { "x": selectNodeCP.coordinates.x, "y": selectNodeCP.coordinates.y};
    selectBranchCP.nodePole = selectNodeCP;
    selectBranchCP.circle.setAttribute("cx", selectNodeCP.coordinates.x);
    selectBranchCP.circle.setAttribute("cy", selectNodeCP.coordinates.y);
    let branch1 = scheme.branches.find(x => x.image.pole1 == selectBranchCP);
    let numBus = scheme.nodes.find(x => x.image.cp.find(cp => cp == selectNodeCP)).number;
    if(branch1) {
      branch1.image.line.setAttribute("x1", branch1.image.pole1.nodePole.coordinates.x);
      branch1.image.line.setAttribute("y1", branch1.image.pole1.nodePole.coordinates.y);
      branch1.number1 = numBus;
      console.log(numBus);
    }
    let branch2 = scheme.branches.find(x => x.image.pole2 == selectBranchCP);
    if(branch2) {
      branch2.image.line.setAttribute("x2", branch2.image.pole2.nodePole.coordinates.x);
      branch2.image.line.setAttribute("y2", branch2.image.pole2.nodePole.coordinates.y);
      branch2.number2 = numBus;
      console.log(numBus);
    }
    selectBranchCP.circle.setAttribute("fill", "blue");

    
    // if(animationCount < 1) {
    //   animate({
    //     duration: 500,
    //     timing: bounceEaseOut,
    //     draw: function(progress) {
    //       sb.circle.setAttribute("r", progress * 10);
    //     }
    //   });
    //   animationCount = 1;
    //}
      
    

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
    if(timeFraction === 1)
    {
      callback();
    }
    //console.log(timeFraction)
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
    //animate(100, selectBranchCP.circle);
    
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

  let circle1 = DrawCircle(node1.coordinates, 10, 0, "blue", "blue");
  let circle2 = DrawCircle(node2.coordinates, 10, 0, "blue", "blue");
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
