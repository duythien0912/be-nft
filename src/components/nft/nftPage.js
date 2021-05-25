import CreateNft from "../CreateNft";
import { Container } from "react-bootstrap";

export default function NftPage({ allNft }) {
  return (
    <Container className="mt-4 pt-4">
      <CreateNft />
    </Container>
  );
}
