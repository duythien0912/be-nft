import { Col, Image, Row } from "react-bootstrap";

export default function FlowBlock() {
  const imgSrc = "/cover.jpeg";
  return (
    <div className="fadein flow-block">
      <Image className="img-bg-flow-block" src={imgSrc} rounded fluid></Image>
      <div className="bg-flow-block"></div>
      <div className="left-bg-flow-block"></div>
      <div className="content-block">
        <Row>
          <Col className="mr-4 cover-block" xs>
            <Image
              className="flow-main-image"
              src={imgSrc}
              rounded
              fluid
            ></Image>
            <button
              className="cover-block-btn"
              type="button"
              aria-pressed="false"
              aria-label="play"
            >
              <span className="ml-1">&#x25b6;</span>
              
              {/* <span className="ml-1">&#43;</span> */}
            </button>
          </Col>
          <Col className="align-self-center flow-title-block" xs>
            <Row className="justify-content-center">
              <h6 className="flow-body-text mt-2">Flow</h6>
            </Row>
            <Row className="justify-content-center">
              <p>Your Personal Soundtrack</p>
            </Row>
            <Row className="mt-4"></Row>
            <Row className="justify-content-center">
              <p className="flow-caption">Based on your listening history</p>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
