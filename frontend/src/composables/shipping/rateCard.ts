// @ts-nocheck — 自 js 迁入，后续可补类型与 teardown
import { destinationNeedsPostcode } from "@/shipping/ratesPostcode";
import {
  chargeableWeightKg,
  parseCmDimension,
  parseKgWeight,
  volumetricWeightKg,
} from "@/shipping/ratesVolume";
import { siteMsg } from "@/i18n/siteMsg";

export function initRateCard(): () => void {
  var goodsLabel = function (name) {
    if (name === "带电物品") return siteMsg("ship.rates.goods.battery");
    if (name === "普货") return siteMsg("ship.rates.goods.general");
    return name;
  };

  var formatWeight = function (raw) {
    var value = parseKgWeight(raw);
    if (value == null) return null;
    return value.toFixed(2) + "kg";
  };

  var syncVolumeBilling = function (form) {
    var display = form.querySelector("[data-rate-volume-bill]");
    var valueNode = form.querySelector("[data-rate-volume-bill-value]");
    if (!display || !valueNode) return;

    var length = parseCmDimension(form.querySelector('[name="length"]')?.value);
    var width = parseCmDimension(form.querySelector('[name="width"]')?.value);
    var height = parseCmDimension(form.querySelector('[name="height"]')?.value);
    var actualKg = parseKgWeight(form.querySelector('[name="weight"]')?.value);

    if (length == null || width == null || height == null) {
      display.hidden = true;
      valueNode.textContent = "--";
      return;
    }

    var volKg = volumetricWeightKg(length, width, height);
    var billable = chargeableWeightKg(actualKg, volKg);
    if (billable == null) {
      display.hidden = true;
      valueNode.textContent = "--";
      return;
    }

    display.hidden = false;
    valueNode.textContent = billable.toFixed(2) + "kg";
  };

  var deliveryDate = function () {
    var date = new Date();
    date.setDate(date.getDate() + 12);
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return siteMsg("ship.rates.deliveryPrefix") + " " + y + "-" + m + "-" + d;
  };

  var clearFieldErrors = function (form) {
    form.querySelectorAll("[data-rate-field-error]").forEach(function (node) {
      node.textContent = "";
      node.hidden = true;
    });
    form
      .querySelectorAll(
        ".rate-control--input.is-invalid, .rate-picker__trigger.is-invalid, .rate-radios.is-invalid",
      )
      .forEach(function (node) {
        node.classList.remove("is-invalid");
      });
  };

  var setFieldError = function (form, key, text) {
    var err = form.querySelector('[data-rate-field-error="' + key + '"]');
    if (err) {
      err.textContent = text;
      err.hidden = false;
    }
    var control = null;
    if (key === "weight" || key === "postcode") {
      control = form.querySelector('[name="' + key + '"]');
    } else if (key === "origin") {
      control = form.querySelector("[data-rate-origin]");
    } else if (key === "dest") {
      control = form.querySelector("[data-rate-dest]");
    } else if (key === "goods") {
      control = form.querySelector("[data-rate-goods-radios]");
    }
    if (control) control.classList.add("is-invalid");
  };

  var clearFieldError = function (form, key) {
    var err = form.querySelector('[data-rate-field-error="' + key + '"]');
    if (err) {
      err.textContent = "";
      err.hidden = true;
    }
    var control = null;
    if (key === "weight" || key === "postcode") {
      control = form.querySelector('[name="' + key + '"]');
    } else if (key === "origin") {
      control = form.querySelector("[data-rate-origin]");
    } else if (key === "dest") {
      control = form.querySelector("[data-rate-dest]");
    } else if (key === "goods") {
      control = form.querySelector("[data-rate-goods-radios]");
    }
    if (control) control.classList.remove("is-invalid");
  };

  var resetRegionPicker = function (picker) {
    var trigger = picker.querySelector("[data-rate-picker-trigger]");
    var labelNode = picker.querySelector("[data-rate-picker-label]");
    var codeInput = picker.querySelector("[data-rate-picker-code]");
    var panel = picker.querySelector("[data-rate-picker-panel]");
    var search = picker.querySelector("[data-rate-picker-search]");
    if (trigger) {
      trigger.removeAttribute("data-area-code");
      trigger.removeAttribute("data-route-label");
      trigger.classList.add("is-placeholder");
      trigger.setAttribute("aria-expanded", "false");
    }
    if (labelNode) labelNode.textContent = siteMsg("ship.rates.selectPlaceholder");
    if (codeInput) codeInput.value = "";
    if (panel) panel.hidden = true;
    if (search) search.value = "";
    picker.dispatchEvent(new CustomEvent("rate-picker-close", { bubbles: false }));
    delete picker.dataset.ratePickerOpen;
  };

  var resetRateForm = function (form) {
    var root = form.closest("[data-rate-card]");
    if (!root) return;
    clearFieldErrors(form);
    form.reset();
    form.querySelectorAll("[data-rate-picker]").forEach(resetRegionPicker);
    var result = root.querySelector(".rate-result");
    if (result) result.hidden = true;
    var destPicker = form.querySelector('[data-rate-picker="destination"]');
    if (destPicker) {
      destPicker.dispatchEvent(new CustomEvent("rate-region-change", { bubbles: true }));
    }
    syncVolumeBilling(form);
  };

  var resetAllRateForms = function () {
    document.querySelectorAll("[data-rate-card] .rate-form").forEach(function (form) {
      resetRateForm(form);
    });
  };

  document.querySelectorAll("[data-rate-card]").forEach(function (root) {
    var form = root.querySelector(".rate-form");
    var result = root.querySelector(".rate-result");
    if (!form || !result) return;

    ["weight", "postcode", "length", "width", "height"].forEach(function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      if (!input) return;
      input.addEventListener("input", function () {
        if (name === "weight") clearFieldError(form, name);
        syncVolumeBilling(form);
      });
    });

    form.querySelectorAll('[name="goods"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        clearFieldError(form, "goods");
      });
    });

    form.addEventListener("rate-region-change", function () {
      clearFieldError(form, "origin");
      clearFieldError(form, "dest");
    });

    syncVolumeBilling(form);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearFieldErrors(form);

      var postcode = form.querySelector('[name="postcode"]');
      var weight = form.querySelector('[name="weight"]');
      var origin = form.querySelector("[data-rate-origin]");
      var dest = form.querySelector("[data-rate-dest]");
      var invalid = false;
      if (!origin || !origin.getAttribute("data-area-code")) {
        setFieldError(form, "origin", siteMsg("ship.rates.error.origin"));
        invalid = true;
      }
      if (!dest || !dest.getAttribute("data-area-code")) {
        setFieldError(form, "dest", siteMsg("ship.rates.error.dest"));
        invalid = true;
      }
      var picked = form.querySelector('input[name="goods"]:checked');
      if (!picked) {
        setFieldError(form, "goods", siteMsg("ship.rates.error.goods"));
        invalid = true;
      }

      var zip = postcode ? postcode.value.trim() : "";
      var weightText = weight ? weight.value.trim() : "";
      var formatted = formatWeight(weightText);
      var requireZip = destinationNeedsPostcode(form);

      if (requireZip && !zip) {
        setFieldError(form, "postcode", siteMsg("ship.rates.error.postcode"));
        invalid = true;
      }
      if (!formatted) {
        setFieldError(form, "weight", siteMsg("ship.rates.error.weight"));
        invalid = true;
      }
      if (invalid) {
        if (requireZip && !zip && postcode) postcode.focus();
        else if (!formatted && weight) weight.focus();
        else if ((!origin || !origin.getAttribute("data-area-code")) && origin) origin.focus();
        else if (dest) dest.focus();
        result.hidden = true;
        return;
      }

      var fromLabel =
        (origin && origin.getAttribute("data-route-label")) ||
        (origin && origin.textContent.trim()) ||
        "";
      var toLabel =
        (dest && dest.getAttribute("data-route-label")) ||
        (dest && dest.textContent.trim()) ||
        "";
      var type = picked ? goodsLabel(picked.closest("label").textContent.trim()) : siteMsg("ship.rates.goods.general");

      var fromNode = result.querySelector("[data-rate-from]");
      var toNode = result.querySelector("[data-rate-to]");
      if (fromNode) fromNode.textContent = fromLabel;
      if (toNode) toNode.textContent = toLabel;

      result.querySelectorAll("[data-rate-goods]").forEach(function (node) {
        node.textContent = type;
      });
      result.querySelectorAll("[data-rate-weight]").forEach(function (node) {
        node.textContent = formatted;
      });
      result.querySelectorAll("[data-rate-eta]").forEach(function (node) {
        node.textContent = deliveryDate();
      });

      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  var lastShipView = null;
  var onShipPanelChange = function (event) {
    var key = event.detail && event.detail.key;
    if (lastShipView !== key && (lastShipView === "rates" || key === "rates")) {
      resetAllRateForms();
    }
    lastShipView = key;
  };

  document.addEventListener("ship-panel-change", onShipPanelChange);

  return function () {
    document.removeEventListener("ship-panel-change", onShipPanelChange);
  };
}
