// @ts-nocheck — 自 js 迁入，后续可补类型与 teardown
export function initRateRegionPicker(): () => void {
  var DATA_URL = "data/rate-regions.json";
  var REGION_API = "https://websiteapi.ztoglobal.com/basic/queryRegion";
  var cache = null;
  var subRegionCache = Object.create(null);

  var isMainlandProvince = function (item) {
    return item && /^\d{6}$/.test(String(item.areaCode || ""));
  };

  var normalizeData = function (json) {
    json.origin.hot = (json.origin.hot || []).filter(isMainlandProvince);
    json.origin.all = (json.origin.all || []).filter(isMainlandProvince);
    if (json.destination && json.destination.gat) {
      json.destination.gat = json.destination.gat.map(function (item) {
        if (item.areaCode === "TW") return { areaCode: "TW", areaName: "中国台湾" };
        if (item.areaCode === "HK") return { areaCode: "HK", areaName: "中国香港" };
        if (item.areaCode === "MO") return { areaCode: "MO", areaName: "中国澳门" };
        return item;
      });
    }
    return json;
  };

  var loadData = function () {
    if (cache) return Promise.resolve(cache);
    return fetch(DATA_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("load failed");
        return res.json();
      })
      .then(function (json) {
        cache = normalizeData(json);
        return cache;
      });
  };

  var prefetchHotSubRegions = function (hotList) {
    if (!hotList || !hotList.length) return;
    hotList.forEach(function (item) {
      if (item && item.areaCode) fetchSubRegions(item.areaCode);
    });
  };

  var fetchSubRegions = function (countryCode) {
    if (Object.prototype.hasOwnProperty.call(subRegionCache, countryCode)) {
      return Promise.resolve(subRegionCache[countryCode]);
    }
    return fetch(REGION_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: 1,
        countryCode: countryCode,
        parentCode: countryCode,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        var list = (json && json.data) || [];
        subRegionCache[countryCode] = list;
        return list;
      })
      .catch(function () {
        subRegionCache[countryCode] = [];
        return [];
      });
  };

  var originDisplay = function (item) {
    return "中国-" + item.areaName;
  };

  var originRoute = function (item) {
    return "中国大陆-" + item.areaName;
  };

  var mountPicker = function (root, data) {
    var kind = root.getAttribute("data-rate-picker");
    var trigger = root.querySelector("[data-rate-picker-trigger]");
    var panel = root.querySelector("[data-rate-picker-panel]");
    var tabs = root.querySelector("[data-rate-picker-tabs]");
    var grid = root.querySelector("[data-rate-picker-grid]");
    var search = root.querySelector("[data-rate-picker-search]");
    var subhead = root.querySelector("[data-rate-picker-subhead]");
    var subtitle = root.querySelector("[data-rate-picker-subtitle]");
    var backBtn = root.querySelector("[data-rate-picker-back]");
    var labelNode = root.querySelector("[data-rate-picker-label]");
    var codeInput = root.querySelector("[data-rate-picker-code]");
    if (!trigger || !panel || !tabs || !grid || !labelNode) return;

    var tabDefs =
      kind === "origin"
        ? [
            { id: "hot", name: "热门地区", list: data.origin.hot },
            { id: "all", name: "全部", list: data.origin.all },
          ]
        : [
            { id: "gat", name: "港澳台", list: data.destination.gat },
            { id: "hot", name: "热门国家", list: data.destination.hot },
            { id: "all", name: "全部", list: data.destination.all },
          ];

    var activeTab = tabDefs[0].id;
    var open = false;
    var drillParent = null;
    var drillList = null;

    var clearDrill = function () {
      drillParent = null;
      drillList = null;
      if (subhead) subhead.hidden = true;
      if (subtitle) subtitle.textContent = "";
    };

    var currentList = function () {
      if (drillList) return drillList;
      var tab = tabDefs.find(function (t) {
        return t.id === activeTab;
      });
      return (tab && tab.list) || [];
    };

    var shouldHideSearch = function () {
      if (drillParent) return true;
      if (activeTab === "hot") return true;
      if (kind === "destination" && activeTab === "gat") return true;
      return false;
    };

    var updateSearchVisibility = function () {
      if (!search) return;
      var hide = shouldHideSearch();
      search.hidden = hide;
      if (hide) search.value = "";
    };

    var renderTabs = function () {
      tabs.innerHTML = "";
      tabDefs.forEach(function (tab) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rate-picker__tab" + (tab.id === activeTab ? " is-active" : "");
        btn.textContent = tab.name;
        btn.addEventListener("click", function (event) {
          event.stopPropagation();
          activeTab = tab.id;
          clearDrill();
          updateSearchVisibility();
          renderTabs();
          renderGrid();
          if (kind === "destination" && activeTab === "hot") {
            prefetchHotSubRegions(data.destination.hot);
          }
        });
        tabs.appendChild(btn);
      });
    };

    var showGridMessage = function (text) {
      grid.innerHTML = "";
      var empty = document.createElement("p");
      empty.className = "rate-picker__empty";
      empty.textContent = text;
      grid.appendChild(empty);
    };

    var renderGrid = function () {
      var keyword = search && !search.hidden ? search.value.trim() : "";
      var list = currentList().filter(function (item) {
        if (!keyword) return true;
        return item.areaName && item.areaName.indexOf(keyword) !== -1;
      });

      grid.innerHTML = "";
      if (!list.length) {
        showGridMessage(keyword ? "暂无匹配结果" : "暂无数据");
        return;
      }

      var activeCode = codeInput && codeInput.value;
      var frag = document.createDocumentFragment();
      list.forEach(function (item) {
        var cell = document.createElement("button");
        cell.type = "button";
        cell.className = "rate-picker__item";
        if (activeCode === item.areaCode) cell.classList.add("is-active");
        cell.textContent = item.areaName;
        cell.addEventListener("click", function (event) {
          event.stopPropagation();
          onPickItem(item);
        });
        frag.appendChild(cell);
      });
      grid.appendChild(frag);
    };

    var enterDrill = function (parent, subs) {
      drillParent = parent;
      drillList = subs;
      if (subhead) subhead.hidden = false;
      if (subtitle) subtitle.textContent = parent.areaName;
      updateSearchVisibility();
      renderGrid();
    };

    var applySubRegions = function (item, subs) {
      if (subs && subs.length) enterDrill(item, subs);
      else selectItem(item, null);
    };

    var onPickItem = function (item) {
      if (kind === "destination" && !drillParent && activeTab === "hot") {
        var code = item.areaCode;
        if (Object.prototype.hasOwnProperty.call(subRegionCache, code)) {
          applySubRegions(item, subRegionCache[code]);
          return;
        }
        if (subhead) {
          subhead.hidden = false;
          if (subtitle) subtitle.textContent = item.areaName;
        }
        showGridMessage("加载中…");
        fetchSubRegions(code).then(function (subs) {
          if (!open) return;
          applySubRegions(item, subs);
        });
        return;
      }
      selectItem(item, drillParent);
    };

    var selectItem = function (item, parent) {
      if (kind === "origin") {
        labelNode.textContent = originDisplay(item);
        trigger.setAttribute("data-route-label", originRoute(item));
      } else if (parent) {
        labelNode.textContent = parent.areaName + "-" + item.areaName;
        trigger.setAttribute("data-route-label", parent.areaName + "-" + item.areaName);
      } else {
        labelNode.textContent = item.areaName;
        trigger.setAttribute("data-route-label", item.areaName);
      }
      trigger.setAttribute("data-area-code", item.areaCode);
      trigger.classList.remove("is-placeholder");
      if (codeInput) codeInput.value = item.areaCode;
      closePanel();
      root.dispatchEvent(new CustomEvent("rate-region-change", { bubbles: true, detail: item }));
    };

    var closePanel = function () {
      if (!open) return;
      open = false;
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      delete root.dataset.ratePickerOpen;
      clearDrill();
      updateSearchVisibility();
    };

    var closeSiblingPickers = function () {
      var form = root.closest("form");
      if (!form) return;
      form.querySelectorAll("[data-rate-picker]").forEach(function (other) {
        if (other !== root) {
          other.dispatchEvent(new CustomEvent("rate-picker-close", { bubbles: false }));
        }
      });
    };

    var openPanel = function () {
      closeSiblingPickers();
      open = true;
      panel.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      root.dataset.ratePickerOpen = "true";
      clearDrill();
      updateSearchVisibility();
      renderTabs();
      renderGrid();
      if (kind === "destination" && activeTab === "hot") {
        prefetchHotSubRegions(data.destination.hot);
      }
    };

    root.addEventListener("rate-picker-close", function () {
      closePanel();
    });

    var form = root.closest("form");
    if (form instanceof HTMLElement && !form.dataset.ratePickerFocusBound) {
      form.dataset.ratePickerFocusBound = "1";
      var closeOpenPickersUnlessInside = function (target) {
        if (!(target instanceof Element)) return;
        form.querySelectorAll('[data-rate-picker][data-rate-picker-open="true"]').forEach(function (pickerRoot) {
          if (!pickerRoot.contains(target)) {
            pickerRoot.dispatchEvent(new CustomEvent("rate-picker-close", { bubbles: false }));
          }
        });
      };

      form.addEventListener(
        "mousedown",
        function (event) {
          closeOpenPickersUnlessInside(event.target);
        },
        true,
      );

      form.addEventListener("focusin", function (event) {
        closeOpenPickersUnlessInside(event.target);
      });
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      if (open) closePanel();
      else openPanel();
    });

    panel.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    if (backBtn) {
      backBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        clearDrill();
        updateSearchVisibility();
        renderGrid();
      });
    }

    if (search) {
      search.addEventListener("input", renderGrid);
      search.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }

    document.addEventListener("click", function (event) {
      if (!open) return;
      if (root.contains(event.target)) return;
      closePanel();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && open) closePanel();
    });

    updateSearchVisibility();
    if (kind === "destination") {
      prefetchHotSubRegions(data.destination.hot);
    }

    if (trigger.getAttribute("data-area-code")) {
      trigger.classList.remove("is-placeholder");
    }
  };

  var boot = function () {
    document.querySelectorAll("[data-rate-picker]").forEach(function (root) {
      if (root.dataset.ratePickerReady) return;
      root.dataset.ratePickerReady = "1";
      loadData()
        .then(function (data) {
          mountPicker(root, data);
        })
        .catch(function () {
          var trigger = root.querySelector("[data-rate-picker-trigger]");
          if (trigger) trigger.disabled = true;
        });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  return () => {};
}
