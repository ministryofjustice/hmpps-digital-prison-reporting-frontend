---
layout: layouts/get-started.njk
title: Integrating the Library
---

This component library can be added to a UI project by following the steps below.

These steps assume your project is already using the Gov.uk and MoJ libraries, and is based on Node Express.

# Installing the library

Add the library to your `package.json` within the `dependencies` section and run `npm install`:

```
"@ministryofjustice/hmpps-digital-prison-reporting-frontend": "^1",
```

Add the library's SASS to your application's SASS file:

```scss
@import 'node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/all';
```

Add the library's assets to your application's static resources:

```javascript

router.use('/assets/dpr', express.static(path.join(process.cwd(), '/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/assets')))
```

Add the library's nunjucks templates to your nunjucks configuration:

```javascript
const nunjucksEnv = nunjucks.configure(
    [
      ... // Existing entries 
      'node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/',
      'node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/',
    ]
  )
```

And finally add the library's filters to the nunjucks configuration:

```javascript
import setUpNunjucksFilters from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/setUpNunjucksFilters'

setUpNunjucksFilters(nunjucksEnv)
```