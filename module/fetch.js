
const { cwd, create } = Deno;

import config from "./config.js";
import { speedAndSave } from "./tool.js";

/**
 * 用 bvid，获取投稿名称及所有视频信息（有可能是多视频）
 * @param bvid
 * @returns {Promise<{pages, title}>}
 */
const getCid = async (bvid) => {
  const cidRes = await fetch(
    `${config.baseCidApi}?bvid=${bvid}`,
    {
      method: 'GET',
      headers: config.headers
    }
  );
  const { data: pageInfo } = await cidRes.json();
  const { title, pages  } = pageInfo;
  return { title, pages };
};

/**
 * 通过 cid 和 bvid 获取视频多个分辨率
 * @param cid
 * @param bvid
 * @returns {Promise<any>}
 */
const getVideoInfo = async (cid, bvid) => {
  const allVideoRes = await fetch(
    `${config.baseAllVideoUrlApi}&cid=${cid}&bvid=${bvid}`,
    {
      method: 'GET',
      headers: config.headers
    }
  );
  return await allVideoRes.json();
}

/**
 * 获取媒体流并同时写入磁盘（边下边写形式）
 * @param mediaUrl 媒体 url
 * @param type mp4 or mp3
 * @returns {Promise<void>}
 */
const getMedia = async (mediaUrl, type) => {
  const typeMap = { video: 'mp4', audio: 'mp3' };
  const mediaStream = await fetch(mediaUrl, { method: 'GET', headers: config.headers });
  const total = mediaStream.headers.get('content-length');
  const savePath = await create(`${ cwd() }/${type}.${typeMap[type]}`);
  await speedAndSave(mediaStream, total, savePath);
}

const fetchFn = {
  getCid,
  getVideoInfo,
  getMedia
}

export {
  fetchFn as default,
  getCid,
  getVideoInfo,
  getMedia
}
