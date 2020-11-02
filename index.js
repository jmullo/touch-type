import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { render } from 'react-dom';
import { App } from 'components/App';

import 'fontsource-roboto-mono/400-normal.css'
import 'style.css';

export default render(<App />, document.getElementById('main'));
