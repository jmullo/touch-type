import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { render } from 'react-dom';
import { App } from 'components/App';

import 'fontsource-roboto/400-normal.css';
import 'fontsource-roboto-mono/400-normal.css';
import 'main.css';

export default render(<App />, document.getElementById('main'));
