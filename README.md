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

## Running and testing local builds
To run the app in dev mode, use `start:dev` for the test app, and `docs:local` for the docs. To run the production build of docs, you should run `npm run docs`, then you'll need to configure a reverse proxy - nginx is the easiest. Install it through homebrew `brew install nginx`, then ensure it's running by running `brew services start nginx`. then run `sudo nginx -t` and you should see it's got a default config at `/opt/homebrew/etc/nginx/nginx.conf` - if it isn't there, just use whatever path it gives back, then add a new file into `/opt/homebrew/etc/nginx/servers/dev.conf` with this content:

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