import React from "react";

const Error = ({ message }) => {
  return (
      <div style={{height: '100vh'}}>Something went wrong. {message}</div>
  );
};

export default Error;
