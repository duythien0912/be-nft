import React, { useEffect, useState } from "react";
import { Col, Image, Row, Container, Button } from "react-bootstrap";
import { initContractWithOutAccount } from "../../web3/init";
import Loading from "../Loading";

import "./marketPage.css";

export default function MarketPage() {
  const imgSrc = "/cover.jpeg";
  const [allNft, setAllNft] = useState({});
  const [loading, setLoading] = useState(true);

  const getCoupons = async () => {
    if (window.couponFactory == null) {
      await initContractWithOutAccount();
      getCoupons();
      return;
    }
    const allCoupons = [];
    const allCouponsMap = {};
    const couponCount = await window.couponFactory.methods
      .totalCoupons()
      .call();

    if (Number(couponCount) === 0) {
      setLoading(false);
    }

    for (let i = couponCount - 1; i >= 0; i--) {
      const distCoupon = await window.couponFactory.methods
        .allCoupons(i)
        .call();

      allCoupons.push(distCoupon);
      if (
        distCoupon.couponTokenName &&
        distCoupon.couponTokenName.includes("|")
      ) {
        distCoupon.type = distCoupon.couponTokenName.split("|")[0];
        distCoupon.name = distCoupon.couponTokenName.split("|")[1];
      }
      allCouponsMap[distCoupon.couponAddress] = distCoupon;
    }

    setAllNft(allCouponsMap);
    setLoading(false);
  };

  const isMetamaskInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

  useEffect(() => {
    if (!isMetamaskInstalled()) {
      setLoading(false);
    } else if (Object.values(allNft || {}).length === 0) {
      getCoupons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="market-container fadein">
      <div className="market-bg-image"></div>
      {/* <Image className="market-bg" src="/market-bg.jpeg" fluid></Image> */}
      <Container className="market-bg-text ">
        <Row className="justify-content-center mb-4 pb-2">
          <h1 className="market-heading">CREATE & TRADE YOUR MUSIC NFT'S</h1>
        </Row>
        <Row className="mb-4 pb-2">
          <Col className="text-right">
            <a href="#account" className="text-center music-btn" style={{width: 238}}>
              ISSUE NEW NFT
            </a>
          </Col>
          <Col className="text-left">
            <Button className="text-center normal-btn" style={{width: 238}}>
              TUTORIAL MINT NFT
            </Button>
          </Col>
        </Row>
      </Container>
      <div className="pb-5"></div>
      <div className="ml-5 mr-5 pl-5 pr-5">
        {Object.keys(allNft || {}).map(function (key, i) {
          return (
            <Container className=" mt-5 nft-card pt-4 pb-4">
              <div className="">
                <Row xs={12} className="m-0 align-items-center">
                  <Col xs={2} className="">
                    <Image
                      className="fadein"
                      src={allNft[key].baseTokenURI}
                      rounded
                      fluid
                    />
                  </Col>
                  <Col xs={8} className="text-left">
                    <p className="display-6">{allNft[key].name}</p>
                    <p className="gray-text mt-2">{allNft[key].name}</p>
                    <p className="gray-text caption">
                      {allNft[key].couponTokenSymbol}
                    </p>
                  </Col>
                  <Col xs={2} className="text-right">
                    <Button style={{ width: 200 }} className="music-btn">
                      {/* BUY THIS NFT */}
                      {allNft[key].ticketPrice} {allNft[key].description}
                    </Button>
                    {
                      <div className="pb-3"></div>
                      /* <Button style={{ width: 200 }} className="normal-btn">
                      {allNft[key].ticketPrice} {allNft[key].description}
                    </Button> */
                    }
                    <div className="pb-2"></div>
                  </Col>
                </Row>
              </div>
            </Container>
          );
        })}
      </div>
      <div className="pb-5"></div>
      <div className="pb-5"></div>
    </div>
  );
}
