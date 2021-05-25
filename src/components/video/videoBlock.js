import { Col, Image, Row } from "react-bootstrap";

import FlowBlock from "../flow/flowBlock";

export default function VideoBlock({ allNft }) {
  // const imgSrc = "/cover.jpeg";

  return (
    <Col className="">
      <Row>
        {Object.keys(allNft || {}).map(function (key, i) {
            if (allNft[key].type === "video") {
            return (
              <Col key={key} xs={4} className="mb-4 fadein">
                <FlowBlock
                  imgSrc={allNft[key].baseTokenURI}
                  title={allNft[key].type}
                  subTitle={allNft[key].name}
                  caption={allNft[key].couponTokenSymbol}
                />
              </Col>
            );
          }
          return <></>;
        })}
      </Row>
    </Col>
  );
}
