# HMPPS Digital Prison Reporting Front-end Library

A front-end library for components created by the Digital Prison Reporting team.

This README is intended for developers of and contributors to the project. If you are looking to integrate the components into your own project, please see the consumer documentation here: https://ministryofjustice.github.io/hmpps-digital-prison-reporting-frontend/  

## Publishing

This library is published to NPM using by the ["Publish package" GitHub action](https://github.com/ministryofjustice/hmpps-digital-prison-reporting-frontend/actions/workflows/publish.yml). This uses the NPM user associated with digitalprisonreporting@digital.justice.gov.uk, which is in the @ministryofjustice NPM group.

This action also publishes the documentation to GitHub pages.

## Packaging

Packaging for both NPM and GitHub Pages is done by Gulp:

- `gulp build:package`: This builds the NPM package, which is also used as sources for the Test Application.
- `gulp build:docs`: This compiles the markdown in `docs` into HTML for GitHub Pages.

Both tasks use the `package` directory.

## Test Application

To start the Test Application, run: `npm run start-test-app`. This builds the NPM package and starts the server at http://localhost:3010.

The Test Application is used both for visually checking components, and also by the integration tests (run using Cypress).
