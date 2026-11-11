<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";
import type { SendLaneConfig } from "@/data/sendLanes";

defineProps<{ lane: SendLaneConfig }>();
</script>

<template>
  <section class="send-group" :id="lane.id">
    <article
      class="send-lane"
      :class="[`send-lane--${lane.id}`, { 'send-lane--flip': lane.flip }]"
    >
      <div class="send-lane__copy">
        <h2 class="send-lane__title">{{ lane.title }}</h2>
        <div class="send-lane__main">
          <div class="send-lane__pair">
            <div v-for="(item, index) in lane.items" :key="index" class="send-lane__item">
              <div class="send-lane__item-text">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <div
                v-if="item.markSrc || item.inlinePrimary || item.qrSrc"
                class="send-lane__item-visual"
              >
                <img
                  v-if="item.markSrc"
                  :class="item.markClass ?? 'send-lane__mark'"
                  :src="item.markSrc"
                  alt=""
                  width="128"
                  height="128"
                  decoding="async"
                />
                <MgButton
                  v-if="item.inlinePrimary"
                  class="send-lane__cta"
                  size="sm"
                  variant="filled"
                  :href="item.inlinePrimary.href"
                >
                  {{ item.inlinePrimary.label }}
                </MgButton>
                <div v-if="item.qrSrc" class="send-lane__qr-frame">
                  <img
                    class="send-lane__qr"
                    :src="item.qrSrc"
                    :alt="`${item.qrName}二维码`"
                    width="128"
                    height="128"
                    decoding="async"
                  />
                </div>
                <span v-if="item.qrName" class="send-lane__qr-name">{{ item.qrName }}</span>
              </div>
            </div>
          </div>
          <div v-if="lane.actions?.length" class="send-lane__actions">
            <MgButton
              v-for="action in lane.actions"
              :key="action.href + action.label"
              class="send-lane__cta"
              size="sm"
              :variant="action.variant === 'primary' ? 'filled' : 'outline'"
              :href="action.href"
              :external="action.external !== false"
            >
              {{ action.label }}
            </MgButton>
          </div>
        </div>
      </div>
      <figure class="send-lane__photo">
        <img :src="lane.photoSrc" :alt="lane.photoAlt" />
      </figure>
    </article>
  </section>
</template>
