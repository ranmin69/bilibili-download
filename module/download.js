
const { cwd } = Deno;
import { getCid, getMedia, getVideoInfo } from "./fetch.js";
import {danger, emphasis, success} from "./colorLog.js";
import { getBVIdAndP, mergeAudioVideo } from "./tool.js";
import { box } from './text.js'

/**
 * 下载视频主流程
 * @param url
 * @returns {Promise<void>}
 */
export default async (url) => {
    try {
        const { P, bvid } = getBVIdAndP(url);
        const { title, pages } = await getCid(bvid);
        const { dimension: { width, height }, part, cid } = pages.find(i => i.page === P);
        const videoName = `${title}${P === 1 ? '' : `-${part}`}`;
        console.log(`🎥 名称: ${emphasis(`${videoName}`)}`);
        console.log(`🎞️ 原分辨率：${emphasis(`${ width } × ${ height }`)}`);

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

        const pid = Deno.pid;

        console.log(`开始下载音频（${audioFormat}）⌛`);
        await getMedia(audioUrl, pid, 'audio');

        console.log(`开始下载视频（${videoFormat}）⌛`);
        console.log(`🎞️  下载分辨率：${emphasis(`${ curWidth } × ${ curHeight }`)}`);
        await getMedia(videoUrl, pid, 'video');

        console.log('开始合并音视频⌛');
        await mergeAudioVideo(videoName, pid);
        console.log(success('合并完成 🎉 🎉 🎉'));

        console.log(box(cwd()));
    } catch (e) {
        console.log(danger(e))
    }
}
