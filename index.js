
const { cwd, args } = Deno;
import { getCid, getMedia, getVideoInfo } from "./module/fetch.js";
import {danger, emphasis, success} from "./module/colorLog.js";
import { getArg, getBVidAndP, mergeAudioVideo } from "./module/tool.js";
import { getCookie, setCookie } from "./module/cookie.js";
import { box } from './module/text.js'

import config from "./module/config.js";
const { headers, args: arrArgs } = config;

const { urlIndex, cookieIndex } = getArg(args, arrArgs);

/**
 * 设置 cookie
 */
cookieIndex ? setCookie(args[cookieIndex]) : null;

/**
 * 获取 cookie
 * @type {string}
 */
headers.cookie = getCookie()

/**
 * 判断 有URL，则下载视频。
 */
urlIndex ? await download(args[urlIndex]) : null

/**
 * 下载视频主流程
 * @param url
 * @returns {Promise<void>}
 */
async function download(url) {
  try {
    const { P, bvid } = getBVidAndP(url);
    const { title, pages } = await getCid(bvid);
    const { dimension: { width, height }, part, cid } = pages.find(i => i.page === P);
    const videoName = `${title}${P === 1 ? '' : `-${part}`}`;
    console.log(`📽  名称: ${emphasis(`${videoName}`)}`);
    console.log(`🎞  原分辨率：${emphasis(`${ width } × ${ height }`)}`);

    const videoInfo = await getVideoInfo(cid, bvid);
    const {
      baseUrl: videoUrl,
      codecs: videoFormat,
      width: curWidth,
      height: curHeight
    } = videoInfo.data.dash.video[0];
    const {
      baseUrl: audioUrl,
      codecs: audioFormat
    } = videoInfo.data.dash.audio[0];

    console.log(`开始下载音频（${audioFormat}）⌛`);
    await getMedia(audioUrl, 'audio');
    console.log(`开始下载视频（${videoFormat}）⌛`);
    console.log(`🎞  下载分辨率：${emphasis(`${ curWidth } × ${ curHeight }`)}`);
    await getMedia(videoUrl, 'video');

    console.log('开始合并音视频⌛');
    await mergeAudioVideo(videoName);
    console.log(success('合并完成 🎉 🎉 🎉'));

    console.log(box(cwd()));
  } catch (e) {
    console.log(danger(e))
  }
}


/**
 * 模仿 浏览器环境 使用 ffmpeg.wasm 来完成音视频合并，始终搞不定，垃圾Deno 😂。
 */
/*import { FFmpeg } from 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.7/dist/esm/index.js'
const ffmpeg = new FFmpeg();
await ffmpeg.load({
  coreURL:  `https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm/ffmpeg-core.js`,
  wasmURL: `https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm/ffmpeg-core.wasm`,
});
await ffmpeg.exec([
  '-i', `${cwd()}/video.mp4`,
  '-i', `${cwd()}/audio.mp4`,
  '-c:v', 'copy',
  '-c:a', 'aac',
  "-strict", "experimental",
  'output.mp4',
]);*/
