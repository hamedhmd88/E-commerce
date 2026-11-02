import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import { resolve, sep } from "node:path";

const root = resolve(process.cwd());
const output = resolve(root, ".next-build");
if (!output.startsWith(root + sep)) {
  throw new Error("Build output must stay inside the project.");
}

const customOutput = Boolean(process.env.NEXT_VISUAL_DIST_DIR);
const maxAttempts = customOutput ? 1 : 3;

function runNextBuild() {
  return new Promise((resolveResult) => {
    const child = spawn(
      process.execPath,
      [resolve(root, "node_modules/next/dist/bin/next"), "build"],
      {
        cwd: root,
        env: process.env,
        stdio: ["inherit", "pipe", "pipe"],
      },
    );
    let recentOutput = "";
    for (const stream of [child.stdout, child.stderr]) {
      stream.on("data", (chunk) => {
        const value = chunk.toString();
        recentOutput = (recentOutput + value).slice(-12000);
        (stream === child.stdout ? process.stdout : process.stderr).write(
          chunk,
        );
      });
    }
    child.on("error", (error) =>
      resolveResult({ code: 1, output: error.message }),
    );
    child.on("close", (code) =>
      resolveResult({ code: code ?? 1, output: recentOutput }),
    );
  });
}

let exitCode = 1;
for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  if (!customOutput) {
    try {
      await rm(output, {
        recursive: true,
        force: true,
        maxRetries: 5,
        retryDelay: 250,
      });
    } catch (error) {
      if (attempt === maxAttempts || error?.code !== "EPERM") throw error;
      process.stderr.write(
        `Build output cleanup was temporarily locked; retrying (${attempt + 1}/${maxAttempts}).\n`,
      );
      await new Promise((done) => setTimeout(done, attempt * 500));
      continue;
    }
  }
  const result = await runNextBuild();
  if (result.code === 0) {
    exitCode = 0;
    break;
  }
  exitCode = result.code;
  if (
    attempt === maxAttempts ||
    !/EPERM: operation not permitted/i.test(result.output)
  ) {
    break;
  }
  process.stderr.write(
    `Build output was temporarily locked; retrying inside ${root} (${attempt + 1}/${maxAttempts}).\n`,
  );
  await new Promise((done) => setTimeout(done, attempt * 500));
}
process.exitCode = exitCode;
