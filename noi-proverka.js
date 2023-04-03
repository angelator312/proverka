#!/usr/bin/env node
const nodemon = require("nodemon");
const param = process.argv[2];

if (!param) {
  console.error("Argument one is not existing!!!");
  process.exit(1);
}
nodemon({
  script: __dirname+"/run.js",
  ext: "cpp",
  args: [param],
});

nodemon
  .on("start", function () {})
  .on("quit", function () {
    process.exit();
  })
  .on("restart", function (files) {
    console.log("--------------------------------");
  });
