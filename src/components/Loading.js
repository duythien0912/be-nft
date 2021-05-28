import React from "react";

import ReactLoading from "react-loading";
import { Image } from "react-bootstrap";

export default function Loading({ paddingTop = 90 }) {
  return (
    <div
      className={`d-flex justify-content-center mt-5 g-pt-${paddingTop}`}
      style={{ height: "-webkit-fill-available" }}
    >
      <ReactLoading
        type={"spin"}
        color={"#343a40"}
        height={"6%"}
        width={"6%"}
      />
      {/* <Image src="/loading.gif" height={"60%"} width={"60%"} /> */}
    </div>
  );
}
