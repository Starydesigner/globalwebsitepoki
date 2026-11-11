import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const bodyPath = path.join(root, "src/content/home/body.html");
const outDir = path.join(root, "src/components/home");

const inner = fs.readFileSync(bodyPath, "utf8").trim();

const iMission = inner.indexOf('<section class="mission-scene"');
const iNews = inner.indexOf('<section class="section-block section-news"');
if (iMission < 0 || iNews < 0) throw new Error("home/body.html: section markers not found");

const products = inner.slice(0, iMission).trim();
const mission = inner.slice(iMission, iNews).trim();
const news = inner.slice(iNews).trim();

function wrap(name, scriptSetup, body) {
  return `<script setup lang="ts">
${scriptSetup.trim()}
</script>

<template>
${body}
</template>
`;
}

const productsScript = `import { useHomeProductGridHover } from "@/composables/home/useHomeProductGridHover";
import { useProductCardSharedTransition } from "@/composables/home/useProductCardSharedTransition";

defineOptions({ name: "HomeProductsSection" });
useHomeProductGridHover();
useProductCardSharedTransition();`;

const missionScript = `import { onMounted, onUnmounted } from "vue";
import { initMissionIntroHalo } from "@/composables/home/missionIntroHalo";
import { initMissionScene } from "@/composables/home/missionScene";

defineOptions({ name: "HomeMissionSection" });

let cleanupMission: (() => void) | undefined;
let cleanupHalo: (() => void) | undefined;

onMounted(() => {
  cleanupMission = initMissionScene();
  cleanupHalo = initMissionIntroHalo();
});

onUnmounted(() => {
  cleanupMission?.();
  cleanupHalo?.();
});`;

const newsScript = `defineOptions({ name: "HomeNewsSection" });`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "HomeProductsSection.vue"),
  wrap("HomeProductsSection", productsScript, products),
);
fs.writeFileSync(
  path.join(outDir, "HomeMissionSection.vue"),
  wrap("HomeMissionSection", missionScript, mission),
);
fs.writeFileSync(path.join(outDir, "HomeNewsSection.vue"), wrap("HomeNewsSection", newsScript, news));
console.log("Split home sections from body.html:", products.length, mission.length, news.length);
