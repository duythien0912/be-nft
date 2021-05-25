import { Col, Image, Row, Container, Button, Nav } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import ImageBlock from "../image/imageBlock";
import MusicTable from "../music/musicTable";
import VideoBlock from "../video/videoBlock";
import CreateNft from "../CreateNft";

import "./accountPage.css";

export default function AccountPage() {
  var profileImg = "/profile.svg";
  const [bodyTabKey, setTabKey] = useState("mintNFT");

  return (
    <>
      <Container className="w-75  ">
        <div className="mt-5 pt-5 fadein"></div>
        <Row className="justify-content-center mb-4">
          <Image className="ml-4" roundedCircle fluid src={profileImg}></Image>
          <Col className="text-left pt-2">
            <p className="display-6 mb-1 font-weight-bold">Anonymous</p>
            <p>{window.userAddress}</p>
          </Col>
          <Button className="align-self-center text-center normal-btn">
            EDIT
          </Button>
        </Row>

        <Nav
          bg="dark"
          variant="dark"
          onSelect={(k) => setTabKey(k)}
          defaultActiveKey={bodyTabKey}
        >
          {/* <Nav.Item>
            <Nav.Link
              className={`tab-title font-weight-bold display-6 ${
                bodyTabKey && bodyTabKey === "myNFT" && "tab-title-active"
              }`}
              eventKey="myNFT"
            >
              MY NFTS
            </Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link
              className={`tab-title font-weight-bold display-6 ${
                bodyTabKey && bodyTabKey === "mintNFT" && "tab-title-active"
              }`}
              eventKey="mintNFT"
            >
              MINT NFTS
            </Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link
              className={`tab-title font-weight-bold display-6 ${
                bodyTabKey &&
                bodyTabKey === "configAccount" &&
                "tab-title-active"
              }`}
              eventKey="configAccount"
            >
              CONFIG
            </Nav.Link>
          </Nav.Item> */}
        </Nav>

        {bodyTabKey && bodyTabKey === "myNFT" && (
          <div className="fadein">
            <Container className="mt-4">
              <Col>
                <Row className="">
                  <h2 className="font-weight-bold display-6">Music</h2>
                </Row>
              </Col>
            </Container>
            <MusicTable />
            <div className="dropdown-divider m-5"></div>
            <Container className="mb-3">
              <Col>
                <Row className="">
                  <h2 className="font-weight-bold display-6">Image</h2>
                </Row>
              </Col>
            </Container>
            <ImageBlock />
            <div className="dropdown-divider m-5"></div>
            <Container className="mb-3">
              <Col>
                <Row className="">
                  <h2 className="font-weight-bold display-6">Video</h2>
                </Row>
              </Col>
            </Container>
            <VideoBlock />
          </div>
        )}
        {bodyTabKey && bodyTabKey === "mintNFT" && (
          <>
            <div className="fadein mb-5 pb-5">
              <CreateNft />
            </div>
          </>
        )}
        {bodyTabKey && bodyTabKey === "configAccount" && (
          <div className="fadein">
            <p className="mt-5 pt-5 display-2">COMING SOON</p>
          </div>
        )}
      </Container>
    </>
  );
}
