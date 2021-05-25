import { Col, Image, Row } from "react-bootstrap";

export default function FlowBlock({
  imgSrc = "/cover.jpeg",
  href = "",
  title = "Flow",
  subTitle = "Your Personal Soundtrack",
  caption = "Based on your listening history",
}) {
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
              height={160}
              width={160}
              fluid
            ></Image>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="cover-block-btn"
                type="button"
                aria-pressed="false"
                aria-label="play"
                role="button"
              >
                <span className="ml-1 pt-2">&#x25b6;</span>
              </a>
            )}
          </Col>
          <Col className="align-self-center flow-title-block" xs>
            <Row className="justify-content-center">
              <h6 className="flow-body-text mt-2">{title}</h6>
            </Row>
            <Row className="justify-content-center">
              <p>{subTitle}</p>
            </Row>
            <Row className="mt-0"></Row>
            <Row className="justify-content-center">
              <p className="caption">{caption}</p>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
