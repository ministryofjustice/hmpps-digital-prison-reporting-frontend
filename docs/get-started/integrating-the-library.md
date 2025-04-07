---
layout: layouts/get-started.njk
title: Integrating the Library
---

This component library can be added to a UI project by following the steps below.

These steps assume your project is already using the Gov.uk and MoJ libraries, and is based on Node Express.

{% header 1, "Installing the library" %}

{% header 2, "Build configuration" %}

{% header 3, "NPM dependency (and prerequisites)" %}

Add the library to your **package.json** within the **dependencies** section and run **npm install**:

```javascript
"@ministryofjustice/hmpps-digital-prison-reporting-frontend": "^4.1.21",
```

Ensure that you have the following dependencies in the expected range, to ensure compatibility between the libraries:

```javascript
"govuk-frontend": "^5",
"@ministryofjustice/frontend": "^3",
```

{% header 3, "SASS" %}
Add the library's SASS to your application's SASS file:

```scss
@import "node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/all";
```

## Node configuration
### Assets

Add the library's assets to your application's static resources:

```js
// middleware/setupStaticResources.ts

Array.of(
  ...
  '/node_modules/govuk-frontend/dist/govuk/assets',
  '/node_modules/govuk-frontend/dist',
  '/node_modules/@ministryofjustice/frontend/moj/assets',
  '/node_modules/@ministryofjustice/frontend',
  '/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/assets',
  '/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend',
).forEach((dir) => {
  app.use('/assets', express.static(path.join(process.cwd(), dir)))
})
```

### Modules

Depending on your app setup, you can initialise the dpr modules in the following ways:

- [Import JavaScript using a bundler](#import-JavaScript-using-a-bundler)
- [Add the JavaScript files to your HTML](#add-the-JavaScript-files-to-your-html)


## Import JavaScript using a bundler

If you decide to import using a bundler (such as Esbuild, or Rollup), use `import` to import all of DPR's  components, then run the `initAll` functions to initialise them:

```js
// assets/js/index.js

import * as govukFrontend from 'govuk-frontend'
import * as mojFrontend from '@ministryofjustice/frontend'
import * as dprFrontend from '@ministryofjustice/hmpps-digital-prison-reporting-frontend'

govukFrontend.initAll()
mojFrontend.initAll()
dprFrontend.initAll()
```

Include the bundled javascript file as a `module` within the layout. 

```html
<!-- server/views/patials/layout.njk -->

{% block bodyEnd %}
  <script type="module" src="/assets/application.min.js"></script>
{% endblock %}
```

## Add the JavaScript files to your HTML

Add the client-side JavaScript to the nunjucks layout, and initialise them using `initAll`:
```html
<!-- server/views/patials/layout.njk -->

{% block bodyEnd %}
  <!-- Govuk Lib -->
  <script type="module" src="/assets/govuk/govuk-frontend.min.js"></script>
  <script type="module">
    import {initAll} from '/assets/govuk/govuk-frontend.min.js'
    initAll()
  </script>

  <!-- MoJ lib -->
  <script src="/assets/moj/all.js"></script>
  <script type="text/javascript">
    window.MOJFrontend.initAll()
  </script>

  <!-- DPR Lib -->
  <script type="module" src="/assets/dpr/all.mjs"></script>
  <script type="module">
    import { initAll } from '/assets/dpr/all.mjs'
    initAll()
  </script>
{% endblock %}
```


{% header 3, "Nunjucks" %}
Add the library's nunjucks templates to your nunjucks configuration:

```javascript
const nunjucksEnv = nunjucks.configure([
  ...// Existing entries
  "node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/",
  "node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/",
]);
```

Add the library's filters to the nunjucks configuration:

```javascript
import setUpNunjucksFilters from "@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/setUpNunjucksFilters";

setUpNunjucksFilters(nunjucksEnv);
```

{% header 3, "Fonts" %}

The DPR library uses Google fonts for some of its components. To allow these to be used without security warnings, you will need to allow the Google URLs in your web security configuration. 

If you have already integrated the DPS header and footer, then you can simply update the following two lines in `setUpWebSecurity.ts`:

```javascript
const styleSrc = ["'self'", (_req: Request, res: Response) => `'nonce-${res.locals.cspNonce}'`, 'fonts.googleapis.com']
const fontSrc = ["'self'", 'fonts.gstatic.com']
```

{% header 2, "API Library" %}

As a counterpart to the UI library, there is also an API library that you can integrate into your own API. Please see the [API Integration guide](https://github.com/ministryofjustice/hmpps-digital-prison-reporting-lib/blob/main/integrating-with-library.md).
