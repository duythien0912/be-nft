import { Col, Image, Row, Container, Button } from "react-bootstrap";
import "./marketPage.css";

export default function MarketPage() {
  return (
    <div className="market-container fadein">
      <div className="market-bg-image"></div>
      {/* <Image className="market-bg" src="/market-bg.jpeg" fluid></Image> */}
      <Container className="market-bg-text">
        <Row className="justify-content-center mb-4 pb-2">
          <h1 className="market-heading">CREATE & TRADE YOUR MUSIC NFT'S</h1>
        </Row>
        <Row className="mb-4 pb-2">
          <Col className="text-right">
            <Button className="text-center music-btn">ISSUE NEW NFT</Button>
          </Col>
          <Col className="text-left">
            <Button className="text-center normal-btn">NFT VIDEO SOCIAL</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
