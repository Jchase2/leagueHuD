import axios from "axios";
import { ITopic } from "../interfaces";
import { IRegisterForm } from "../interfaces/RegisterForm";
import { setToken } from "./helpers";

// Api file, for now all API calls will be handled from here.
// If we end up with lots of different calls to the backend, we
// can split this out into multiple files.
// add catch blocks lol
// Post request to signup

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};

export const signUp = async (
  formData: IRegisterForm,
  puuid: string,
  iconid: number
) => {
  return axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/register" ||
        "localhost:3001/register",
      {
        email: formData.email,
        password: formData.password,
        regionid: formData.regionId,
        summoner_name: formData.summoner_name,
        puuid: puuid,
        iconid: iconid,
      }
    )
    .then((res: any) => {
      setToken(res);
      return res;
    })
    .catch((err) => console.log(err));
};

export const verifyEmailAndUser = async (
  regionId: number,
  summoner_name: string,
  email: string
) => {
  let data: any = "";
  let configVerify = {
    headers: {
      "Content-Type": "application/json",
      email: email,
      regionid: regionId,
      summoner_name: summoner_name,
    },
  };
  console.log("regionid: ", regionId, " summoner_name: ", summoner_name, " email: ", email)
  await axios
    .get(
      process.env.REACT_APP_BACKEND_URL + "/verify/register/user" ||
        "localhost:3001/verify/register/user",
      configVerify
    )
    .then((res: { data: any }) => (data = res.data))
    .catch((err) => {throw new Error(err)});
  return data;
};

export const getVerifyInfo = async (
  regionId: number,
  summoner_name: string
) => {
  let data: any = "";
  await axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/register/verify" ||
        "localhost:3001/register/verify",
      {
        regionId: regionId,
        summoner_name: summoner_name,
      }
    )
    .then((res: { data: any }) => (data = res.data))
    .catch((err) => console.log(err));
  return data;
};


export const getRegions = async () => {
  return axios
    .get(
      process.env.REACT_APP_BACKEND_URL + "/regions" || "localhost:3001/",
      config
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const getForumTopic = async (topicid: number) => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + `/topics/${topicid}` || `http://localhost:3001/topics/${topicid}`)
    .then((res: { data: any }) => res.data);
};

export const deleteForumTopic = async (topicid: number) => {
  return axios
    .delete(process.env.REACT_APP_BACKEND_URL + `/topics/${topicid}` || `http://localhost:3001/topics/${topicid}`)
    .then(res => res);
};

export const getForumComments = async (parentid: number) => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + `/topics/comments/${parentid}` || "http://localhost:3001/topics")
    .then((res: { data: any }) => res.data);
};

export const getForumTopics = async () => {
  return axios
    .get(process.env.REACT_APP_BACKEND_URL + "/topics" || "http://localhost:3001/topics")
    .then((res: { data: any }) => res.data);
};

export const createNewTopic = async (formData: ITopic) => {
  return axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/topics" ||
        "http://localhost:3000/topics",
      {
        "title": formData.title,
        "text": formData.text,
        "userid": formData.userid,
        "closed": formData.closed,
        "parentid": formData.parentid
      }
    )
    .then((res: { data: any }) => res.data)
    .catch((err) => console.log(err));
};

export const signIn = async (form: any) => {
  return axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/login" || "localhost:3001/login",
      form
    )
    .then((res: any) => {
      setToken(res);
      return res;
    })
    .catch((err) => console.log(err));
};