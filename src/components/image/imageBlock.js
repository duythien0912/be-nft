import { Col, Image, Row } from "react-bootstrap";

export default function ImageBlock({ allNft }) {
  // const imgSrc = "/cover.jpeg";

  return (
    <Col className="">
      <Row>
        {Object.keys(allNft || {}).map(function (key, i) {
          if (allNft[key].type === "image")
            return (
              <Col key={key} className="mb-5 fadein" xs={2}>
                <div className="image-block">
                  <a
                    href={allNft[key].baseTokenURI}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={allNft[key].baseTokenURI} fluid />
                  </a>
                  <p className="one-line title text-left pt-1 pl-2 pr-2 pb-1 mb-0">
                    {allNft[key].name}
                  </p>
                  <p className="text-left pb-1 pl-2 pr-2 pt-0  mb-0 caption">
                    &hearts; {Math.floor(Math.random() * 85) + 1},
                    {Math.floor(Math.random() * 800) + 1}
                  </p>
                </div>
              </Col>
            );
          return <></>;
        })}
      </Row>
    </Col>
  );
}
