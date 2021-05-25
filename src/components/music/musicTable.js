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
                    <Image
                      className="music-icon mr-2 fadein"
                      src={allNft[key].baseTokenURI}
                      rounded
                      fluid
                    />
                  </td>
                  <td>{allNft[key].name}</td>
                  <td>v.a</td>
                  <td className="caption">{allNft[key].couponTokenSymbol}</td>
                  <td className="caption time-col">
                    {Math.floor(Math.random() * 4) + 1}:
                    {Math.floor(Math.random() * 60) + 1}
                  </td>
                  {/* <Button className="normal-btn">Play</Button> */}
                  <td className="text-center">
                    <button
                      className="play-block-btn"
                      type="button"
                      aria-pressed="false"
                      aria-label="play"
                    >
                      <span className="ml-1">&#x25b6;</span>

                      {/* <span className="ml-1">&#43;</span> */}
                    </button>
                  </td>
                </tr>
              );
            return <></>;
          })}
        </tbody>
      </Table>
    </>
  );
}
