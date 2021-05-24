import { Col, Image, Row, Table } from "react-bootstrap";

export default function MusicTable() {
  const imgSrc = "/cover.jpeg";

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
            {/* <th className="caption"></th> */}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => (
            <tr>
              <td className="number-col caption">{item}</td>
              <td className="logo-col">
                <Image
                  className="music-icon mr-2 fadein"
                  src={imgSrc}
                  rounded
                  fluid
                />
              </td>
              <td>Bicycle Race</td>
              <td>Queen</td>
              <td className="caption">The Dark Side of the Moon</td>
              <td className="caption time-col">6:22</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
