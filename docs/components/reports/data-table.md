---
layout: layouts/component.njk
title: Data Table
subsection: Report components
---

The data table is a bundle of several components: The [Gov.uk pagination component](https://design-system.service.gov.uk/components/pagination/), a modified version of the [MoJ sortable table](https://design-patterns.service.justice.gov.uk/components/sortable-table/), and a page size picker.

Navigating the paging or changing the page size, appends the updated options to the page URL. 

{% example "report/data-table", 500 %}

{% header 2, "When to use" %}

Use this component to display tabular data to users, allowing sorting and paging of that data.
