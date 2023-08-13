import axios from "axios";
const BASEURL = "http://localhost:8080";

import {
  getTalentStart,
  getTalentSuccess,
  getTalentFailed,
} from "../tailentSlice";

export const getTalent = async (dispatch) => {
  dispatch(getTalentStart());
  try {
    const res = await axios.get(`${BASEURL}/v1/talent/talent `);
    dispatch(getTalentSuccess(res.data));
  } catch (err) {
    dispatch(getTalentFailed());
  }
};

export const getHistoryTailent = async () => {
  try {
    const res = await axios.get(`${BASEURL}/v1/talent/history-talent`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getHistoryBet = async (id) => {
try {
  const res = await axios.get(`${BASEURL}/v1/user/history-bet/${id}`);
  return res.data
} catch (error) {
  console.error(error);
}
}

export const betTalent = async (response) => {
  try {
    const res = await axios.post(`${BASEURL}/v1/user/update-coin`, response);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
