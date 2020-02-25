import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import rootReducer from './store/reducers';
import themeObject from './shared/util/theme';
import './index.scss';
import App from './App';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const theme = createMuiTheme(themeObject);

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root'),
);
