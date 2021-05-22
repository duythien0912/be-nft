import { Col, Image, Row } from "react-bootstrap";

export default function VideoBlock() {
  return (
    <Col>
      {[1, 2, 3].map((val) => (
        <Row className="mb-4">
          <Col>
            <Image src="https://placeholder.pics/svg/800" rounded fluid />
          </Col>
          <Col>
            <Image src="https://placeholder.pics/svg/800" rounded fluid />
          </Col>
          <Col>
            <Image src="https://placeholder.pics/svg/800" rounded fluid />
          </Col>
        </Row>
      ))}
    </Col>
  );
}
