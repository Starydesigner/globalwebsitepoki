import { nextTick, onMounted, onUnmounted } from "vue";
import { initFieldClear } from "@/composables/fieldClear";

const MOBILE_RE = /^1\d{10}$/;
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** 企业合作咨询表单（原 enterprise-inquiry.js） */
export function useEnterpriseInquiry() {
  let cleanup: (() => void) | undefined;

  onMounted(() => {
    const form = document.getElementById("enterprise-inquiry-form") as HTMLFormElement | null;
    const cleanups: (() => void)[] = [];

    if (!form) {
      cleanup = () => cleanups.forEach((fn) => fn());
      return;
    }

    const canvas = form.querySelector("[data-captcha-canvas]") as HTMLCanvasElement | null;
    const refreshBtn = form.querySelector("[data-captcha-refresh]");
    const tip = form.querySelector("[data-inquiry-tip]") as HTMLElement | null;
    let captchaValue = "";

    const randomCode = (len: number) => {
      let out = "";
      for (let i = 0; i < len; i += 1) {
        out += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
      }
      return out;
    };

    const drawCaptcha = () => {
      if (!canvas) return;
      captchaValue = randomCode(4);
      canvas.dataset.captcha = captchaValue;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#eef4fc";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 6; i += 1) {
        ctx.strokeStyle = `rgba(6, 112, 232, ${0.08 + Math.random() * 0.12})`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * w, Math.random() * h);
        ctx.lineTo(Math.random() * w, Math.random() * h);
        ctx.stroke();
      }
      ctx.font = "bold 22px system-ui, sans-serif";
      ctx.fillStyle = "#01162e";
      ctx.textBaseline = "middle";
      ctx.fillText(captchaValue, 18, h / 2 + 1);
    };

    const setTip = (message: string, kind: "info" | "success" | "error" | null) => {
      if (!tip) return;
      tip.hidden = !message;
      tip.textContent = message || "";
      tip.classList.remove("is-info", "is-success", "is-error");
      if (kind) tip.classList.add(`is-${kind}`);
    };

    const applyBizFromQuery = () => {
      const params = new URLSearchParams(location.search);
      const biz = params.get("biz");
      if (!biz) return;
      const input = form.querySelector(`input[name="bizType"][value="${biz}"]`) as HTMLInputElement | null;
      if (input) input.checked = true;
    };

    drawCaptcha();
    applyBizFromQuery();

    const onRefresh = () => {
      drawCaptcha();
      setTip("", null);
    };
    refreshBtn?.addEventListener("click", onRefresh);
    cleanups.push(() => refreshBtn?.removeEventListener("click", onRefresh));

    const onSubmit = (event: Event) => {
      event.preventDefault();
      setTip("", null);

      const companyName = (form.companyName.value || "").trim();
      const contactName = (form.contactName.value || "").trim();
      const contactMobile = (form.contactMobile.value || "").trim();
      const shippingNeed = (form.shippingNeed.value || "").trim();
      const captchaInput = (form.captcha.value || "").trim();

      if (!companyName) {
        setTip("请填写公司全称", "error");
        form.companyName.focus();
        return;
      }
      if (!contactName) {
        setTip("请填写联系人姓名", "error");
        form.contactName.focus();
        return;
      }
      if (!MOBILE_RE.test(contactMobile)) {
        setTip("请填写正确的联系人手机号", "error");
        form.contactMobile.focus();
        return;
      }
      if (!shippingNeed) {
        setTip("请填写发货需求", "error");
        form.shippingNeed.focus();
        return;
      }
      if (!captchaInput || captchaInput.toUpperCase() !== captchaValue) {
        setTip("验证码有误，请重新输入", "error");
        drawCaptcha();
        form.captcha.value = "";
        form.captcha.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]') as HTMLButtonElement | null;
      if (submitBtn) submitBtn.disabled = true;
      window.setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
        setTip("提交成功，我们会尽快与您联系", "success");
        form.reset();
        const importRadio = form.querySelector('input[name="bizType"][value="import"]') as HTMLInputElement | null;
        if (importRadio) importRadio.checked = true;
        drawCaptcha();
      }, 500);
    };

    form.addEventListener("submit", onSubmit);
    cleanups.push(() => form.removeEventListener("submit", onSubmit));

    void nextTick(() => initFieldClear(form));

    cleanup = () => cleanups.forEach((fn) => fn());
  });

  onUnmounted(() => cleanup?.());
}
