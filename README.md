# microfrontend-demo
This is a demonstration of how a microfrontend architecture could be implemented. This demo uses run-time integration via JavaScript.
The microfrontend app code is loaded via `<script />` tag and upon load exposes a global function that can be used to render that microfrontend.

This demo uses [parcel](https://github.com/parcel-bundler/parcel) to bundle the microfrontend code, which is written in [React](https://github.com/facebook/react) and [Typescript](https://github.com/microsoft/TypeScript).

## Getting Started
In the root of this directory, run the following commands:

```bash
yarn install
yarn start
```

This will run a development server using Parcel. By default, this should run on port 1234.

Next, open a new terminal window and run:
```bash
yarn demo
```

This will run a development server for the demo app that is consuming the microfrontend.

## Creating the microfrontend
The microfrontend code can be found under the `src` directory. At `index.tsx` we are importing the React component, and using ReactDOM to render that component in a global function.

```typescript
import ReactDOM from 'react-dom';
import { DemoApp, DemoAppProps } from "./DemoApp";

declare global {
    interface Window { 
        renderDemoApp: (rootElementId: string, props: DemoAppProps) => void; 
    }
}

window.renderDemoApp = (rootElementId: string, props: DemoAppProps) => {
    ReactDOM.render(<DemoApp name={props.name} />, document.getElementById(rootElementId))
}
```

The first parameter of the global function is a DOM element's id where the app consuming the microfrontend wants to render that microfrontend at. The second parameter corresponds to the props for the React component.

If you have multiple components or apps that you want to expose to consumers, you can just create a new component and expose it with another global function following the above approach.

## Consuming the microfrontend
That microfrontend can then be consumed by loading the bundled JavaScript as a `<script />` tag and then call the `renderDemoApp` global function. Here is an example that can be found at `example/index.html`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Container App</title>
  </head>
  <body>
    <div id="app"></div>
    <script>
        let script = document.createElement('script');
        script.src = "http://localhost:1234/index.js"
        script.onload = function () {
            renderDemoApp('app', { name: 'Bobby' }) // The name can be anything the consuming application wants to pass on.
        }

        document.head.appendChild(script)
    </script>
  </body>
</html>
```

This can even be loaded in any web framework you are working with.

**Next.js**
```typescript
import type { NextPage } from 'next'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Script from 'next/script'

const Home: NextPage = () => {

    useEffect(() => {
        renderDemoApp('app', { name: 'NextJS' })
    })

  return (
    <div className={styles.container}>
        <Script src="http://localhost:1234/index.js" strategy="beforeInteractive"></Script>
        <h1>I am the host</h1>
        <div id="app"></div>
    </div>
  )
}

export default Home
```