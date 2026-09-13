import { spawn, spawnSync } from "node:child_process";
import { copyFileSync, existsSync } from "node:fs";
import process from "node:process";

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";
const venvPython = isWindows ? ".venv\\Scripts\\python.exe" : ".venv/bin/python";
const nextBinary = isWindows
  ? "frontend\\node_modules\\.bin\\next.cmd"
  : "frontend/node_modules/.bin/next";
const setupMarker = ".venv/.intellix-setup-complete";
const children = [];

function runSetupIfNeeded() {
  const setupIsComplete =
    existsSync(venvPython) &&
    existsSync(nextBinary) &&
    existsSync(setupMarker);

  if (setupIsComplete) return;

  console.log("First/incomplete run detected. Installing or repairing dependencies...");

  const result = spawnSync(process.execPath, ["scripts/setup.mjs"], {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    console.error("Setup could not be started:", result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function ensureEnvFiles() {
  if (!existsSync("frontend/.env.local") && existsSync("frontend/.env.local.example")) {
    copyFileSync("frontend/.env.local.example", "frontend/.env.local");
    console.log("Created frontend/.env.local from its safe example.");
  }

  if (!existsSync("backend/.env")) {
    if (existsSync("backend/.env.example")) {
      copyFileSync("backend/.env.example", "backend/.env");
    }

    console.error("\nbackend/.env was missing, so a safe template was created.");
    console.error("Add your Neon DATABASE_URL and a strong SECRET_KEY, then run npm run dev again.\n");
    process.exit(1);
  }
}

function run(name, command, args, color, useShell = false) {
  const child = spawn(command, args, {
    cwd: process.cwd(),
    stdio: ["inherit", "pipe", "pipe"],
    shell: useShell,
    env: process.env,
  });

  children.push(child);
  const prefix = `\x1b[${color}m[${name}]\x1b[0m`;

  child.stdout.on("data", (data) => process.stdout.write(`${prefix} ${data}`));
  child.stderr.on("data", (data) => process.stderr.write(`${prefix} ${data}`));
  child.on("error", (error) => {
    console.error(`${prefix} failed to start: ${error.message}`);
    shutdown(1);
  });
  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`${prefix} exited with code ${code}`);
      shutdown(code);
    }
  });
}

function shutdown(code = 0) {
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  setTimeout(() => process.exit(code), 250);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

runSetupIfNeeded();
ensureEnvFiles();

console.log("\nStarting Intellix...");
console.log("Frontend: http://127.0.0.1:3000");
console.log("Backend:  http://127.0.0.1:8000/docs\n");

// npm.cmd must be launched through the Windows shell.
run("FRONTEND", npmCmd, ["--prefix", "frontend", "run", "dev"], "34", isWindows);
run(
  "BACKEND",
  venvPython,
  ["-m", "uvicorn", "app.main:app", "--app-dir", "backend", "--reload", "--port", "8000"],
  "32",
  false,
);
