import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateValue } from "../reducer/StateProvider";
import { actionTypes } from "../reducer/reducer";
const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({ type: actionTypes.SET_USER, user: res.user });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://image.flaticon.com/icons/png/128/1383/1383269.png"
          alt=""
        />

        <div className="login__text">
          <h1>Sign in to whatsapp</h1>
        </div>

        <Button onClick={signIn}>Sign In with google</Button>
      </div>
    </div>
  );
};

export default Login;
