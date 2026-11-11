<script setup lang="ts">
import { ref } from "vue";
import { ABOUT_CULTURE_ITEMS, type AboutCultureItem } from "@/content/about/aboutContent";

defineOptions({ name: "AboutCultureShowcase" });

const activeId = ref(ABOUT_CULTURE_ITEMS[0]?.id ?? "");

function isActive(item: AboutCultureItem) {
  return activeId.value === item.id;
}

function activate(item: AboutCultureItem) {
  activeId.value = item.id;
}

function onKeydown(event: KeyboardEvent, item: AboutCultureItem, index: number) {
  const last = ABOUT_CULTURE_ITEMS.length - 1;
  if (event.key === "ArrowRight") {
    event.preventDefault();
    activeId.value = ABOUT_CULTURE_ITEMS[Math.min(index + 1, last)]?.id ?? activeId.value;
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    activeId.value = ABOUT_CULTURE_ITEMS[Math.max(index - 1, 0)]?.id ?? activeId.value;
  } else if (event.key === "Home") {
    event.preventDefault();
    activeId.value = ABOUT_CULTURE_ITEMS[0]?.id ?? "";
  } else if (event.key === "End") {
    event.preventDefault();
    activeId.value = ABOUT_CULTURE_ITEMS[last]?.id ?? "";
  } else if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    activate(item);
  }
}
</script>

<template>
  <div class="about-culture-showcase">
    <div
      class="about-culture-pillars"
      role="tablist"
      aria-label="企业文化"
      @mouseleave="activeId = ABOUT_CULTURE_ITEMS[0]?.id ?? ''"
    >
      <article
        v-for="(item, index) in ABOUT_CULTURE_ITEMS"
        :key="item.id"
        class="about-culture-pillar"
        :class="{ 'is-active': isActive(item) }"
        role="tab"
        :aria-selected="isActive(item)"
        :tabindex="isActive(item) ? 0 : -1"
        @click="activate(item)"
        @mouseenter="activate(item)"
        @keydown="onKeydown($event, item, index)"
      >
        <img class="about-culture-pillar__bg" :src="item.image" alt="" loading="lazy" />
        <div class="about-culture-pillar__veil" aria-hidden="true" />

        <span class="about-culture-pillar__icon" aria-hidden="true">
          <img :src="item.iconSrc" alt="" width="32" height="32" />
        </span>

        <div class="about-culture-pillar__body">
          <div class="about-culture-pillar__head">
            <h3 class="about-culture-pillar__title">{{ item.title }}</h3>
            <span v-if="isActive(item)" class="about-culture-pillar__rule" aria-hidden="true" />
          </div>

          <div v-if="isActive(item)" class="about-culture-pillar__expanded">
            <p class="about-culture-pillar__desc">{{ item.description }}</p>
          </div>

          <p
            v-else
            class="about-culture-pillar__tagline about-culture-pillar__tagline--foot"
          >
            {{ item.tagline }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.about-culture-showcase {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.about-culture-pillars {
  display: flex;
  gap: 10px;
  min-height: 360px;
}

.about-culture-pillar {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--mg-Grayblue-30);
  border-radius: 20px;
  padding: 0;
  cursor: pointer;
  text-align: left;
  background: #f4f8fc;
  transition:
    flex 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.35s ease,
    box-shadow 0.35s ease;
  outline: none;
}

.about-culture-pillar.is-active {
  flex: 2.4 1 0;
  border-color: transparent;
  box-shadow: 0 20px 48px rgba(1, 22, 46, 0.18);
}

.about-culture-pillar:focus-visible {
  box-shadow: 0 0 0 3px #fff, 0 0 0 6px var(--mg-blue-60);
}

.about-culture-pillar__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition:
    filter 0.55s ease,
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  filter: grayscale(1) brightness(1.12) contrast(0.92);
}

.about-culture-pillar.is-active .about-culture-pillar__bg {
  filter: none;
  transform: scale(1.04);
}

.about-culture-pillar__veil {
  position: absolute;
  z-index: 1;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.92) 55%, rgba(244, 248, 252, 0.96) 100%);
  transition: background 0.45s ease;
}

/* 悬浮/展开：固定底色蒙层 + 自上而下渐深，保证文字可读 */
.about-culture-pillar.is-active .about-culture-pillar__veil {
  background:
    linear-gradient(
      180deg,
      rgba(1, 22, 46, 0.28) 0%,
      rgba(1, 22, 46, 0.52) 42%,
      rgba(1, 22, 46, 0.78) 100%
    ),
    rgba(1, 22, 46, 0.48);
}

.about-culture-pillar__icon {
  position: absolute;
  z-index: 2;
  top: 22px;
  left: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  pointer-events: none;
}

.about-culture-pillar__icon img {
  display: block;
  width: 32px;
  height: 32px;
}

.about-culture-pillar.is-active .about-culture-pillar__icon img {
  filter: brightness(0) invert(1);
}

.about-culture-pillar__body {
  position: absolute;
  z-index: 2;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 72px 22px 28px;
}

.about-culture-pillar__head {
  flex: none;
}

.about-culture-pillar__title {
  margin: 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: var(--mg-Grayblue-100);
  transition: color 0.35s ease;
}

.about-culture-pillar.is-active .about-culture-pillar__title {
  font-size: 26px;
  line-height: 34px;
  color: #fff;
  text-shadow: 0 1px 12px rgba(1, 22, 46, 0.45);
}

.about-culture-pillar__rule {
  display: block;
  width: 100%;
  max-width: 120px;
  height: 1px;
  margin-top: 14px;
  background: rgba(255, 255, 255, 0.55);
}

.about-culture-pillar__expanded {
  flex: 1 1 auto;
  margin-top: 12px;
}

.about-culture-pillar__tagline {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
}

.about-culture-pillar__tagline--foot {
  margin-top: auto;
  color: var(--mg-Grayblue-70);
  font-weight: 500;
}

.about-culture-pillar__desc {
  margin: 0;
  max-width: 22em;
  font-size: clamp(18px, 2.1vw, 22px);
  line-height: 1.55;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.96);
  text-shadow: 0 1px 10px rgba(1, 22, 46, 0.4);
}

@media (width <= 960px) {
  .about-culture-pillars {
    flex-direction: column;
    min-height: 0;
  }

  .about-culture-pillar,
  .about-culture-pillar.is-active {
    flex: none;
    min-height: 300px;
  }

  .about-culture-pillar:not(.is-active) {
    min-height: 140px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-culture-pillar,
  .about-culture-pillar__bg,
  .about-culture-pillar__veil {
    transition: none;
  }
}
</style>
