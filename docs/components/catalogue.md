---
layout: layouts/component.njk
title: Catalogue
subsection: DPR Platform components
---
{% example "catalogue/default", 800, 'default' %}

## Overview

The catalogue component is used to:

- view report variants in a list.
- view report information such as product, variant name, and description in the list.
- filter the list columns by string.
- request variants from the list.
- bookmark variants from the list.

This component supports the DPR platform functionality by providing a unified way of listing and navigating reports 

### When to use

Use this component when you have integrated the DPR plaform into your service and want to:

- View a list of your reports 
- be able to request those reports.
- bookmark a report from the list.

### When not to use 

Do not use this component if you want more control over how your report listing should look. 

## How to use

This component requires you have followed the [async reporting integration steps](/reports/async-reports-integration)

Its recommended to use the Catalogue utility helper to initialise the data needed to populate the list with the correct layout and feature set. Import the utility and initialise the data in the route before rendering your page:

```js
// server/routes/index.ts

import CatalogueUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/_catalogue/catalogue/utils'


export default function routes(services: Services): Router {

  ...

  router.get('/path/to/catalogue', (req, res) => {
    const catalogue = await CatalogueUtils.init({ res, services })
    res.render('reports-catalogue.njk', {
      catalogue
    })
  })
}
```

This will give you the arguments to simply apply as components arguments in the HTML:

```js
{ dprCatalogue(catalogue) }
```

## Configure features

The following features can be disabled using the `features` configuration:

- How to use section
- Filtering
- Toggle unauthorised.
- Bookmarking

This example demonstrates how to disable all default catalogue features. 

**NOTE**: Bookmarking must be disabled via javascript using the catalogue utility helper. 

{% example "catalogue/features", 650, 'features' %}
