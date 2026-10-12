// @ts-nocheck
const mockBarChartData = [
  {
    "id": "bar-data-quality-has-MetricOne",
    "title": "MetricOne values",
    "description": "",
    "type": "bar",
    "data": {
      "details": {
        "meta": [],
        "headlines": [
          {
            "label": "Total has metricone",
            "value": 339
          }
        ]
      },
      "tables": [
        {
          "head": [
            {
              "text": "Establishment ID"
            },
            {
              "text": "Has MetricOne"
            },
            {
              "text": "No MetricOne"
            }
          ],
          "rows": [
            [
              {
                "text": "ABC"
              },
              {
                "text": 22
              },
              {
                "text": 47
              }
            ],
            [
              {
                "text": "ABC"
              },
              {
                "text": 87
              },
              {
                "text": 64
              }
            ],
            [
              {
                "text": "ABC"
              },
              {
                "text": 62
              },
              {
                "text": 65
              }
            ],
            [
              {
                "text": "ABC"
              },
              {
                "text": 31
              },
              {
                "text": 86
              }
            ],
            [
              {
                "text": "ABC"
              },
              {
                "text": 57
              },
              {
                "text": 27
              }
            ],
            [
              {
                "text": "ABC"
              },
              {
                "text": 80
              },
              {
                "text": 63
              }
            ]
          ]
        }
      ],
      "chart": {
        "type": "bar",
        "options": {
          "height": 5,
          "timeseries": false
        },
        "data": {
          "labels": [
            "Has MetricOne",
            "No MetricOne"
          ],
          "datasets": [
            {
              "label": "ABC",
              "data": [
                22,
                47
              ],
              "total": 69,
              "backgroundColor": "#5694ca",
              "borderColor": "#5694ca",
              "borderWidth": [
                0,
                0
              ],
              "datalabels": {
                "align": "center",
                "anchor": "bottom"
              }
            },
            {
              "label": "ABC",
              "data": [
                87,
                64
              ],
              "total": 151,
              "backgroundColor": "#912b88",
              "borderColor": "#912b88",
              "borderWidth": [
                0,
                0
              ],
              "datalabels": {
                "align": "center",
                "anchor": "bottom"
              }
            },
            {
              "label": "ABC",
              "data": [
                62,
                65
              ],
              "total": 127,
              "backgroundColor": "#00703c",
              "borderColor": "#00703c",
              "borderWidth": [
                0,
                0
              ],
              "datalabels": {
                "align": "center",
                "anchor": "bottom"
              }
            },
            {
              "label": "ABC",
              "data": [
                31,
                86
              ],
              "total": 117,
              "backgroundColor": "#003078",
              "borderColor": "#003078",
              "borderWidth": [
                0,
                0
              ],
              "datalabels": {
                "align": "center",
                "anchor": "bottom"
              }
            },
            {
              "label": "ABC",
              "data": [
                57,
                27
              ],
              "total": 84,
              "backgroundColor": "#f47738",
              "borderColor": "#f47738",
              "borderWidth": [
                0,
                0
              ],
              "datalabels": {
                "align": "center",
                "anchor": "bottom"
              }
            },
            {
              "label": "ABC",
              "data": [
                80,
                63
              ],
              "total": 143,
              "backgroundColor": "#28a197",
              "borderColor": "#28a197",
              "borderWidth": [
                0,
                0
              ],
              "datalabels": {
                "align": "center",
                "anchor": "bottom"
              }
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

module.exports = mockBarChartData
