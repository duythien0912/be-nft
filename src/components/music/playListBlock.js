import { Col, Image, Row, Button } from "react-bootstrap";

export default function PlayListBlock({ allNft }) {
  const imgSrc = "/cover.jpeg";

  return (
    <div className="">
      {Object.keys(allNft || {}).map(function (key, i) {
        if (allNft[key].type === "playlist")
          return (
            <Row key={key} xs={12} className="m-0 mb-5 align-items-center">
              <Col xs={2} className="">
                <a data-fancybox="gallery" href={allNft[key].baseTokenURI}>
                  <Image
                    className="fadein"
                    src={allNft[key].baseTokenURI}
                    rounded
                    fluid
                  />
                </a>
{/* 
                <Image
                  className="fadein"
                  src={allNft[key].baseTokenURI}
                  rounded
                  fluid
                /> */}
              </Col>
              <Col xs={8} className="text-left">
                <p className="mt-2 mb-0">Playlist</p>
                <p className="display-4 font-weight-bold mb-0">
                  {allNft[key].name}
                </p>
                <p className="display-6 mb-1">
                  {allNft[key].couponTokenSymbol}
                </p>

                <p className="caption">
                  {Math.floor(Math.random() * 99) + 1} Songs,{" "}
                  {Math.floor(Math.random() * 9) + 1} hr{" "}
                  {Math.floor(Math.random() * 50) + 1} min
                </p>
              </Col>
              <Col xs={2} className="text-right">
                <a
                  href={allNft[key].baseTokenURI || allNft[key].dataURI}
                  target="_blank"
                  rel="noreferrer"
                  className="playlist-btn music-btn"
                >
                  Play
                </a>
              </Col>
            </Row>
          );
        return null;
      })}
    </div>
  );
}
