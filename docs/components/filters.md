---
layout: layouts/component.njk
title: Filters
---

This component is an extension of the [MoJ filter component](https://design-patterns.service.justice.gov.uk/components/filter/).

Clicking "Apply filter" appends the selected options to the page URL. Parameters are appended with the provided parameter prefix. 

{% example "filters", 500 %}

## When to use

If you have simple filtering requirements (Radio, Select, Date range), then this component is a good way to reduce code complexity.

## When not to use

If you have a requirement for more complex filter options, or options that are not supported by this component, then the [MoJ filter component](https://design-patterns.service.justice.gov.uk/components/filter/) may be more suitable.
