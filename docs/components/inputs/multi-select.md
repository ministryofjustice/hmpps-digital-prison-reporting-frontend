---
layout: layouts/component.njk
title: Multi select
---
{% example "inputs/multiselect/default", 300, "default" %}

## Overview

The DPR multiselect component is composite of the [GOV design system checkbox component](https://design-system.service.gov.uk/components/checkboxes/). 

### When to use

Use the multiselect component when you need to help users:

- select multiple options from a list
- toggle a single option on or off

### When not to use

Do not use the checkboxes component if users can only choose one option from a selection. In this case, use the Radios component.

## How to use

### Default

{% example "inputs/multiselect/default", 300, "default1" %}

### Long list of select options

When a lost list of select options is provided to the component, the multiselect container with show a sub-section of list items and provide a scroll bar to reveal the remaining options

{% example "inputs/multiselect/scroll", 400, "scroll" %}
