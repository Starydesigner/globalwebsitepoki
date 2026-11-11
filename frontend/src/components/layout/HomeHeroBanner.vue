<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import MgButton from "@/components/common/MgButton.vue";
import { useHeroVideo } from "@/composables/home/useHeroVideo";
import { SITE } from "@/config/sitePaths";
import { HOME_HERO_VIDEO_URL } from "@/config/siteVideos";
import { useSiteLocale } from "@/i18n/useSiteLocale";

const router = useRouter();
const { t } = useSiteLocale();
const heroRef = ref<HTMLElement | null>(null);
const trackInputRef = ref<HTMLTextAreaElement | null>(null);
const trackQueryText = ref("");

const trackInputFocused = ref(false);
const showTrackClear = computed(
  () => trackInputFocused.value && trackQueryText.value.trim() !== "",
);

useHeroVideo(heroRef);

function clearTrackQuery() {
  trackQueryText.value = "";
  trackInputRef.value?.focus();
}

function focusTrackInput() {
  trackInputRef.value?.focus();
}

function submitTrackQuery() {
  const value = (trackQueryText.value || trackInputRef.value?.value || "").trim();
  if (!value) return;
  void router.push({ path: SITE.onlineSend, query: { nos: value }, hash: "#track" });
}

const heroVideoSrc = HOME_HERO_VIDEO_URL;
</script>

<template>
  <section
    ref="heroRef"
    class="hero"
    aria-label="首屏"
    data-hero-video-toggle
    aria-pressed="true"
  >
    <div class="hero__media" aria-hidden="true">
      <div class="hero__video-layer">
        <video
          :src="heroVideoSrc"
          autoplay
          muted
          playsinline
          loop
          preload="auto"
        />
      </div>
    </div>
    <div class="container hero__track-bar">
      <div class="hero__dock">
        <div class="track-bar">
          <div class="track-bar__search" @click="focusTrackInput">
            <label class="track-bar__input-wrap" @click.stop="focusTrackInput">
              <img src="asset/icons/svg_1e307182.svg" alt="" />
              <textarea
                ref="trackInputRef"
                v-model="trackQueryText"
                class="track-bar__input"
                rows="1"
                :placeholder="t('home.hero.trackPlaceholder')"
                :aria-label="t('home.hero.trackAria')"
                @focus="trackInputFocused = true"
                @blur="trackInputFocused = false"
              />
              <button
                v-show="showTrackClear"
                type="button"
                class="field-clear track-bar__clear"
                @mousedown.prevent
                @click.stop="clearTrackQuery"
              >
                {{ t("home.hero.trackClear") }}
              </button>
            </label>
            <MgButton
              class="track-bar__submit"
              type="button"
              variant="filled"
              size="lg"
              @click.stop="submitTrackQuery"
            >
              {{ t("home.hero.trackSubmit") }}
            </MgButton>
          </div>
          <div class="track-bar__links">
            <AppLink class="track-bar__shortcut" href="/online-send#personal">
              <span class="track-bar__shortcut-face">
                <span class="track-bar__shortcut-label">
                  <span class="track-bar__shortcut-text">{{ t("home.hero.personalShip") }}</span>
                  <svg
                    class="track-bar__shortcut-arrow"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.25 14.25L14.25 6.25M14.25 6.25H9M14.25 6.25V11.5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </AppLink>
            <AppLink class="track-bar__shortcut" href="/online-send#enterprise">
              <span class="track-bar__shortcut-face">
                <span class="track-bar__shortcut-label">
                  <span class="track-bar__shortcut-text">{{ t("home.hero.enterpriseShip") }}</span>
                  <svg
                    class="track-bar__shortcut-arrow"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.25 14.25L14.25 6.25M14.25 6.25H9M14.25 6.25V11.5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </AppLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
