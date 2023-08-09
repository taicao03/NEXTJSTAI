import axios from "axios";
const BASEURL = "http://localhost:8080";

import {
  getTalentStart,
  getTalentSuccess,
  getTalentFailed,
  getHistoryFailed,
  getHistorySuccess,
  getHistoryStart,
  betTalentStart,
  betTalentSuccess,
  betTalentFailed
} from "../tailentSlice";

export const getTalent = async ( dispatch) => {
  dispatch(getTalentStart());
  try {
    const res = await axios.get(`${BASEURL}/v1/talent/talent `);
    dispatch(getTalentSuccess(res.data));
  } catch (err) {
    dispatch(getTalentFailed());
  }
};

export const getHistoryTailent = async (dispatch) => {
  dispatch(getHistoryStart());
  try {
    const res = await axios.get(
      `${BASEURL}/v1/talent/history-talent`
    );
    dispatch(getHistorySuccess(res.data));
  } catch (err) {
    dispatch(getHistoryFailed());
  }
};

export const betTalent = async (response, dispatch) => {
      dispatch(betTalentStart())
    try {
      const res = await axios.post(`${BASEURL}/v1/user/update-coin`,response)
      dispatch(betTalentSuccess(res.data));
    } catch (error) {
      dispatch(betTalentFailed())
    }
}
