# Pelican Eleventy Plugin

Eleventy plugin to build websites and documentation using the Pelican design system

Inspired by the GOV.UK Eleventy plugin: https://github.com/x-govuk/govuk-eleventy-plugin

You’re welcome to use this plugin even if your application isn’t considered part of the Louisiana.gov system, provided the application does not:

  * Identify itself as being part of Louisiana.gov
  * Use the Louisiana state seal or OTS logo as an identifying mark
  * Suggest that it’s an official Louisiana.gov website if it’s not

## Requirements

  * Node.js v16 or above
  * Eleventy v1.0.0 or above

## Installation

> npm install @la-ots/eleventy-plugin-pelican --save

## Usage

Include the following in your Eleventy config file (typically `.eleventy.js`'):

```js
const pelicanEleventyPlugin = require('eleventy-plugin-pelican')

eleventyConfig.addPlugin(pelicanEleventyPlugin, {
  // configuration options
})
```

### Configuration

These configurations are set in the Eleventy config

```js
{
  // Site title
  title: null,

  // Site description
  description: null,

  // Site URL
  url: null,

  // Favicon path
  favicon: null,

  // Image path for site level social card
  social: {
    image: null
  },

  // layout specific configurations
  layouts: {
    // // any custom css files to include in header
    css: [],
    // any custom javascript files to include in header
    javascript: [],
    // sidebar layout
    sidebar: {
      // title (defaults to site title)
      title: null,
      // icon
      icon: {
        // url (defaults to favicon)
        url: null,
        // alt text
        alt: null
      }
    },
    // docs layouts
    docs: {
      // github button
      github: {
        // show "edit on Github" button?
        button: false,
        // repository url
        repository: null
      }
    }
  },

  // asset building/bundling
  assets: {
    // use core assets?
    core: true,
    // any custom assets (css/js) to include in bundle
    // must be absolute paths
    custom: {
      css: [],
      javascript: []
    }
  }

  // NewRelic configuration
  newRelicApm: {
    accountId: null,
    trustKey: null,
    agentId: null,
    licenseKey: null,
    applicationId: null,
  }
}
```

### Page-Level Configuration

These configurations are typically set in the page meta

```yaml
social:
  # Custom page title (will default to page title)
  title: null

  # Custom description (will default to page description)
  description: null

  # Custom image (will default to global image)
  image: null
```

## Templates/Blocks

* `base` - Base template
  * `css` - Any custom css
  * `javascript` - Any custom javascript
  * `newRelicApm` - New Relic APM code
  * `head` - Any custom HTML head items
  * `skipLink` - Skip to content link
  * `officialBanner` - Official State of LA info banner
  * `content` - Core page content 
  * `backToTop` - Back to top link
* `home` - Empty template, only inherits from `base`
* `page` - Public facing page
  * `pageNavbar` - Top navigation area
  * `pageContentStart` - Content at start of page content area
  * `pageContent` - Main content
  * `pageContentEnd` - Content at end of page content area
  * `pageFooter` - Footer area
* `sidebar` - Template with sidebar
  * `sidebar` - Side navigation
  * `sidebarMainContent` - Main content area
  * `sidebarTopHeader` - Header
  * `pageWithSidebarContent` - Main sidebar content
  * `sidebarFooter` - Footer
* `docs/guide` - Main template for a docs/guide page
  * `guideBreadcrumbs` - Breadcrumbs
  * `guideTitle` - Title
  * `guideTableOfContents` - Table of contents
  * `guideMainContent` - Main content wrapper
  * `guideStart` - Content at start of guide content area
  * `guideContent` - Main content
  * `guidePageNavigation` - Page next/previous
  * `guideEnd` - Content at end of guide area
* `docs/area` - Sub template for an area overview for docs
* `docs/sitemap` - Sitemap template for guides
* `sitemap.xml` - Template for XML based sitemaps

## Development

Highly recommend using [yalc](https://www.npmjs.com/package/yalc) to dev and test.
