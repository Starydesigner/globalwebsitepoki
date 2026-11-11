// @ts-nocheck — 自 js 迁入，后续可补类型与 teardown
import { getUiLang } from "@/i18n/getUiLang";
import { siteMsg } from "@/i18n/siteMsg";

export function initTrackQuery(): () => void {
  var trackResets = new WeakMap();
  var MAX_BILLS = 10;
  var COLLAPSED_NODES = 3;
  var BILL_RE = /^\d{8,20}$/;
  /** 参考设计稿签收链路，每单固定 10 条（最新在前） */
  var MOCK_TRACK_TEMPLATE = [
    {
      location: "深圳市",
      detail:
        "【中国】快件已在【深圳银田】，签收，签收人【菜鸟】，感谢使用中通快递，期待再次为您服务！",
      en: "Delivered",
      time: "2026-03-04 09:49:43",
      zone: "东8区",
    },
    {
      location: "深圳市",
      detail:
        "【深圳市】已签收，签收人凭取货码签收，如有疑问请电联：13321827571 / 17722618814。感谢使用中通快递，期待再次为您服务！",
      en: "Delivered",
      time: "2026-03-04 09:49:42",
      zone: "东8区",
    },
    {
      location: "深圳市",
      detail:
        "【深圳市】快件已被【深圳西乡劳动二队二巷13栋店】代收，如有问题请电联（13321827571）",
      en: "Delivered",
      time: "2026-03-03 11:05:50",
      zone: "东8区",
    },
    {
      location: "深圳市",
      detail:
        "【深圳银田】的快递员【麻布凌志明】正在派件，联系电话【13321827571】，请保持电话畅通、并确保本人签收",
      en: "Physical delivery scheduled.",
      time: "2026-03-03 07:20:28",
      zone: "东8区",
    },
    {
      location: "深圳市",
      detail: "快件到达【深圳银田】，网点到件扫描",
      en: "Arrival at inward office of exchange.",
      time: "2026-03-03 03:29:19",
      zone: "东8区",
    },
    {
      location: "深圳市",
      detail: "快件离开【深圳转运中心】，已发往【深圳银田】",
      en: "Departure from facility.",
      time: "2026-03-02 22:15:06",
      zone: "东8区",
    },
    {
      location: "广州市",
      detail: "快件到达【广州转运中心】，已卸车扫描",
      en: "Arrival at sort center.",
      time: "2026-03-02 14:08:33",
      zone: "东8区",
    },
    {
      location: "上海市",
      detail: "快件离开【上海口岸】，已发往【广州转运中心】",
      en: "International shipment in transit.",
      time: "2026-03-01 19:42:11",
      zone: "东8区",
    },
    {
      location: "上海市",
      detail: "【上海口岸】出口清关完成，等待转运",
      en: "Export clearance completed.",
      time: "2026-03-01 11:26:54",
      zone: "东8区",
    },
    {
      location: "上海市",
      detail: "【上海市】中通国际已揽收，快件进入跨境运输流程",
      en: "Shipment received.",
      time: "2026-03-01 08:03:17",
      zone: "东8区",
    },
  ];

  var parseBillCodes = function (raw) {
    return raw
      .split(/[\s,，;；]+/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  };

  var mockTracksForBill = function () {
    return MOCK_TRACK_TEMPLATE.map(function (row, index) {
      return {
        location: row.location,
        detail: row.detail,
        en: row.en,
        time: row.time,
        zone: row.zone,
        isLatest: index === 0,
      };
    });
  };

  var loadTracks = function (billCode) {
    return Promise.resolve({
      billCode: billCode,
      tracks: mockTracksForBill(billCode),
      subBills: [],
    });
  };

  var shortTime = function (raw) {
    if (!raw) return "";
    var match = String(raw).match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}:\d{2})/);
    if (match) return match[2] + "-" + match[3] + " " + match[4];
    return raw;
  };

  var statusLabel = function (node) {
    var detail = node.detail || "";
    if (detail.indexOf("签收") !== -1) return siteMsg("ship.track.status.delivered");
    if (detail.indexOf("代收") !== -1) return siteMsg("ship.track.status.agent");
    if (detail.indexOf("派件") !== -1) return siteMsg("ship.track.status.delivering");
    if (detail.indexOf("揽收") !== -1) return siteMsg("ship.track.status.picked");
    if (detail.indexOf("清关") !== -1) return siteMsg("ship.track.status.customs");
    if (detail.indexOf("到达") !== -1 || detail.indexOf("到件") !== -1) return siteMsg("ship.track.status.transit");
    if (detail.indexOf("离开") !== -1 || detail.indexOf("发往") !== -1) return siteMsg("ship.track.status.transit");
    return node.location || siteMsg("ship.track.status.transit");
  };

  var mount = function (root) {
    var form = root.querySelector("[data-track-form]");
    var tagBox = root.querySelector("[data-track-tags]");
    var input = root.querySelector("[data-track-input]");
    var clearBtn = root.querySelector("[data-track-clear]");
    var resultWrap = root.querySelector("[data-track-result]");
    var listNode = root.querySelector("[data-track-list]");
    var errorNode = root.querySelector("[data-track-error]");
    var fieldNode = root.querySelector("[data-track-field]");
    if (!form || !tagBox || !input || !listNode) return;

    var tags = [];

    var clearError = function () {
      if (errorNode) {
        errorNode.hidden = true;
        errorNode.textContent = "";
      }
      if (fieldNode) fieldNode.classList.remove("is-invalid");
    };

    var showError = function (message) {
      if (errorNode) {
        errorNode.textContent = message;
        errorNode.hidden = false;
      }
      if (fieldNode) fieldNode.classList.add("is-invalid");
    };

    var syncClearBtn = function () {
      if (!clearBtn || !input) return;
      var focused = document.activeElement === input;
      var hasContent = tags.length > 0 || Boolean(String(input.value || "").trim());
      clearBtn.hidden = !(focused && hasContent);
    };

    var syncTags = function () {
      tagBox.innerHTML = "";
      tags.forEach(function (code) {
        var chip = document.createElement("span");
        chip.className = "track-tag";
        var label = document.createElement("span");
        label.className = "track-tag__code";
        label.textContent = code;
        chip.appendChild(label);
        var sep = document.createElement("span");
        sep.className = "track-tag__sep";
        sep.setAttribute("aria-hidden", "true");
        chip.appendChild(sep);
        var remove = document.createElement("button");
        remove.type = "button";
        remove.className = "track-tag__remove";
        remove.setAttribute("aria-label", siteMsg("ship.track.removeAria") + " " + code);
        remove.textContent = "×";
        remove.addEventListener("click", function () {
          tags = tags.filter(function (c) {
            return c !== code;
          });
          syncTags();
          clearError();
        });
        chip.appendChild(remove);
        tagBox.appendChild(chip);
      });
      syncClearBtn();
    };

    if (clearBtn) {
      clearBtn.addEventListener("mousedown", function (event) {
        event.preventDefault();
      });
      clearBtn.addEventListener("click", function () {
        tags = [];
        input.value = "";
        syncTags();
        clearError();
        if (resultWrap) resultWrap.hidden = true;
        if (listNode) listNode.innerHTML = "";
        input.focus();
      });
    }

    input.addEventListener("focus", syncClearBtn);
    input.addEventListener("blur", syncClearBtn);

    var ingestPendingInput = function () {
      var pending = parseBillCodes(input.value);
      if (!pending.length) {
        return { invalid: [], overLimit: false };
      }

      var invalid = [];
      var overLimit = false;

      pending.forEach(function (code) {
        if (!BILL_RE.test(code)) {
          invalid.push(code);
          return;
        }
        if (tags.indexOf(code) !== -1) return;
        if (tags.length >= MAX_BILLS) {
          overLimit = true;
          return;
        }
        tags.push(code);
      });

      input.value = "";
      syncTags();
      return { invalid: invalid, overLimit: overLimit };
    };

    var validateForSubmit = function () {
      var ingest = ingestPendingInput();
      if (ingest.invalid.length) {
        showError(siteMsg("ship.track.error.format"));
        return false;
      }
      if (ingest.overLimit) {
        showError(siteMsg("ship.track.error.max"));
        return false;
      }
      if (!tags.length) {
        showError(siteMsg("ship.track.error.empty"));
        return false;
      }
      clearError();
      return true;
    };

    input.addEventListener("input", function () {
      clearError();
      syncClearBtn();
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        var ingest = ingestPendingInput();
        if (ingest.invalid.length) {
          showError(siteMsg("ship.track.error.format"));
          return;
        }
        if (ingest.overLimit) {
          showError(siteMsg("ship.track.error.max"));
          return;
        }
        clearError();
      }
    });

    input.addEventListener("blur", function () {
      if (!input.value.trim()) return;
      var ingest = ingestPendingInput();
      if (ingest.invalid.length) {
        showError(siteMsg("ship.track.error.format"));
        return;
      }
      if (ingest.overLimit) {
        showError(siteMsg("ship.track.error.max"));
      }
    });

    var renderTimeline = function (tracks, limit) {
      var ol = document.createElement("ol");
      ol.className = "track-timeline";
      tracks.slice(0, limit).forEach(function (node, index) {
        var li = document.createElement("li");
        li.className = "track-timeline__item" + (index === 0 ? " is-latest" : "");

        var rail = document.createElement("div");
        rail.className = "track-timeline__rail";
        rail.setAttribute("aria-hidden", "true");

        var content = document.createElement("div");
        content.className = "track-timeline__content";

        var meta = document.createElement("div");
        meta.className = "track-timeline__meta";

        var status = document.createElement("span");
        status.className = "track-timeline__status";
        status.textContent = statusLabel(node);

        var timeShort = document.createElement("time");
        timeShort.className = "track-timeline__time-short";
        timeShort.dateTime = node.time || "";
        timeShort.textContent = shortTime(node.time);

        meta.appendChild(status);
        meta.appendChild(timeShort);

        var detail = document.createElement("p");
        detail.className = "track-timeline__detail";
        var lang = getUiLang();
        var line = lang === "en" && node.en ? node.en : node.detail || node.en || "";
        detail.textContent = line;

        content.appendChild(meta);
        content.appendChild(detail);

        li.appendChild(rail);
        li.appendChild(content);
        ol.appendChild(li);
      });
      return ol;
    };

    var attachTimelineBlock = function (host, tracks, allowCollapse) {
      var total = tracks.length;
      var limit = allowCollapse ? Math.min(COLLAPSED_NODES, total) : total;
      var expanded = !allowCollapse || total <= COLLAPSED_NODES;

      var timelineHost = document.createElement("div");
      timelineHost.className = "track-bill__timeline";
      timelineHost.appendChild(renderTimeline(tracks, limit));
      host.appendChild(timelineHost);

      if (allowCollapse && total > COLLAPSED_NODES) {
        var toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "track-bill__toggle";
        toggle.textContent = siteMsg("ship.track.expandAll", getUiLang(), { n: total });
        toggle.addEventListener("click", function () {
          expanded = !expanded;
          timelineHost.innerHTML = "";
          timelineHost.appendChild(renderTimeline(tracks, expanded ? total : limit));
          toggle.textContent = expanded
            ? siteMsg("ship.track.collapse")
            : siteMsg("ship.track.expandAll", getUiLang(), { n: total });
        });
        host.appendChild(toggle);
      }
    };

    var renderBillCard = function (bill, allowCollapse) {
      var article = document.createElement("section");
      article.className = "track-bill";
      var head = document.createElement("header");
      head.className = "track-bill__head";
      head.textContent = siteMsg("ship.track.billHead") + bill.billCode;
      article.appendChild(head);

      var body = document.createElement("div");
      body.className = "track-bill__body";
      attachTimelineBlock(body, bill.tracks, allowCollapse);
      article.appendChild(body);
      return article;
    };

    var renderGroupedBillCard = function (main) {
      var subs = main.subBills || [];
      var article = document.createElement("section");
      article.className = "track-bill track-bill--grouped";

      var head = document.createElement("header");
      head.className = "track-bill__head";
      head.textContent = siteMsg("ship.track.billHead") + main.billCode;
      article.appendChild(head);

      var mainBody = document.createElement("div");
      mainBody.className = "track-bill__body track-bill__body--main";
      attachTimelineBlock(mainBody, main.tracks, main.tracks.length > COLLAPSED_NODES);
      article.appendChild(mainBody);

      if (!subs.length) return article;

      var subsSection = document.createElement("div");
      subsSection.className = "track-bill-subs";

      var subsRow = document.createElement("div");
      subsRow.className = "track-bill-subs__row";

      var subsLabel = document.createElement("span");
      subsLabel.className = "track-bill-subs__label";
      subsLabel.textContent = siteMsg("ship.track.subBills");
      subsRow.appendChild(subsLabel);

      var tabs = document.createElement("div");
      tabs.className = "track-bill-sub-tabs";
      tabs.setAttribute("role", "tablist");

      var subPanel = document.createElement("div");
      subPanel.className = "track-bill-sub-panel";

      var renderActiveSub = function (index) {
        subPanel.innerHTML = "";
        var subBody = document.createElement("div");
        subBody.className = "track-bill__body track-bill__body--sub";
        attachTimelineBlock(subBody, subs[index].tracks, subs[index].tracks.length > COLLAPSED_NODES);
        subPanel.appendChild(subBody);
      };

      subs.forEach(function (sub, index) {
        var tab = document.createElement("button");
        tab.type = "button";
        tab.className = "track-bill-sub-tab" + (index === 0 ? " is-active" : "");
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", index === 0 ? "true" : "false");
        tab.dataset.subIndex = String(index);
        tab.textContent = sub.billCode;
        tab.addEventListener("click", function () {
          tabs.querySelectorAll(".track-bill-sub-tab").forEach(function (btn) {
            btn.classList.remove("is-active");
            btn.setAttribute("aria-selected", "false");
          });
          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
          renderActiveSub(index);
        });
        tabs.appendChild(tab);
      });

      subsRow.appendChild(tabs);
      subsSection.appendChild(subsRow);
      subsSection.appendChild(subPanel);
      article.appendChild(subsSection);

      renderActiveSub(0);
      return article;
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateForSubmit()) {
        input.focus();
        return;
      }

      var codes = tags.slice();
      if (resultWrap) resultWrap.hidden = false;

      Promise.all(
        codes.map(function (code) {
          return loadTracks(code);
        })
      ).then(function (bills) {
        listNode.innerHTML = "";
        bills.forEach(function (bill) {
          if (bill.subBills && bill.subBills.length) {
            listNode.appendChild(renderGroupedBillCard(bill));
            return;
          }
          listNode.appendChild(renderBillCard(bill, bill.tracks.length > COLLAPSED_NODES));
        });
        resultWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });

    syncTags();

    var resetTrackRoot = function () {
      tags = [];
      input.value = "";
      syncTags();
      clearError();
      if (resultWrap) resultWrap.hidden = true;
      if (listNode) listNode.innerHTML = "";
    };
    trackResets.set(root, resetTrackRoot);

    var preset = new URLSearchParams(location.search).get("nos");
    if (preset && location.hash === "#track") {
      input.value = preset;
      form.requestSubmit();
    }
  };

  var resetAllTrackRoots = function () {
    document.querySelectorAll("[data-track-root]").forEach(function (root) {
      var reset = trackResets.get(root);
      if (reset) reset();
    });
  };

  document.querySelectorAll("[data-track-root]").forEach(mount);

  var lastShipView = null;
  var onShipPanelChange = function (event) {
    var key = event.detail && event.detail.key;
    if (lastShipView !== key && (lastShipView === "track" || key === "track")) {
      resetAllTrackRoots();
    }
    lastShipView = key;
  };

  document.addEventListener("ship-panel-change", onShipPanelChange);

  return function () {
    document.removeEventListener("ship-panel-change", onShipPanelChange);
  };
}
