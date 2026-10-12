// @ts-nocheck
const mockPieChartData = [
  {
    "id": "doughnut-data-quality-has-MetricOne",
    "title": "MetricOne values",
    "description": "",
    "type": "doughnut",
    "data": {
      "details": {
        "meta": [],
        "headlines": [
          {
            "label": "Total has metricone",
            "value": 37
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
                "text": 37
              },
              {
                "text": 4
              }
            ]
          ]
        }
      ],
      "chart": {
        "type": "doughnut",
        "options": {},
        "data": {
          "labels": [
            "Has MetricOne",
            "No MetricOne"
          ],
          "datasets": [
            {
              "label": "ABC",
              "data": [
                37,
                4
              ],
              "total": 41,
              "backgroundColor": [
                "#5694ca",
                "#912b88",
                "#00703c",
                "#003078",
                "#f47738",
                "#28a197",
                "#5694ca",
                "#912b88",
                "#00703c",
                "#003078",
                "#f47738",
                "#28a197"
              ],
              "borderColor": "#FFFFFF",
              "hoverOffset": 4,
              "datalabels": {
                "anchor": "center",
                "borderWidth": 0
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
            "cutout": "50%"
          }
        }
      }
    },
    "isEnabled": true
  }
]

module.exports = mockPieChartData
