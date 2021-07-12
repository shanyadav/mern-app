import React, { Component } from "react";
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { createLogicMiddleware } from "redux-logic";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import DefaultLayout from "./containers/DefaultLayout";
import FullPageLoader from "./containers/Loader/FullPageLoader";
import "react-toastify/dist/ReactToastify.css";
import arrLogic from "./logic";
import AppReducer from "./reducers";

import { mode, EnviornmentTypes } from "./config/AppConfig";
const logicMiddleware = createLogicMiddleware(arrLogic);
const history = createBrowserHistory();
const middlewares = [logicMiddleware, routerMiddleware(history)];

if (mode === EnviornmentTypes.DEV) {
  middlewares.push(logger);
}
export const store = createStore(AppReducer, applyMiddleware(...middlewares));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <React.Suspense fallback={<FullPageLoader />}>
            <Switch>
              <Route exact={false} path="/" component={DefaultLayout} />
              <Redirect to="/" />
            </Switch>
          </React.Suspense>
          <ToastContainer
            position={toast.POSITION.TOP_RIGHT}
            autoClose={8000}
            hideProgressBar
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            transition={Zoom}
          />
        </Router>
      </Provider>
    );
  }
}

export default App;
