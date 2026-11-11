import { computed } from "vue";
import type { SendLaneConfig } from "@/data/sendLanes";
import { SEND_ENTERPRISE_LANE, SEND_PERSONAL_LANE } from "@/data/sendLanes";
import { useSiteLocale } from "@/i18n/useSiteLocale";

function localizeEnterprise(t: ReturnType<typeof useSiteLocale>["t"]): SendLaneConfig {
  return {
    ...SEND_ENTERPRISE_LANE,
    title: t("ship.send.enterprise.title"),
    photoAlt: t("ship.send.enterprise.photoAlt"),
    items: [
      {
        title: t("ship.send.enterprise.import"),
        description: t("ship.send.enterprise.importDesc"),
      },
      {
        title: t("ship.send.enterprise.export"),
        description: t("ship.send.enterprise.exportDesc"),
      },
    ],
    actions: SEND_ENTERPRISE_LANE.actions?.map((action) => ({
      ...action,
      label:
        action.label === "去下单"
          ? t("ship.send.enterprise.order")
          : t("ship.send.enterprise.inquiry"),
    })),
  };
}

function localizePersonal(t: ReturnType<typeof useSiteLocale>["t"]): SendLaneConfig {
  return {
    ...SEND_PERSONAL_LANE,
    title: t("ship.send.personal.title"),
    photoAlt: t("ship.send.personal.photoAlt"),
    items: SEND_PERSONAL_LANE.items.map((item, index) => {
      if (index === 0) {
        return {
          ...item,
          title: t("ship.send.personal.web"),
          description: t("ship.send.personal.webDesc"),
          inlinePrimary: item.inlinePrimary
            ? { ...item.inlinePrimary, label: t("ship.send.personal.order") }
            : undefined,
        };
      }
      return {
        ...item,
        title: t("ship.send.personal.mobile"),
        description: t("ship.send.personal.mobileDesc"),
        qrName: t("ship.send.personal.qrName"),
      };
    }),
  };
}

export function useLocalizedSendLanes() {
  const { t, uiLang } = useSiteLocale();
  const enterpriseLane = computed(() => localizeEnterprise(t));
  const personalLane = computed(() => localizePersonal(t));
  return { enterpriseLane, personalLane, uiLang };
}
