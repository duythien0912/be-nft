import React, { useEffect, useState } from "react";
import { Col, Image, Row, Container, Button } from "react-bootstrap";

import Loading from "../Loading";
import useWeb3Store from "../../stores/useWeb3Store";

import "./marketPage.css";

export default function MarketPage() {
  const { bePublicContract } = useWeb3Store();

  const [allNft, setAllNft] = useState({});
  const [loading, setLoading] = useState(true);

  const getCoupons = async () => {
    if (bePublicContract == null) {
      return;
    }
    const allCouponsMap = {};
    const couponCount = await bePublicContract.methods.totalCoupons().call();

    if (Number(couponCount) === 0) {
      setLoading(false);
    }

    for (let i = couponCount - 1; i >= 0; i--) {
      const distCoupon = await bePublicContract.methods.allCoupons(i).call();

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

  useEffect(() => {
    if (Object.values(allNft || {}).length === 0) {
      getCoupons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="market-container fadein">
      <div className="market-bg-image"></div>
      <Container className="market-bg-text ">
        <Row className="justify-content-center mb-4 pb-2">
          <h1 className="market-heading">CREATE & TRADE YOUR MUSIC NFT'S</h1>
        </Row>
        <Row className="mb-4 pb-2">
          <Col className="text-right">
            <a
              href="#account"
              className="text-center music-btn"
              style={{ width: 238 }}
            >
              ISSUE NEW NFT
            </a>
          </Col>
          <Col className="text-left">
            <Button className="text-center normal-btn" style={{ width: 238 }}>
              TUTORIAL MINT NFT
            </Button>
          </Col>
        </Row>
      </Container>
      {loading && <Loading />}
      <div className="pb-5"></div>
      {!loading && (
        <div className="ml-5 mr-5 pl-5 pr-5">
          {Object.keys(allNft || {}).map(function (key, i) {
            return (
              <Container key={key} className=" mt-5 nft-card pt-4 pb-4">
                <div className="">
                  <Row xs={12} className="m-0 align-items-center">
                    <Col xs={2} className="">
                      <a
                        data-fancybox={
                          allNft[key].type === "image" ? "gallery" : true
                        }
                        data-type={
                          allNft[key].type === "image" ? null : "iframe"
                        }
                        data-src={
                          allNft[key].dataURI || allNft[key].baseTokenURI
                        }
                        href="javascript:void(0)"
                      >
                        <Image
                          loading="lazy"
                          className="fadein"
                          src={allNft[key].baseTokenURI}
                          rounded
                          fluid
                        />
                      </a>
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
                      <div className="pb-3"></div>

                      <div className="pb-2"></div>
                    </Col>
                  </Row>
                </div>
              </Container>
            );
          })}
        </div>
      )}
      <div className="pb-5"></div>
      <div className="pb-5"></div>
    </div>
  );
}
