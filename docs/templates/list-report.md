---
layout: layouts/component.njk
title: List Report
---

The List Report is a combination of the MoJ Design Pattern Library's Paging, Filtering, Button Menu, and Sortable List components.

Its purpose is to present lists of data in a consistent and accessible way.

{% example "report/list-report/example-report", 500 %}

{% header 2, "Notes" %}

The List Report is intended to be used from the server-side (see the two options in the JavaScript tab above); providing the required data and configuration in Node.js.

The filtering, sorting, etc. are then all handled within the component.

If you are using the Request Handler method of rendering the page, then the API calls to fetch definitions and data, and authentication, are handled within the library. However, the expectation is that the API it calls has been created using the [API library](https://github.com/ministryofjustice/hmpps-digital-prison-reporting-lib).
