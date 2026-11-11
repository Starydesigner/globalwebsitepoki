// 全局输入框「清空」：聚焦且有内容时显示，交互与原关闭钮一致

const FIELD_CLEAR_SELECTOR = [
  ".clearance-form__input",
  ".cb-warehouse-form__input",
  "input.rate-control--input",
].join(",");

const SKIP_TYPES = new Set(["checkbox", "radio", "file", "hidden", "submit", "button"]);

function bindFieldClear(input: HTMLInputElement | HTMLTextAreaElement) {
  if (input.dataset.fieldClearReady === "1") return;
  if (input.parentElement?.classList.contains("field-clear-wrap")) return;
  const type = (input.getAttribute("type") || "text").toLowerCase();
  if (SKIP_TYPES.has(type)) return;

  input.dataset.fieldClearReady = "1";

  const wrap = document.createElement("div");
  wrap.className = "field-clear-wrap";
  const parent = input.parentNode;
  if (!parent) return;
  parent.insertBefore(wrap, input);
  wrap.appendChild(input);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "field-clear";
  btn.textContent = "清空";
  btn.hidden = true;
  wrap.appendChild(btn);

  const sync = () => {
    const focused = document.activeElement === input;
    const hasValue = Boolean(String(input.value || "").trim());
    btn.hidden = !(focused && hasValue);
  };

  btn.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });
  btn.addEventListener("click", () => {
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    sync();
    input.focus();
  });

  input.addEventListener("focus", sync);
  input.addEventListener("blur", sync);
  input.addEventListener("input", sync);
}

/** 扫描并挂载清空按钮（可重复调用，已处理的输入会跳过） */
export function initFieldClear(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(FIELD_CLEAR_SELECTOR).forEach((el) => {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      bindFieldClear(el);
    }
  });
}
