# backend-nodejs


## ES6 developing environment setup
- [How to enable ES6 (and beyond) syntax with Node and Express](https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/#how-does-it-work-a-high-level-view-of-what-we-need)
- [babel 7, async/await issue](https://stackoverflow.com/a/53736090/8694937)

```
npm install --save @babel/core @babel/cli @babel/preset-env nodemon rimraf
```

## express issue
- silence reject - `UnhandledPromiseRejectionWarning`
  - express 預計 5.x 才要更廣泛支援 async/await 的特性，導致目前語法中使用 asunc/await 會造成 silence reject 的情況發生
  - 目前只能醜醜地把需要 try/except 的部分包起來丟給 `next()`，然後讓 `app.use()` 中定義的 catch-all error handler 發揮作用
  - ref: [Handling errors in express async middleware](https://stackoverflow.com/a/51391081/8694937)