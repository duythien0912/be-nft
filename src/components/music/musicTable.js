import { Col, Image, Row, Table, Button } from "react-bootstrap";

export default function MusicTable({ allNft }) {
  var i = 1;
  return (
    <>
      <Table
        className="music-table ml-2 mr-2"
        borderless={true}
        bordered={false}
        striped={false}
        variant="dark"
      >
        <thead>
          <tr>
            <th className="number-col caption">#</th>
            <th className="caption"></th>
            <th className="caption">TITLE</th>
            <th className="caption">ARTIST</th>
            <th className="caption">ALBUM</th>
            <th className="caption time-col">TIME</th>
            {/* <th className="caption time-col">PRICE</th> */}
            <th className="caption"></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(allNft || {}).map(function (key, _) {
            if (allNft[key].type === "music")
              return (
                <tr key={key}>
                  <td className="number-col caption">{i++}</td>
                  <td className="logo-col">
                    <a data-fancybox="gallery" href={allNft[key].baseTokenURI}>
                      <Image
                        loading="lazy"
                        className="music-icon mr-2 fadein"
                        src={allNft[key].baseTokenURI}
                        rounded
                        fluid
                      />
                    </a>
                  </td>
                  <td>{allNft[key].name}</td>
                  <td>v.a</td>
                  <td className="caption">{allNft[key].couponTokenSymbol}</td>
                  <td className="caption time-col">
                    {Math.floor(Math.random() * 4) + 1}:
                    {Math.floor(Math.random() * 60) + 1}
                  </td>
                  {/* <td className="caption time-col">
                    {allNft[key].ticketPrice} {allNft[key].description}
                  </td> */}
                  {/* <Button className="normal-btn">Play</Button> */}
                  <td className="text-center">
                    <a
                      data-fancybox
                      data-type="iframe"
                      data-src={allNft[key].dataURI}
                      href="javascript:void(0)"
                      role="button"
                      className="play-block-btn pt-2"
                      type="button"
                      aria-pressed="false"
                      aria-label="play"
                    >
                      <span className="ml-1">&#x25b6;</span>

                      {/* <span className="ml-1">&#43;</span> */}
                    </a>
                  </td>
                </tr>
              );
            return null;
          })}
        </tbody>
      </Table>
    </>
  );
}
