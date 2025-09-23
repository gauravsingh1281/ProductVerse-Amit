import { toast } from "react-toastify";
import axios from "../../api/Config"
import { loginuser, logoutuser } from "../reducers/UserSlice";

export const asynccurrentuser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loginuser(user));
      console.log("session Restored");
    } else {
      console.log("signin to access the resource!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncsigninuser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      "/users?email=" + user.email + "&password=" + user.password
    );
    console.log(data);
    if (data[0]?.email && data[0]?.password) {
      localStorage.setItem("user", JSON.stringify(data[0]));
      dispatch(asynccurrentuser());
      // dispatch(loginuser(data[0]));
      console.log("user logged in!");
      toast.success("user logged in!");
    } else {
      console.log("wrong Credientials!");
      toast.error("wrong Credientials!");
    }

  } catch (error) {
    console.log(error);
  }
}

export const asyncsignupuser = (user) => async (dispatch, getState) => {
  try {
    await axios.post("/users", user);
    console.log("user resistered!");
  } catch (error) {
    console.log(error);
  }
}

export const asynclogoutuser = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(logoutuser());
    console.log("user logged out!");
  } catch (error) {
    console.log(error);
  }
}

export const asyncupdateuser = (id, user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch("/users/" + id, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(asynccurrentuser());
    // dispatch(loginuser(data));
    console.log("user updated!");
  } catch (error) {
    console.log(error);
  }
}

export const asyncdeleteuser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/users/" + id);
    localStorage.removeItem("user");
    dispatch(logoutuser());
    console.log("user deleted!");
  } catch (error) {
    console.log(error);
  }
}