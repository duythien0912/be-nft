import React, { useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  Button,
  FormControl,
  InputGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";

import AlertModal from "./AlertModal";
import SuccessModal from "./SuccessModal";
import { initContract } from "../web3/init";
import { getBnbPrice } from "../api/getBnbUsdt";

export default function Header() {
  const [userAddress, setUserAddress] = useState("");
  const [bnbPrice, setBnbPrice] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMetamaskInstallModal, setErrorMetamaskInstallModal] = useState(
    false
  );

  const handleConnectMetamask = async () => {
    console.log("window.userAddress", window.userAddress);
    console.log("window.ethereum", window.ethereum);
    if (!isMetamaskInstalled() || !isHaveUserAddressAddress()) {
      await initContract();
    }

    if (isMetamaskInstalled() && isHaveUserAddressAddress()) {
      setSuccessModal(true);
      setUserAddress(window.userAddress);
    }
  };

  const isMetamaskInstalled = () => {
    if (typeof window.ethereum === "undefined") {
      setErrorMetamaskInstallModal(true);
    }
    return typeof window.ethereum !== "undefined";
  };

  const isHaveUserAddressAddress = () => {
    if (typeof window.userAddress === "undefined") {
      //      setErrorModal(true);
    }
    return typeof window.userAddress !== "undefined";
  };

  const isHaveUser =
    typeof window.userAddress !== "undefined" &&
    userAddress !== null &&
    userAddress !== "";

  useEffect(() => {
    async function _fetchData() {
      await initContract();
      setInterval(async () => {
        setBnbPrice(await getBnbPrice());
      }, 3000);
    }
    _fetchData();
  }, []);
  return (
    <>
      <div className="top-navbar-container">
        <Navbar
          className="top-navbar"
          fixed="top"
          collapseOnSelect
          variant="dark"
        >
          <Navbar.Brand href="#">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            BSC BE COIN
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="mr-auto">
            <Nav.Link href="#create-coupon">Create Coupon</Nav.Link>
            <Nav.Link href="#token-faucet">Faucet</Nav.Link>
            <Nav.Link href="#create-coupon">NFT</Nav.Link>
            <Nav.Link href="#token-faucet">Account</Nav.Link>
            <Nav.Link href="#token-faucet">Music</Nav.Link>
          </Nav>
          <Nav>
            <InputGroup className="">
              <FormControl
                icon
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </InputGroup>
          </Nav>
          <Nav>
            {isHaveUser ? (
              <Nav.Link href="#0">
                {userAddress.length >= 8
                  ? userAddress.substring(0, 8) + "..."
                  : userAddress}
              </Nav.Link>
            ) : (
              <Button onClick={handleConnectMetamask}>Connect Metamask</Button>
            )}
          </Nav>
        </Navbar>
        <AlertModal open={errorModal} toggle={() => setErrorModal(false)}>
          You should connect with Metamask.
        </AlertModal>

        <AlertModal
          open={errorMetamaskInstallModal}
          toggle={() => setErrorMetamaskInstallModal(false)}
        >
          You need install Metamask.
        </AlertModal>

        <AlertModal
          open={errorMetamaskInstallModal}
          toggle={() => setErrorMetamaskInstallModal(false)}
        >
          You need install Metamask.
        </AlertModal>

        <SuccessModal
          open={successModal}
          toggle={() => setSuccessModal(false)}
          onConfirm={() => setSuccessModal(false)}
        >
          Connect user Metamask success!
        </SuccessModal>
      </div>

      <Container className="bnb-price mt-0">
        <Row>
          <Col></Col>
          {bnbPrice && (
            <p className="">
              1 BNB = {bnbPrice.substr(0, bnbPrice.length - 6)} USDT
            </p>
          )}
        </Row>
      </Container>
    </>
  );
}
