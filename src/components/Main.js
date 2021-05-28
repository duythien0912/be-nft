import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Loading from "./Loading";

import MusicTable from "./music/musicTable";
import PlayListBlock from "./music/playListBlock";
import ImageBlock from "./image/imageBlock";
import VideoBlock from "./video/videoBlock";
import FlowBlock from "./flow/flowBlock";

import useWeb3Store from "../stores/useWeb3Store";

export default function Main() {
  const { bePublicContract } = useWeb3Store();

  const [bodyTabKey, setTabKey] = useState("music");
  const [allNft, setAllNft] = useState({});
  const [loading, setLoading] = useState(true);

  const getCoupons = async () => {
    if (bePublicContract == null) {
      return;
    }
    const allCoupons = [];
    const allCouponsMap = {};
    const couponCount = await bePublicContract.methods.totalCoupons().call();
    // const couponCount = 5;

    if (Number(couponCount) === 0) {
      setLoading(false);
    }

    for (let i = couponCount - 1; i >= 0; i--) {
      const distCoupon = await bePublicContract.methods.allCoupons(i).call();

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

    console.log("allCoupons", allCoupons);
    console.log("allCouponsMap", allCouponsMap);
    console.log("couponCount", couponCount);
    console.log("allNft:  =>", allNft);

    setAllNft(allCouponsMap);
    setLoading(false);
  };

  useEffect(() => {
    if (Object.values(allNft || {}).length === 0) {
      getCoupons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mb-5 pb-5">
      <Container className="mb-4">
        <Col>
          <Row className="ml-2 mt-5 mb-2">
            <h2 className="font-weight-bold display-6">Highlights NFT</h2>
          </Row>
          <Row>
            {Object.keys(allNft || {}).map(function (_key, i) {
              if (i < 3) {
                return (
                  <Col xs key={_key}>
                    <FlowBlock
                      imgSrc={allNft[_key].baseTokenURI}
                      title={allNft[_key].type}
                      subTitle={allNft[_key].name}
                      caption={allNft[_key].couponTokenSymbol}
                      href={allNft[_key].dataURI || ""}
                    />
                  </Col>
                );
              }
              return null;
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
          {bodyTabKey && bodyTabKey === "video" && (
            <VideoBlock allNft={allNft} />
          )}
        </Col>
      </Container>
    </div>
  );
}
