import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Fragment } from "react";

const RP2 = () => {
  const name = useSelector((bigState) => bigState.nameSlice.name);
  return (
    <Fragment>
      <h2>{name}</h2>
      <Link to="/rp1">to rp1</Link>
    </Fragment>
  );
};

export default RP2;
