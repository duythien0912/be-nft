import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardDeck,
  Image,
  Figure,
  Container,
  Row,
  Col,
  Nav,
} from "react-bootstrap";
import { time } from "../web3/time";
import Loading from "./Loading";
import { initContractWithOutAccount } from "../web3/init";

import MusicBlock from "./music/musicBlock";
import MusicTable from "./music/musicTable";
import PlayListBlock from "./music/playListBlock";
import ImageBlock from "./image/imageBlock";
import VideoBlock from "./video/videoBlock";
import FlowBlock from "./flow/flowBlock";

export default function Main() {
  const bnb = "0x2B8fF854c5e16cF35B9A792390Cc3a2a60Ec9ba2";
  const [bodyTabKey, setTabKey] = useState("music");
  const [listCoupons, setCoupons] = useState([]);
  const [allNft, setAllNft] = useState({});
  const [loading, setLoading] = useState(true);
  const [noMetamask, setNoMetamask] = useState(false);

  const createSubArray = (coupons) => {
    let chunks = [];

    while (coupons.length > 4) {
      chunks.push(coupons.splice(0, 4));
    }

    if (coupons.length > 0) {
      chunks.push(coupons);
    }

    console.log("[chunks] :", chunks);

    setCoupons(chunks);
  };

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

      if (i === 0) {
        createSubArray(allCoupons);
      }
    }

    console.log("allCoupons", allCoupons);
    console.log("allCouponsMap", allCouponsMap);
    console.log("couponCount", couponCount);
    setAllNft(allCouponsMap);
    console.log("allNft:  =>", allNft);
    setLoading(false);
  };

  const isMetamaskInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

  useEffect(() => {
    if (!isMetamaskInstalled()) {
      setLoading(false);
      setNoMetamask(true);
    } else if (listCoupons.length === 0) {
      getCoupons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function DisplayCard({ coupon, count }) {
    return (
      <Card key={count} className="display-coupon-card">
        {/* <Link
          key={count}
          style={{ textDecoration: "none" }}
          to={`/view/${coupon.couponAddress}/${coupon.couponTokenSymbol}/${
            coupon.ticketBuyToken === bnb ? "BNB" : "USDC"
          }`}
        > */}
        <Card.Header style={{ marginBottom: "5px" }}>
          <Image src={coupon.baseTokenURI} width="50px"></Image>
          <span> {coupon.couponTokenName} Coupon</span>
        </Card.Header>

        <Card.Body>
          <div style={{ marginBottom: "10px" }}>
            Price: {coupon.ticketPrice}
            <span> {coupon.ticketBuyToken === bnb ? "BNB" : "USDC"}</span>
          </div>
        </Card.Body>
        {/* </Link> */}
      </Card>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mb-5 pb-5">
      {/* {!noMetamask ? (
        listCoupons.map((element, key) =>
          element.length === 4 ? (
            <CardDeck key={key} style={{ margin: "2%" }}>
              {element.map((coupon, k) => (
                <DisplayCard key={k} coupon={coupon} count={k} />
              ))}
            </CardDeck>
          ) : (
            <CardDeck key={key} style={{ margin: "2%" }}>
              {element.map((coupon, k) => (
                <DisplayCard key={k} coupon={coupon} count={k} />
              ))}

              {[...Array(4 - element.length)].map((x, i) => (
                <Card
                  key={element.length + i + 1}
                  className="hidden-card"
                ></Card>
              ))}
            </CardDeck>
          )
        )
      ) : (
        <div
          className="alert-message"
          style={{ marginTop: "20%", fontSize: "x-large" }}
        >
          You don't have metamask. Please install first !!
        </div>
      )} */}
      <Container className="mb-4">
        <Col>
          <Row className="ml-2 mt-5 mb-2">
            <h2 className="font-weight-bold display-6">Highlights NFT</h2>
          </Row>
          <Row>
            {Object.keys(allNft || {}).map(function (key, i) {
              if (i < 3) {
                return (
                  <Col xs>
                    <FlowBlock
                      imgSrc={allNft[key].baseTokenURI}
                      title={allNft[key].type}
                      subTitle={allNft[key].name}
                      caption={allNft[key].couponTokenSymbol}
                    />
                  </Col>
                );
              }
              return <></>;
            })}
          </Row>
        </Col>
      </Container>
      <Container className="pt-0 mb-5">
        <Col className="p-0">
          <Row className="ml-4 mb-5 mt-5">
            <Nav
              bg="dark"
              variant="dark"
              onSelect={(k) => setTabKey(k)}
              defaultActiveKey={bodyTabKey}
            >
              <Nav.Item>
                <Nav.Link
                  className={`tab-title font-weight-bold display-6 ${
                    bodyTabKey && bodyTabKey === "music" && "tab-title-active"
                  }`}
                  eventKey="music"
                >
                  MUSIC
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className={`tab-title font-weight-bold display-6 ${
                    bodyTabKey && bodyTabKey === "image" && "tab-title-active"
                  }`}
                  eventKey="image"
                >
                  IMAGE
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className={`tab-title font-weight-bold display-6 ${
                    bodyTabKey && bodyTabKey === "video" && "tab-title-active"
                  }`}
                  eventKey="video"
                >
                  VIDEO
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          {bodyTabKey && bodyTabKey === "music" && (
            <>
              <PlayListBlock allNft={allNft} />
              <MusicTable allNft={allNft} />
            </>
          )}
          {bodyTabKey && bodyTabKey === "image" && (
            <>
              <ImageBlock allNft={allNft} />
            </>
          )}
          {bodyTabKey && bodyTabKey === "video" && <VideoBlock allNft={allNft} />}
        </Col>
      </Container>
    </div>
  );
}
