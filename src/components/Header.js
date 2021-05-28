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
import { getBnbPrice } from "../api/getBnbUsdt";
import useWeb3Store from "../stores/useWeb3Store";

export default function Header() {
  const {
    userAddress,
    initMetaMask,
    isConnectWalletSuccess,
    closeConnectWalletModel,
    isShowConnectWalletSuccess,
  } = useWeb3Store();

  const [bnbPrice, setBnbPrice] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorMetamaskInstallModal, setErrorMetamaskInstallModal] = useState(
    false
  );

  const handleConnectMetamask = async () => {
    await initMetaMask();
  };

  const isHaveUser =
    typeof userAddress !== "undefined" &&
    userAddress !== null &&
    userAddress !== "";

  useEffect(() => {
    async function _fetchData() {
      setBnbPrice(await getBnbPrice());
      setInterval(async () => {
        setBnbPrice(await getBnbPrice());
      }, 3000);
    }
    _fetchData();
  }, []);

  var _userAddress = userAddress;
  if (userAddress && userAddress.length >= 8) {
    _userAddress = userAddress.substring(0, 8) + "...";
  }

  return (
    <>
      <div className="top-navbar-container mb-4">
        <Navbar
          className="top-navbar pt-2 pl-5 pr-5"
          fixed="top"
          collapseOnSelect
          variant="dark"
        >
          <Navbar.Brand href="#" className="align-items-end">
            <img
              alt=""
              src="/logo-removebg.png"
              width="42"
              height="42"
              className="ml-5 d-inline-block align-top mr-1"
            />
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
          </Nav>
          <Nav>
            <InputGroup className="">
              <InputGroup.Prepend className="search-prepend">
                <InputGroup.Text id="basic-addon1">
                  <span className="fa fa-search form-control-feedback"></span>
                </InputGroup.Text>
              </InputGroup.Prepend>

              <FormControl
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
                  {_userAddress}
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
          open={isShowConnectWalletSuccess}
          toggle={() => closeConnectWalletModel()}
          onConfirm={() => closeConnectWalletModel()}
        >
          Connect user Metamask success!
        </SuccessModal>
      </div>

      <Container className="bnb-price mt-4 pr-3">
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
