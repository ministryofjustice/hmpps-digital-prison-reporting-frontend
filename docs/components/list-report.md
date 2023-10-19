---
layout: layouts/component.njk
title: List Report
---

The List Report is a combination of the MoJ Design Pattern Library's Paging, Filtering, Button Menu, and Sortable List components.

Its purpose is to present lists of data in a consistent and accessible way.

{% example "list-report", 500 %}

## Notes

The List Report is intended to be used from the server-side (see the JavaScript tab  above); providing the required data and configuration in Node.js.

The filtering, sorting, etc. are then all handled within the component.
