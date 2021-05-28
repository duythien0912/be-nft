/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Image, Row } from "react-bootstrap";

export default function FlowBlock({
  imgSrc = "/cover.jpeg",
  href = "",
  title = "Flow",
  subTitle = "Your Personal Soundtrack",
  caption = "Based on your listening history",
}) {
  var bodyWidget = (
    <div className="fadein flow-block">
      <Image
        loading="lazy"
        className="img-bg-flow-block"
        src={imgSrc}
        rounded
        fluid
      ></Image>
      <div className="bg-flow-block"></div>
      <div className="left-bg-flow-block"></div>
      <div className="content-block">
        <Row>
          <Col className="mr-4 cover-block" xs>
            <Image
              loading="lazy"
              className="flow-main-image"
              src={imgSrc}
              rounded
              height={160}
              width={160}
              fluid
            ></Image>
            {href && (
              <div
                // href={href}
                // target="_blank"
                // rel="noreferrer"
                className="cover-block-btn"
                // type="button"
                // aria-pressed="false"
                // aria-label="play"
                // role="button"
              >
                <span className="ml-1 pt-2">&#x25b6;</span>
              </div>
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

  return (
    <div>
      <a
        data-fancybox
        data-type="iframe"
        data-src={href}
        href="javascript:void(0)"
      >
        {bodyWidget}
      </a>
    </div>
  );

  // if (title === "image")
  //   return (
  //     <div>
  //       <a href={imgSrc} data-fancybox="gallery">
  //         {bodyWidget}
  //       </a>
  //     </div>
  //   );
  // if (title === "video")
  //   return (
  //     <div>
  //       <a
  //         data-fancybox
  //         data-type="iframe"
  //         data-src={href}
  //         href="javascript:void(0)"
  //       >
  //         {bodyWidget}
  //       </a>
  //     </div>
  //   );
  // if (title === "music")
  //   return (
  //     <div>
  //       <a
  //         data-fancybox
  //         data-type="iframe"
  //         data-src={href}
  //         href="javascript:void(0)"
  //       >
  //         {bodyWidget}
  //       </a>
  //     </div>
  //   );
  // return bodyWidget;
}
