import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import { Switch, HashRouter, Route, Redirect } from "react-router-dom";
import history from "./components/history";
import Header from "./components/Header";
import CreateCoupon from "./components/CreateCoupon";
import MarketPage from "./components/market/marketPage";
import AccountPage from "./components/account/accountPage";
import Main from "./components/Main";
import ViewCoupon from "./components/ViewCoupon";
import Faucet from "./components/Faucet";

function App() {
  const routes = (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/create-coupon" exact>
        <CreateCoupon />
      </Route>
      <Route path="/market" exact>
        <MarketPage />
      </Route>
      <Route path="/account" exact>
        <AccountPage />
      </Route>
      <Route path="/view/:couponAddress/:nftToken/:buyToken" exact>
        <ViewCoupon />
      </Route>
      <Route path="/token-faucet" exact>
        <Faucet />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      <HashRouter history={history}>
        <Header />
        {routes}
      </HashRouter>
    </div>
  );
}

export default App;
