
# 品葱备份计划

## 品葱备份计划是什么？

2018年10月30日，品葱爆破，十多万品葱优秀提问和回答自此消失。

对于品葱的提问和回答，虽不断有备份，但过于零碎和分散。

品葱备份计划旨在将这些零碎的备份集中起来，在品葱熟悉的界面上重新显示，加快恢复品葱原貌。

## 如何参与品葱备份计划

详见置顶文章 [如何协作参与品葱备份计划](./participate.md)

## 如何帮助打破封锁

由于官方 GitHub Page 随时可能被墙，你可以轻松做一个可直连的网站：

方法：
1. 注册 GitHub
2. fork <https://github.com/PincongBackup/PincongBackup.github.io>
3. 在 setting 中打开 GitHub Page，source 选择“master branch”
4. 在 setting 中将项目名称改为 `PincongBackup`
5. 修改 fork 后的仓库，将 `_config.yml` 中第 43 行 `baseurl: # /PincongBackup` 中的 “#” 去掉，并将 37 行 `url: https://PincongBackup.github.io` 改为 `url: https://<username>.github.io`

然后就可以通过 `https://<username>.github.io/PincongBackup` 访问。

## 镜像

### IPFS

* [Cloudflare IPFS](https://cloudflare-ipfs.com/ipns/QmZypJxFqniaRXkuN9vVQxvnUcnC5PACpiioMgABk87aNN)

* [IPFS.io](https://ipfs.io/ipns/QmZypJxFqniaRXkuN9vVQxvnUcnC5PACpiioMgABk87aNN)

* [本地自建IPFS网关 ipns://QmZypJxFqniaRXkuN9vVQxvnUcnC5PACpiioMgABk87aNN](http://localhost:8080/ipns/QmZypJxFqniaRXkuN9vVQxvnUcnC5PACpiioMgABk87aNN)

## 本地预览

本项目自动构建生成的页面单独存放在 [PincongBackup/pages](https://github.com/PincongBackup/pages) 仓库，可以直接下载查看。

1. 在命令行中输入 `git clone --depth=1 https://github.com/PincongBackup/pages.git`
或者 下载[zip文件](https://github.com/PincongBackup/pages/archive/master.zip)并解压缩

2. 在浏览器中打开 `index.html`

## 构建

```bash
gem install bundler jekyll
git clone --depth=1 https://github.com/PincongBackup/PincongBackup.github.io.git
cd PincongBackup.github.io
jekyll serve
```

## 致谢

* 灵感来自于 [端点星计划](https://github.com/Terminus2049/Terminus2049.github.io/)

### 贡献者

* @PincongBot

## 许可证

根据 MIT 许可证开源。

## 关于内容版权

本站备份的问题和回答的版权归原作者所有。如果侵犯了您的权益，请提交 issue，我们将在第一时间予以删除。
