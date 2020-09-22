import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Metrics from './components/Metrics';
import MetricsValue from './components/MetricsValue.jsx';
import GraphVisualization from './Features/GraphVisualization/GraphVisualization.jsx';
import Grid from '@material-ui/core/Grid';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});
const styles = {
  header: {
    textAlign: 'center',
    padding: '10px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
  },
};

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <div style={styles.header}>
          <MetricsValue />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <div style={styles.buttons}>
              <Metrics />
            </div>
          </Grid>
          <Grid item xs={9}>
            <GraphVisualization />
          </Grid>
        </Grid>
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
