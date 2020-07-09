import axios from "axios";

export const login =  ({email, password}) => async (dispatch, getState) => {
  dispatch({
      type: "LOGIN",
    })

  axios
    .post(`http://localhost:8000/login`, {
    email,
    password
    })
    .then(res => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: res.data.token
        }
     })
    })
    .catch(err => {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: {
          errors: err.response.data
        }
      }) 
      console.log("err : ", err.response.data)
    });
}

export const signup = ({email, password, userName}) => async (dispatch, getState) => {
    dispatch({
        type: "SIGNUP",
      })

    axios
      .post(`http://localhost:8000/signup`, {
      userName,
      email,
      password
      })
      .then(res => {
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: {
            token: res.data.token
          }
       })
      })
      .catch(err => {
        dispatch({
          type: "SIGNUP_FAILURE",
          payload: {
            errors: err.response.data
          }
        })
        console.log("err : ", err.response.data)
      });
}