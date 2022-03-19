import React from 'react'
import ReactDOM from 'react-dom'
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, createTheme } from 'baseui';
import { BrowserRouter as Router } from "react-router-dom";
import App from './pages'
import ErrorBoundary from "./components/ErrorBoundary"

const engine = new Styletron();

const primitives = {
  primary: '#285E61',
  primary50: '#E6FFFA',
  primary100: '#B2F5EA',
  primary200: '#81E6D9',
  primary300: '#4FD1C5',
  primary400: '#38B2AC',
  primary500: '#319795',
  primary600: '#2C7A7B',
  primary700: '#285E61',
};
const overrides = {
  colors: {
  },
};
const theme = createTheme(primitives, overrides);



ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <Router>

            <App />

          </Router>
        </BaseProvider>
      </StyletronProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
