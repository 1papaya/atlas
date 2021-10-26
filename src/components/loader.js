import React, { useState } from "react";
import Loader from "react-loader-spinner";

export default (props) => {
  let [isSuppressed, setIsSuppressed] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        zIndex: "50",
        background: "rgba(255, 255, 255, 0.5)",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        display: isSuppressed ? "none" : "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        setIsSuppressed(true);
        if ("onSuppressed" in props) props.onSuppressed(e);
      }}
    >
      <Loader type="TailSpin" color="#ccc" height={80} width={80} />
    </div>
  );
};
