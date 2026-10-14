// @ts-nocheck
const lineChartData = [
  [100, 130, 80, 60, 99, 50, 65, 100, 130, 80, 60, 99],
  [60, 70, 50, 40, 5, 20, 43, 60, 70, 50, 40, 5],
  [18, 50, 45, 90, 120, 59, 72, 110, 32, 28, 57, 45],
  [5, 32, 23, 40, 70, 32, 43, 60, 7, 12, 8, 21],
]

const mockLineChartData = [
  {
    "id": "line-data-quality",
    "title": "All metrics values",
    "description": "",
    "type": "line",
    "data": {
      "details": {
        "meta": [],
        "headlines": [
          {
            "label": "Total has metricone",
            "value": 215
          }
        ]
      },
      "tables": [
        {
          "head": [
            {
              "text": "Date"
            },
            {
              "text": "Establishment ID"
            },
            {
              "text": "Has MetricOne"
            },
            {
              "text": "No MetricOne"
            },
            {
              "text": "Has MetricThree"
            },
            {
              "text": "No MetricThree"
            },
            {
              "text": "Has MetricTwo"
            },
            {
              "text": "No MetricTwo"
            }
          ],
          "rows": [
            [
              {
                "text": "May 26"
              },
              {
                "text": "ABC"
              },
              {
                "text": 42
              },
              {
                "text": 26
              },
              {
                "text": 36
              },
              {
                "text": 5
              },
              {
                "text": 57
              },
              {
                "text": 83
              }
            ],
            [
              {
                "text": "Jun 26"
              },
              {
                "text": "ABC"
              },
              {
                "text": 75
              },
              {
                "text": 84
              },
              {
                "text": 90
              },
              {
                "text": 22
              },
              {
                "text": 77
              },
              {
                "text": 63
              }
            ],
            [
              {
                "text": "Jul 26"
              },
              {
                "text": "ABC"
              },
              {
                "text": 1
              },
              {
                "text": 57
              },
              {
                "text": 39
              },
              {
                "text": 51
              },
              {
                "text": 9
              },
              {
                "text": 80
              }
            ],
            [
              {
                "text": "Aug 26"
              },
              {
                "text": "ABC"
              },
              {
                "text": 9
              },
              {
                "text": 97
              },
              {
                "text": 4
              },
              {
                "text": 69
              },
              {
                "text": 31
              },
              {
                "text": 99
              }
            ],
            [
              {
                "text": "Sep 26"
              },
              {
                "text": "ABC"
              },
              {
                "text": 85
              },
              {
                "text": 62
              },
              {
                "text": 85
              },
              {
                "text": 31
              },
              {
                "text": 96
              },
              {
                "text": 71
              }
            ],
            [
              {
                "text": "Oct 26"
              },
              {
                "text": "ABC"
              },
              {
                "text": 3
              },
              {
                "text": 1
              },
              {
                "text": 96
              },
              {
                "text": 58
              },
              {
                "text": 22
              },
              {
                "text": 80
              }
            ]
          ]
        }
      ],
      "chart": {
        "type": "line",
        "options": {},
        "data": {
          "labels": [
            "Has MetricOne",
            "No MetricOne",
            "Has MetricThree",
            "No MetricThree",
            "Has MetricTwo",
            "No MetricTwo"
          ],
          "datasets": [
            {
              "label": "Date: May 26, Establishment ID: ABC",
              "data": [
                42,
                26,
                57,
                83,
                36,
                5
              ],
              "total": 249,
              "backgroundColor": "#5694ca",
              "borderColor": "#5694ca",
              "pointStyle": "circle",
              "pointRadius": 4,
              "pointHoverRadius": 10,
              "pointHitRadius": 20,
              "datalabels": {
                "display": false
              }
            },
            {
              "label": "Date: Jun 26, Establishment ID: ABC",
              "data": [
                75,
                84,
                77,
                63,
                90,
                22
              ],
              "total": 411,
              "backgroundColor": "#912b88",
              "borderColor": "#912b88",
              "pointStyle": "circle",
              "pointRadius": 4,
              "pointHoverRadius": 10,
              "pointHitRadius": 20,
              "datalabels": {
                "display": false
              }
            },
            {
              "label": "Date: Jul 26, Establishment ID: ABC",
              "data": [
                1,
                57,
                9,
                80,
                39,
                51
              ],
              "total": 237,
              "backgroundColor": "#00703c",
              "borderColor": "#00703c",
              "pointStyle": "circle",
              "pointRadius": 4,
              "pointHoverRadius": 10,
              "pointHitRadius": 20,
              "datalabels": {
                "display": false
              }
            },
            {
              "label": "Date: Aug 26, Establishment ID: ABC",
              "data": [
                9,
                97,
                31,
                99,
                4,
                69
              ],
              "total": 309,
              "backgroundColor": "#003078",
              "borderColor": "#003078",
              "pointStyle": "circle",
              "pointRadius": 4,
              "pointHoverRadius": 10,
              "pointHitRadius": 20,
              "datalabels": {
                "display": false
              }
            },
            {
              "label": "Date: Sep 26, Establishment ID: ABC",
              "data": [
                85,
                62,
                96,
                71,
                85,
                31
              ],
              "total": 430,
              "backgroundColor": "#f47738",
              "borderColor": "#f47738",
              "pointStyle": "circle",
              "pointRadius": 4,
              "pointHoverRadius": 10,
              "pointHitRadius": 20,
              "datalabels": {
                "display": false
              }
            },
            {
              "label": "Date: Oct 26, Establishment ID: ABC",
              "data": [
                3,
                1,
                22,
                80,
                96,
                58
              ],
              "total": 260,
              "backgroundColor": "#28a197",
              "borderColor": "#28a197",
              "pointStyle": "circle",
              "pointRadius": 4,
              "pointHoverRadius": 10,
              "pointHitRadius": 20,
              "datalabels": {
                "display": false
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
              "y": {
                "title": {
                  "display": true,
                  "text": "Total"
                },
                "min": 0,
                "ticks": {
                  "fontSize": 12
                }
              },
              "x": {
                "ticks": {
                  "fontSize": 12
                }
              }
            }
          }
        }
      }
    },
    "isEnabled": true
  }
]

module.exports = mockLineChartData
