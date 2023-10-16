---
layout: layouts/component.njk
title: Data Table
---

The data table is a bundle of several components: The (Gov.uk pagination component)[https://design-system.service.gov.uk/components/pagination/], a modified version of the (MoJ sortable table)[https://design-patterns.service.justice.gov.uk/components/sortable-table/], and a page size picker.

Navigating the paging or changing the page size, appends the updated options to the page URL. 

{% example "data-table", 500 %}

## When to use

Use this component to display tabular data to users, allowing sorting and paging of that data.

## Notes

This component accepts a `createUrlForParameters` argument, which can be created server-side using the `getCreateUrlForParametersFunction` method:

```javascript
import urlHelper from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/urlHelper.ts' 

const createUrlForParameters = urlHelper.getCreateUrlForParametersFunction(reportQuery)
```
