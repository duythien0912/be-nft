import { Col, Image, Row, Container, Button } from "react-bootstrap";
import "./marketPage.css";

export default function MarketPage() {
  const imgSrc = "/cover.jpeg";

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
            <Button className="text-center music-btn">ISSUE NEW NFT</Button>
          </Col>
          <Col className="text-left">
            <Button className="text-center normal-btn">TUTORIAL MINT NFT</Button>
          </Col>
        </Row>
      </Container>
      <div className="pb-5"></div>
      <div className="ml-5 mr-5 pl-5 pr-5">
        {[1, 2, 3, 4].map((val) => (
          <Container className=" mt-5 nft-card pt-4 pb-4">
            <div className="">
              <Row xs={12} className="m-0 align-items-center">
                <Col xs={2} className="">
                  <Image className="fadein" src={imgSrc} rounded fluid />
                </Col>
                <Col xs={8} className="text-left">
                  <p className="display-6">Guitar Solos</p>
                  <p className="gray-text mt-2">BY NICK WARREN</p>
                  <p className="gray-text caption">
                    I AM REALLY EXCITED TO BE PART OF THE ROCKI FAMILY WITH THIS
                    NEW NFT RELEASE AND THIS IS A TRACK I WROTE ESPECIALLY FOR
                    THIS. PLEASE JOIN IN AND SHARE THE EXPERIENCE WITH US, ONLY
                    50 PIECES AVAILABLE.
                  </p>
                </Col>
                <Col xs={2} className="text-right">
                  <Button className="music-btn">BUY IN NFT</Button>
                  <div className="pb-3"></div>
                  <Button className="normal-btn">SHOW LIST</Button>
                  <div className="pb-2"></div>
                </Col>
              </Row>
            </div>
          </Container>
        ))}
      </div>
      <div className="pb-5"></div>
      <div className="pb-5"></div>
    </div>
  );
}
