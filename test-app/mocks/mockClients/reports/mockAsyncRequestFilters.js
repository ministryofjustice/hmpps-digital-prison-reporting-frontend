const filtersData = {
  "filters": [
    {
      "dynamicResourceEndpoint": null,
      "mandatory": false,
      "minimumLength": null,
      "name": "field1",
      "options": [
        {
          "disabled": false,
          "text": "None",
          "value": "no-filter"
        },
        {
          "text": "Value 1.1",
          "value": "value1.1",
        },
        {
          "text": "Value 1.2",
          "value": "value1.2",
        },
        {
          "text": "Value 1.3",
          "value": "value1.3",
        },
      ],
      "pattern": undefined,
      "text": "Field 1",
      "type": "Radio",
      "value": "value1.2",
    },
    {
      "dynamicResourceEndpoint": null,
      "mandatory": false,
      "minimumLength": null,
      "name": "field2",
      "options": [
        {
          "disabled": true,
          "selected": true,
          "text": "Select your option",
          "value": "",
        },
        {
          "disabled": false,
          "text": "None",
          "value": "no-filter",
        },
        {
          "text": "Value 2.1",
          "value": "value2.1",
        },
        {
          "text": "Value 2.2",
          "value": "value2.2",
        },
        {
          "text": "Value 2.3",
          "value": "value2.3",
        },
      ],
      "pattern": undefined,
      "text": "Field 2",
      "type": "Select",
      "value": null,
    },
    {
      "dynamicResourceEndpoint": null,
      "mandatory": true,
      "max": "2007-05-04",
      "min": "2003-02-01",
      "minimumLength": null,
      "name": "field3",
      "pattern": undefined,
      "relativeOptions": [],
      "text": "Field 3",
      "type": "daterange",
      "value": {
        "end": "2006-05-04",
        "start": "2003-02-01",
      },
    },
    {
      "dynamicResourceEndpoint": null,
      "mandatory": false,
      "minimumLength": 3,
      "name": "field4",
      "options": [
        {
          "text": "Fezzick",
          "value": "Fezzick",
        },
        {
          "text": "Inigo Montoya",
          "value": "Inigo Montoya",
        },
        {
          "text": "Prince Humperdink",
          "value": "PrHu",
        },
        {
          "text": "Princess Buttercup",
          "value": "Princess Buttercup",
        },
        {
          "text": "Westley",
          "value": "Westley",
        },
      ],
      "pattern": undefined,
      "text": "Field 4",
      "type": "autocomplete",
      "value": null,
    },
    {
      "dynamicResourceEndpoint": null,
      "mandatory": false,
      "minimumLength": 3,
      "name": "field5",
      "options": [],
      "pattern": undefined,
      "text": "Field 5",
      "type": "autocomplete",
      "value": null,
    },
    {
      "dynamicResourceEndpoint": null,
      "mandatory": false,
      "minimumLength": null,
      "name": "field6",
      "pattern": undefined,
      "text": "Field 6",
      "type": "text",
      "value": null,
    },
    {
      "dynamicResourceEndpoint": null,
      "mandatory": false,
      "max": "2007-05-04",
      "min": "2003-02-01",
      "minimumLength": null,
      "name": "field7",
      "pattern": undefined,
      "text": "Field 7",
      "type": "date",
      "value": "2005-02-01",
    },
    {
      "dynamicResourceEndpoint": null,
      "mandatory": false,
      "minimumLength": null,
      "name": "field8",
      "options": [
        {
          "text": "Value 8.1",
          "value": "value8.1",
        },
        {
          "text": "Value 8.2",
          "value": "value8.2",
        },
        {
          "text": "Value 8.3",
          "value": "value8.3",
        },
        {
          "text": "Value 8.4",
          "value": "value8.4",
        },
      ],
      "pattern": undefined,
      "text": "Field 8",
      "type": "multiselect",
      "value": "value8.2,value8.3",
      "values": [
        "value8.2",
        "value8.3",
      ],
    },
  ],
  "sortBy": [
    {
      "mandatory": true,
      "minimumLength": null,
      "name": "sortColumn",
      "options": [
        {
          "text": "Field 1",
          "value": "field1",
        },
        {
          "text": "Field 2",
          "value": "field2",
        },
      ],
      "text": "Column",
      "type": "Radio",
      "value": "field1",
    },
    {
      "mandatory": true,
      "minimumLength": null,
      "name": "sortedAsc",
      "options": [
        {
          "text": "Ascending",
          "value": "false",
        },
        {
          "text": "Descending",
          "value": "true",
        },
      ],
      "text": "Direction",
      "type": "Radio",
      "value": "false",
    },
  ],
}

module.exports = filtersData
