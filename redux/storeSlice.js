import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    createShop: {
      store: null, // Thông tin USER
      isFetching: false,
      error: false,
    },
    getAllShop: {
      allStore: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    // CREATE SHOP
    createShopStart: (state) => {
      state.createShop.isFetching = true;
    },
    createShopSuccess: (state, action) => {
      state.createShop.isFetching = false;
      state.createShop.store = action.payload;
      state.createShop.error = false;
    },
    createShopFailed: (state) => {
      state.createShop.isFetching = false;
      state.createShop.error = true;
    },
    //GET SHOP
    getShopStart: (state) => {
      state.getAllShop.isFetching = true;
    },
    getShopSuccess: (state, action) => {
      state.getAllShop.isFetching = false;
      state.getAllShop.allStore = action.payload;
      state.getAllShop.error = false;
    },
    getShopFailed: (state) => {
      state.getAllShop.isFetching = false;
      state.getAllShop.error = true;
    },
    //DETAIL SHOP
    detailShopStart: (state) => {
      state.getAllShop.isFetching = true;
    },
    detailShopSuccess: (state, action) => {
      state.getAllShop.isFetching = false;
      state.allStore.filter((arrow) => arrow._id !== action.payload);

      // state.getAllShop.details = action.payload;
      state.getAllShop.error = false;
    },
    detailShopFailed: (state) => {
      state.getAllShop.isFetching = false;
      state.getAllShop.error = true;
    },
    // DELETE SHOP
    deleteShopStart: (state) => {
      state.getAllShop.isFetching = true;
    },
    deleteShopSuccess: (state, action) => {
      state.getAllShop.isFetching = false;
      state.allStore.filter((arrow) => arrow._id !== action.payload);
    },
    deleteShopFailed: (state) => {
      state.getAllShop.isFetching = false;
      state.getAllShop.error = true;
    },
  },
});

export const {
  createShopStart,
  createShopSuccess,
  createShopFailed,
  getShopStart,
  getShopSuccess,
  getShopFailed,
  deleteShopStart,
  deleteShopSuccess,
  deleteShopFailed,
  detailShopStart,
  detailShopSuccess,
  detailShopFailed,
} = storeSlice.actions;

export default storeSlice.reducer;
