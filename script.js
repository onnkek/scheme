window.addEventListener("DOMContentLoaded", () => {
	const svg = document.getElementById("svg");

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
	const radius = 8;
	const nodeWidth = 300;
	const nodeHeight = 30;
	const cpWidth = 50;
	const nodeColor = "darkred";
	const cpNodeColor = "white";
	const stepOfGrid = 10;

	scheme.nodes.map((x) => {
		DrawNode(x);
	});
	scheme.branches.map((x) => {
		DrawBranch(x);
	});

	let select = null;
	let selectBranchCP = null;
	let selectBranch = null;
	let point = null;
	let selectNodeCP = null;
	let aBranch = null;
	let nodeLogic1 = null;
	let branchEditPoints = [];
	let selectEditBranch = null;
	let funcLine1 = null;
	let funcLine2 = null;
	let contextMenu = null;
	let selectBranchPoint = 0;

	function DrawNode(node) {
		//node.coordinates.x = Math.random() * (svg.clientWidth - radius);
		//node.coordinates.y = Math.random() * (svg.clientHeight - radius);

		let p1 = { x: node.coordinates.x - nodeWidth / 2, y: node.coordinates.y };
		let p2 = { x: node.coordinates.x + nodeWidth / 2, y: node.coordinates.y };
		let pText = {
			x: node.coordinates.x - nodeWidth / 2 - 20,
			y: node.coordinates.y + 7,
		};
		let line = DrawLine(p1, p2, nodeHeight, nodeColor);
		node.image.line = line;

		let text = DrawText(pText, node.number, 20, "white");
		node.image.text = text;
		for (let i = 0; i < nodeWidth / cpWidth - 1; i++) {
			let p = {
				x: node.coordinates.x - nodeWidth / 2 + (i + 1) * cpWidth,
				y: node.coordinates.y,
			};
			let circle = DrawCircle(p, radius, 0, "lime", "lime");
			circle.setAttribute("filter", "url(#f1)");
			node.image.cp[i].circle = circle;
			// push({
			// 	coordinates: p,
			// 	circle: circle,
			// 	animateIn: 0,
			// 	animateOut: 1,
			// });
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
		if (selectEditBranch) {
			let ind = selectBranch.image.list.indexOf(selectEditBranch);

			let newPoint = {
				x: Math.round((selectEditBranch.coordinates.x += cursor.x - point.x) / stepOfGrid) * stepOfGrid,
				y: Math.round((selectEditBranch.coordinates.y += cursor.y - point.y) / stepOfGrid) * stepOfGrid,
			};
			funcLine1.setAttribute("x1", newPoint.x);
			funcLine1.setAttribute("y1", newPoint.y);
			funcLine2.setAttribute("x1", newPoint.x);
			funcLine2.setAttribute("y1", newPoint.y);

			branchEditPoints[ind * 3 - 3 + 2].setAttribute("x", newPoint.x + 2 - 5);
			branchEditPoints[ind * 3 - 3 + 2].setAttribute("y", newPoint.y + 2 - 5);
			branchEditPoints[ind * 3 - 3 + 1].setAttribute("x", newPoint.x + 1 - 5);
			branchEditPoints[ind * 3 - 3 + 1].setAttribute("y", newPoint.y + 1 - 5);
			branchEditPoints[ind * 3 - 3 + 0].setAttribute("x", newPoint.x - 5);
			branchEditPoints[ind * 3 - 3 + 0].setAttribute("y", newPoint.y - 5);

		}

		if (select && point) {


			select.coordinates.x = select.coordinates.x + cursor.x - point.x;
			select.coordinates.y = select.coordinates.y + cursor.y - point.y;


			let p1 = {
				x: Math.round((select.coordinates.x - nodeWidth / 2) / stepOfGrid) * stepOfGrid,
				y: Math.round((select.coordinates.y) / stepOfGrid) * stepOfGrid,
			};
			let p2 = {
				x: Math.round((select.coordinates.x + nodeWidth / 2) / stepOfGrid) * stepOfGrid,
				y: Math.round((select.coordinates.y) / stepOfGrid) * stepOfGrid,
			};
			select.image.line.setAttribute("x1", p1.x);
			select.image.line.setAttribute("y1", p1.y);
			select.image.line.setAttribute("x2", p2.x);
			select.image.line.setAttribute("y2", p2.y);

			let pText = {
				x: p1.x - 20,
				y: p1.y + 6,
			};
			select.image.text.setAttribute("x", pText.x);
			select.image.text.setAttribute("y", pText.y);

			for (let i = 0; i < select.image.cp.length; i++) {
				let pCircle = {
					x: Math.round((select.coordinates.x - nodeWidth / 2 + (i + 1) * cpWidth) / stepOfGrid) * stepOfGrid,
					y: Math.round((select.coordinates.y) / stepOfGrid) * stepOfGrid,
				};
				select.image.cp[i].circle.setAttribute("cx", pCircle.x);
				select.image.cp[i].circle.setAttribute("cy", pCircle.y);
				select.image.cp[i].coordinates = pCircle;
			}

			let branches1 = scheme.branches.filter((x) => x.number1 == select.number);
			for (let i = 0; i < branches1.length; i++) {
				if (branches1[i].image.pole1.nodePole) {
					let points = "";
					branches1[i].image.list[0].coordinates.x = branches1[i].image.pole1.nodePole.coordinates.x;
					branches1[i].image.list[0].coordinates.y = branches1[i].image.pole1.nodePole.coordinates.y;
					for (let l = 0; l < branches1[i].image.list.length; l++) {
						points += `${branches1[i].image.list[l].coordinates.x},${branches1[i].image.list[l].coordinates.y} `;
					}
					branches1[i].image.line.setAttribute("points", points);

					branches1[i].image.pole1.circle.setAttribute("cx", branches1[i].image.pole1.nodePole.coordinates.x);
					branches1[i].image.pole1.circle.setAttribute("cy", branches1[i].image.pole1.nodePole.coordinates.y);
					branches1[i].image.pole1.coordinates = {
						x: branches1[i].image.pole1.nodePole.coordinates.x,
						y: branches1[i].image.pole1.nodePole.coordinates.y,
					};
				}
			}
			let branches2 = scheme.branches.filter((x) => x.number2 == select.number);
			for (let i = 0; i < branches2.length; i++) {
				if (branches2[i].image.pole2.nodePole) {
					let points = "";
					branches2[i].image.list[branches2[i].image.list.length - 1].coordinates.x = branches2[i].image.pole2.nodePole.coordinates.x;
					branches2[i].image.list[branches2[i].image.list.length - 1].coordinates.y = branches2[i].image.pole2.nodePole.coordinates.y;
					for (let l = 0; l < branches2[i].image.list.length; l++) {
						points += `${branches2[i].image.list[l].coordinates.x},${branches2[i].image.list[l].coordinates.y} `;
					}
					branches2[i].image.line.setAttribute("points", points);

					branches2[i].image.pole2.circle.setAttribute("cx", branches2[i].image.pole2.nodePole.coordinates.x);
					branches2[i].image.pole2.circle.setAttribute("cy", branches2[i].image.pole2.nodePole.coordinates.y);
					branches2[i].image.pole2.coordinates = {
						x: branches2[i].image.pole2.nodePole.coordinates.x,
						y: branches2[i].image.pole2.nodePole.coordinates.y,
					};
				}
			}
		} else if (selectBranchCP && point) {
			selectBranchCP.coordinates.x += cursor.x - point.x;
			selectBranchCP.coordinates.y += cursor.y - point.y;

			let branch1 = scheme.branches.find((x) => x.image.pole1 == selectBranchCP);
			if (branch1) {
				let points = "";
				branch1.image.list[0].coordinates.x = selectBranchCP.coordinates.x;
				branch1.image.list[0].coordinates.y = selectBranchCP.coordinates.y;
				for (let l = 0; l < branch1.image.list.length; l++) {
					points += `${branch1.image.list[l].coordinates.x},${branch1.image.list[l].coordinates.y} `;
				}
				branch1.image.line.setAttribute("points", points);
			}

			let branch2 = scheme.branches.find((x) => x.image.pole2 == selectBranchCP);
			if (branch2) {
				let points = "";
				branch2.image.list[branch2.image.list.length - 1].coordinates.x = selectBranchCP.coordinates.x;
				branch2.image.list[branch2.image.list.length - 1].coordinates.y = selectBranchCP.coordinates.y;
				for (let l = 0; l < branch2.image.list.length; l++) {
					points += `${branch2.image.list[l].coordinates.x},${branch2.image.list[l].coordinates.y} `;
				}
				branch2.image.line.setAttribute("points", points);
			}

			selectBranchCP.circle.setAttribute("cx", selectBranchCP.coordinates.x);
			selectBranchCP.circle.setAttribute("cy", selectBranchCP.coordinates.y);

			const hitRadiusNode = 200;
			let nodeLogic = scheme.nodes.filter((x) => x.image.cp.find((cp) => Math.abs(cp.coordinates.x - selectBranchCP.coordinates.x) < hitRadiusNode && Math.abs(cp.coordinates.y - selectBranchCP.coordinates.y) < hitRadiusNode));
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
							callback: function () { },
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
								},
							});
						}
					}
					scheme.nodes[j].animateOut = 1;
				}
			}
			let node = scheme.nodes.find((x) => x.image.cp.find((cp) => Math.abs(cp.coordinates.x - selectBranchCP.coordinates.x) < 20 && Math.abs(cp.coordinates.y - selectBranchCP.coordinates.y) < 20));
			if (node) {
				selectNodeCP = node.image.cp.find((cp) => Math.abs(cp.coordinates.x - selectBranchCP.coordinates.x) < 20 && Math.abs(cp.coordinates.y - selectBranchCP.coordinates.y) < 20);
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
						},
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
							callback: function () { },
						});
						currentNode.animateOut = 1;
					}
				}

				selectNodeCP = null;
				selectBranchCP.circle.setAttribute("fill", "red");
				selectBranchCP.nodePole = null;
			}
		}
		point = { x: cursor.x, y: cursor.y };
	}

	window.addEventListener("mousemove", (e) => {
		MoveNode({ x: e.clientX, y: e.clientY });
	});
	window.addEventListener("mouseup", () => {
		if (selectEditBranch) {
			selectEditBranch.coordinates.x = Number(funcLine1.getAttribute("x1"));
			selectEditBranch.coordinates.y = Number(funcLine1.getAttribute("y1"));
			funcLine1.remove();
			funcLine1 = null;
			funcLine2.remove();
			funcLine2 = null;

			let points = "";
			for (let l = 0; l < selectBranch.image.list.length; l++) {
				points += `${selectBranch.image.list[l].coordinates.x},${selectBranch.image.list[l].coordinates.y} `;
			}
			selectBranch.image.line.setAttribute("points", points.trim());

			selectEditBranch = null;
			selectBranchPoint = 0;
		}

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
							},
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
			let branch1 = scheme.branches.find((x) => x.image.pole1 == selectBranchCP);
			let numBus = scheme.nodes.find((x) => x.image.cp.find((cp) => cp == selectNodeCP)).number;
			if (branch1) {
				let points = "";
				branch1.image.list[0].coordinates.x = branch1.image.pole1.nodePole.coordinates.x;
				branch1.image.list[0].coordinates.y = branch1.image.pole1.nodePole.coordinates.y;
				for (let l = 0; l < branch1.image.list.length; l++) {
					points += `${branch1.image.list[l].coordinates.x},${branch1.image.list[l].coordinates.y} `;
				}
				branch1.image.line.setAttribute("points", points);

				branch1.number1 = numBus;
			}
			let branch2 = scheme.branches.find((x) => x.image.pole2 == selectBranchCP);
			if (branch2) {
				let points = "";
				branch2.image.list[branch2.image.list.length - 1].coordinates.x = branch2.image.pole2.nodePole.coordinates.x;
				branch2.image.list[branch2.image.list.length - 1].coordinates.y = branch2.image.pole2.nodePole.coordinates.y;
				for (let l = 0; l < branch2.image.list.length; l++) {
					points += `${branch2.image.list[l].coordinates.x},${branch2.image.list[l].coordinates.y} `;
				}
				branch2.image.line.setAttribute("points", points);
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
	});

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

	scheme.nodes.map((x) => {
		x.image.line.addEventListener("mousedown", (e) => {
			select = scheme.nodes.find((x) => x.image.line == e.target);
		});
	});

	scheme.branches.map((x) => {
		x.image.pole1.circle.addEventListener("mousedown", (e) => {
			selectBranchCP = scheme.branches.find((x) => x.image.pole1.circle == e.target).image.pole1;
		});
		x.image.pole2.circle.addEventListener("mousedown", (e) => {
			selectBranchCP = scheme.branches.find((x) => x.image.pole2.circle == e.target).image.pole2;
		});
	});
	var hitTestLine = function (cx, cy, r) {
		// https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter/275537#275537
		for (let i = 0; i < scheme.branches.length; i++) {
			for (let j = 0; j < scheme.branches[i].image.list.length - 1; j++) {
				let ax = scheme.branches[i].image.list[j].coordinates.x;
				let ay = scheme.branches[i].image.list[j].coordinates.y;
				let bx = scheme.branches[i].image.list[j + 1].coordinates.x;
				let by = scheme.branches[i].image.list[j + 1].coordinates.y;
				// put circle at the center to simplify calcs
				ax -= cx;
				ay -= cy;
				bx -= cx;
				by -= cy;
				a = Math.pow(bx - ax, 2) + Math.pow(by - ay, 2);
				b = 2 * (ax * (bx - ax) + ay * (by - ay));
				c = Math.pow(ax, 2) + Math.pow(ay, 2) - Math.pow(r, 2);

				// get discriminant
				disc = Math.pow(b, 2) - 4 * a * c;

				// check if discriminant has real values
				if (disc <= 0) continue;

				// find intersection points
				sqrtdisc = Math.sqrt(disc);
				t1 = (-b + sqrtdisc) / (2 * a);
				t2 = (-b - sqrtdisc) / (2 * a);
				if ((0 < t1 && t1 < 1) || (0 < t2 && t2 < 1)) return scheme.branches[i];
			}
		}
		return false;
	};
	svg.oncontextmenu = () => false;
	window.addEventListener("mousedown", (e) => {
		if (contextMenu && e.target != contextMenu) {
			contextMenu.remove();
			contextMenu = null;
		}
		if (selectBranch) {
			if (e.shiftKey && !contextMenu) {
				let d1 = [];

				for (let i = 0; i < selectBranch.image.list.length - 1; i++) {
					let x1 = selectBranch.image.list[i].coordinates.x;
					let y1 = selectBranch.image.list[i].coordinates.y;
					let x2 = selectBranch.image.list[i + 1].coordinates.x;
					let y2 = selectBranch.image.list[i + 1].coordinates.y;

					let len = Math.abs((y2 - y1) * e.clientX - (x2 - x1) * e.clientY + x2 * y1 - y2 * x1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));

					let da = Math.sqrt(Math.pow(x1 - e.clientX, 2) + Math.pow(y1 - e.clientY, 2));
					let db = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
					let dc = Math.sqrt(Math.pow(x2 - e.clientX, 2) + Math.pow(y2 - e.clientY, 2));
					let cos = Math.pow(da, 2) + Math.pow(db, 2) - Math.pow(dc, 2);
					if (cos <= 0) {
						len = da;
					}

					cos = Math.pow(dc, 2) + Math.pow(db, 2) - Math.pow(da, 2);
					if (cos <= 0) {
						len = dc;
					}

					d1.push({ d: len, index: i });
				}

				d1 = d1.sort((x1, x2) => x1["d"] - x2["d"]);

				selectBranch.image.list.splice(d1[0].index + 1, 0, {
					coordinates: { x: e.clientX, y: e.clientY },
				});

				let points = "";
				for (let l = 0; l < selectBranch.image.list.length; l++) {
					points += `${selectBranch.image.list[l].coordinates.x},${selectBranch.image.list[l].coordinates.y} `;
				}
				selectBranch.image.line.setAttribute("points", points.trim());

				let rect = DrawRectanle({ x: e.clientX - 5, y: e.clientY - 5 }, 10, 10, 0, "white", "white");
				branchEditPoints.push(rect);
				rect.setAttribute("filter", "url(#f1)");
				rect = DrawRectanle({ x: e.clientX - 4, y: e.clientY - 4 }, 8, 8, 0, "black", "black");
				branchEditPoints.push(rect);
				rect = DrawRectanle({ x: e.clientX - 3, y: e.clientY - 3 }, 6, 6, 0, "black", "white");
				branchEditPoints.push(rect);
			}


			for (let i = 1; i < selectBranch.image.list.length - 1; i++) {
				if (Math.pow(selectBranch.image.list[i].coordinates.x - e.clientX, 2) + Math.pow(selectBranch.image.list[i].coordinates.y - e.clientY, 2) < 50) {
					selectBranchPoint = 1;
					console.log(selectBranchPoint)
					if (e.button === 2 && !contextMenu) {
						let body = document.getElementById("body");
						contextMenu = document.createElement("div");
						contextMenu.oncontextmenu = () => false;
						contextMenu.style.cssText += `
                position: absolute;
                background-color: white;
                border: 1px solid white;
                top: ${e.clientY}px;
                left: ${e.clientX}px;
                border-radius: 5px;
                padding: 5px;
                font-family: sans-serif;
                font-size: 14px;
              `;
						contextMenu.append("Удалить точку");

						contextMenu.addEventListener("click", (e) => {
							for (let p = 0; p < branchEditPoints.length; p++) {
								branchEditPoints[p].remove();
							}
							branchEditPoints = [];

							selectBranch.image.list.splice(i, 1);
							for (let i = 1; i < selectBranch.image.list.length - 1; i++) {
								let rect = DrawRectanle(
									{
										x: selectBranch.image.list[i].coordinates.x - 5,
										y: selectBranch.image.list[i].coordinates.y - 5,
									}, 10, 10, 0, "white", "white"
								);
								branchEditPoints.push(rect);
								rect.setAttribute("filter", "url(#f1)");
								rect = DrawRectanle({
									x: selectBranch.image.list[i].coordinates.x - 4,
									y: selectBranch.image.list[i].coordinates.y - 4,
								}, 8, 8, 0, "black", "black"
								);
								branchEditPoints.push(rect);
								rect = DrawRectanle({
									x: selectBranch.image.list[i].coordinates.x - 3,
									y: selectBranch.image.list[i].coordinates.y - 3,
								}, 6, 6, 0, "black", "white");
								branchEditPoints.push(rect);
							}

							let points = "";
							for (let l = 0; l < selectBranch.image.list.length; l++) {
								points += `${selectBranch.image.list[l].coordinates.x},${selectBranch.image.list[l].coordinates.y} `;
							}
							selectBranch.image.line.setAttribute("points", points.trim());


							contextMenu.remove();
							contextMenu = null;
							selectBranchPoint = 0;
						});

						body.prepend(contextMenu);
					} else {
						selectEditBranch = selectBranch.image.list[i];

						if (funcLine1 || funcLine2) {
							funcLine1.remove();
							funcLine1 = null;
							funcLine2.remove();
							funcLine2 = null;
						}
						funcLine1 = DrawLine(selectBranch.image.list[i].coordinates, selectBranch.image.list[i + 1].coordinates, 2, "red");
						funcLine2 = DrawLine(selectBranch.image.list[i].coordinates, selectBranch.image.list[i - 1].coordinates, 2, "red");
					}
				}
			}

			if (!contextMenu && e.button == 0) {
				for (let i = 0; i < branchEditPoints.length; i++) {
					branchEditPoints[i].remove();
				}
				branchEditPoints = [];
				selectBranch.image.line.setAttribute("stroke", "red");
				if (!selectBranchPoint) {
					selectBranch = hitTestLine(e.clientX, e.clientY, 10);
					console.log("RRRRR")
				}

				if (selectBranch) {
					selectBranch.image.line.setAttribute("stroke", "magenta");
					for (let i = 1; i < selectBranch.image.list.length - 1; i++) {
						let rect = DrawRectanle({
							x: selectBranch.image.list[i].coordinates.x - 5,
							y: selectBranch.image.list[i].coordinates.y - 5
						},
							10, 10, 0, "white", "white");
						branchEditPoints.push(rect);
						rect.setAttribute("filter", "url(#f1)");
						rect = DrawRectanle({
							x: selectBranch.image.list[i].coordinates.x - 4,
							y: selectBranch.image.list[i].coordinates.y - 4,
						}, 8, 8, 0, "black", "black");
						branchEditPoints.push(rect);
						rect = DrawRectanle({
							x: selectBranch.image.list[i].coordinates.x - 3,
							y: selectBranch.image.list[i].coordinates.y - 3,
						}, 6, 6, 0, "black", "white");
						branchEditPoints.push(rect);
					}
				}
			}
		} else {
			if (!selectBranch && e.button === 0 && !contextMenu) {
				selectBranch = hitTestLine(e.clientX, e.clientY, 10);
				if (selectBranch) {
					selectBranch.image.line.setAttribute("stroke", "magenta");
					for (let i = 1; i < selectBranch.image.list.length - 1; i++) {
						let rect = DrawRectanle({
							x: selectBranch.image.list[i].coordinates.x - 5,
							y: selectBranch.image.list[i].coordinates.y - 5,
						}, 10, 10, 0, "white", "white");
						branchEditPoints.push(rect);
						rect.setAttribute("filter", "url(#f1)");
						rect = DrawRectanle({
							x: selectBranch.image.list[i].coordinates.x - 4,
							y: selectBranch.image.list[i].coordinates.y - 4,
						}, 8, 8, 0, "black", "black");
						branchEditPoints.push(rect);
						rect = DrawRectanle({
							x: selectBranch.image.list[i].coordinates.x - 3,
							y: selectBranch.image.list[i].coordinates.y - 3,
						}, 6, 6, 0, "black", "white");
						branchEditPoints.push(rect);
					}
				}
			}
		}


	});

	function DrawBranch(branch) {
		node1 = scheme.nodes.find((x) => x.number == branch.number1);
		node2 = scheme.nodes.find((x) => x.number == branch.number2);

		branch.image.pole1.nodePole = node1.image.cp.find(x => x.coordinates.x === branch.image.list[0].coordinates.x && x.coordinates.y === branch.image.list[0].coordinates.y);
		branch.image.pole2.nodePole = node2.image.cp.find(x => x.coordinates.x == branch.image.list[branch.image.list.length - 1].coordinates.x && x.coordinates.y == branch.image.list[branch.image.list.length - 1].coordinates.y);



		branch.image.pole1.coordinates = {
			x: node1.image.cp[2].coordinates.x,
			y: node1.image.cp[2].coordinates.y,
		};
		branch.image.pole2.coordinates = {
			x: node2.image.cp[2].coordinates.x,
			y: node2.image.cp[2].coordinates.y,
		};

		let line = DrawPolyLine(branch.image.pole1.coordinates, branch.image.pole2.coordinates, 4, "red");

		let points = "";
		for (let l = 0; l < branch.image.list.length; l++) {
			points += `${branch.image.list[l].coordinates.x},${branch.image.list[l].coordinates.y} `;
		}
		branch.image.line = line;
		branch.image.line.setAttribute("points", points);




		//branch.image.list[0].x = branch.image.pole1.coordinates.x;
		//branch.image.list[0].y = branch.image.pole1.coordinates.y;

		//branch.image.listpush({
		// 	coordinates: {
		// 		x: branch.image.pole1.coordinates.x,
		// 		y: branch.image.pole1.coordinates.y,
		// 	},
		// });

		//branch.image.list[branch.image.list.length - 1].x = branch.image.pole2.coordinates.x;
		//branch.image.list[branch.image.list.length - 1].y = branch.image.pole2.coordinates.y;

		// branch.image.list.push({
		// 	coordinates: {
		// 		x: branch.image.pole2.coordinates.x,
		// 		y: branch.image.pole2.coordinates.y,
		// 	},
		// });

		let circle1 = DrawCircle(branch.image.list[0].coordinates, 8, 0, cpNodeColor, cpNodeColor);
		let circle2 = DrawCircle(branch.image.list[branch.image.list.length - 1].coordinates, 8, 0, cpNodeColor, cpNodeColor);
		branch.image.pole1.coordinates = {
			x: branch.image.pole1.nodePole.coordinates.x,
			y: branch.image.pole1.nodePole.coordinates.y,
		};
		branch.image.pole2.coordinates = {
			x: branch.image.pole2.nodePole.coordinates.x,
			y: branch.image.pole2.nodePole.coordinates.y,
		};
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

	function DrawPolyLine(point1, point2, sw, s) {
		var polyLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
		polyLine.setAttribute("points", `${point1.x},${point1.y} ${point2.x},${point2.y}`);
		polyLine.setAttribute("stroke-width", sw);
		polyLine.setAttribute("stroke", s);
		polyLine.setAttribute("fill", "none");
		svg.append(polyLine);
		return polyLine;
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

	function DrawRectanle(point, w, h, sw, s, fill) {
		var rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectangle.setAttribute("x", point.x);
		rectangle.setAttribute("y", point.y);
		rectangle.setAttribute("width", w);
		rectangle.setAttribute("height", h);
		rectangle.setAttribute("stroke", s);
		rectangle.setAttribute("stroke-width", sw);
		rectangle.setAttribute("fill", fill);
		svg.append(rectangle);
		return rectangle;
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