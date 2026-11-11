// @ts-nocheck — 自 js 迁入，后续可补类型与 teardown
import { siteMsg } from "@/i18n/siteMsg";
export function initNoticePanel(): () => void {
  var TAB_HASH = {
    notice: "forbidden",
    "notice-forbidden": "forbidden",
    forbidden: "forbidden",
    "notice-tariff": "tariff",
    tariff: "tariff",
    tax: "tariff",
    "notice-tax": "tariff",
  };

  var PAGE_SIZE = 10;
  var dutyCache = null;

  var loadDutyData = function () {
    if (dutyCache) return dutyCache;
    dutyCache = fetch("data/tax-dutytype.json")
      .then(function (res) {
        if (!res.ok) throw new Error("load failed");
        return res.json();
      })
      .then(function (data) {
        return data.dutytype || [];
      });
    return dutyCache;
  };

  var mount = function (root) {
    var tabButtons = root.querySelectorAll("[data-notice-tab]");
    var panels = root.querySelectorAll("[data-notice-panel]");
    var taxForm = root.querySelector("[data-tax-form]");
    var taxInput = root.querySelector("[data-tax-input]");
    var taxResult = root.querySelector("[data-tax-result]");
    var taxTableBody = root.querySelector("[data-tax-table-body]");
    var taxEmpty = root.querySelector("[data-tax-empty]");
    var taxPager = root.querySelector("[data-tax-pager]");
    var taxPagerPrev = root.querySelector("[data-tax-pager-prev]");
    var taxPagerNext = root.querySelector("[data-tax-pager-next]");
    var taxPagerInfo = root.querySelector("[data-tax-pager-info]");
    var taxClear = root.querySelector("[data-tax-clear]");
    var taxSearch = root.querySelector("[data-tax-search]");
    var taxFieldError = root.querySelector("[data-tax-field-error]");

    var taxState = { all: [], page: 1 };

    var syncTaxClear = function () {
      if (!taxClear || !taxInput) return;
      var focused = document.activeElement === taxInput;
      var hasValue = Boolean(String(taxInput.value || "").trim());
      taxClear.hidden = !(focused && hasValue);
    };

    var setTab = function (tabId) {
      tabButtons.forEach(function (btn) {
        var on = btn.getAttribute("data-notice-tab") === tabId;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
        btn.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (panel) {
        var on = panel.getAttribute("data-notice-panel") === tabId;
        panel.hidden = !on;
      });
    };

    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTab(btn.getAttribute("data-notice-tab"));
      });
    });

    document.addEventListener("ship-panel-change", function (event) {
      if (!event.detail || event.detail.key !== "notice") return;
      var tab = TAB_HASH[event.detail.raw] || "forbidden";
      setTab(tab);
    });

    var renderTaxPage = function () {
      if (!taxTableBody) return;
      var total = taxState.all.length;
      var pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (taxState.page > pages) taxState.page = pages;
      var start = (taxState.page - 1) * PAGE_SIZE;
      var slice = taxState.all.slice(start, start + PAGE_SIZE);

      taxTableBody.innerHTML = "";
      if (total === 0) {
        var emptyTr = document.createElement("tr");
        emptyTr.className = "notice-tax__empty-row";
        var emptyTd = document.createElement("td");
        emptyTd.colSpan = 5;
        emptyTd.textContent = siteMsg("ship.notice.tariff.empty");
        emptyTr.appendChild(emptyTd);
        taxTableBody.appendChild(emptyTr);
      } else {
        slice.forEach(function (row) {
          var tr = document.createElement("tr");
          ["tax", "name", "unit", "price", "rate"].forEach(function (key) {
            var td = document.createElement("td");
            td.textContent = row[key] || "--";
            tr.appendChild(td);
          });
          taxTableBody.appendChild(tr);
        });
      }

      if (taxEmpty) taxEmpty.hidden = true;
      if (taxResult) taxResult.hidden = false;
      if (taxPager) taxPager.hidden = total <= PAGE_SIZE;
      if (taxPagerInfo) {
        taxPagerInfo.textContent = siteMsg("ship.notice.tariff.pager", undefined, {
          page: taxState.page,
          pages: pages,
          total: total,
        });
      }
      if (taxPagerPrev) taxPagerPrev.disabled = taxState.page <= 1;
      if (taxPagerNext) taxPagerNext.disabled = taxState.page >= pages;
    };

    var clearTaxFieldError = function () {
      if (taxFieldError) {
        taxFieldError.hidden = true;
        taxFieldError.textContent = "";
      }
      if (taxSearch) taxSearch.classList.remove("is-invalid");
    };

    var showTaxFieldError = function (message) {
      if (taxFieldError) {
        taxFieldError.textContent = message;
        taxFieldError.hidden = false;
      }
      if (taxSearch) taxSearch.classList.add("is-invalid");
      if (taxResult) taxResult.hidden = true;
    };

    var searchTax = function (keyword) {
      return loadDutyData().then(function (list) {
        var q = keyword.trim();
        if (!q) return;
        var codeMode = /^[0-9]+$/.test(q);
        taxState.all = list
          .filter(function (item) {
            if (codeMode) return item.code === q;
            return item.name.indexOf(q) > -1;
          })
          .map(function (item) {
            return {
              tax: item.code,
              name: item.name,
              unit: item.unit || "--",
              price: item.price || "--",
              rate: item.rate || "--",
            };
          });
        taxState.page = 1;
        renderTaxPage();
      });
    };

    if (taxForm && taxInput) {
      taxForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var q = String(taxInput.value || "").trim();
        if (!q) {
          showTaxFieldError(siteMsg("ship.notice.tariff.fieldError"));
          taxInput.focus();
          syncTaxClear();
          return;
        }
        clearTaxFieldError();
        searchTax(q);
        syncTaxClear();
      });
      taxInput.addEventListener("input", function () {
        clearTaxFieldError();
        syncTaxClear();
      });
    }

    if (taxClear && taxInput) {
      taxClear.addEventListener("mousedown", function (event) {
        event.preventDefault();
      });
      taxClear.addEventListener("click", function () {
        taxInput.value = "";
        syncTaxClear();
        taxInput.focus();
      });
    }

    if (taxSearch && taxInput) {
      taxInput.addEventListener("focus", function () {
        taxSearch.classList.add("is-focused");
        syncTaxClear();
      });
      taxInput.addEventListener("blur", function () {
        taxSearch.classList.remove("is-focused");
        syncTaxClear();
      });
    }

    if (taxPagerPrev) {
      taxPagerPrev.addEventListener("click", function () {
        if (taxState.page <= 1) return;
        taxState.page -= 1;
        renderTaxPage();
      });
    }

    if (taxPagerNext) {
      taxPagerNext.addEventListener("click", function () {
        var pages = Math.max(1, Math.ceil(taxState.all.length / PAGE_SIZE));
        if (taxState.page >= pages) return;
        taxState.page += 1;
        renderTaxPage();
      });
    }

    var initialRaw = location.hash.replace("#", "");
    setTab(TAB_HASH[initialRaw] || "forbidden");
  };

  document.querySelectorAll("[data-notice-root]").forEach(mount);

  return () => {};
}
