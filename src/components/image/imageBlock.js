import { Col, Image, Row } from "react-bootstrap";

export default function ImageBlock() {
    const imgSrc =
    "/cover.jpeg";
  return (
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
