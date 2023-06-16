# searchbox-showcase

A showcase of SearchBox component usage

Manually need to update library when source changes

```
yarn build:lib
```

Can use the repository as a package

In your `package.json`

```json
{
  "dependencies": {
    "searchbox-showcase": "awesome-reactivesearch/searchbox-showcase"
  }
}
```

Then in your file

```js
import SearchboxShowcase from "searchbox-showcase";

const App = () => (
  <div className="bootstrap">
    <SearchboxShowcase />;
  </div>
);
```

Note the usage of class "bootstrap" which is necessary to apply the styles correctly. It is how we avoid conflicts with other stylesheets your site might already be using.

# Used in

This is currently being used in `reactivesearch.io` website and documentation website(`docs.reactivesearch.io`).

# Showcase Demo Data

The demo data is inside a file called [`src/showcaseData.js`](/src/showcaseData.js). You can make changes to the demo and add new demos there. The schema for data is below

```ts
{
  label: string,
  iframeLink: url, // Codesandbox link or any embed link
  description: JSX, // Write anything HTML here(Links, Headings, Paragraphs, code blocks, etc.) and it would be rendered with proper styles.
}
```

## Reactivesearch.io

In reactivesearch.io it is used as a html snippet

```html
<!-- Bootstrap CDN -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
  crossorigin="anonymous"
/>
<!-- React and React DOM -->
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.development.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
></script>
<!-- Showcase library -->
<script>
  // Import contents from the lib/index.js file here.
</script>
<div id="root" className="bootstrap"></div>

<script>
  const root = ReactDOM.createRoot(document.getElementById("root"));
  console.log(SearchboxShowcase);
  root.render(React.createElement(SearchboxShowcase.default));
</script>
```

## Documentation website

In documentation website it is imported as a component.

```jsx
import React from "react";

import SearchboxShowcase from "searchbox-showcase";
const App = () => (
  <div className="bootstrap">
    <SearchboxShowcase />{" "}
  </div>
);
```

Also once we make changes to this repository, we should update the package in the documentation repository. The part of url after the `#` should be the latest commit id of the main branch.

```json
{
  "searchbox-showcase": "https://github.com/awesome-reactivesearch/searchbox-showcase.git#{latest_commit_id}"
}
```
