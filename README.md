# Accessibility Toolbar (volto-accessibility-toolbar)

[![npm](https://img.shields.io/npm/v/volto-accessibility-toolbar)](https://www.npmjs.com/package/volto-accessibility-toolbar)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://macagua.github.io/volto-accessibility-toolbar/)
[![CI](https://github.com/collective/volto-accessibility-toolbar/actions/workflows/main.yml/badge.svg)](https://github.com/collective/volto-accessibility-toolbar/actions/workflows/main.yml)

A new add-on for `Volto` to support the Accessibility features of web browsers. The aim is to provide features commonly used by browser users.

This add-on is inspired by the [BarraAcessibilidade](https://github.com/search?q=repo%3Aplonegovbr%2Fportalbrasil-intranet+BarraAcessibilidade&type=code) component of the [PortalBrasil: Intranet (portalbrasil-intranet)](https://github.com/plonegovbr/portalbrasil-intranet/tree/main/frontend/) used as an accessibility bar for website visitors.

## Features

It provides a simple way to access to accessibility features such as:

<!-- List your awesome features here -->

- `LinkText` component, Accessibility link, go to the accessibility page.

- `Fonts` component, use for Smaller/Increase text size via buttons.

- `Contrast` component, High contrast via a button.

- `AccessibilityToolbar` component, Main component that contains the other components.

## Screenshots

### Accessibility link component

This `Volto` component looks like this:

![Accessibility link](https://raw.githubusercontent.com/collective/volto-accessibility-toolbar/refs/heads/main/docs/docs/source/images/accessibility_link.png)

---

### Smaller/Increase text size component

This `Volto` component looks like this:

![Smaller/Increase text size](https://raw.githubusercontent.com/collective/volto-accessibility-toolbar/refs/heads/main/docs/docs/source/images/smaller_increase_text_size.png)

---

### High contrast component

This `Volto` component looks like this:

![High contrast](https://raw.githubusercontent.com/collective/volto-accessibility-toolbar/refs/heads/main/docs/docs/source/images/high_contrast.png)

---

### Accessibility Toolbar component

This `Volto` component looks like this:

![Accessibility Toolbar](https://raw.githubusercontent.com/collective/volto-accessibility-toolbar/refs/heads/main/docs/docs/source/images/accessibility_toolbar.png)

---

## Translations

This product support the following languages:

- Basque

- Catalan

- Germany

- English

- Galician

- Spanish

- Brazilian Portuguese

## Compatibility

- Tested with `Node.js` 22.16.0 and `Volto` 18.

## Install it

To install in your project, the `volto-accessibility-toolbar` add-on, you must choose the method appropriate
to your version of `Volto`.

### Volto 18 and later

Add `volto-accessibility-toolbar` to your `package.json` file:

```json
"addons": [
    "volto-accessibility-toolbar": "*"
]
```

```json
"dependencies": {
    "volto-accessibility-toolbar": "workspace:*",
}
```

#### Install from GitHub

If you trying to install from `GitHub` you need edit the `mrs.developer.json` file:

```json
{
  "volto-accessibility-toolbar": {
    "develop": true,
    "output": "./packages/",
    "package": "volto-accessibility-toolbar",
    "url": "git@github.com:collective/volto-accessibility-toolbar.git",
    "https": "https://github.com/collective/volto-accessibility-toolbar.git",
    "branch": "main"
  }
}
```

The `mrs.developer.json` file is using by an `Node.js` utility called `mrs.developer` that makes
it easy to work with `npm` projects containing lots of packages, of which you only want to
develop some.

Also add `volto-accessibility-toolbar` to your `package.json` file:

```json
"addons": [
    "volto-accessibility-toolbar": "*"
]
```

```json
"dependencies": {
    "volto-accessibility-toolbar": "workspace:*",
}
```

---

Download and install the new add-on by running:

```shell
make install
```

Start `Volto` with:

```shell
make start
```

## Settings it

For use this add-on, you need to configure the following in the `settings.js` file:

- `enable_link`: Enable or disable the accessibility toolbar features. Default: `false`.

- `link_url`: URL of the accessibility page. Default: `/accessibility`.

- `enable_font`: Enable or disable the font size feature. Default: `true`.

- `enable_contrast`: Enable or disable the contrast feature. Default: `true`.

Example:

```javascript
export default function install(config) {
  config.settings.enable_link = false;
  config.settings.link_url = '/accessibility';
  config.settings.enable_font = true;
  config.settings.enable_contrast = true;
  return config;
}
```

## Test installation

Visit http://localhost:3000/ in a browser, and check the _Accessibility_ features for the users.

## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other `Volto` core improvements.
For this reason, it only works with pnpm and `Volto` 18 (currently in alpha).

### Prerequisites ✅

- An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
- [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
- [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 22
- [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
- [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
- [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1. Clone this repository, then change your working directory.

    ```shell
    git clone git@github.com:collective/volto-accessibility-toolbar.git
    cd volto-accessibility-toolbar
    ```

2. Install this code base.

    ```shell
    make install
    ```

### Make convenience commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
acceptance-test                  Start Cypress in interactive mode
ci-acceptance-test               Run cypress tests in headless mode for CI
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the third session, start the Cypress interactive test runner.

```shell
make acceptance-test
```

### Run Storybook server

Ro run Start Storybook server on port 6006

```shell
make storybook-start
```

## Credits

Developed with the support of:

- [Instituto Municipal de Deportes - IMD, Seville City Council, Spain](https://imd.sevilla.org/).

  <img width="200" alt="IMD Logo" src="https://raw.githubusercontent.com/collective/volto-accessibility-toolbar/refs/heads/main/docs/docs/source/images/imd-ayto-logo.svg">

### Acknowledgements 🙏

Generated using [Cookieplone (1.1.0)](https://github.com/plone/cookieplone) and [cookieplone-templates (8e49881)](https://github.com/plone/cookieplone-templates/commit/8e498811980e38b7db5d5cb0f5645256feaa8799) on 2026-09-08 09:55:51.534423. A special thanks to all contributors and supporters!

## Authors

This product was developed by [Leonardo J. Caballero G.](https://github.com/macagua).

<img width="100" alt="Leonardo J. Caballero G." src="https://avatars.githubusercontent.com/u/185395?v=4&size=100">

## License

The project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
