---
layout: layouts/component.njk
title: Interactive Filters
subsection: Report components
--- 
{% example "report/filters", 650, "default" %}

## Overview

The filters component is a collection of filter inputs, whose values contribute the query parameters of the URL. 

- Updating a filter input will update the relevant query parameter in the URL. 
- Clicking `Apply filters` will submit the URL by refreshing the URL.
- Clicking `Reset filters` will restore the the input values to their defaults, and update the URL query params accordingly.
- Selected filters are displayed and can be individually removed.

### When to use

If you have simple filtering requirements (Radio, Select, Date range), then this component is a good way to reduce code complexity.

### When not to use 

If you have a requirement for more complex filter options, or options that are not supported by this component, then the [MoJ filter component](https://design-patterns.service.justice.gov.uk/components/filter/) may be more suitable.

## How to use

### Basic filters

{% example "report/filters", 650, "default" %}
