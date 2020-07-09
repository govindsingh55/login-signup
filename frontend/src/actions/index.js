import {signupService} from "../services/signupService";
import axios from "axios";

export const login = ({email, password}) => ({
    type: "LOGIN",
    payload: {
        email,
        password
    }
})

export const signup = ({email, password, userName}) => async (dispatch, getState) => {
    dispatch({
        type: "SIGNUP",
    })
    axios
      .post(`http://localhost:3000/signup`, {
      userName,
      email,
      password
      })
      .then(res => {
        console.log("result : ", res)
      })
      .catch(err => {
        console.log("err : ", err)
      });
}