#!/usr/bin/env node
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const param = process.argv[2];
const fs = require("fs/promises");
const ui = require("cliui")();
let errorInCompiling=false;

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
  try {
    const { stdout, stderr } = await exec(
      `clang++ ${dir}/solution.cpp -o ${dir}/solution`
    );
  } catch (err) {
    console.error("Error in compiling cpp file!!!");
    console.error(err.stderr);
    return;
  }
  console.log("Compiling is done!!!");
  return true;
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
    .map((e) => e.substring(0, e.length - 3));
  for (const i of testsList) {
    const fSol = (await fs.readFile(`${dir}/tests/${i}.sol`)).toString().trim();
    let { stdout, stderr } = await exec(
      ` ${dir}/solution < ${dir}/tests/${i}.in`
    );
    stdout = stdout.trim();
    //console.log(stdout);
    if (stdout == fSol)
      ui.div({ text: i, width: 15 }, { text: "✅", width: 3 }, stdout, fSol);
    else ui.div({ text: i, width: 15 }, { text: "❌", width: 3 }, stdout, fSol);
  }
  console.log(ui.toString());
}
async function main() {
  if(await compile(param))
    await test(param);
}
main();
