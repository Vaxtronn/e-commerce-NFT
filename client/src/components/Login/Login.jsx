import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gettingActiveUserToState,
  injectLocalStorageCart,
  getAllUsers,
  signInWithGoogle,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./Login.css";
import { Link } from "react-router-dom";
import * as helpers from "./LoginHelpers";
import { loadLocalStorage } from "../../utils";

// sendPasswordResetEmail
const Login = () => {
  const users = useSelector((state) => state.users);
  // const loggedUser = useSelector((state) => state.loggedUser);
  // let loginStatusStorage = localStorage.getItem("Logged");

  const dispatch = useDispatch();

  const history = useHistory();

  const [logginForm, setLogginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handdleChange = (e) => {
    setLogginForm({
      ...logginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handdleSubmit = (e) => {
    e.preventDefault();
    dispatch(gettingActiveUserToState(logginForm.email));

    loadLocalStorage(dispatch, injectLocalStorageCart);

    helpers.logginFunction(logginForm);

    setLogginForm({
      email: "",
      password: "",
    });
  };

  return (
    <form>
      <div className="form-outline mb-4">
        <label className="form-label text-light" for="EmailField">
          Email address
        </label>
        <input
          onChange={handdleChange}
          name="email"
          type="email"
          id="EmailField"
          className="form-control form-control-lg col-md-2"
          placeholder="example@gmail.com"
          value={logginForm.email}
        />
      </div>

      <div className="form-outline mb-3">
        <label className="form-label text-light" for="PassField">
          Password
        </label>
        <input
          onChange={handdleChange}
          name="password"
          type="password"
          id="PassField"
          className="form-control form-control-lg"
          placeholder="Enter password"
          value={logginForm.password}
        />
      </div>

      <div className={`login-errormessage ${error ? "" : "noneDisplay"}`}>
        <p>{error}</p>
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button
          onClick={handdleSubmit}
          type="button"
          className={"sing-in"}
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          disabled={!users.length}
        >
          Log in
        </button>
        <button
          className={"sing-in"}
          type="button"
          onClick={() => helpers.signGoogle(history, dispatch)}
        >
          <div className={"sing-in-container"}>
            <GoogleIcon />
            <span> </span>
            <span>Sign in with Google</span>
          </div>
        </button>
      </div>
    </form>
  );
};

export default Login;
