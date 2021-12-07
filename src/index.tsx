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