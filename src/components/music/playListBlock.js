import { Col, Image, Row, Button } from "react-bootstrap";

export default function PlayListBlock() {
  const imgSrc = "/cover.jpeg";

  return (
    <div className="pb-5">
      <Row xs={12} className="m-0 mb-5 align-items-center">
        <Col xs={2} className="">
          <Image className="fadein" src={imgSrc} rounded fluid />
        </Col>
        <Col xs={8} className="text-left">
          <p className="">Playlist</p>
          <p className="display-4 font-weight-bold ">TOP MUSIC CHART</p>
          <p className="display-6">Golden age of rock. Cover: Led Zeppelin</p>
          <p className="caption">88 Songs, 9 hr 13 min</p>
        </Col>
        <Col xs={2} className="text-right">
          <Button className="music-btn">Play</Button>
        </Col>
      </Row>
    </div>
  );
}
