import React, { useEffect, useState } from "react";
import ipfsClient from "ipfs-http-client";
import AlertModal from "./AlertModal";
import SuccessModal from "./SuccessModal";
import history from "./history";
import Loading from "./Loading";

import useWeb3Store from "../stores/useWeb3Store";

import {
  Row,
  Col,
  Form,
  Card,
  Image,
  Button,
  CardDeck,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

export default function CreateNft() {
  const { userAddress, beUserContract, initMetaMask } = useWeb3Store();

  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [addCouponState, setAddCouponState] = useState({
    couponTokenName: "",
    couponType: "music",
    couponDescription: "",
    couponTokenSymbol: "BNB",
    ticketPrice: "",
    distInterval: "",
    ticketBuyDuration: "",
    ticketBuyToken: "0x2B8fF854c5e16cF35B9A792390Cc3a2a60Ec9ba2",
    image: null,
    data: null,
  });

  const [showMetamaskError, setShowMetamaskError] = useState(false);
  const [errorModal, setErrorModal] = useState({
    msg: "",
    open: false,
  });
  const [successModal, setSuccessModal] = useState({
    msg: "",
    open: false,
  });
  // const [tokens] = useState([
  //   { name: "BNB", address: "0x2B8fF854c5e16cF35B9A792390Cc3a2a60Ec9ba2" },
  //   { name: "USDC", address: "0x65471bdCDb3720Dc07B914756884b50a2b4395fb" },
  // ]);

  const [nftType] = useState([
    { name: "Music", value: "music" },
    { name: "Image", value: "image" },
    { name: "Video", value: "video" },
    { name: "Playlist", value: "playlist" },
  ]);

  const ipfs = ipfsClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  const handleCreateCoupon = async () => {
    let tokenBaseUrl = "";
    let dataBaseUrl = "";

    if (addCouponState.image === null) {
      setErrorModal({
        open: true,
        msg: "Please upload Thumbnail Image",
      });
      return;
    }

    if (
      addCouponState.data === null &&
      (addCouponState.couponType === "music" ||
        addCouponState.couponType === "video")
    ) {
      setErrorModal({
        open: true,
        msg: "Please upload Data File when choose music or video NFT type",
      });
      return;
    }

    if (addCouponState.image) {
      setDeploying(true);
      const ipfsHash = await deployImage();
      tokenBaseUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
      setDeploying(false);
    }

    if (addCouponState.data) {
      setDeploying(true);
      const ipfsHash = await deployDataFile();
      dataBaseUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
      setDeploying(false);
    }

    console.log(addCouponState);

    beUserContract.methods
      .addCoupon(
        `${addCouponState.couponType}|${addCouponState.couponTokenName}`,
        addCouponState.couponDescription,
        addCouponState.couponTokenSymbol,
        addCouponState.ticketBuyToken,
        addCouponState.ticketPrice,
        tokenBaseUrl,
        dataBaseUrl,
        userAddress
      )
      .send()
      .on("transactionHash", () => {
        setProcessing(true);
      })
      .on("receipt", (_) => {
        console.log("receipt: ", _);
        setProcessing(false);
        setSuccessModal({
          open: true,
          msg: `Nft successfully created with hash !!\nhttps://testnet.bscscan.com/tx/${_.transactionHash}`,
        });
      })
      .catch((error) => {
        setProcessing(false);
        setErrorModal({
          open: true,
          msg: error.message,
        });
        console.log(error);
      });
  };

  const deployImage = () => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(addCouponState.image);

      reader.onloadend = async () => {
        const files = [
          {
            path: addCouponState.image.name,
            content: reader.result,
          },
        ];

        for await (const result of ipfs.addAll(files)) {
          resolve(result.cid.string);
        }
      };
    });
  };

  const deployDataFile = () => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(addCouponState.data);

      reader.onloadend = async () => {
        const files = [
          {
            path: addCouponState.data.name,
            content: reader.result,
          },
        ];

        for await (const result of ipfs.addAll(files)) {
          resolve(result.cid.string);
        }
      };
    });
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    sleep(1000).then(async (_) => {
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading paddingTop={40} />;

  if (!userAddress || !beUserContract)
    return (
      <>
        <p
          style={{
            letterSpacing: "0.1rem",
          }}
          className="display-6 font-weight-bold pt-5 mt-5 mb-4"
        >
          PLEASE CONNECT YOUR WALLET
          <br />& SELECT THE BSC TESTNET.
        </p>
        <Button className="login-btn" onClick={initMetaMask}>
          Connect Metamask
        </Button>
      </>
    );

  return (
    <div style={{ marginTop: "5%" }}>
      {showMetamaskError ? (
        <AlertModal
          open={showMetamaskError}
          toggle={() => {
            setShowMetamaskError(false);
            history.push("/");
          }}
        >
          <div>
            {typeof ethereum === "undefined" ? (
              <div>You should install Metamask first.</div>
            ) : (
              <div>Please connect to Metamask.</div>
            )}
          </div>
        </AlertModal>
      ) : (
        <CardDeck>
          {/* <Card className="hidden-card"></Card> */}

          <Card className="w-50 text-left mx-auto create-card">
            <Card.Body>
              <Row style={{ marginTop: "10px" }}>
                <Col className="text-header">Name:</Col>
                <Col style={{ paddingLeft: "0px" }}>
                  <Form.Control
                    className="mb-4"
                    type="text"
                    placeholder="NFT Name"
                    onChange={(e) =>
                      setAddCouponState({
                        ...addCouponState,
                        couponTokenName: e.target.value,
                      })
                    }
                    style={{ width: "80%" }}
                    value={addCouponState.couponTokenName}
                    required
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col className="text-header">Description:</Col>
                <Col style={{ paddingLeft: "0px" }}>
                  <Form.Control
                    className="mb-4"
                    type="text"
                    placeholder="NFT Description"
                    onChange={(e) =>
                      setAddCouponState({
                        ...addCouponState,
                        couponDescription: e.target.value,
                      })
                    }
                    style={{ width: "80%" }}
                    value={addCouponState.couponDescription}
                    required
                  />
                </Col>
              </Row>

              {/* <Row>
                <Col className="text-header">Coupon Token Symbol:</Col>
                <Col style={{ paddingLeft: "0px" }}>
                  <Form.Control
                    className="mb-4"
                    type="text"
                    placeholder="NFT Token Symbol"
                    onChange={(e) =>
                      setAddCouponState({
                        ...addCouponState,
                        couponTokenSymbol: e.target.value,
                      })
                    }
                    style={{ width: "80%" }}
                    value={addCouponState.couponTokenSymbol}
                    required
                  />
                </Col>
              </Row> */}

              <Row>
                <Col className="text-header">Price (BNB):</Col>
                <Col style={{ paddingLeft: "0px" }}>
                  <Form.Control
                    className="mb-4"
                    type="number"
                    step="0"
                    placeholder="Price of the NFT"
                    onChange={(e) =>
                      setAddCouponState({
                        ...addCouponState,
                        ticketPrice: e.target.value,
                      })
                    }
                    style={{ width: "80%" }}
                    value={addCouponState.ticketPrice}
                    required
                  />
                </Col>
              </Row>

              {/* <Row style={{ marginBottom: "30px" }}>
                <Col className="text-header">Token For Buy:</Col>
                <Col style={{ paddingLeft: "0px" }}>
                  <DropdownButton
                    style={{
                      position: "absolute",
                    }}
                    title={tokens.map((element) =>
                      addCouponState.ticketBuyToken === element.address
                        ? element.name
                        : null
                    )}
                    variant="outline-info"
                    onSelect={(event) =>
                      setAddCouponState({
                        ...addCouponState,
                        ticketBuyToken: event,
                      })
                    }
                  >
                    {tokens.map((element, key) => (
                      <Dropdown.Item key={key} eventKey={element.address}>
                        {element.name}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Col>
              </Row> */}

              <Row style={{ marginBottom: "30px" }}>
                <Col className="text-header">Type:</Col>
                <Col style={{ paddingLeft: "0px" }}>
                  <DropdownButton
                    style={{
                      position: "absolute",
                    }}
                    title={nftType.map((element) =>
                      addCouponState.couponType === element.value
                        ? element.name
                        : null
                    )}
                    variant="outline-info"
                    onSelect={(event) =>
                      setAddCouponState({
                        ...addCouponState,
                        couponType: event,
                      })
                    }
                  >
                    {nftType.map((element, key) => (
                      <Dropdown.Item key={key} eventKey={element.value}>
                        {element.name}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Col>
              </Row>

              <Row>
                <Col className="text-header">Thumbnail Image:</Col>
                <Col style={{ paddingLeft: "0px" }}>
                  <Form.Control
                    className="mb-4"
                    type="file"
                    onChange={(event) =>
                      setAddCouponState({
                        ...addCouponState,
                        image: event.target.files[0],
                      })
                    }
                    style={{ width: "80%" }}
                    required
                  />
                </Col>
              </Row>

              <Row>
                <Col className=""></Col>
                <Col style={{ paddingLeft: "0px" }}>
                  {addCouponState.image && (
                    <Row>
                      <Col>
                        <Image
                          src={URL.createObjectURL(addCouponState.image)}
                          width="150"
                          height="150"
                        ></Image>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>

              {addCouponState.couponType !== "image" &&
                addCouponState.couponType !== "playlist" && (
                  <>
                    <Row className={addCouponState.image && "mt-4"}>
                      <Col className="text-header">
                        Data file (Music/Image/Video):
                      </Col>
                      <Col style={{ paddingLeft: "0px" }}>
                        <Form.Control
                          className="mb-4"
                          type="file"
                          onChange={(event) =>
                            setAddCouponState({
                              ...addCouponState,
                              data: event.target.files[0],
                            })
                          }
                          style={{ width: "80%" }}
                          required
                        />
                      </Col>
                    </Row>
                  </>
                )}
            </Card.Body>

            <Card.Footer className="text-center">
              <Button onClick={handleCreateCoupon} variant="outline-success">
                {deploying ? (
                  <div className="d-flex align-items-center">
                    <span>Deploying to IPFS</span>

                    <span className="loading ml-2"></span>
                  </div>
                ) : processing ? (
                  <div className="d-flex align-items-center">
                    Processing
                    <span className="loading ml-2"></span>
                  </div>
                ) : (
                  <div>Submit</div>
                )}
              </Button>
            </Card.Footer>
          </Card>

          {/* <Card className="hidden-card"></Card> */}
        </CardDeck>
      )}

      <AlertModal
        open={errorModal.open}
        toggle={() =>
          setErrorModal({
            ...errorModal,
            open: false,
          })
        }
      >
        {errorModal.msg}
      </AlertModal>

      <SuccessModal
        open={successModal.open}
        toggle={() =>
          setSuccessModal({
            ...successModal,
            open: false,
          })
        }
        onConfirm={() => history.push("/")}
      >
        {successModal.msg}
      </SuccessModal>
    </div>
  );
}
