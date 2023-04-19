import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { nameActions } from "../store/TK";

const RP1 = () => {
  const dispatch = useDispatch();
  const changeName = () => {
    dispatch(nameActions.stamAction());
  };

  return (
    <Fragment>
      <button onClick={changeName}>change name</button>

      <Link to="/rp2">to rp2</Link>
    </Fragment>
  );
};

export default RP1;
