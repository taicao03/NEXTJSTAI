import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "./authSlice";
import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  deleteUserFailed,
  deleteUserSuccess,
  deleteUserStart,
} from "./userSlice";

import {
  createShopStart,
  createShopSuccess,
  createShopFailed,
  getShopStart,
  getShopSuccess,
  getShopFailed,
  deleteShopStart,
  deleteShopSuccess,
  deleteShopFailed,
} from "./storeSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8080/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:8080/v1/auth/register",
      user
    );
    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart());
  try {
    const res = await axiosJWT.get("http://localhost:8080/v1/user/ ", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("http://localhost:8080/v1/user/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed());
  }
};

export const logOut = async (dispatch, navigate, id, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("http://localhost:8080/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailed());
  }
};

// STORE SHOP

export const createStore = async (createStore, dispatch, navigate) => {
  dispatch(createShopStart());
  try {
    const res = await axios.post(
      "http://localhost:8080/v1/shop/createStore",
      createStore
    );
    dispatch(createShopSuccess(res.data));
    navigate("/store");
  } catch (error) {
    dispatch(createShopFailed);
  }
};

export const getAllStore = async (getAllStore, dispatch) => {
  dispatch(getShopStart());
  try {
    const res = await axios.get(
      "http://localhost:8080/v1/shop/getAllStore",
      getAllStore
    );
    dispatch(getShopSuccess(res.data));
  } catch (error) {
    dispatch(getShopFailed());
  }
};

export const deleteStore = async (deleteStore, dispatch, id) => {
  dispatch(deleteShopStart());
  try {
    const res = await axios.delete(
      "http://localhost:8080/v1/shop/deleteShop/" + id,
      deleteStore
    );
    dispatch(deleteShopSuccess(res.data));
  } catch (error) {
    dispatch(deleteShopFailed());
  }
};
