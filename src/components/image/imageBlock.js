import { Col, Image, Row } from "react-bootstrap";

export default function ImageBlock() {
  const imgSrc = "/cover.jpeg";
  return (
    <Col className="">
      {[1, 2, 3].map((val) => (
        <Row className="mb-4 fadein">
          {[1, 2, 3, 4, 5, 6].map((val) => (
            <Col>
              <div className="image-block">
                <Image src={imgSrc} fluid />
                <p className="title text-left pt-1 pl-2 pr-2 pb-1 mb-0">
                  90s Alternative Rock
                </p>
                <p className="text-left pb-1 pl-2 pr-2 pt-0  mb-0 caption">
                  &hearts; 711,692
                </p>
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </Col>
  );
}
