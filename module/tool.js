
const { stdout, Command, remove, cwd } = Deno;
import { emphasis } from "./colorLog.js";

/**
 * 通过传入的 url，获取当前的投稿 bvid 和 第几个视频（如果是多视频的话）。
 * @param urlStr
 * @returns {{P: number, bvid: string}}
 */
const getBVidAndP = (urlStr) => {
  const url = urlStr.replaceAll('\\', '');
  const BVIndex = url.indexOf('BV');
  const bvid = url.slice(BVIndex, BVIndex + 12);
  const urlObj = new URL(url);
  const P = Number(urlObj?.searchParams?.get('p') ?? 1);
  return{ bvid, P }
}

/**
 * 媒体大小换算
 * @param byteLength
 * @returns {"0Byte"}
 */
const getSize = (byteLength) => {
  byteLength = Number(byteLength)
  let [size, unit] = [0, 'Byte']
  if (byteLength < 969) {
    [size, unit] = [byteLength, 'Byte']
  } else if ( 969 <= byteLength && byteLength < 960 * 1024 ) {
    [size, unit] = [(byteLength / 1024).toFixed(2), 'KB'];
  } else if (byteLength >= 960 * 1024) {
    [size, unit] = [(byteLength / (1024 ** 2)).toFixed(2), 'MB']
  }
  return `${size}${unit}`;
}

/**
 * 下载速度
 * @param stream
 * @param total
 * @param savePath
 * @returns {Promise<void>}
 */
const speedAndSave = async (stream, total, savePath) => {
  total = Number(total);
  let bytes = 0;
  const placeholder = `      `;
  for await (const chunk of stream.body) {
    bytes += chunk.byteLength;
    const speedText = `已下载：${emphasis(`${getSize(bytes)} / ${getSize(total)} ${placeholder}`)}\r`;
    const uint8ArrayText = new TextEncoder().encode(`${speedText}`);
    await stdout.write(uint8ArrayText);
    await savePath.write(chunk);
  }
  await stdout.write(new TextEncoder().encode(`\n`));
}

// ffmpeg 合并音视频命令 ffmpeg -i audio.mp3 -i video.mp4 -c:v copy -c:a aac -strict experimental output.mp4
/**
 * 运行 ffmpeg 子进程 合并音视频
 * 合并完成后，删除原音视频
 * @param title
 * @returns {Promise<void>}
 */
const mergeAudioVideo = async (title) => {
  const path = cwd();
  const [videoPath, audioPath, outputPath] = [`${path}/video.mp4`, `${path}/audio.mp3`, `${path}/${title}.mp4`]
  const args = ([
    "-i", audioPath,
    "-i", videoPath,
    "-c:v", "copy",
    "-c:a", "aac",
    "-strict", "experimental",
    outputPath
  ]);
  await childProcess('ffmpeg', args);
  await remove(audioPath);
  await remove(videoPath);
}

/**
 * 执行 ffmpeg 命令 的子进程
 * @param cmd
 * @param args
 * @returns {Promise<void>}
 */
const childProcess = async ( cmd, args) => {
  const command = new Command(cmd, {
    args,
    cwd: cwd(),
    // stdout: "piped",
  });
  const childProcess = command.spawn();
  await childProcess.output();
  await childProcess.status;
}

/**
 * 获取所有的 参数
 * @param args
 * @param arrArgs
 * @returns {{}}
 */
const getArg = (args, arrArgs) => {
  const obj = {};
  arrArgs.forEach((item) => {
    const key = `${item.slice(2, item.length)}Index`;
    obj[key] = args.indexOf(item) + 1;
  })
  return obj
}

const all = {
  getSize,
  speedAndSave,
  childProcess,
  mergeAudioVideo,
  getBVidAndP,
  getArg
}

export {
  all as default,
  getSize,
  speedAndSave,
  childProcess,
  mergeAudioVideo,
  getBVidAndP,
  getArg
}
