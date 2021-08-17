require("dotenv").config();
import { Response, Request } from "express";
import { sequelize } from "../Models/index";
const { Region } = require("../Models/region.model");
const { Topic } = require("../Models/topic.model");
import { getMatchesByPuuid, getMatchInfoByMatchId } from "./utils";
import { asyncForEach } from "../Utils/helpers";

export const getRegions = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const regions = await Region.findAll({});
    res.json(regions);
  } catch (err) {
    next(err);
  }
};

export const getRecentMatches = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { puuid } = req.params;
    //puuid = 'RSQ6Hfg8BFk4BEx5x_PDhutycLxXjgD8zc19bgMAxRDSBIrkL0ARyru5S9TjEDln-1qP7PPZzAt9Ow';
    const resArr: any = [];

    let query: any = await sequelize.query(
      `SELECT region FROM public."Users" as U LEFT JOIN public."Regions" as R on U.regionid = R.id WHERE puuid = '${puuid}';`
    );
    let region = query[0][0].region;
    const matches = await getMatchesByPuuid(puuid, region);
    await asyncForEach (matches, async (match: string) => {
        const matchInfo = await getMatchInfoByMatchId(match, region);
        resArr.push(matchInfo);
      });
   
    res.send(resArr);
  } catch (err) {
    next(err);
  }
};

export const getForumTopics = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const topics = await Topic.findAll({});
    res.json(topics);
  } catch (err) {
    next(err);
  }
};

export const postForumTopic = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const topics = await Topic.create({
      title: req.body.title,
      text: req.body.text,
      userid: req.body.userid,
      parentid: req.body?.parentid,
      closed: false,
    });
    res.status(201);
    res.json(topics);
  } catch (err) {
    next(err);
  }
};
