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
"@ministryofjustice/hmpps-digital-prison-reporting-frontend": "^3",
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

{% header 2, "Node configuration" %}
{% header 3, "Assets" %}
Add the library's assets to your application's static resources:

```javascript
router.use(
  "/assets/dpr",
  express.static(
    path.join(
      process.cwd(),
      "/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/assets"
    )
  )
);

// Chart js
router.use(
  '/assets/ext/chart.js',
  express.static(path.join(process.cwd(), '/node_modules/chart.js/dist/chart.umd.js')),
)

router.use(
  '/assets/ext/chartjs-datalabels.js',
  express.static(
    path.join(process.cwd(), '/node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.min.js'),
  ),
)

// Dayjs
router.use('/assets/ext/day.js', express.static(path.join(process.cwd(), '/node_modules/dayjs/dayjs.min.js')))

router.use(
  '/assets/ext/dayjs/plugin/customParseFormat.js',
  express.static(path.join(process.cwd(), '/node_modules/dayjs/plugin/customParseFormat.js')),
)
```

Add the DPR client-side JavaScript initialisation to a new JS file (in this example named `dprInit.mjs`) in your 'assets' folder:
```javascript
import initAll from "/assets/dpr/js/all.mjs";

initAll();
```

Add the GOV client-side JavaScript initialisation to a new JS file (in this example named `govukInit.mjs`) in your 'assets' folder:
```javascript
import { initAll } from '/assets/govuk/all.js'

initAll()
```

Add the Moj client-side JavaScript initialisation to a new JS file (in this example named `mojInit.mjs`) in your 'assets' folder:
```javascript
window.MOJFrontend.initAll()
```

Add the client-side JavaScript to the nunjucks layout:
```html
{% block bodyEnd %}
...
<script type="module" src="/assets/ext/day.js"></script>
<script type="module" src="/assets/ext/dayjs/plugin/customParseFormat.js"></script>
<script type="module" src="/assets/ext/chart.js"></script>
<script type="module" src="/assets/ext/chartjs-datalabels.js"></script>  

// Govuk Lib
<script type="module" src="/assets/govuk/all.js"></script>
<script type="module" src="/assets/govukInit.js"></script>

// MoJ lib
<script src="/assets/moj/all.js"></script>
<script type="module" src="/assets/mojInit.js"></script>

// DPR Lib
<script type="module" src="/assets/dpr/js/all.mjs"></script>
<script type="module" src="/assets/js/dprInit.mjs"></script>
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
