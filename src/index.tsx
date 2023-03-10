import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  // <BrowserRouter>
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
  // </BrowserRouter>,
);
