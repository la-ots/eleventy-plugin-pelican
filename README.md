# eleventy-plugin-pelican

Eleventy plugin to build websites using the Pelican design system

Inspired by the GOV.UK Eleventy plugin: https://github.com/x-govuk/govuk-eleventy-plugin

## Configuration

### Global Configuration

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
    // sidebar layout
    sidebar: {
      // title
      title: null,
      // icon
      icon: {
        // url
        url: null,
        // alt text
        alt: null
      }
    },
    // docs layouts
    docs: {
      // github button
      github: {
        // show button?
        button: false,
        // repository url
        repository: null
      }
    }
  },

  // asset building/bundling
  assets: {
    // bundle assets?
    bundle: true,
    // any custom assets to include
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
* `page` - Public facing page
  * `pageNavbar` - Top navigation area
  * `pageContentStart` - Content at start of page content area
  * `pageContent` - Main content
  * `pageContentEnd` - Content at end of page content area
  * `pageFooter` - Footer area
* `docs/guide` - Main template for a docs/guide page
  * `guideBreadcrumbs` - Breadcrumbs
  * `guideTitle` - Title
  * `guideTableOfContent` - Table of contents
  * `guideStart` - Content at start of guide content area
  * `guideContent` - Main content
  * `guidePageNavigation` - Page next/previous
  * `guideEnd` - Content at end of guide area
* `docs/area` - Sub template for an area overview for docs

## Components