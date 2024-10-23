import React from "react";

function CustomError({ message }: { message: string }) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Error</h1>
      <p>{message}</p>
      <a href="/">Go back to home</a>
    </div>
  );
}

export default CustomError;
