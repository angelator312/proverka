#!/usr/bin/env node
const util = require("node:util");
const spawn = util.promisify(require("node:child_process").spawn);
const exec = util.promisify(require("node:child_process").exec);
const param = process.argv[2];
const fs = require("fs/promises");
const stream = require("stream");

async function compile(dir) {
  try {
    const stat = await fs.stat(dir);
    if (!stat.isDirectory()) {
      console.error("Error argument one is not a directory!!!");
      return;
    }
    await fs.stat(`${dir}/solution.cpp`);
  } catch (error) {
    console.error(
      "Error argument one does not exist or has no solution.cpp!!!"
    );
    return;
  }
  const { stdout, stderr } = await exec(
    `clang++ ${dir}/solution.cpp -o ${dir}/solution`
  );
  if (stderr) {
    console.error("Error in compiling cpp file!!!");
    return;
  }
  console.log("Compiling is done!!!");
}
async function test(dir) {
  try {
    await fs.stat(`${dir}/tests`);
  } catch (error) {
    console.error(
      "Error argument one does not exist or no tests in directory!!!"
    );
    return;
  }
  const testsList = (await fs.readdir(`${dir}/tests/`))
    .filter((t) => t.endsWith(".in"))
    .map((e)=>e.substring(0,e.length-3));
  for (const i of testsList) {
    const fSol=(await fs.readFile(`${dir}/tests/${i}.sol`)).toString();
    const { stdout, stderr } = await exec(
        ` ${dir}/solution < ${dir}/tests/${i}.in`
      );
    //console.log(stdout);
    if(stdout.trim()==fSol.trim())console.log(`${i} : Done test `);
    else console.log(`${i} : Failed test `);
  }
}
async function main() {
  await compile(param);
  await test(param);
}
main();