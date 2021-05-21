import React, { useState } from "react";
import {
  Nav,
  Navbar,
  Image,
  Button
} from "react-bootstrap";

import AlertModal from "./AlertModal";
import { initContract } from "../web3/init";

export default function Header() {
  const [errorModal, setErrorModal] = useState(false);

  const handleConnectMetamask = () => {
    if (isMetamaskInstalled()) {
      initContract();
    } else {
      setErrorModal(true);
    }
  };

  const isMetamaskInstalled = () => {
    return (typeof window.ethereum !== 'undefined');
  }

  return (
    <div>
      <Navbar collapseOnSelect bg="light" variant="light">
        <Navbar.Brand href="#">
          BSC BE COIN
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link href="#create-coupon">Create Coupon</Nav.Link>
          <Nav.Link href="#token-faucet">Faucet</Nav.Link>
        </Nav>
        <Nav>
          <Button
            onClick={handleConnectMetamask}
            >Connect Metamask
          </Button>
        </Nav>
      </Navbar>

      <AlertModal
        open={errorModal}
        toggle={() => setErrorModal(false)}
      >
        You should connect with Metamask.            
      </AlertModal>
    </div>
  )
}
