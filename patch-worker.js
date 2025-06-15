// patch-worker.js
// Script Node.js pour générer un worker Amazon IVS patché localement pour l'extension Chrome
const fs = require("fs");
const path = require("path");

const workerSrc = path.join(
  __dirname,
  "node_modules/amazon-ivs-player/dist/assets/amazon-ivs-worker.min.js"
);
const patchSrc = path.join(__dirname, "src/patch_amazonworker.js");
const output = path.join(__dirname, "src/amazon-ivs-worker.min.js");

if (!fs.existsSync(workerSrc)) {
  console.error("Fichier worker Amazon IVS introuvable :", workerSrc);
  process.exit(1);
}
if (!fs.existsSync(patchSrc)) {
  console.error("Fichier patch_amazonworker.js introuvable :", patchSrc);
  process.exit(1);
}

const amazon_worker = fs.readFileSync(workerSrc);
const patch = fs.readFileSync(patchSrc);

fs.writeFileSync(output, patch + amazon_worker);

console.log("Worker Amazon IVS patché généré :", output);
