import axios from "axios";
const BASEURL = "http://localhost:8080";

import {
  getTalentStart,
  getTalentSuccess,
  getTalentFailed,
  getHistoryFailed,
  getHistorySuccess,
  getHistoryStart,
} from "../tailentSlice";

export const getTalent = async (response, dispatch) => {
  dispatch(getTalentStart());
  try {
    const res = await axios.get(`${BASEURL}/v1/talent/talent `, response);
    dispatch(getTalentSuccess(res.data));
  } catch (err) {
    dispatch(getTalentFailed());
  }
};

export const getHistoryTailent = async (response, dispatch) => {
  dispatch(getHistoryStart());
  try {
    const res = await axios.get(
      `${BASEURL}/v1/talent/history-talent`,
      response
    );
    dispatch(getHistorySuccess(res.data));
  } catch (err) {
    dispatch(getHistoryFailed());
  }
};
