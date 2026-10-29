const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

async function main() {
  console.log("===> Starting cPanel Production Packaging...");

  const rootDir = process.cwd();
  const standaloneDir = path.join(rootDir, ".next", "standalone");
  const staticDir = path.join(rootDir, ".next", "static");
  const targetStaticDir = path.join(standaloneDir, ".next", "static");
  const publicDir = path.join(rootDir, "public");
  const targetPublicDir = path.join(standaloneDir, "public");

  if (!fs.existsSync(standaloneDir)) {
    console.error("Error: .next/standalone does not exist! Please run `npm run build` first.");
    process.exit(1);
  }

  // 1. Copy .next/static into .next/standalone/.next/static
  console.log("1. Copying .next/static to standalone...");
  copyFolderSync(staticDir, targetStaticDir);

  // 2. Copy public into .next/standalone/public
  console.log("2. Copying public assets to standalone...");
  copyFolderSync(publicDir, targetPublicDir);

  // 3. Copy database.sql
  console.log("3. Copying latest database.sql...");
  fs.copyFileSync(path.join(rootDir, "database.sql"), path.join(standaloneDir, "database.sql"));

  // 4. Copy .env.example
  console.log("4. Copying .env.example...");
  fs.copyFileSync(path.join(rootDir, ".env.example"), path.join(standaloneDir, ".env.example"));

  // 5. Copy CPANEL_DEPLOY_GUIDE.md if present
  const cpanelGuide = path.join(rootDir, "CPANEL_DEPLOY_GUIDE.md");
  if (fs.existsSync(cpanelGuide)) {
    fs.copyFileSync(cpanelGuide, path.join(standaloneDir, "CPANEL_DEPLOY_GUIDE.md"));
  }

  // 6. Delete any local .env files from standalone so private credentials are not packaged
  const envFilesToDelete = [".env", ".env.local", ".env.production", ".env.development"];
  for (const envFile of envFilesToDelete) {
    const p = path.join(standaloneDir, envFile);
    if (fs.existsSync(p)) {
      console.log(`Removing ${envFile} from standalone...`);
      fs.unlinkSync(p);
    }
  }

  // 7. Create Zip archive
  const zipPath = path.join(rootDir, "nishafashions-production.zip");
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  console.log(`7. Compressing standalone build into ${zipPath}...`);
  // Use tar.exe -a -c -f to zip files from inside the standalone directory
  // Note: Only .env.example is included, .env is strictly excluded
  execSync(`tar -a -c -f "${zipPath}" * .next .env.example`, {
    cwd: standaloneDir,
    stdio: "inherit",
    shell: "cmd.exe",
  });

  const stats = fs.statSync(zipPath);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`===> Packaging Complete!`);
  console.log(`Archive: ${zipPath} (${sizeMb} MB)`);
}

main().catch((err) => {
  console.error("Packaging failed:", err);
  process.exit(1);
});
