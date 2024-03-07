export const config = {
	"elements": {
		"nodeHeight": 30,
		"switchSize": 40,
		"switchStrokeWidth": 4,
		"branchStrokeWidth": 5,
		"transformer": {
			"radius": 30,
			"offset": 18,
			"strokeWidth": 5
		},
		"generation": {
			"radius": 35,
			"strokeWidth": 4,
			"path": [
				{
					"type": "M",
					"x": "-22",
					"y": "5"
				},
				{
					"type": "C",
					"x": "-15",
					"y": "-15"
				},
				{
					"type": "",
					"x": "-2",
					"y": "-2"
				},
				{
					"type": "",
					"x": "0",
					"y": "0"
				},
				{
					"type": "S",
					"x": "15",
					"y": "15"
				},
				{
					"type": "",
					"x": "22",
					"y": "-5"
				}
			]
		},
		"load": {
			"widthArrow": 40,
			"heightArrow": 20,
			"height": 50,
			"strokeWidth": 4
		}
	},
	"editor": {
		"selectControlPadding": 8,
		"selectControlLength": 12,
		"controls": {
			"pointControl": {
				"radius": 4
			},
			"squareControl": {
				"size1": 6,
				"size2": 8,
				"size3": 10
			}
		}
	},
	"colors": {
		"voltageLevel": {
			"500": "#b80000",
			"220": "#cccc00",
			"110": "#4699cc",
			"default": "gray"
		}
	}
}