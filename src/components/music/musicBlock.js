import { Col, Image, Row } from "react-bootstrap";

export default function MusicBlock() {
  const imgSrc = "/cover.jpeg";

  return (
    <Col>
      {[1, 2, 3].map((val) => (
        <Row className="mb-4">
          <Col>
            <Image src={imgSrc} rounded fluid />
          </Col>
          <Col>
            <Image src={imgSrc} rounded fluid />
          </Col>
          <Col>
            <Image src={imgSrc} rounded fluid />
          </Col>
        </Row>
      ))}
    </Col>
  );
}
