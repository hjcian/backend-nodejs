# backend-nodejs

- [backend-nodejs](#backend-nodejs)
  - [安裝套件](#安裝套件)
  - [運行開發環境](#運行開發環境)
    - [運行後端服務搭配本地端 mongodb](#運行後端服務搭配本地端-mongodb)
    - [運行後端服務搭配雲端 mongodb](#運行後端服務搭配雲端-mongodb)
    - [上傳測試用資料至資料庫](#上傳測試用資料至資料庫)
  - [Dev notes](#dev-notes)
    - [ES6 developing environment setup](#es6-developing-environment-setup)
    - [express issue](#express-issue)

此 repo 為支援 [nis-reactjs](https://github.com/hjcian/nis-reactjs) 的後端服務

## 安裝套件
`npm i`
## 運行開發環境

### 運行後端服務搭配本地端 mongodb
1. 先使用 Docker 運行 mongodb - `make restart-mongo`
2. 再運行服務 - `make run-dev-with-local-mongo`

### 運行後端服務搭配雲端 mongodb
1. 先建立一個 cloud mongodb 叢集 ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas))，取得連線資訊
2. 修改 [Makefile](./Makefile) 內 target `run-dev-with-cloud-mongo` 中描述的各項 `<YOUR_CLOUD_MONGO_******>` ENV，成為欲連接的 cloud mongodb 的連線資訊
3. 再運行服務 - `make run-dev-with-cloud-mongo`

### 上傳測試用資料至資料庫
1. 首先[運行後端服務搭配本地端 mongodb](#運行後端服務搭配本地端-mongodb) 或 [運行後端服務搭配雲端 mongodb](#運行後端服務搭配雲端-mongodb)
2. 發送 POST 請求至服務 - `make post-test-data`

## Dev notes
### ES6 developing environment setup
- [How to enable ES6 (and beyond) syntax with Node and Express](https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/#how-does-it-work-a-high-level-view-of-what-we-need)
  ```
  npm install --save @babel/core @babel/cli @babel/preset-env nodemon rimraf
  ```
- [babel 7, async/await issue](https://stackoverflow.com/a/53736090/8694937)


### express issue
- ***silence reject - `UnhandledPromiseRejectionWarning`***
  - express 預計 5.x 才要更廣泛支援 async/await 的特性，導致目前語法中使用 asunc/await 會造成 silence reject 的情況發生
  - 目前只能醜醜地把需要 try/except 的部分包起來丟給 `next()`，然後讓 `app.use()` 中定義的 catch-all error handler 發揮作用
  - ref: [Handling errors in express async middleware](https://stackoverflow.com/a/51391081/8694937)