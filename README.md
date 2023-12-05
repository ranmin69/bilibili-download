# bilibiliDownload

## 介绍：
哔哩哔哩下载脚本，仅供学习参考。切勿传播，小心吃官司。<br/>

## 运行环境：
1. Deno 1.38.2 及以上版本;
2. FFmpeg 6.1 (由于哔哩哔哩 视频 和 音频 是分开的，下载后需要合并，如果不想合并，可以不下载 FFmpeg)
3. Mac Os（windows 应该也行，没试）。

## 安装教程：
1.  下载 Deno https://www.denojs.cn/#installation
2.  下载 FFmpeg https://ffmpeg.org/download.html
3.  安装脚本
```shell
deno install --allow-all --name bili <入口文件路径（index.js）>
```
4.  如果对代码有修改，需更新（重新安装）：
```shell
deno install -f --allow-all --name bili <入口文件路径（index.js）> 
```

## 使用说明：
1.  <font color=orangered>**第一次使用前请先设置 cookie**</font> <br/>如果不设置cookie，也可以下载，但分辨率很低。
```shell
bili --cookie 'your cookie...'
```
2. 下载视频
```shell
bili --url 'https://www.bilibili.com/video/BV1zE41197kV\?p\=17\&vd_source\=a3309e57c732073f94bc3088bdc0bf96' 
```

### 参考资料:
https://www.bilibili.com/read/cv6415114/
https://juejin.cn/post/7253969759191023675
https://stackoverflow.com/questions/64398431/how-to-console-log-without-a-newline-in-deno
https://www.cnblogs.com/taohuaya/p/16427408.html
