import React, { useEffect } from "react";
import { PersistGate } from "zustand-persist";
import AlertModal from "./components/AlertModal";
import { Switch, HashRouter, Route, Redirect } from "react-router-dom";

import history from "./components/history";
import Header from "./components/Header";
import CreateCoupon from "./components/CreateCoupon";
import MarketPage from "./components/market/marketPage";
import AccountPage from "./components/account/accountPage";
import Main from "./components/Main";
import ViewCoupon from "./components/ViewCoupon";
import Faucet from "./components/Faucet";
import NftPage from "./components/nft/nftPage";

import useWeb3Store from "./stores/useWeb3Store";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const {
    init,
    bePublicContract,
    isWarningWallet,
    closeModel,
  } = useWeb3Store();

  useEffect(() => {
    init();
  }, []);

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
      <Route path="/nft" exact>
        <NftPage />
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

  if (bePublicContract == null) return <></>;

  return (
    <>
      <PersistGate>
        <div className="App">
          <HashRouter history={history}>
            <Header />
            {routes}
          </HashRouter>
        </div>
        <AlertModal
          open={isWarningWallet}
          toggle={() => {
            closeModel();
          }}
        >
          <div>
            {typeof window.ethereum === "undefined" ? (
              <>
                <div>You should install Metamask first.</div>
                <a
                  className="text-break yellow-text"
                  target="_blank"
                  rel="noreferrer"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                >
                  https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
                </a>
              </>
            ) : (
              <>
                <p>
                  Please connect to Metamask and setup BSC testnet to use.
                  <br />
                  <a
                    className="text-break yellow-text"
                    href="https://academy.binance.com/articles/how-to-use-metamask"
                  >
                    https://academy.binance.com/vi/articles/how-to-use-metamask
                  </a>
                </p>

                <p></p>
                <p>
                  Hint: you can get some BNB test net on here{" "}
                  <a
                    className="text-break yellow-text"
                    href="https://testnet.binance.org/faucet-smart"
                  >
                    https://testnet.binance.org/faucet-smart
                  </a>
                </p>
              </>
            )}
          </div>
        </AlertModal>
      </PersistGate>
    </>
  );
}

export default App;
