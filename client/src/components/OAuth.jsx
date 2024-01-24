import { Button, Spinner } from "flowbite-react";
import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { app } from "../firebase/firebase";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const logInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.getCustomParameters({ prompt: "select_account" });
      const auth = getAuth(app);
      const googleResponse = await signInWithPopup(auth, provider);
      dispatch(signInStart());
      const response = await fetch("/api/auth/login-with-google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: googleResponse.user.accessToken,
        }),
      });
      const data = await response.json();
      console.log(data)
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(data.message)); 
    }
  };
  return (
    <Button gradientDuoTone={"pinkToOrange"} outline onClick={logInWithGoogle}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      {loading ? (
        <>
          <Spinner size="sm" />
          <span className="pl-3">loading..</span>
        </>
      ) : (
        "Login With Google"
      )}
    </Button>
  );
};

export default OAuth;
