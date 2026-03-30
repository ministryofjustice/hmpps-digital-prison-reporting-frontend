# HMPPS Digital Prison Reporting Front-end Library

test

A front-end library for components created by the Digital Prison Reporting team.

This README is intended for developers of and contributors to the project. If you are looking to integrate the components into your own project, please see the consumer documentation here: https://ministryofjustice.github.io/hmpps-digital-prison-reporting-frontend/  

## Publishing

This library is published to NPM using by the ["Publish package" GitHub action](https://github.com/ministryofjustice/hmpps-digital-prison-reporting-frontend/actions/workflows/publish.yml). This uses the NPM user associated with digitalprisonreporting@digital.justice.gov.uk, which is in the @ministryofjustice NPM group.

This action also publishes the documentation to GitHub pages.

## Packaging

Packaging for both NPM and GitHub Pages is done by rollup and esbuild:

- `npm run rpack`: This builds the NPM package, which is also used as sources for the Test Application, using rollup.
- `npm run docs`: This compiles the markdown in `docs` into HTML for GitHub Pages using esbuild.

Both tasks use the `package` directory.

## Test Application

To start the Test Application, run: `npm run start:dev:noMockClients` as well as `npm run wiremock` in a separate tab. This builds the NPM package and starts the server at http://localhost:3010.

The Test Application is used both for visually checking components, and also by the integration tests (run using Cypress).

## Running and testing local builds
To run the main suite of browser-based tests, start up the main app by running `npm run start:dev:noMockClients` then `npm run int-test` or `npm run int-test-ui` for getting the cypress UI up to choose individual tests to run.

There are also a few jest tests - you can run these plus the small docs tests by running `npm run test`.

We also have a small number of visual regression tests using Playwright that are **only** for our chart based pages - you can run these with `npm run int-test-visual` which will start up the server and mocks itself. Please ensure any other running server processes are stopped before running this!

### How to update and create new visual regression tests
There may ocassionally be the need to create new visual regression tests, again, only for our charting based pages. To do this, you should develop the test as normal, but use `npm run int-test-visual-ui` which will allow you to see what the test is doing in the UI. Once you have the test on the page you want to capture a screenshot of for comparison, use

```typescript
await expect(page).toHaveScreenshot({
    fullPage: true,
  })
```

and then run your test. It will fail locally on this last step, which is expected, as you are not creating screenshots. These will be created by CI as screenshots on different OSes can have slightly different pixel values. You should push this branch and make a PR, which will set off the CI run, and if all is well, create the screenshots as an artifact of the CI run in GitHub Actions (but fail the run). You should create a folder based on the name of the file running the test - if the file is called `some-chart-test.spec.ts`, create a folder called `some-chart-test.spec.ts-screenshots/` and download the screenshots artifact and put the new screenshots in there. You should then double check these to ensure no sensitive data is being captured, then commit and push them up. This time, the CI run should use these screenshots and pass. If they do not, some common pitfalls include:

- Animations: Ideally set or disable animations so the snapshot isn't capturing charts, CSS animations etc half way through loading.
- Noise: Things like "Last Updated" timestamps can be very annoying and will break the test every time the clock ticks. You should mask those bits out so Playwright ignores them.
- As a last resort, look at having some **small** pixel tolerances - no more than 1 or 2% - on the `toHaveScreenshot` call - use `maxDiffPixelRatio` which has a range from 0-1, so no more than 0.01-0.02 here.

### Running the app in dev mode

To run the app in dev mode, use `start:dev:noMockClients` for the test app, and `docs:local` for the docs. To run the production build of docs, you should run `npm run docs`, then you'll need to configure a reverse proxy - nginx is the easiest. Install it through homebrew `brew install nginx`, then ensure it's running by running `brew services start nginx`. then run `sudo nginx -t` and you should see it's got a default config at `/opt/homebrew/etc/nginx/nginx.conf` - if it isn't there, just use whatever path it gives back, then add a new file into `/opt/homebrew/etc/nginx/servers/dev.conf` with this content:

```
server {
    listen 8081;
    server_name localhost;
    
    # Handle all other hmpps-digital-prison-reporting-frontend requests
    location /hmpps-digital-prison-reporting-frontend/ {
        proxy_pass http://localhost:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_redirect ~^/(.*)$ /hmpps-digital-prison-reporting-frontend/$1;
        proxy_redirect / /hmpps-digital-prison-reporting-frontend/;
        proxy_set_header Accept-Encoding "";
    }
    
    # Handle requests without trailing slash
    location = /hmpps-digital-prison-reporting-frontend {
        return 301 /hmpps-digital-prison-reporting-frontend/;
    }
}
```

Then run `sudo nginx -t` to ensure there's no errors, then `sudo nginx -s reload` to reload its config.

This forwards all requests from http://localhost:8081 to http://localhost:3000 (where your app will be running). Now run `npm run docs:serve-prod` and then navigate to http://localhost:8081/hmpps-digital-prison-reporting-frontend and it should be working.