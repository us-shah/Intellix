import { spawnSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import process from "node:process";

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";
const systemPython = isWindows ? "python" : "python3";
const venvPython = isWindows ? ".venv\\Scripts\\python.exe" : ".venv/bin/python";
const setupMarker = ".venv/.intellix-setup-complete";

function run(command, args, options = {}) {
  console.log(`> ${command} ${args.join(" ")}`);

  const result = spawnSync(command, args, {
    stdio: options.quiet ? "pipe" : "inherit",
    cwd: process.cwd(),
    shell: isWindows && command.toLowerCase().endsWith(".cmd"),
    encoding: "utf8",
  });

  if (result.error) {
    console.error(`Failed to start ${command}:`, result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    if (options.quiet) {
      if (result.stdout) process.stdout.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);
    }
    console.error(`${command} exited with code ${result.status}`);
    process.exit(result.status ?? 1);
  }

  return result;
}

function succeeds(command, args) {
  const result = spawnSync(command, args, {
    stdio: "ignore",
    cwd: process.cwd(),
    shell: isWindows && command.toLowerCase().endsWith(".cmd"),
  });
  return !result.error && result.status === 0;
}

function createVenv() {
  console.log("Creating Python virtual environment...");
  run(systemPython, ["-m", "venv", ".venv"]);
}

console.log("\nIntellix setup\n");

// Frontend dependencies. npm install is safe to run again after a partial setup.
run(npmCmd, ["--prefix", "frontend", "install"]);

// Create the virtual environment only when it is absent.
if (!existsSync(venvPython)) {
  createVenv();
}

// A normal Python venv is created with pip already installed. Do not call
// ensurepip/upgrade-pip on every startup: some Windows Python 3.12 installs can
// become very slow or be interrupted while importing the bundled pip wheel.
if (!succeeds(venvPython, ["-m", "pip", "--version"])) {
  console.warn("pip is missing or damaged inside .venv. Recreating the virtual environment once...");
  rmSync(".venv", { recursive: true, force: true });
  createVenv();

  if (!succeeds(venvPython, ["-m", "pip", "--version"])) {
    console.error("\nCould not initialize pip inside .venv.");
    console.error("Verify that `python -m pip --version` works in PowerShell, then run `npm run dev` again.\n");
    process.exit(1);
  }
}

run(venvPython, [
  "-m",
  "pip",
  "install",
  "--disable-pip-version-check",
  "-r",
  "backend/requirements.txt",
]);

run(venvPython, [
  "-c",
  "import fastapi, uvicorn, sqlalchemy, psycopg2; print('Backend dependencies verified.')",
]);

writeFileSync(setupMarker, `Intellix setup completed with ${process.version}\n`, "utf8");

console.log("\nSetup complete.\n");
