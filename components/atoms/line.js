import React from "react";

export default function Line({ color }) {
  let line = <hr />;

  if (color === "blue") {
    line = <hr className="border-t-8 border-blue w-10 mb-4" />;
  } else {
    line = <hr className="border-t-8 border-white w-10 mb-4" />;
  }

  return line;
}
