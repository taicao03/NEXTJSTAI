import axios from "axios";
const BASEURL = "http://localhost:8080";

import {
  getTalentStart,
  getTalentSuccess,
  getTalentFailed,
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
