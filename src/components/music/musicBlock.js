import { Col, Image, Row } from "react-bootstrap";

export default function MusicBlock() {
  const imgSrc = "/cover.jpeg";

  return (
    <Row xs={12} className="m-0">
      <Col className="">
        {[1, 2, 3].map((val) => (
          <Row className="mb-4 fadein">
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
    </Row>
  );
}
