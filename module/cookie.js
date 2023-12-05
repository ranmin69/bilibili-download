
const { exit } = Deno;

import {success} from "./colorLog.js";

/**
 * 获取 cookie
 * @returns {string}
 */
const  getCookie = () => {
    return localStorage.getItem('bilibili-cookie') ?? ''
}

/**
 * 设置 cookie
 * @param cookie
 * @returns {Promise<Awaited<string>>}
 */
const setCookie = (cookie) => {
    localStorage.setItem('bilibili-cookie', cookie);
    console.log(success('cookie 设置成功'));
    exit()
}

const cookie = {
    getCookie,
    setCookie,
}

export {
    cookie as default,
    getCookie,
    setCookie,
}
