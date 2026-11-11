// @ts-nocheck — 自 js 迁入，后续可补类型与 teardown
import { siteMsg } from "@/i18n/siteMsg";

export function initClearanceForms(): () => void {
  var ID_RE = /(^\d{15}$)|(^\d{17}[\dXx]$)/;

  var twControlForKey = function (form, key) {
    if (key === "name") return form.querySelector('[name="name"]');
    if (key === "mobile") return form.querySelector('[name="mobile"]');
    if (key === "identityNum") return form.querySelector('[name="identityNum"]');
    return null;
  };

  var clearTwFieldErrors = function (form) {
    form.querySelectorAll("[data-tw-field-error]").forEach(function (node) {
      node.textContent = "";
      node.hidden = true;
    });
    form.querySelectorAll(".clearance-form__input.is-invalid").forEach(function (node) {
      node.classList.remove("is-invalid");
    });
    var result = form.querySelector("[data-tw-result]");
    if (result) result.hidden = true;
  };

  var setTwFieldError = function (form, key, text) {
    var err = form.querySelector('[data-tw-field-error="' + key + '"]');
    if (err) {
      err.textContent = text;
      err.hidden = !text;
    }
    var control = twControlForKey(form, key);
    if (control && text) control.classList.add("is-invalid");
  };

  var setTwContactPairError = function (form, text) {
    setTwFieldError(form, "mobile", text);
    var identityErr = form.querySelector('[data-tw-field-error="identityNum"]');
    if (identityErr) {
      identityErr.textContent = "";
      identityErr.hidden = true;
    }
    var mobile = form.querySelector('[name="mobile"]');
    var identityNum = form.querySelector('[name="identityNum"]');
    if (mobile) mobile.classList.add("is-invalid");
    if (identityNum) identityNum.classList.add("is-invalid");
  };

  var showTwResult = function (form, text, state) {
    var result = form.querySelector("[data-tw-result]");
    if (!result) return;
    result.hidden = false;
    result.textContent = text;
    result.classList.remove("is-success", "is-error", "is-info");
    if (state === "success") result.classList.add("is-success");
    else if (state === "error") result.classList.add("is-error");
    else result.classList.add("is-info");
  };

  var mountTwForm = function (form) {
    var submitBtn = form.querySelector('[type="submit"]');

    ["name", "mobile", "identityNum"].forEach(function (key) {
      var input = twControlForKey(form, key);
      if (!input) return;
      input.addEventListener("input", function () {
        clearTwFieldErrors(form);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearTwFieldErrors(form);

      var name = (form.querySelector('[name="name"]') || {}).value || "";
      var mobile = (form.querySelector('[name="mobile"]') || {}).value || "";
      var identityNum = (form.querySelector('[name="identityNum"]') || {}).value || "";

      name = name.trim();
      mobile = mobile.trim();
      identityNum = identityNum.trim();

      if (!name) {
        setTwFieldError(form, "name", siteMsg("ship.clearance.tw.nameError"));
        form.querySelector('[name="name"]').focus();
        return;
      }
      if (!mobile && !identityNum) {
        setTwContactPairError(form, siteMsg("ship.clearance.tw.contactError"));
        form.querySelector('[name="mobile"]').focus();
        return;
      }
      if (identityNum && !ID_RE.test(identityNum)) {
        setTwFieldError(form, "identityNum", siteMsg("ship.clearance.tw.idError"));
        form.querySelector('[name="identityNum"]').focus();
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      window.setTimeout(function () {
        if (submitBtn) submitBtn.disabled = false;
        showTwResult(form, siteMsg("ship.clearance.tw.success"), "success");
      }, 600);
    });
  };

  var mountUploadForm = function (form) {
    var result = form.querySelector("[data-ship-result]");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = (form.querySelector('[name="name"]') || {}).value || "";
      var identityNum = (form.querySelector('[name="identityNum"]') || {}).value || "";
      var front = form.querySelector('[name="idFront"]');
      var back = form.querySelector('[name="idBack"]');
      var agree = form.querySelector('[name="agree"]');

      name = name.trim();
      identityNum = identityNum.trim();

      if (!name || !identityNum) {
        showResult(result, siteMsg("ship.clearance.upload.nameError"), "error");
        return;
      }
      if (!ID_RE.test(identityNum)) {
        showResult(result, siteMsg("ship.clearance.upload.idError"), "error");
        return;
      }
      if (!front || !front.files || !front.files.length) {
        showResult(result, siteMsg("ship.clearance.upload.frontError"), "error");
        return;
      }
      if (!back || !back.files || !back.files.length) {
        showResult(result, siteMsg("ship.clearance.upload.backError"), "error");
        return;
      }
      if (!agree || !agree.checked) {
        showResult(result, siteMsg("ship.clearance.upload.agreeError"), "error");
        return;
      }

      showResult(result, siteMsg("ship.clearance.upload.success"), "success");
    });

    form.querySelectorAll(".clearance-id-card input[type=file]").forEach(function (input) {
      var card = input.closest(".clearance-id-card");
      if (!card) return;
      var placeholder = card.querySelector(".clearance-id-card__guide, .clearance-id-card__placeholder");
      var photo = card.querySelector(".clearance-id-card__photo");

      var resetPreview = function () {
        if (!photo || !placeholder) return;
        photo.onload = null;
        photo.onerror = null;
        photo.removeAttribute("src");
        photo.hidden = true;
        placeholder.hidden = false;
        card.classList.remove("has-file");
      };

      input.addEventListener("change", function () {
        if (!photo || !placeholder) return;
        var file = input.files && input.files[0];
        if (!file) {
          resetPreview();
          return;
        }
        if (!/^image\/(jpeg|png)$/i.test(file.type)) {
          resetPreview();
          input.value = "";
          return;
        }

        var reader = new FileReader();
        reader.onload = function (event) {
          var dataUrl = event.target && event.target.result;
          if (!dataUrl) {
            resetPreview();
            return;
          }
          photo.onerror = resetPreview;
          photo.onload = function () {
            placeholder.hidden = true;
            photo.hidden = false;
            card.classList.add("has-file");
          };
          photo.src = dataUrl;
        };
        reader.onerror = resetPreview;
        reader.readAsDataURL(file);
      });
    });
  };

  var showResult = function (node, text, state) {
    if (!node) return;
    node.hidden = false;
    node.textContent = text;
    node.classList.remove("is-success", "is-error", "is-info");
    if (state === "success") node.classList.add("is-success");
    else if (state === "error") node.classList.add("is-error");
    else node.classList.add("is-info");
  };

  document.querySelectorAll("[data-clearance-form=tw]").forEach(mountTwForm);
  document.querySelectorAll("[data-clearance-form=upload]").forEach(mountUploadForm);

  return () => {};
}
