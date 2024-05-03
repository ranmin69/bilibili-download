
import { getUserAllVideo } from './fetch.js'
import download from "./download.js";

/**
 * 作者的 uuid
 * @param uuid
 */
export default async (uuid) => {
    console.log(uuid);
    const bvidArr = await getUserAllVideo(uuid);
    console.log(bvidArr);
    const baseUrl = 'https://www.bilibili.com/video/';
    for await (const bvidArrElement of bvidArr) {
        await download(`${baseUrl}/${bvidArrElement}`);
    }
}
