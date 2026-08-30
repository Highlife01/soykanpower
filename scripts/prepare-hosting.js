const fs = require("fs");
const path = require("path");

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function prepareHosting() {
  const outDir = path.join(process.cwd(), "out_hosting");

  console.log("Preparing out_hosting directory for Firebase Hosting deploy...");

  // Clean out_hosting
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  // 1. Copy public assets (images, logo, fonts, etc.)
  const publicDir = path.join(process.cwd(), "public");
  if (fs.existsSync(publicDir)) {
    console.log("Copying public assets...");
    copyDirRecursive(publicDir, outDir);
  }

  // 2. Copy .next/static to out_hosting/_next/static
  const nextStaticDir = path.join(process.cwd(), ".next", "static");
  const destNextStatic = path.join(outDir, "_next", "static");
  if (fs.existsSync(nextStaticDir)) {
    console.log("Copying .next/static to _next/static...");
    copyDirRecursive(nextStaticDir, destNextStatic);
  }

  // 3. Copy generated HTML pages from .next/server/app
  const nextServerApp = path.join(process.cwd(), ".next", "server", "app");
  if (fs.existsSync(nextServerApp)) {
    console.log("Copying generated HTML pages...");
    
    function copyHtmlPages(currentSrc, currentDest) {
      const items = fs.readdirSync(currentSrc, { withFileTypes: true });
      for (const item of items) {
        const itemSrc = path.join(currentSrc, item.name);
        
        if (item.isDirectory()) {
          // Skip api, segments, _global-error
          if (item.name.endsWith(".segments") || item.name === "_global-error") continue;
          const newDest = path.join(currentDest, item.name === "(public)" ? "" : item.name);
          copyHtmlPages(itemSrc, newDest);
        } else if (item.name.endsWith(".html")) {
          if (!fs.existsSync(currentDest)) fs.mkdirSync(currentDest, { recursive: true });
          const destFile = path.join(currentDest, item.name);
          fs.copyFileSync(itemSrc, destFile);
        } else if (item.name === "sitemap.xml.body") {
          if (!fs.existsSync(currentDest)) fs.mkdirSync(currentDest, { recursive: true });
          fs.copyFileSync(itemSrc, path.join(currentDest, "sitemap.xml"));
        }
      }
    }

    copyHtmlPages(nextServerApp, outDir);
  }

  // 4. Ensure index.html exists
  if (fs.existsSync(path.join(nextServerApp, "index.html"))) {
    fs.copyFileSync(path.join(nextServerApp, "index.html"), path.join(outDir, "index.html"));
  }

  // 5. Create 404.html fallback
  if (fs.existsSync(path.join(nextServerApp, "_not-found.html"))) {
    fs.copyFileSync(path.join(nextServerApp, "_not-found.html"), path.join(outDir, "404.html"));
  }

  console.log("✓ out_hosting successfully prepared!");
}

prepareHosting();
