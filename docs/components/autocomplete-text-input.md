---
layout: layouts/component.njk
title: Autocomplete
---

{% example "autocomplete-text-input", 300 %}

## When to use

Use this component when users need to choose from a large set of options. Either populated statically, or dynamically from a remote API endpoint.

Example uses:
- Choosing an establishment name.
- Searching for a post code.
- Searching for a person's name.

## When not to use

Do not use this component for a small set of options, or where discovery of the available options is important. In these cases a Radio input of similar may be a better option.

## Notes

When using a dynamic endpoint, if you are using the DPR templated API endpoint, it's recommended to expose this via a UI endpoint.

You can use the DPR Reporting Client to fetch values - as shown in the JavaScript example.
