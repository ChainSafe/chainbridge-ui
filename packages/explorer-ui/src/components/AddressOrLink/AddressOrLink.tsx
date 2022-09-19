import React from "react";

const AddressOrLink = ({
  msg,
  blockExplorer,
}: {
  msg: any;
  blockExplorer?: string;
}) =>
  blockExplorer ? (
    <a target="_blank" href={`${blockExplorer}/address/${msg.by}`}>
      {msg.by}
    </a>
  ) : (
    <>{msg.by}</>
  );

export default AddressOrLink;
