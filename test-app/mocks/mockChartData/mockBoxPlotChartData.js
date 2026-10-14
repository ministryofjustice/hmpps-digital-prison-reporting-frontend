// @ts-nocheck
const mockBoxPlotChartData = [
  {
    "id": "box-plot-wide-1",
    "title": "Box plot example 1",
    "description": "Example of a box plot chart",
    "type": "boxplot",
    "data": {
      "details": {
        "meta": [],
        "headlines": []
      },
      "tables": [
        {
          "head": [
            {
              "text": "Category"
            },
            {
              "text": "Dataset"
            },
            {
              "text": "Min"
            },
            {
              "text": "Q1"
            },
            {
              "text": "Median"
            },
            {
              "text": "Mean"
            },
            {
              "text": "Q3"
            },
            {
              "text": "Max"
            }
          ],
          "rows": [
            [
              {
                "text": "Category 1"
              },
              {
                "text": "Box plot example 1"
              },
              {
                "text": "9"
              },
              {
                "text": "20.25"
              },
              {
                "text": "42.5"
              },
              {
                "text": "44.083333333333336"
              },
              {
                "text": "64"
              },
              {
                "text": "91"
              }
            ],
            [
              {
                "text": "Category 2"
              },
              {
                "text": "Box plot example 1"
              },
              {
                "text": "8"
              },
              {
                "text": "26"
              },
              {
                "text": "56"
              },
              {
                "text": "52.36363636363637"
              },
              {
                "text": "73"
              },
              {
                "text": "97"
              }
            ],
            [
              {
                "text": "Category 3"
              },
              {
                "text": "Box plot example 1"
              },
              {
                "text": "0"
              },
              {
                "text": "25"
              },
              {
                "text": "40.5"
              },
              {
                "text": "45.083333333333336"
              },
              {
                "text": "65.25"
              },
              {
                "text": "92"
              }
            ],
            [
              {
                "text": "Category 4"
              },
              {
                "text": "Box plot example 1"
              },
              {
                "text": "6"
              },
              {
                "text": "18.5"
              },
              {
                "text": "47"
              },
              {
                "text": "44.63636363636363"
              },
              {
                "text": "63.5"
              },
              {
                "text": "96"
              }
            ]
          ]
        },
        {
          "head": [
            {
              "text": "Category 1"
            },
            {
              "text": "Category 2"
            },
            {
              "text": "Category 3"
            },
            {
              "text": "Category 4"
            }
          ],
          "rows": [
            [
              {
                "text": 14
              },
              {},
              {
                "text": 37
              },
              {
                "text": 65
              }
            ],
            [
              {
                "text": 91
              },
              {
                "text": 23
              },
              {
                "text": null
              },
              {
                "text": 11
              }
            ],
            [
              {
                "text": 46
              },
              {
                "text": 75
              },
              {
                "text": 19
              },
              {}
            ],
            [
              {
                "text": 32
              },
              {
                "text": 97
              },
              {
                "text": 44
              },
              {
                "text": 53
              }
            ],
            [
              {
                "text": 67
              },
              {
                "text": 29
              },
              {
                "text": 83
              },
              {
                "text": 12
              }
            ],
            [
              {
                "text": 74
              },
              {
                "text": 8
              },
              {
                "text": 61
              },
              {
                "text": 34
              }
            ],
            [
              {
                "text": 21
              },
              {
                "text": 56
              },
              {
                "text": 92
              },
              {
                "text": 47
              }
            ],
            [
              {
                "text": 39
              },
              {
                "text": 68
              },
              {
                "text": 15
              },
              {
                "text": 80
              }
            ],
            [
              {
                "text": 63
              },
              {
                "text": 17
              },
              {
                "text": 78
              },
              {
                "text": 25
              }
            ],
            [
              {
                "text": 55
              },
              {
                "text": 43
              },
              {
                "text": 27
              },
              {
                "text": 96
              }
            ],
            [
              {
                "text": 9
              },
              {
                "text": 71
              },
              {
                "text": 35
              },
              {
                "text": 62
              }
            ],
            [
              {
                "text": 18
              },
              {
                "text": 89
              },
              {
                "text": 50
              },
              {
                "text": 6
              }
            ]
          ]
        }
      ],
      "chart": {
        "type": "boxplot",
        "options": {
          "height": 5
        },
        "data": {
          "labels": [
            "Category 1",
            "Category 2",
            "Category 3",
            "Category 4"
          ],
          "datasets": [
            {
              "label": "Box plot example 1",
              "data": [
                [
                  14,
                  91,
                  46,
                  32,
                  67,
                  74,
                  21,
                  39,
                  63,
                  55,
                  9,
                  18
                ],
                [
                  23,
                  75,
                  97,
                  29,
                  8,
                  56,
                  68,
                  17,
                  43,
                  71,
                  89
                ],
                [
                  37,
                  0,
                  19,
                  44,
                  83,
                  61,
                  92,
                  15,
                  78,
                  27,
                  35,
                  50
                ],
                [
                  65,
                  11,
                  53,
                  12,
                  34,
                  47,
                  80,
                  25,
                  96,
                  62,
                  6
                ]
              ],
              "backgroundColor": "#5694ca80",
              "borderColor": "#5694ca"
            }
          ],
          "config": {
            "responsive": true,
            "maintainAspectRatio": false,
            "animation": {
              "duration": 0
            },
            "hover": {
              "animationDuration": 0
            },
            "plugins": {
              "legend": {
                "position": "bottom"
              },
              "tooltip": {
                "backgroundColor": "#FFF",
                "bodyColor": "#000",
                "titleFont": {
                  "size": 16
                },
                "bodyFont": {
                  "size": 16
                },
                "titleColor": "#000",
                "displayColors": false,
                "borderWidth": 1,
                "borderColor": "#b1b4b6",
                "cornerRadius": 0,
                "padding": 20,
                "footerFont": {
                  "weight": "bold"
                },
                "animation": {
                  "duration": 0
                }
              }
            },
            "scales": {
              "x": {},
              "y": {
                "title": {
                  "display": true,
                  "text": "Total"
                }
              }
            },
            "indexAxis": "x"
          }
        }
      }
    },
    "isEnabled": true
  }

]

module.exports = mockBoxPlotChartData
