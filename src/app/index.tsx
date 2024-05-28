import { createRoot } from 'react-dom/client';
import { App } from './App';
import MyAppRender from './MyAppRender';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(MyAppRender.getAppFrontend());
