# tooool
### 已经添加自动化构建脚本
#### 注意：
##### 1.已有项目的同学请重新拉取项目，因为已经改变项目目录
##### 2.原始文件在项目的developHtml文件夹内（其他目录请勿更改）
##### 3.项目内引入图片请使用完整的相对地址 如“./static/icon.png”，目前只是写了这一个规则，如有在二级目录下引入图片：如“../static/”等，请在群里叫我，我添加替换规则。
#### 使用方法：
##### 1.拉取项目并提交后，jenkins会自动从github拉取项目并编译。将static文件夹内的静态文件更改文件名后上传到cos，html文件动态更换新文件连接后打包发送至测试服务器。完成后会有机器人在群里发送完成通知。此时访问预览网址既可与预览效果。
##### 2.由于原预览网址为githun.io提供，自动化后不再适用，所以更新预览网址为https://cyxtest.my.2k.ink
