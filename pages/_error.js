import React from "react";
import Router from "next/router";

export default function _error() {
  React.useEffect(() => {
    Router.push("/article/add");
  });

  return <div />;
}
