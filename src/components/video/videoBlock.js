import { Col, Image, Row } from "react-bootstrap";

import FlowBlock from '../flow/flowBlock'

export default function VideoBlock() {
  const imgSrc = "/cover.jpeg";

  return (
    <Col className="">
      {[1, 2, 3].map((val) => (
        <Row className="mb-4 fadein">
          <Col xs>
          <FlowBlock/>
          </Col>
          <Col xs>
          <FlowBlock/>
          </Col>
          <Col xs>
          <FlowBlock/>
          </Col>
          {/* <Col>
            <Image src={imgSrc} rounded fluid />
          </Col>
          <Col>
            <Image src={imgSrc} rounded fluid />
          </Col> */}
        </Row>
      ))}
    </Col>
  );
}
