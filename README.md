# Scanbot Web Barcode Scanner SDK Example for LWC

This example demonstrates how to integrate the Scanbot Web Barcode Scanner SDK into a Salesforce Lightning Web Component (LWC) using the Lightning Web Runtime (LWR).

- Scanbot SDK: https://scanbot.io/products/barcode-software/web-barcode-scanner/
- LWC: https://lwc.dev/guide/introduction

## LWC-TS Boilerplate Example

The **LWC TS Boilerplate** example contains the minimum code needed to get a simple Single Page Application (SPA) on LWR running in Typescript.

## Project Setup

The directory structure looks like this:

```
src/
  ├── assets/           // static assets
  │   └── recipes-logo.png
  |   └── favicon.ico
  └── modules/          // lwc modules
      └── example/
          └── app/
              ├── app.css
              ├── app.html
              └── app.ts
lwr.config.json         // lwr configuration
package.json            // npm packaging configuration
```

## Configuration

The LWR server is configured in `lwr.config.json`, at the root of the project. The **LWC TS Boilerplate** example has one LWC module and one server-side route.

```json
// lwr.config.json
{
    "lwc": { "modules": [{ "dir": "$rootDir/src/modules" }] },
    "routes": [
        {
            "id": "example",
            "path": "/",
            "rootComponent": "example/app"
        }
    ],
    "assets": [
        {
            "alias": "assetsDir",
            "dir": "$rootDir/src/assets",
            "urlPath": "/public/assets"
        },
        {
            "alias": "favicon",
            "file": "$rootDir/src/assets/favicon.ico",
            "urlPath": "/favicon.ico"
        }
    ]
}
```

## Running the Project in dev Mode

```bash
yarn install
yarn dev # dev:compat for AMD format
```

Open the site at [http://localhost:3000](http://localhost:3000)

## Statically Generate and Preview the Site

```bash
yarn build # dev:prod-compat for AMD format
yarn start
```

Open the site at [http://localhost:3000](http://localhost:3000)
