export default {
  headers: {
    origin: "https://www.bilibili.com",
    referer: "https://www.bilibili.com/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36 HBPC/12.1.1.301",
    cookie: ""
  },
  baseCidApi: "https://api.bilibili.com/x/web-interface/view",
  baseAllVideoUrlApi: "https://api.bilibili.com/x/player/wbi/playurl?qn=120&fourk=1&fnver=0&fnval=4048",
  args: ['--cookie', '--url', '--bitch'],
  video: {
    120: "超清4K",
    112: "高清1080P+",
    80: "高清1080P",
    74: "高清720P60",
    64: "高清720P",
    48: "高清720P",
    32: "清晰480P",
    16: "流畅360P"
  }
}
