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
			"strokeWidth": 5,
			"path": "M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
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