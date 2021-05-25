import React, { useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  Button,
  FormControl,
  InputGroup,
  Row,
  Col,
  Image,
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
      setUserAddress(window?.userAddress);
      setBnbPrice(await getBnbPrice());
      setInterval(async () => {
        setBnbPrice(await getBnbPrice());
      }, 3000);
    }
    _fetchData();
  }, []);
  return (
    <>
      <div className="top-navbar-container mb-4">
        <Navbar
          className="top-navbar pt-2 pl-5 pr-5"
          fixed="top"
          collapseOnSelect
          variant="dark"
        >
          <Navbar.Brand href="#">
            {/* <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            /> */}
            BE COIN
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="mr-auto">
            <Nav.Link className="menu-btn menu-main-btn" href="#market">
              Market
            </Nav.Link>
            <Nav.Link className="menu-btn menu-account" href="#account">
              Account
              <div className="menu-dot"></div>
            </Nav.Link>
            <Nav.Link className="menu-btn" href="#nft">
              NFT
            </Nav.Link>
            {/* <Nav.Link className="menu-btn" href="#create-coupon">
              Create Coupon
            </Nav.Link>
            <Nav.Link className="menu-btn" href="#token-faucet">
              Faucet
            </Nav.Link> */}
          </Nav>
          <Nav>
            <InputGroup className="">
              <InputGroup.Prepend className="search-prepend">
                <InputGroup.Text id="basic-addon1">
                  <span class="fa fa-search form-control-feedback"></span>
                </InputGroup.Text>
              </InputGroup.Prepend>

              <FormControl
                icon
                type="text"
                placeholder="Search..."
                className="header-search mr-sm-2"
              />
            </InputGroup>
          </Nav>
          <Nav>
            {isHaveUser ? (
              <Nav.Link
                href="#0"
                className="ml-3 user-profile-menu justify-content-center align-items-center"
              >
                <Row className="justify-content-center align-items-center">
                  <Image src="/user.svg" className="coin-logo mr-2" />
                  {userAddress.length >= 8
                    ? userAddress.substring(0, 8) + "..."
                    : userAddress}
                </Row>
              </Nav.Link>
            ) : (
              <Button className="login-btn" onClick={handleConnectMetamask}>
                Connect Metamask
              </Button>
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

      <Container className="bnb-price mt-2 pr-3">
        <Row>
          <Col></Col>
          <div className="mr-4 pr-2">
            <span style={{ display: "flex" }}>
              <span style={{ height: "25px", color: "transparent" }}>
                Loading...
              </span>
              {bnbPrice && (
                <div className="fadein">
                  <Image src="/bnb.png" className="coin-logo" />

                  <span className="coin-name">1 BNB ≈ </span>
                  <Image src="/usdt.svg" className="coin-logo" />
                  <span className="coin-name">
                    {bnbPrice.substr(0, bnbPrice.length - 6)} USDT
                  </span>
                </div>
              )}
            </span>
          </div>
        </Row>
      </Container>
    </>
  );
}
