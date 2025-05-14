(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/dpr/DprLoadingHelper.mjs
  var DprLoadingHelper = class {
    showLoadingAnimation(wrapperClass) {
      const loadingPanelClass = ".dpr-loading-panel";
      document.querySelectorAll(loadingPanelClass).forEach((l) => {
        l.classList.add("show");
      });
      let loadingAnimClass = ".dpr-loading-anim";
      if (wrapperClass) loadingAnimClass = `.${wrapperClass} ${loadingAnimClass}`;
      document.querySelectorAll(loadingAnimClass).forEach((l) => {
        l.classList.add("show");
      });
    }
    hideLoadingAnimation() {
      document.querySelectorAll(".dpr-loading-panel").forEach((l) => {
        l.classList.remove("show");
      });
      document.querySelectorAll(".dpr-loading-anim").forEach((l) => {
        l.classList.remove("show");
      });
    }
  };

  // src/dpr/DprClientClass.mjs
  var DprClientClass = class {
    constructor(element, loadingHelper) {
      this.element = element;
      this.loadingHelper = loadingHelper;
    }
    static getModuleName() {
      throw new Error("Module name not set");
    }
    getElement() {
      return this.element;
    }
    initialise() {
      throw new Error("Initialisation not configured");
    }
  };

  // src/dpr/components/card-group/clientClass.mjs
  var CardGroup = class extends DprClientClass {
    static getModuleName() {
      return "card-group";
    }
    initialise() {
      const cards = this.getElement().querySelectorAll("[data-click-navigate-to]");
      const wrapperClass = "card-loading";
      cards.forEach((card) => {
        card.addEventListener("click", () => {
          card.classList.add(wrapperClass);
          this.loadingHelper.showLoadingAnimation(wrapperClass);
          cards.forEach((c) => {
            if (!c.classList.contains("card-loading")) {
              const disabledClass = "card-disabled";
              c.classList.add(disabledClass);
            }
          });
          window.location.href = card.dataset.clickNavigateTo;
        });
      });
    }
  };

  // src/dpr/components/_catalogue/catalogue-search/clientClass.mjs
  var DprCatalogueSearch = class extends DprClientClass {
    static getModuleName() {
      return "dpr-catalogue-search";
    }
    initialise() {
      this.searchBox = this.getElement().querySelector(".dpr-search-box");
      this.shwoUnauthorisedCheckbox = this.getElement().querySelector("#show-unauthorised");
      if (this.searchBox) {
        this.initSeachBoxEvents();
      }
      if (this.shwoUnauthorisedCheckbox) {
        this.initShowUnauthorisedEvents();
      }
      this.initInputFromQueryParams();
    }
    initSeachBoxEvents() {
      this.searchBox.addEventListener("keyup", (e) => {
        this.updateTableRows(e.target.value);
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set(this.searchBox.id, e.target.value);
        window.history.replaceState(null, null, `?${queryParams.toString()}`);
      });
    }
    initShowUnauthorisedEvents() {
      this.shwoUnauthorisedCheckbox.addEventListener("change", (e) => {
        const queryParams = new URLSearchParams(window.location.search);
        if (e.target.checked) {
          queryParams.set(e.target.id, e.target.value);
        } else {
          queryParams.delete(e.target.id, e.target.value);
        }
        window.history.replaceState(null, null, `?${queryParams.toString()}`);
        this.updateTableRows(this.searchBox.value);
      });
      this.updateTableRows(this.searchBox.value);
    }
    updateTableRows(searchValue) {
      const table = this.getElement().querySelector("table").querySelector("tbody");
      const rows = Array.from(table.rows);
      rows.forEach((row) => row.classList.add("search-option-hide"));
      this.updateSearchListing(rows, searchValue);
      this.toggleUnauthorisedRows(rows);
    }
    toggleUnauthorisedRows(rows) {
      const queryParams = new URLSearchParams(window.location.search);
      const value = queryParams.get("show-unauthorised");
      rows.filter((row) => {
        return Array.from(row.cells).find((cell) => {
          return cell.innerHTML.includes("dpr-unauthorised-report");
        });
      }).forEach((row) => {
        if (value) {
          row.classList.remove("search-option-hide");
        } else if (!row.classList.contains("search-option-hide")) row.classList.add("search-option-hide");
      });
    }
    updateSearchListing(rows, value) {
      rows.filter((row) => {
        return !value || value.length === 0 || Array.from(row.cells).find((cell) => {
          const searchValue = value.toLowerCase();
          return cell.innerText.toLowerCase().includes(searchValue.toLowerCase());
        });
      }).forEach((row) => {
        row.classList.remove("search-option-hide");
      });
    }
    // eslint-disable-next-line
    initInputFromQueryParams() {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.forEach((value, key) => {
        const element = document.getElementById(key);
        if (element && element.classList.contains("dpr-search-box")) {
          element.value = value;
          this.updateTableRows(element.value);
        }
        if (element && element.id === "show-unauthorised") {
          element.setAttribute("checked", "");
        }
      });
    }
  };

  // src/dpr/components/bookmark-toggle/clientClass.mjs
  var BookmarkToggle = class extends DprClientClass {
    static getModuleName() {
      return "bookmark-toggle";
    }
    initialise() {
      this.initToggles();
    }
    initToggles() {
      const element = this.getElement();
      element.querySelectorAll(".bookmark-input[type=checkbox]").forEach((bookmarkToggle) => {
        const csrfToken = bookmarkToggle.getAttribute("data-csrf-token");
        const reportId = bookmarkToggle.getAttribute("data-report-id");
        const id = bookmarkToggle.getAttribute("data-id");
        const reportType = bookmarkToggle.getAttribute("data-report-type");
        this.bookmarkWrapper = bookmarkToggle.parentNode;
        this.bookmarkColumn = this.bookmarkWrapper.parentNode;
        this.bookmarkLabel = this.bookmarkWrapper.querySelector(".dpr-bookmark-label--component");
        bookmarkToggle.addEventListener("change", () => __async(this, null, function* () {
          if (bookmarkToggle.checked) {
            yield this.addBookmark(bookmarkToggle, id, reportId, reportType, csrfToken);
          } else {
            yield this.removeBookmark(bookmarkToggle, id, reportId, reportType, csrfToken);
          }
        }));
        this.bookmarkColumn.addEventListener("keyup", (e) => __async(this, null, function* () {
          if (e.key === "Enter") {
            yield this.handleBookmarkChange(bookmarkToggle, id, reportId, reportType, csrfToken);
          }
        }));
      });
    }
    addBookmark(bookmarkToggle, id, reportId, reportType, csrfToken) {
      return __async(this, null, function* () {
        bookmarkToggle.setAttribute("checked", "");
        this.bookmarkWrapper.setAttribute("tooltip", "Remove bookmark");
        if (this.bookmarkLabel) this.bookmarkLabel.innerText = "Bookmarked";
        yield this.toggleBookmark("add", id, reportId, reportType, csrfToken);
      });
    }
    removeBookmark(bookmarkToggle, id, reportId, reportType, csrfToken) {
      return __async(this, null, function* () {
        bookmarkToggle.removeAttribute("checked");
        this.bookmarkWrapper.setAttribute("tooltip", "Add bookmark");
        if (this.bookmarkLabel) this.bookmarkLabel.innerText = "Bookmark removed";
        yield this.toggleBookmark("remove", id, reportId, reportType, csrfToken);
      });
    }
    handleBookmarkChange(bookmarkToggle, id, reportId, reportType, csrfToken) {
      return __async(this, null, function* () {
        if (bookmarkToggle.checked) {
          bookmarkToggle.removeAttribute("checked");
          this.bookmarkWrapper.setAttribute("tooltip", "Add bookmark");
          if (this.bookmarkLabel) this.bookmarkLabel.innerText = "Bookmark removed";
          yield this.toggleBookmark("remove", id, reportId, reportType, csrfToken);
        } else {
          bookmarkToggle.setAttribute("checked", "");
          this.bookmarkWrapper.setAttribute("tooltip", "Bookmarked");
          if (this.bookmarkLabel) this.bookmarkLabel.innerText = "Bookmarked";
          yield this.toggleBookmark("add", id, reportId, reportType, csrfToken);
        }
      });
    }
    toggleBookmark(type, id, reportId, reportType, csrfToken) {
      return __async(this, null, function* () {
        const endpoint = type === "add" ? "/dpr/addBookmark/" : "/dpr/removeBookmark/";
        yield fetch(endpoint, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken
          },
          body: JSON.stringify({
            id,
            reportId,
            reportType
          })
        }).then(() => {
          if (!window.location.href.includes("/report")) {
            window.location.reload();
          }
        }).catch((error) => console.error("Error:", error));
      });
    }
  };

  // src/dpr/components/show-more/clientClass.mjs
  var ShowMore = class extends DprClientClass {
    static getModuleName() {
      return "show-more";
    }
    initialise() {
      this.initShowMore();
    }
    initShowMore() {
      const element = this.getElement();
      const textContainer = element.querySelector(".dpr-show-more-content");
      const button = element.querySelector(".dpr-show-hide-button");
      const textContent = element.getAttribute("data-content");
      const length = +element.getAttribute("data-length") || 200;
      const shortString = textContent.replaceAll(/<[^>]+>/g, "").substring(0, length);
      if (textContent.length > length) {
        textContainer.innerHTML = `${shortString}... `;
      } else {
        textContainer.innerHTML = `${textContent}`;
        button.style.display = "none";
      }
      button.addEventListener("click", (event) => {
        event.preventDefault();
        if (button.innerHTML === "show more") {
          textContainer.innerHTML = `${textContent}  `;
          button.innerHTML = "show less";
        } else if (button.innerHTML === "show less") {
          textContainer.innerHTML = `${shortString}... `;
          button.innerHTML = "show more";
        }
      });
    }
  };

  // src/dpr/DprQueryParamClass.mjs
  var DprQueryParamClass = class extends DprClientClass {
    /**
     * initialises the selected values from the query params
     *
     * @memberof AsyncFilters
     */
    initInputsFromQueryParams() {
      this.queryParams = new URLSearchParams(window.location.search);
      this.queryParams.forEach((value, key) => {
        const inputs = document.getElementsByName(key);
        if (inputs.length) {
          const input = inputs[0];
          const { type } = input;
          if (type === "radio" || type === "checkbox") {
            this.setMultiSelectValue(inputs, value);
          } else if (input.classList.contains("moj-js-datepicker-input")) {
            const formatted = dayjs(value, "YYYY-MM-DD").format("DD/MM/YYYY");
            input.value = formatted !== "Invalid Date" ? formatted : "";
          } else {
            input.value = value;
          }
        }
      });
    }
    /**
     * Initialises the input event listeners
     *
     * @memberof AsyncFilters
     */
    initInputEvents(elements) {
      Array.from(elements).forEach((input) => {
        input.addEventListener("change", () => {
          this.setQueryParamFromInput(input, true, false);
        });
      });
    }
    /**
     * Initialises the query params from default inputs
     *
     * @param {*} elements
     * @memberof DprQueryParamClass
     */
    initQueryParamsFromInputs(elements) {
      Array.from(elements).forEach((input) => {
        if (input.type !== "hidden") this.setQueryParamFromInput(input, false, true);
      });
    }
    /**
     * Sets a single query param from an single input
     *
     * @param {*} input
     * @param {*} toggleCheckbox
     * @memberof DprQueryParamClass
     */
    setQueryParamFromInput(input, toggleCheckbox = false, init = false) {
      const { type } = input;
      if (type === "checkbox" || type === "radio") {
        this.setMultiSelectQueryParam(input, toggleCheckbox, init);
      } else {
        const { name } = input;
        let { value } = input;
        const { staticOptionNameValue } = input;
        const isDateInput = input.classList.contains("moj-js-datepicker-input");
        if (isDateInput) {
          const formatted = dayjs(value, "D/M/YYYY").format("YYYY-MM-DD");
          value = formatted !== "Invalid Date" ? formatted : "";
        }
        const valueToUpdate = !isDateInput && staticOptionNameValue ? staticOptionNameValue : value;
        if (name) this.updateQueryParam(name, valueToUpdate);
      }
    }
    /**
     * Sets the query params for checkboxes
     *
     * @param {*} input
     * @param {*} toggle - adds the delete step on toggle
     * @memberof DprQueryParamClass
     */
    setMultiSelectQueryParam(input, toggle, init) {
      this.queryParams = new URLSearchParams(window.location.search);
      const { name, value, checked, type } = input;
      if (checked && !this.queryParams.has(name, value)) {
        let updateType;
        if (type === "checkbox") {
          updateType = "append";
          if (!init && name !== "columns") this.updateQueryParam("preventDefault", true);
        }
        this.updateQueryParam(name, value, updateType);
      } else if (!checked && this.queryParams.has(name, value) && toggle) {
        if (type === "checkbox") {
          if (!init && name !== "columns") this.updateQueryParam("preventDefault", true);
        }
        this.updateQueryParam(name, value, "delete");
      }
    }
    /**
     * Updates the query string and updates the URL
     *
     * @param {*} queryParams
     * @param {*} name
     * @param {*} value
     * @memberof DprQueryParamClass
     */
    updateQueryParam(name, value, type) {
      this.queryParams = new URLSearchParams(window.location.search);
      if (!value && name.length) {
        this.queryParams.delete(name);
      } else {
        switch (type) {
          case "append":
            this.queryParams.append(name, value);
            break;
          case "delete":
            this.queryParams.delete(name, value);
            break;
          default:
            this.queryParams.set(name, value);
            break;
        }
      }
      window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
    }
    /**
     * Clears the query params
     *
     * @memberof DprQueryParamClass
     */
    clearQueryParams(type) {
      this.queryParams = new URLSearchParams(window.location.search);
      const params = Array.from(this.queryParams);
      params.forEach((p) => {
        if (type && p[0].includes(type)) {
          this.queryParams.delete(p[0], p[1]);
        }
        if (type === "filters") {
          this.queryParams.delete("preventDefault");
        }
      });
      window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
    }
    /**
     * Given a form element, will extract the formdata
     * as an array of objects and filter out empty values.
     *
     * @param {*} form
     * @return {*}
     * @memberof AsyncFilters
     */
    getFormDataAsObject(form, prefix) {
      const formData = new FormData(form);
      const array = Array.from(formData.entries()).filter((entry) => {
        return entry[1] !== "";
      }).map((entry) => {
        return { [`${prefix}${entry[0]}`]: entry[1] };
      });
      return Object.assign({}, ...[...array]);
    }
    /**
     * Sets the value of a radio button
     *
     * @param {*} inputs
     * @param {*} value
     * @memberof AsyncFilters
     */
    setMultiSelectValue(inputs, value) {
      const input = Array.from(inputs).find((i) => i.getAttribute("value") === value);
      if (input) input.checked = true;
    }
    /**
     * Sets the value of the checkboxes
     *
     * @param {*} inputs
     * @param {*} value
     * @memberof DprQueryParamClass
     */
    setCheckBoxValues(inputs, value) {
      const input = Array.from(inputs).find((i) => i.getAttribute("value") === value);
      if (input) input.checked = true;
    }
    removeNoFilterValues() {
      this.queryParams = new URLSearchParams(window.location.search);
      const params = Array.from(this.queryParams);
      params.forEach((p) => {
        if (p[1].includes("no-filter")) this.queryParams.delete(p[0], p[1]);
      });
      window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
    }
  };

  // src/dpr/DprFormValidationClass.mjs
  var DprFormValidationClass = class extends DprQueryParamClass {
    initFormValidation(formFields) {
      formFields.forEach((field) => {
        const formGroup = field.closest("div.govuk-form-group");
        if (formGroup) {
          const errorMessageEl = formGroup.querySelector("p.govuk-error-message");
          if (errorMessageEl) {
            formGroup.classList.remove("govuk-form-group--error");
            errorMessageEl.classList.add("govuk-error-message--hidden");
            field.classList.remove("govuk-input--error");
            field.classList.remove("govuk-textarea--error");
            field.classList.remove("govuk-select--error");
          }
        }
      });
    }
    validateForm() {
      this.errorMessages = [];
      let prevfieldName = "";
      this.formFields.forEach((field) => {
        const currentFieldName = field.getAttribute("name");
        if (currentFieldName !== prevfieldName && field.tagName !== "BUTTON") {
          const formGroupEl = field.closest("div.govuk-form-group");
          if (formGroupEl) {
            const errorMessageEl = formGroupEl.querySelector("p.govuk-error-message");
            if (!this.fieldIsValid(field)) {
              this.showFieldError(field, formGroupEl, errorMessageEl);
            } else if (errorMessageEl && formGroupEl) {
              this.hideFieldError(field, formGroupEl, errorMessageEl);
            }
          }
        }
        prevfieldName = field.getAttribute("name");
      });
      if (this.errorMessages.length) {
        this.buildErrorSummary();
        this.errorSummary.classList.remove("query-error-summary--hidden");
      } else {
        this.errorSummary.classList.add("query-error-summary--hidden");
      }
    }
    fieldIsValid(field) {
      const { type } = field;
      switch (type) {
        case "checkbox":
          return this.validateCheckbox(field);
        default:
          return field.checkValidity();
      }
    }
    validateCheckbox(field) {
      const checkboxWrapper = field.closest("div.govuk-checkboxes");
      if (checkboxWrapper.hasAttribute("required")) {
        const checkboxes = checkboxWrapper.querySelectorAll('input[type="checkbox"]');
        return Array.from(checkboxes).some((x) => x.checked);
      }
      return true;
    }
    showFieldError(field, formGroupEl, errorMessageEl) {
      formGroupEl.classList.add("govuk-form-group--error");
      const message = this.setValidationMessage(field.validity, field, errorMessageEl);
      errorMessageEl.innerHTML = `<span class="govuk-visually-hidden">Error:</span>${message}`;
      errorMessageEl.classList.remove("govuk-error-message--hidden");
      field.classList.add("govuk-input--error");
    }
    hideFieldError(field, formGroupEl, errorMessageEl) {
      formGroupEl.classList.remove("govuk-form-group--error");
      errorMessageEl.classList.add("govuk-error-message--hidden");
      field.classList.remove("govuk-input--error");
    }
    buildErrorSummary() {
      const errorSummaryBody = this.errorSummary.querySelector("div.govuk-error-summary__body");
      let messages = "";
      this.errorMessages.forEach((m) => {
        messages += `<li><a href="${m.href}">${m.text}</a></li>`;
      });
      const errorMessages = `<ul class="govuk-list govuk-error-summary__list">${messages}</ul>`;
      errorSummaryBody.innerHTML = errorMessages;
    }
    getDisplayName(field) {
      const type = field.getAttribute("type");
      switch (type) {
        case "text":
          return field.getAttribute("display-name");
        case "radio":
          return field.closest("div.govuk-radios").getAttribute("display-name");
        case "checkbox":
          return field.closest("div.govuk-checkboxes").getAttribute("display-name");
        default:
          return field.getAttribute("display-name");
      }
    }
    setValidationMessage(validityState, field, errorMessageEl) {
      const existingErrorMessage = errorMessageEl.lastChild.nodeValue.replace(/(\r\n|\n|\r)/gm, "").trim();
      const inputId = field.getAttribute("id");
      const displayName = this.getDisplayName(field);
      let message;
      if (validityState.valueMissing || field.type === "checkbox") {
        message = existingErrorMessage.length ? existingErrorMessage : `${displayName} is required`;
        this.errorMessages.push({
          text: message,
          href: `#${inputId}`
        });
      }
      if (validityState.patternMismatch) {
        const pattern = field.getAttribute("pattern-hint") || field.getAttribute("pattern");
        message = existingErrorMessage.length ? existingErrorMessage : `The value for ${displayName} must be in the correct pattern: ${pattern}`;
        this.errorMessages.push({
          text: message,
          href: `#${inputId}`
        });
      }
      return message;
    }
  };

  // src/dpr/components/download-feeback-form/cientClass.mjs
  var AsyncFilters = class extends DprFormValidationClass {
    static getModuleName() {
      return "download-feedback-form";
    }
    initialise() {
      this.errorMessages = [];
      this.mainForm = document.getElementById("download-feedback-form");
      this.mainForm.noValidate = true;
      this.formFields = Array.from(this.mainForm.elements);
      this.errorSummary = document.getElementById("download-feedback-form-summary");
      this.submitButton = document.getElementById("download-feedback-form-submit");
      this.success = document.getElementById("download-feedback-form-success");
      this.initSubmitButton();
      this.initFormValidation(this.formFields);
      this.mainForm.classList.remove("download-feedback-form--hidden");
    }
    initSubmitButton() {
      this.submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.validateForm();
        if (this.mainForm.checkValidity()) {
          this.mainForm.requestSubmit();
        }
      });
    }
  };

  // src/dpr/components/_reports/report-pagination/clientClass.mjs
  var Pagination = class extends DprQueryParamClass {
    static getModuleName() {
      return "pagination";
    }
    initialise() {
      this.pageSizeSelect = document.getElementById("page-size-select");
      this.initInputsFromQueryParams();
      this.initSelectEvent();
    }
    initSelectEvent() {
      this.pageSizeSelect.addEventListener("change", () => {
        this.queryParams = new URLSearchParams(window.location.search);
        const { name, value } = this.pageSizeSelect;
        this.queryParams.set(name, value);
        this.queryParams.set("selectedPage", "1");
        window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
        window.location.reload();
      });
    }
  };

  // src/dpr/components/_reports/report-actions/clientClass.mjs
  var IconButtonList = class extends DprClientClass {
    static getModuleName() {
      return "report-actions";
    }
    initialise() {
      this.refreshButton = document.getElementById("dpr-button-refresh");
      this.printButton = document.getElementById("dpr-button-printable");
      this.shareButton = document.getElementById("dpr-button-sharable");
      this.downloadButton = document.getElementById("dpr-button-downloadable");
      this.copyButton = document.getElementById("dpr-button-copy");
      this.initRefreshEvent();
      this.initPrintButtonEvent();
      this.initShareButtonEvent();
      this.initCopyButtonEvent();
    }
    initPrintButtonEvent() {
      if (this.printButton) {
        const disabled = this.printButton.getAttribute("data-disabled");
        this.printButton.addEventListener("click", () => {
          if (disabled !== "true") {
            window.print();
          }
        });
        this.printButton.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            if (disabled !== "true") {
              window.print();
            }
          }
        });
      }
    }
    initShareButtonEvent() {
      if (this.shareButton) {
        const href = this.shareButton.getAttribute("data-href");
        this.shareButton.addEventListener("click", () => {
          window.location = href;
        });
        this.shareButton.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            window.location = href;
          }
        });
      }
    }
    initCopyButtonEvent() {
      if (this.copyButton) {
        const href = this.copyButton.getAttribute("data-href");
        this.copyButton.addEventListener("click", () => {
          navigator.clipboard.writeText(href);
        });
        this.copyButton.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            navigator.clipboard.writeText(href);
          }
        });
      }
    }
    initRefreshEvent() {
      if (this.refreshButton) {
        const href = this.refreshButton.getAttribute("data-href");
        this.refreshButton.addEventListener("click", () => {
          window.location = href;
        });
        this.refreshButton.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            window.location = href;
          }
        });
      }
    }
  };

  // src/dpr/components/_reports/report-data-table/clientClass.mjs
  var DataTable = class extends DprClientClass {
    static getModuleName() {
      return "data-table";
    }
    initialise() {
      this.tableContainer = document.getElementById("dpr-table-wrapper");
      this.table = document.getElementById("dpr-data-table");
      this.overflowGradient = document.getElementById("dpr-overflow-gradient");
      this.createTableHeaderAndFooter();
      this.initTableScrollListener();
    }
    initTableScrollListener() {
      this.checkOffsetWidths();
      window.addEventListener("resize", () => {
        this.checkOffsetWidths();
      });
      this.tableContainer.addEventListener("scroll", (event) => {
        const endOfScroll = this.table.offsetWidth;
        const currentScroll = event.target.offsetWidth + event.target.scrollLeft;
        if (endOfScroll === currentScroll) {
          this.overflowGradient.style.display = "none";
        } else {
          this.overflowGradient.style.display = "block";
        }
      });
    }
    checkOffsetWidths() {
      if (this.tableContainer.offsetWidth >= this.table.offsetWidth) {
        this.overflowGradient.style.display = "none";
      } else {
        this.overflowGradient.style.display = "block";
      }
    }
    createTableHeaderAndFooter() {
      if (this.table) {
        const classification = this.table.getAttribute("data-classification");
        const headLength = Number(this.table.getAttribute("data-col-length"));
        const classificationContent = `<b>${classification}</b>`;
        const header = this.table.createTHead();
        const classificationHeaderRow = header.insertRow(0);
        const classificationHeaderCell = classificationHeaderRow.insertCell(0);
        classificationHeaderCell.outerHTML = `<th class="govuk-table__header govuk-table__cell--content print-header-footer" colspan=${headLength}>${classificationContent}</th>`;
        const footer = this.table.createTFoot();
        const classificationFooterRow = footer.insertRow(0);
        const classificationFooterCell = classificationFooterRow.insertCell(0);
        classificationFooterCell.outerHTML = `<td class="govuk-table__cell govuk-table__cell--content print-header-footer table-row--no-border" colspan=${headLength}>${classificationContent}</td>`;
      }
    }
  };

  // src/dpr/components/_reports/report-columns-form/clientClass.mjs
  var Columns = class extends DprQueryParamClass {
    static getModuleName() {
      return "columns";
    }
    initialise() {
      this.form = this.getElement();
      this.submitButton = this.getElement().querySelector(".dpr-apply-columns-button");
      this.resetButton = this.getElement().querySelector(".dpr-reset-columns-button");
      this.initInputsFromQueryParams();
      this.initQueryParamsFromInputs(this.form.elements);
      this.initInputEvents(this.form.elements);
      this.initSubmitButton();
      this.initResetButton();
    }
    initSubmitButton() {
      this.submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.loadingHelper.showLoadingAnimation();
        window.location.reload();
      });
    }
    initResetButton() {
      this.resetButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.loadingHelper.showLoadingAnimation();
        this.clearQueryParams("columns");
        window.location.reload();
      });
    }
  };

  // src/dpr/components/_reports/report-download-message/clientClass.mjs
  var DownloadMessage = class extends DprClientClass {
    static getModuleName() {
      return "download-message";
    }
    initialise() {
      this.downloadMessage = this.getElement();
      if (window.location.href.indexOf("download-disabled") > -1) {
        this.downloadMessage.classList.remove("dpr-download-message--hidden");
      }
    }
  };

  // src/dpr/components/_filters/filters-form/clientClass.mjs
  var DprFiltersFormClass = class extends DprFormValidationClass {
    initFiltersForm({ formId, submitButtonId, resetButtonId, removeSelectedButtonClass }) {
      this.errorMessages = [];
      this.mainForm = document.getElementById(formId);
      this.mainForm.noValidate = true;
      this.formFields = Array.from(this.mainForm.elements);
      this.errorSummary = document.getElementById("query-error-summary");
      this.submitButton = document.getElementById(submitButtonId);
      this.resetButton = document.getElementById(resetButtonId);
      this.selectedFiltersButtons = document.querySelectorAll(`.${removeSelectedButtonClass}`);
      this.initValues();
      this.initSubmitButton();
      this.initResetButton();
      this.initFormData();
    }
    initValues() {
      this.initInputsFromQueryParams();
      this.initQueryParamsFromInputs(this.mainForm.elements);
      this.initInputEvents(this.mainForm.elements);
    }
    initFormData() {
      this.initFormValidation(this.formFields);
      this.mainForm.classList.remove("async-filters-form--hidden");
    }
    initSubmitButton() {
      this.submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.initFormData();
        this.validateForm();
        if (this.mainForm.checkValidity()) {
          this.submitAction();
        }
      });
    }
    initResetButton() {
      if (this.resetButton) {
        this.defaultQuery = this.resetButton.getAttribute("defaultQuery");
        this.resetButton.addEventListener("click", (e) => {
          e.preventDefault();
          this.clearQueryParams("filters");
          this.resetAction();
        });
      }
    }
    resetAction() {
      if (this.defaultQuery) {
        const filters = this.defaultQuery.substring(1);
        const href = `${window.location.href}&${filters}`;
        window.location.href = href;
      } else {
        window.location.reload();
      }
    }
    submitAction() {
      window.location.reload();
    }
    initSelectedFiltersButtons() {
      if (this.selectedFiltersButtons) {
        this.selectedFiltersButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            const keys = JSON.parse(e.target.getAttribute("data-query-param-key"));
            const values = JSON.parse(e.target.getAttribute("data-query-param-value"));
            let constraints = e.target.getAttribute("data-query-constraint-values");
            constraints = constraints ? JSON.parse(e.target.getAttribute("data-query-constraint-values")) : void 0;
            keys.forEach((key) => {
              values.forEach((value) => {
                this.updateQueryParam(key, value, "delete");
              });
              if (constraints) {
                const constraint = constraints.find((con) => con.key === key);
                if (constraint) {
                  this.updateQueryParam(key, constraint.value);
                }
              }
            });
            this.updateQueryParam("preventDefault", true);
            window.location.reload();
          });
        });
      }
    }
  };

  // src/dpr/components/_filters/filters-interactive/clientClass.mjs
  var InteractiveFilters = class extends DprFiltersFormClass {
    static getModuleName() {
      return "interactive-filters";
    }
    initialise() {
      this.initFiltersForm({
        formId: "interactive-filters-form",
        submitButtonId: "interactive-apply-filters-button",
        resetButtonId: "interactive-reset-filters-button",
        removeSelectedButtonClass: "interactive-remove-filter-button"
      });
      this.initSelectedFiltersButtons();
    }
  };

  // src/dpr/DprPollingStatusClass.mjs
  var DprPollingStatusClass = class extends DprClientClass {
    getPollingFrquency() {
      return "2000";
    }
    getPollingStatuses() {
      return ["SUBMITTED", "STARTED", "PICKED"];
    }
    getEndStatuses() {
      return ["FINISHED", "FAILED", "EXPIRED", "ABORTED"];
    }
    getExpiredCheckStatuses() {
      return ["FAILED", "EXPIRED", "ABORTED"];
    }
    getRequestStatus(metaData, csrfToken) {
      return __async(this, null, function* () {
        return this.getStatus("/dpr/getStatus/", metaData, csrfToken);
      });
    }
    getExpiredStatus(endpoint, metaData, csrfToken) {
      return __async(this, null, function* () {
        return this.getStatus(endpoint, metaData, csrfToken);
      });
    }
    shouldPollStatus(data) {
      return JSON.parse(data).some((item) => {
        return !this.END_STATUSES.includes(item.status);
      });
    }
    shouldPollExpired(data) {
      return JSON.parse(data).some((item) => {
        return !this.EXPIRED_END_STATUSES.includes(item.status);
      });
    }
    getStatus(endpoint, body, csrfToken) {
      return __async(this, null, function* () {
        let response;
        yield fetch(endpoint, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken
          },
          body: JSON.stringify(__spreadValues({}, body))
        }).then((res) => res.json()).then((res) => {
          response = res;
        }).catch((error) => console.error("Error:", error));
        return response;
      });
    }
  };

  // src/dpr/components/_async/async-polling/clientClass.mjs
  var DprAsyncPolling = class extends DprPollingStatusClass {
    static getModuleName() {
      return "async-polling-content";
    }
    initialise() {
      this.POLLING_STATUSES = this.getPollingStatuses();
      this.POLLING_FREQUENCY = this.getPollingFrquency();
      this.statusSection = document.getElementById("async-request-polling-status");
      this.retryRequestButton = document.getElementById("retry-async-request");
      this.cancelRequestButton = document.getElementById("cancel-async-request");
      this.viewReportButton = document.getElementById("view-async-report-button");
      this.requestData = this.statusSection.getAttribute("data-request-data");
      this.currentStatus = this.statusSection.getAttribute("data-current-status");
      this.csrfToken = this.statusSection.getAttribute("data-csrf-token");
      this.initCancelRequestButton();
      this.initPollingInterval();
    }
    initPollingInterval() {
      return __async(this, null, function* () {
        if (this.POLLING_STATUSES.includes(this.currentStatus)) {
          this.pollingInterval = setInterval(() => __async(this, null, function* () {
            yield this.pollStatus();
          }), this.POLLING_FREQUENCY);
        }
      });
    }
    pollStatus() {
      return __async(this, null, function* () {
        if (this.requestData) {
          const meta = JSON.parse(this.requestData);
          const response = yield this.getRequestStatus(meta, this.csrfToken);
          if (this.currentStatus !== response.status) {
            clearInterval(this.pollingInterval);
            window.location.reload();
          }
        }
      });
    }
    initCancelRequestButton() {
      if (this.cancelRequestButton) {
        const executionId = this.cancelRequestButton.getAttribute("data-execution-id");
        const reportId = this.cancelRequestButton.getAttribute("data-report-id");
        const id = this.cancelRequestButton.getAttribute("data-id");
        const type = this.cancelRequestButton.getAttribute("data-type");
        const csrfToken = this.cancelRequestButton.getAttribute("data-csrf-token");
        this.cancelRequestButton.addEventListener("click", () => __async(this, null, function* () {
          yield fetch("/dpr/cancelRequest/", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": csrfToken
            },
            body: JSON.stringify({
              executionId,
              reportId,
              id,
              type
            })
          }).then(() => {
            window.location.reload();
          }).catch((error) => console.error("Error:", error));
        }));
      }
    }
  };

  // src/dpr/components/_async/async-filters-form/clientClass.mjs
  var AsyncFilters2 = class extends DprFiltersFormClass {
    static getModuleName() {
      return "async-filters";
    }
    initialise() {
      this.initFiltersForm({
        formId: "async-filters-form",
        submitButtonId: "async-request-report-button",
        resetButtonId: "async-request-reset-filters-button"
      });
    }
    initFormData() {
      const { origin, pathname, search } = window.location;
      document.getElementById("async-filters-form-pathname").value = pathname;
      document.getElementById("async-filters-form-origin").value = origin;
      document.getElementById("async-filters-form-search").value = search;
      const params = new URLSearchParams(search);
      const paramsString = params.size > 0 ? `?${params.toString()}` : "";
      document.getElementById("async-filters-form-href").value = `${origin}${pathname}${paramsString}`;
      this.initFormValidation(this.formFields);
      this.mainForm.classList.remove("async-filters-form--hidden");
    }
    submitAction() {
      this.mainForm.requestSubmit();
    }
  };

  // src/dpr/DprSyncLoading.mjs
  var DprSyncLoading = class extends DprClientClass {
    static getModuleName() {
      return "sync-loading";
    }
    initialise() {
      this.element = this.getElement();
      this.form = this.element.querySelector("#dpr-sync-loading-form");
      this.load();
    }
    load() {
      return __async(this, null, function* () {
        this.form.submit();
      });
    }
  };

  // src/dpr/components/_inputs/date-input/clientClass.mjs
  var DateInput = class extends DprClientClass {
    static getModuleName() {
      return "date-input";
    }
    initialise() {
      const element = this.getElement();
      this.dateInput = element.querySelector(`input.moj-js-datepicker-input`);
      this.setToValueTriggers = document.querySelectorAll(`[data-set-min-max-trigger='true']`);
      this.required = this.getElement().getAttribute("data-required");
      this.displayName = this.getElement().getAttribute("data-display-name");
      this.pattern = this.getElement().getAttribute("data-pattern");
      this.patternHint = this.getElement().getAttribute("data-pattern-hint");
      this.min = this.getElement().getAttribute("data-min");
      this.max = this.getElement().getAttribute("data-max");
      this.setValidationOnInputEl();
      this.setMinMaxEventListener();
      this.setToMinMax();
      this.setToValue();
    }
    setValidationOnInputEl() {
      if (this.required && this.required === "true") {
        this.dateInput.setAttribute("required", true);
      }
      if (this.min) this.dateInput.setAttribute("min", this.min);
      if (this.max) this.dateInput.setAttribute("max", this.max);
      this.dateInput.setAttribute("display-name", this.displayName);
      this.dateInput.setAttribute("pattern", this.pattern);
      this.dateInput.setAttribute("pattern-hint", this.patternHint);
    }
    setMinMaxEventListener() {
      this.dateInput.addEventListener("blur", () => {
        this.setToMinMax();
      });
    }
    setToMinMax() {
      if (this.dateInput.value) {
        const dateValue = new Date(this.dateInput.value);
        if (this.min) {
          const minDate = new Date(this.min);
          if (dateValue < minDate) {
            this.dateInput.value = dayjs(this.min).format("DD/MM/YYYY");
          }
        }
        if (this.max) {
          const maxDate = new Date(this.max);
          if (dateValue > maxDate) {
            this.dateInput.value = dayjs(this.max).format("DD/MM/YYYY");
          }
        }
      }
      const changeEvent = new Event("change");
      this.dateInput.dispatchEvent(changeEvent);
    }
    setToValue() {
      this.setToValueTriggers.forEach((set) => {
        set.addEventListener("click", (e) => {
          e.preventDefault();
          const value = e.target.getAttribute("data-set-min-max-value");
          const inputId = e.target.getAttribute("data-set-to-input");
          const input = document.getElementById(inputId);
          input.value = value;
          const changeEvent = new Event("change");
          input.dispatchEvent(changeEvent);
        });
      });
    }
  };

  // src/dpr/components/_inputs/date-range/clientClass.mjs
  var DateRangeInput = class extends DprClientClass {
    static getModuleName() {
      return "date-range-input";
    }
    initialise() {
      this.dateRangeInputs = document.getElementById("dpr-date-range");
      this.filtersAccordion = document.getElementById("dpr-interactive-filters-details");
      this.fieldName = this.dateRangeInputs.getAttribute("data-field-name");
      this.startInputID = `filters.${this.fieldName}.start`;
      this.endInputID = `filters.${this.fieldName}.end`;
      this.durationInputID = `filters.${this.fieldName}.relative-duration`;
      this.relativeRangeRadioButtons = document.querySelectorAll(`input[name='${this.durationInputID}']`);
      this.startInput = document.querySelector(`input[name='${this.startInputID}']`);
      this.endInput = document.querySelector(`input[name='${this.endInputID}']`);
      this.startRequired = this.startInput.required;
      this.endRequired = this.endInput.required;
      this.datePickerTab = document.getElementById("tab_date-picker");
      this.relativeDurationTab = document.getElementById("tab_relative-range");
      this.durationValue = void 0;
      if (this.datePickerTab && this.relativeDurationTab) {
        this.initDatePickerTabClick();
        this.initRelativeDurationTabClick();
        this.initTabs();
        this.initDurationRadionButtonClick();
      }
    }
    initTabs() {
      this.queryParams = new URLSearchParams(window.location.search);
      if (this.queryParams.has(this.durationInputID)) {
        this.relativeRangeRadioButtons.forEach((durationRadioButton) => {
          this.updateCheckedDuration(durationRadioButton);
        });
      }
    }
    initDatePickerTabClick() {
      this.datePickerTab.addEventListener("click", () => {
        let value;
        this.queryParams = new URLSearchParams(window.location.search);
        if (this.queryParams.has(this.durationInputID)) {
          value = this.queryParams.get(this.durationInputID);
          this.removeSearchParam(this.durationInputID);
        }
        this.updateInputs(value);
        window.location.hash = "date-picker";
      });
    }
    initRelativeDurationTabClick() {
      this.relativeDurationTab.addEventListener("click", () => {
        this.relativeRangeRadioButtons.forEach((durationRadioButton) => {
          this.updateCheckedDuration(durationRadioButton);
        });
        window.location.hash = "relative-range";
      });
    }
    initDurationRadionButtonClick() {
      this.relativeRangeRadioButtons.forEach((durationRadioButton) => {
        durationRadioButton.addEventListener("click", (e) => {
          const durationValue = e.target.value;
          this.durationValue = durationValue;
          this.updateInputs(durationValue);
          this.removeRequiredFromDatePickers();
        });
      });
    }
    removeSearchParam(name, name2) {
      this.queryParams = new URLSearchParams(window.location.search);
      this.queryParams.delete(name);
      if (name2) this.queryParams.delete(name2);
      window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
    }
    updateCheckedDuration(durationRadioButton) {
      if (durationRadioButton.checked) {
        const durationValue = durationRadioButton.value;
        this.updateInputs(durationValue);
        const changeEvent = new Event("change");
        durationRadioButton.dispatchEvent(changeEvent);
      }
    }
    removeRequiredFromDatePickers() {
      this.startInput.removeAttribute("required");
      this.endInput.removeAttribute("required");
      this.startInput.value = "";
      this.endInput.value = "";
    }
    updateInputs(durationValue) {
      this.startInput.required = this.startRequired;
      this.endInput.required = this.endRequired;
      if (durationValue || this.durationValue) {
        const d = durationValue || this.durationValue;
        const { startDate, endDate } = this.calculateDateForDatepicker(d);
        this.startInput.value = startDate;
        this.endInput.value = endDate;
      }
      const changeEvent = new Event("change");
      this.startInput.dispatchEvent(changeEvent);
      this.endInput.dispatchEvent(changeEvent);
    }
    calculateDateForDatepicker(duration) {
      let startDate;
      let endDate;
      switch (duration) {
        case "yesterday":
          endDate = dayjs();
          startDate = endDate.subtract(1, "day");
          break;
        case "tomorrow":
          startDate = dayjs();
          endDate = startDate.add(1, "day");
          break;
        case "last-week":
          endDate = dayjs();
          startDate = endDate.subtract(1, "week");
          break;
        case "next-week":
          startDate = dayjs();
          endDate = startDate.add(1, "week");
          break;
        case "last-month":
          endDate = dayjs();
          startDate = endDate.subtract(1, "month");
          break;
        case "next-month":
          startDate = dayjs();
          endDate = startDate.add(1, "month");
          break;
        default:
          break;
      }
      return {
        startDate: startDate.format("DD/MM/YYYY").toString(),
        endDate: endDate.format("DD/MM/YYYY").toString()
      };
    }
  };

  // src/dpr/components/_inputs/autocomplete-text-input/clientClass.mjs
  var Autocomplete = class extends DprClientClass {
    static getModuleName() {
      return "autocomplete-text-input";
    }
    constructor(element) {
      super(element);
      const listId = this.getTextInput().getAttribute("aria-owns");
      this.listItemsSelector = `#${listId} li`;
      this.listParentSelector = `#${listId} ul`;
    }
    initialise() {
      const textInput = this.getTextInput();
      textInput.addEventListener("keyup", (event) => {
        this.onTextInput(event, textInput);
      });
      this.getElement().querySelectorAll(".autocomplete-text-input-list-button").forEach((button) => {
        button.addEventListener("click", (event) => {
          this.onOptionClick(event, textInput, this.getElement());
        });
      });
    }
    getTextInput() {
      return this.getElement().querySelector(".autocomplete-text-input-box");
    }
    onTextInput(event, textInput) {
      const minLength = Number(textInput.dataset.minimumLength);
      const { resourceEndpoint } = textInput.dataset;
      const searchValue = event.target.value.toLowerCase();
      if (resourceEndpoint) {
        if (searchValue.length >= minLength) {
          this.addItem(this.clearListAndRecreateTemplate(), "<i>Searching...</i>");
          this.populateOptionsDynamically(
            resourceEndpoint,
            searchValue,
            textInput,
            () => this.clearListAndRecreateTemplate()
          );
        } else {
          this.clearListAndRecreateTemplate();
        }
      } else {
        this.getElement().querySelectorAll(this.listItemsSelector).forEach((item) => {
          if (searchValue.length >= minLength && this.isMatchingStaticOptionNameOrDisplayPrefix(this.getInputListButton(item), searchValue, item)) {
            item.classList.remove("autocomplete-text-input-item-hide");
          } else {
            item.classList.add("autocomplete-text-input-item-hide");
          }
        });
      }
      if (searchValue.length === 0) {
        const changeEvent = new Event("change");
        textInput.dispatchEvent(changeEvent);
      }
    }
    getInputListButton(item) {
      return item.querySelector(".autocomplete-text-input-list-button");
    }
    isMatchingStaticOptionNameOrDisplayPrefix(inputListButton, searchValue, item) {
      return this.isStaticOptionsNamePrefix(inputListButton.dataset.staticOptionNameValue, searchValue) || item.innerText.trim().toLowerCase().startsWith(searchValue);
    }
    isStaticOptionsNamePrefix(staticOptionNameValue, searchValue) {
      return staticOptionNameValue && staticOptionNameValue.trim().toLowerCase().startsWith(searchValue);
    }
    populateOptionsDynamically(resourceEndpoint, searchValue, textInput, templateProvider) {
      return __async(this, null, function* () {
        try {
          const response = yield fetch(resourceEndpoint.replace("{prefix}", encodeURI(searchValue)));
          const results = yield response.json();
          if (searchValue === textInput.value.toLowerCase()) {
            const template = templateProvider();
            results.forEach((r) => {
              this.addItem(template, r, (event) => {
                this.onOptionClick(event, textInput, this.getElement());
              });
            });
          }
        } catch (error) {
          this.addItem(templateProvider(), `Failed to retrieve results: ${error}`);
        }
      });
    }
    onOptionClick(event, textInput, topLevelElement) {
      event.preventDefault();
      textInput.value = event.target.innerText.trim();
      textInput.staticOptionNameValue = event.target.dataset.staticOptionNameValue;
      textInput.focus();
      const changeEvent = new Event("change");
      textInput.dispatchEvent(changeEvent);
      topLevelElement.querySelectorAll("li").forEach((item) => {
        item.classList.add("autocomplete-text-input-item-hide");
      });
    }
    addItem(template, content, clickEvent) {
      const item = template.cloneNode(true);
      item.querySelector("button").innerHTML = content;
      item.classList.remove("autocomplete-text-input-item-hide");
      this.getElement().querySelector(this.listParentSelector).appendChild(item);
      if (clickEvent) {
        item.addEventListener("click", (event) => {
          clickEvent(event);
        });
      }
    }
    clearListAndRecreateTemplate() {
      const template = this.getElement().querySelector(this.listItemsSelector).cloneNode(true);
      template.classList.add("autocomplete-text-input-item-hide");
      this.getElement().querySelectorAll(this.listItemsSelector).forEach((e) => e.remove());
      this.getElement().querySelector(this.listParentSelector).append(template);
      return template;
    }
  };

  // src/dpr/components/_inputs/granular-date-range/clientClass.mjs
  var GranularDateRangeInput = class extends DprClientClass {
    static getModuleName() {
      return "granular-date-range-input";
    }
    initialise() {
      this.filter = this.getElement();
      this.fieldName = this.filter.getAttribute("data-field-name");
      const idPrefix = `filters.${this.fieldName}`;
      this.quickFiltersInput = this.filter.querySelector(`select[name='${idPrefix}.quick-filter']`);
      this.granularityInput = this.filter.querySelector(`select[name='${idPrefix}.granularity']`);
      this.startInput = this.filter.querySelector(`input[name='${idPrefix}.start']`);
      this.endInput = this.filter.querySelector(`input[name='${idPrefix}.end']`);
      this.initStartEndInputChangetEvent();
      this.initGranularityChangeEvent();
      this.initQuickFilterChangeEvent();
    }
    initGranularityChangeEvent() {
      this.granularityInput.addEventListener("change", (e) => {
        this.resetQuickFilters();
      });
    }
    initQuickFilterChangeEvent() {
      this.quickFiltersInput.addEventListener("change", (e) => {
        this.updateStartEndValues(e.target.value);
      });
    }
    initStartEndInputChangetEvent() {
      this.startInput.addEventListener("change", (e) => {
        this.resetQuickFilters();
      });
      this.endInput.addEventListener("change", (e) => {
        this.resetQuickFilters();
      });
    }
    setGranularityValue(value) {
      this.granularityInput.value = value;
    }
    setStartValue(value) {
      this.startInput.value = value;
    }
    setEndValue(value) {
      this.endInput.value = value;
    }
    resetQuickFilters() {
      this.quickFiltersInput.value = "none";
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set(this.quickFiltersInput.id, "none");
      window.history.replaceState(null, null, `?${queryParams.toString()}`);
    }
    updateStartEndValues(quickFilterValue) {
      let startDate;
      let endDate;
      let granularity;
      switch (quickFilterValue) {
        case "today":
          endDate = dayjs();
          startDate = dayjs();
          granularity = "daily";
          break;
        case "yesterday":
          endDate = dayjs().subtract(1, "day");
          startDate = dayjs().subtract(1, "day");
          granularity = "daily";
          break;
        case "last-seven-days":
          endDate = dayjs();
          startDate = endDate.subtract(7, "day").add(1, "day");
          granularity = "daily";
          break;
        case "last-thirty-days":
          endDate = dayjs();
          startDate = endDate.subtract(30, "day").add(1, "day");
          granularity = "daily";
          break;
        case "last-month":
          endDate = dayjs();
          startDate = endDate.subtract(1, "month").add(1, "day");
          granularity = "monthly";
          break;
        case "last-full-month":
          endDate = dayjs().subtract(1, "month").endOf("month");
          startDate = endDate.startOf("month");
          granularity = "monthly";
          break;
        case "last-ninety-days":
          endDate = dayjs();
          startDate = endDate.subtract(90, "day").add(1, "day");
          granularity = "daily";
          break;
        case "last-three-months":
          endDate = dayjs();
          startDate = endDate.subtract(3, "month").add(1, "day");
          granularity = "monthly";
          break;
        case "last-full-three-months":
          endDate = dayjs().subtract(1, "month").endOf("month");
          startDate = endDate.subtract(2, "month").startOf("month");
          granularity = "monthly";
          break;
        case "last-six-months":
          endDate = dayjs();
          startDate = endDate.subtract(6, "month").add(1, "day");
          granularity = "monthly";
          break;
        case "last-full-six-months":
          endDate = dayjs().subtract(1, "month").endOf("month");
          startDate = endDate.subtract(6, "month").startOf("month");
          granularity = "monthly";
          break;
        case "last-year":
          endDate = dayjs();
          startDate = endDate.subtract(1, "year").add(1, "day");
          granularity = "annually";
          break;
        case "last-full-year":
          endDate = dayjs().subtract(1, "year").endOf("year");
          startDate = endDate.startOf("year");
          granularity = "annually";
          break;
        case "tomorrow":
          endDate = dayjs().add(1, "day");
          startDate = dayjs().add(1, "day");
          granularity = "daily";
          break;
        case "next-seven-days":
          startDate = dayjs();
          endDate = dayjs().add(7, "day").subtract(1, "day");
          granularity = "daily";
          break;
        case "next-thirty-days":
          startDate = dayjs();
          endDate = dayjs().add(30, "day").subtract(1, "day");
          granularity = "daily";
          break;
        case "next-month":
          startDate = dayjs();
          endDate = dayjs().add(1, "month").subtract(1, "day");
          granularity = "monthly";
          break;
        case "next-full-month":
          startDate = dayjs().add(1, "month").startOf("month");
          endDate = startDate.endOf("month");
          granularity = "monthly";
          break;
        case "next-ninety-days":
          startDate = dayjs();
          endDate = dayjs().add(90, "day").subtract(1, "day");
          granularity = "daily";
          break;
        case "next-three-months":
          startDate = dayjs();
          endDate = dayjs().add(3, "month").subtract(1, "day");
          granularity = "monthly";
          break;
        case "next-full-three-months":
          startDate = dayjs().add(1, "month").startOf("month");
          endDate = startDate.add(2, "month").endOf("month");
          granularity = "monthly";
          break;
        case "next-year":
          startDate = dayjs();
          endDate = dayjs().add(1, "year").subtract(1, "day");
          granularity = "annually";
          break;
        case "next-full-year":
          startDate = dayjs().add(1, "year").startOf("year");
          endDate = startDate.endOf("year");
          granularity = "annually";
          break;
        default:
          break;
      }
      this.setStartValue(startDate.format("DD/MM/YYYY").toString());
      this.setEndValue(endDate.format("DD/MM/YYYY").toString());
      this.setGranularityValue(granularity);
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set(this.granularityInput.id, granularity);
      queryParams.set(this.startInput.id, startDate.format("YYYY/MM/DD").toString());
      queryParams.set(this.endInput.id, endDate.format("YYYY/MM/DD").toString());
      window.history.replaceState(null, null, `?${queryParams.toString()}`);
    }
  };

  // src/dpr/components/user-reports/requested/clientClass.mjs
  var DprAsyncRequestList = class extends DprPollingStatusClass {
    static getModuleName() {
      return "async-request-list";
    }
    initialise() {
      this.END_STATUSES = this.getEndStatuses();
      this.EXPIRED_END_STATUSES = this.getExpiredCheckStatuses();
      this.POLLING_FREQUENCY = this.getPollingFrquency();
      this.requestList = document.getElementById("dpr-async-request-component");
      this.requestData = this.requestList.getAttribute("data-request-data");
      this.csrfToken = this.requestList.getAttribute("data-csrf-token");
      this.removeActions = document.querySelectorAll(".dpr-remove-requested-report-button");
      this.initItemActions();
      this.initPollingIntervals();
    }
    initPollingIntervals() {
      return __async(this, null, function* () {
        yield this.checkIfExpired();
        if (this.requestData) {
          if (this.shouldPollExpired(this.requestData)) {
            this.expiredInterval = setInterval(() => __async(this, null, function* () {
              yield this.checkIfExpired();
            }), "60000");
          }
          if (this.shouldPollStatus(this.requestData)) {
            this.pollingInterval = setInterval(() => __async(this, null, function* () {
              yield this.pollStatus();
            }), this.POLLING_FREQUENCY);
          }
        }
      });
    }
    checkIfExpired() {
      return __async(this, null, function* () {
        yield Promise.all(
          JSON.parse(this.requestData).map((metaData) => __async(this, null, function* () {
            if (!this.EXPIRED_END_STATUSES.includes(metaData.status)) {
              const response = yield this.getExpiredStatus("/dpr/getRequestedExpiredStatus/", metaData, this.csrfToken);
              if (response && response.isExpired) {
                clearInterval(this.expiredInterval);
                window.location.reload();
              }
            }
          }))
        );
      });
    }
    pollStatus() {
      return __async(this, null, function* () {
        yield Promise.all(
          JSON.parse(this.requestData).map((metaData) => __async(this, null, function* () {
            if (!this.END_STATUSES.includes(metaData.status)) {
              const response = yield this.getRequestStatus(metaData, this.csrfToken);
              if (this.END_STATUSES.includes(response.status)) {
                clearInterval(this.pollingInterval);
                window.location.reload();
              }
            }
          }))
        );
      });
    }
    initItemActions() {
      this.removeActions.forEach((button) => {
        const id = button.getAttribute("data-execution-id");
        button.addEventListener("click", (e) => __async(this, null, function* () {
          e.preventDefault();
          yield this.removeItemFromList(id);
        }));
      });
    }
    removeItemFromList(executionId) {
      return __async(this, null, function* () {
        let response;
        yield fetch("/dpr/removeRequestedItem/", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": this.csrfToken
          },
          body: JSON.stringify({
            executionId
          })
        }).then(() => {
          window.location.reload();
        }).catch((error) => console.error("Error:", error));
        return response;
      });
    }
  };

  // src/dpr/components/user-reports/viewed/clientClass.mjs
  var DprRecentlyViewedList = class extends DprPollingStatusClass {
    static getModuleName() {
      return "recently-viewed-list";
    }
    initialise() {
      this.EXPIRED_END_STATUSES = this.getExpiredCheckStatuses();
      this.POLLING_FREQUENCY = "60000";
      this.viewedList = document.getElementById("dpr-recently-viewed-component");
      this.viewedReportData = this.viewedList.getAttribute("data-request-data");
      this.csrfToken = this.viewedList.getAttribute("data-csrf-token");
      this.removeActions = document.querySelectorAll(".dpr-remove-viewed-report-button");
      this.initItemActions();
      this.initPollingIntervals();
    }
    initPollingIntervals() {
      return __async(this, null, function* () {
        yield this.checkIsExpired();
        if (this.viewedReportData && this.shouldPollExpired(this.viewedReportData)) {
          this.expiredViewedInterval = setInterval(() => __async(this, null, function* () {
            yield this.checkIsExpired();
          }), this.POLLING_FREQUENCY);
        }
      });
    }
    checkIsExpired() {
      return __async(this, null, function* () {
        yield Promise.all(
          JSON.parse(this.viewedReportData).map((metaData) => __async(this, null, function* () {
            if (metaData.status !== "EXPIRED") {
              const response = yield this.getExpiredStatus("/dpr/getExpiredStatus/", metaData, this.csrfToken);
              if (response && response.isExpired) {
                window.location.reload();
                clearInterval(this.expiredViewedInterval);
              }
            }
          }))
        );
      });
    }
    initItemActions() {
      this.removeActions.forEach((button) => {
        const id = button.getAttribute("data-execution-id");
        button.addEventListener("click", (e) => __async(this, null, function* () {
          e.preventDefault();
          yield this.removeItemFromList(id);
        }));
      });
    }
    removeItemFromList(executionId) {
      return __async(this, null, function* () {
        let response;
        yield fetch("/dpr/removeViewedItem/", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": this.csrfToken
          },
          body: JSON.stringify({
            executionId
          })
        }).then(() => {
          window.location.reload();
        }).catch((error) => console.error("Error:", error));
        return response;
      });
    }
  };

  // src/dpr/components/_charts/chart/clientClass.mjs
  var ChartVisualisation = class extends DprClientClass {
    setupCanvas() {
      this.chartContext = this.getElement().querySelector("canvas");
      this.id = this.chartContext.getAttribute("id");
      this.chartParams = JSON.parse(this.getElement().getAttribute("data-dpr-chart-data"));
      this.type = this.getElement().getAttribute("data-dpr-chart-type");
      this.setValueSuffix();
      this.legend = this.getElement().querySelector(`#js-legend-${this.id}`);
      this.tooltipDetailsEl = document.getElementById(`dpr-${this.id}-tooltip-details`);
      this.headlineValuesEl = document.getElementById(`dpr-${this.id}-headline-values`);
      this.labelElement = document.getElementById(`dpr-${this.id}-label`);
      this.valueElement = document.getElementById(`dpr-${this.id}-value`);
      this.legendElement = document.getElementById(`dpr-${this.id}-legend`);
      this.legendElement = document.getElementById(`dpr-${this.id}-legend`);
      this.timeseries = this.getElement().getAttribute("data-dpr-chart-timeseries");
      if (this.timeseries || this.type === "line") {
        this.daterangeInputs = document.querySelectorAll(".dpr-granular-date-range");
        if (this.daterangeInputs && this.daterangeInputs.length) {
          this.daterangeInputs.forEach((input) => {
            this.partialStart = input.getAttribute("data-partial-start") === "true";
            this.partialEnd = input.getAttribute("data-partial-end") === "true";
          });
        } else {
          this.partialStart = false;
          this.partialEnd = false;
        }
      }
      this.singleDataset = this.chartParams.datasets.length === 1;
    }
    initChart() {
      Chart.defaults.font.family = "GDS Transport";
      Chart.register(ChartDataLabels);
      Chart.defaults.font.size = 12;
      this.chart = new Chart(this.chartContext, this.chartData);
      this.initChartEvents();
    }
    // Accessible colours from the MoJ Pattern Library
    getColourPallette() {
      return [
        {
          name: "blue",
          hex: "#5694ca"
        },
        {
          name: "purple",
          hex: "#912b88"
        },
        {
          name: "green",
          hex: "#00703c"
        },
        {
          name: "dark_blue",
          hex: "#003078"
        },
        {
          name: "orange",
          hex: "#f47738"
        },
        {
          name: "orange",
          hex: "#28a197"
        }
      ];
    }
    mapHexColourToName(hex, ctx) {
      const pallette = ctx.getColourPallette();
      const colour = pallette.find((p) => {
        return p.hex === hex;
      });
      return colour ? colour.name : "";
    }
    createDatasets(datasets, styling) {
      return datasets.map((d, i) => {
        const { label, data } = d;
        const s = styling[i % 6] ? styling[i % 6] : styling[0];
        return __spreadValues({
          label,
          data
        }, s);
      });
    }
    generateChartData(settings) {
      const { datasets, labels } = this.chartParams;
      const { options, styling, datalabels, plugins, pluginsOptions, toolTipOptions, hoverEvent } = settings;
      return {
        type: this.type,
        data: {
          labels,
          datasets: this.createDatasets(datasets, styling)
        },
        options: __spreadProps(__spreadValues(__spreadValues({
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0
          },
          hover: {
            animationDuration: 0
          }
        }, options && options), hoverEvent && hoverEvent), {
          plugins: __spreadProps(__spreadValues(__spreadValues({
            legend: {
              position: "bottom"
            }
          }, pluginsOptions && pluginsOptions), datalabels && { datalabels }), {
            tooltip: __spreadValues(__spreadValues({}, this.setToolTip()), toolTipOptions && toolTipOptions)
          })
        }),
        plugins: plugins && plugins.length ? [...plugins] : []
      };
    }
    setToolTip() {
      return {
        backgroundColor: "#FFF",
        bodyColor: "#000",
        titleFont: {
          size: 16
        },
        bodyFont: {
          size: 16
        },
        titleColor: "#000",
        displayColors: false,
        borderWidth: 1,
        borderColor: "#b1b4b6",
        cornerRadius: 0,
        padding: 20,
        footerFont: {
          weight: "bold"
        },
        animation: {
          duration: 0
        }
      };
    }
    setHoverValue({ label, value, legend, ctx }) {
      if (ctx.tooltipDetailsEl) {
        ctx.tooltipDetailsEl.style.display = "block";
        ctx.labelElement.innerHTML = ctx.singleDataset ? `${label}` : `${legend}: ${label}`;
        ctx.valueElement.innerHTML = `${value}`;
      }
      if (ctx.headlineValuesEl) {
        ctx.headlineValuesEl.style.display = "none";
      }
      if (!legend) {
        ctx.legendElement.style.display = "none";
      }
    }
    setValueSuffix() {
      this.unit = this.getElement().getAttribute("data-dpr-chart-unit");
      this.suffix = this.unit === "percentage" ? "%" : "";
    }
    isPercentage() {
      return this.unit === "percentage";
    }
    initChartEvents() {
      this.chart.canvas.addEventListener("mouseout", (e) => {
        if (this.tooltipDetailsEl) this.tooltipDetailsEl.style.display = "none";
        if (this.headlineValuesEl) this.headlineValuesEl.style.display = "block";
      });
    }
  };

  // src/dpr/components/_charts/chart/bar/clientClass.mjs
  var BarChartVisualisation = class extends ChartVisualisation {
    static getModuleName() {
      return "bar-chart";
    }
    initialise() {
      this.setupCanvas();
      this.settings = this.initSettings();
      this.chartData = this.generateChartData(this.settings);
      this.initChart(this.chartData);
    }
    initSettings() {
      return {
        options: this.setOptions(),
        toolTipOptions: this.setToolTipOptions(),
        datalabels: this.setDataLabels(),
        styling: this.setDatasetStyling()
      };
    }
    setDatasetStyling() {
      const pallette = this.getColourPallette();
      return pallette.map((colour) => {
        return __spreadProps(__spreadValues({
          borderColor: colour.hex
        }, this.setBackgroundColour(colour.hex)), {
          datalabels: {
            align: "center",
            anchor: "center"
          }
        });
      });
    }
    setBackgroundColour(colour) {
      const lastIndex = this.chartParams.labels.length - 1;
      const backgroundColors = [];
      const borderWidths = [];
      const borderColors = [];
      this.chartParams.labels.forEach((label, i) => {
        if (this.partialEnd && i === lastIndex || this.partialStart && i === 0) {
          backgroundColors.push(colour);
          borderWidths.push(3);
          borderColors.push("#b1b4b6");
        } else {
          backgroundColors.push(colour);
          borderWidths.push(0);
          borderColors.push(colour);
        }
      });
      return {
        backgroundColor: backgroundColors,
        borderWidth: borderWidths,
        borderColor: borderColors
      };
    }
    setToolTipOptions() {
      const ctx = this;
      return {
        callbacks: {
          title(context) {
            const { label, dataset } = context[0];
            const { label: establishmentId } = dataset;
            const title = ctx.singleDataset ? `${label}` : `${establishmentId}: ${label}`;
            return title;
          },
          label(context) {
            const { label } = context;
            const { data, label: legend } = context.dataset;
            const value = `${data[context.dataIndex]}${ctx.suffix}`;
            ctx.setHoverValue({ label, value, legend, ctx });
            return value;
          }
        }
      };
    }
    setOptions() {
      const { indexAxis, stacked } = this.chartParams;
      return __spreadValues({
        indexAxis: indexAxis || "x"
      }, stacked && {
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      });
    }
    setDataLabels() {
      return {
        color: "#FFF",
        display: () => {
          return !this.timeseries;
        },
        formatter: (value) => {
          return `${value}${this.suffix}`;
        },
        labels: {
          title: {
            font: {
              weight: "bold",
              size: 16,
              color: "#FFF"
            }
          }
        }
      };
    }
  };

  // src/dpr/components/_charts/chart/doughnut/clientClass.mjs
  var DoughnutChartVisualisation = class extends ChartVisualisation {
    static getModuleName() {
      return "doughnut-chart";
    }
    initialise() {
      this.setupCanvas();
      this.settings = this.initSettings();
      this.chartData = this.generateChartData(this.settings);
      this.initChart(this.chartData);
    }
    initSettings() {
      return {
        options: this.setOptions(),
        styling: this.setDatasetStyling(),
        datalabels: this.setDataLabels(),
        pluginsOptions: this.setPluginsOptions(),
        toolTipOptions: this.setToolTipOptions(),
        plugins: this.setPlugins()
      };
    }
    setDatasetStyling() {
      const pallette = this.getColourPallette();
      const backgroundColor = pallette.map((p) => p.hex);
      return [
        {
          backgroundColor: [...backgroundColor, ...backgroundColor],
          hoverOffset: 4,
          datalabels: {
            anchor: "center",
            borderWidth: 0
          }
        }
      ];
    }
    setOptions() {
      const cutoutValue = this.chartParams.datasets.length === 1 ? "50%" : "20%";
      return {
        cutout: cutoutValue
      };
    }
    setPluginsOptions() {
      return {
        legend: {
          display: true,
          position: "bottom"
        }
      };
    }
    setPlugins() {
      const plugins = [];
      if (this.chartParams.datasets.length === 1 && !this.isPercentage) {
        plugins.push(this.setCentralText());
      }
      return plugins;
    }
    setCentralText() {
      return {
        // Put the total in the center of the donut
        id: "text",
        beforeDraw(chart) {
          const { width } = chart;
          const { height } = chart;
          const { ctx } = chart;
          ctx.textBaseline = "middle";
          let fontSize = 2.5;
          ctx.font = `100 ${fontSize}em GDS Transport`;
          ctx.fillStyle = "	#505a5f";
          const total = chart.data.datasets[0].data.reduce((a, c) => a + c, 0);
          const text = total;
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
          ctx.textBaseline = "middle";
          fontSize = 1;
          ctx.font = `100 ${fontSize}em GDS Transport`;
          ctx.fillStyle = "	#505a5f";
          const title = "Total";
          const titleX = Math.round((width - ctx.measureText(title).width) / 2);
          const titleY = textY + 30;
          ctx.fillText(title, titleX, titleY);
          ctx.save();
        }
      };
    }
    setLegend() {
      const classContext = this;
      const { legend, suffix } = this;
      return {
        id: "legend",
        beforeInit(chart) {
          const ul = document.createElement("ul");
          const { labels } = chart.data;
          const { backgroundColor, data } = chart.data.datasets[0];
          labels.forEach((label, i) => {
            const colourIndex = i % backgroundColor.length;
            const colour = backgroundColor[colourIndex];
            const colourName = classContext.mapHexColourToName(colour, classContext);
            const value = chart.data.datasets.length === 1 ? `${data[i]}${suffix}` : "";
            ul.innerHTML += `
              <li aria-label="${label} ${value}">
                <span class="chart-colour__${colourName}">${value}</span>
                ${label}
              </li>
            `;
          });
          legend.appendChild(ul);
          return legend.appendChild(ul);
        }
      };
    }
    setToolTipOptions() {
      const ctx = this;
      return {
        callbacks: {
          title(context) {
            const { label, dataset } = context[0];
            const { label: establishmentId } = dataset;
            const title = ctx.singleDataset ? `${label}` : `${establishmentId}: ${label}`;
            return title;
          },
          label(context) {
            const { label, parsed: value, dataset } = context;
            const { label: legend } = dataset;
            const dataArr = dataset.data;
            let toolipValue = `${value}${ctx.suffix}`;
            if (!ctx.isPercentage) {
              const val = dataArr.reduce((sum, d) => sum + Number(d), 0);
              const percentage = `${(value * 100 / val).toFixed(2)}%`;
              toolipValue = ctx.singleDataset ? `${toolipValue} (${percentage})` : `${legend}: ${toolipValue} (${percentage})`;
              ctx.setHoverValue({ label, value: toolipValue, legend, ctx });
            } else {
              toolipValue = `${toolipValue}`;
              ctx.setHoverValue({ label, value: toolipValue, legend, ctx });
            }
            return toolipValue;
          }
        }
      };
    }
    setDataLabels() {
      const ctx = this;
      return {
        textAlign: "center",
        color: "#FFF",
        display: (context) => {
          const { dataset, dataIndex } = context;
          const value = dataset.data[dataIndex];
          const total = dataset.data.reduce((a, c) => a + c, 0);
          const percentage = value / total * 100;
          return percentage > 4;
        },
        formatter: (value, context) => {
          const { dataset } = context;
          const label = ctx.singleDataset ? `${value}${this.suffix}` : `${value}${this.suffix}
${dataset.label}`;
          return label;
        },
        labels: {
          title: {
            font: {
              weight: "bold",
              size: 16,
              color: "#FFF"
            }
          }
        }
      };
    }
  };

  // src/dpr/components/_charts/chart/line/clientClass.mjs
  var LineChartVisualisation = class extends ChartVisualisation {
    static getModuleName() {
      return "line-chart";
    }
    initialise() {
      this.setupCanvas();
      this.settings = this.initSettings();
      this.chartData = this.generateChartData(this.settings);
      this.lastIndex = this.chartData.data.labels.length - 1;
      this.initChart(this.chartData);
    }
    initSettings() {
      return {
        options: this.setOptions(),
        toolTipOptions: this.setToolTipOptions(),
        styling: this.setDatasetStyling()
      };
    }
    setPartialStyle(ctx) {
      let style;
      if (this.partialEnd && ctx.p1DataIndex === this.lastIndex || this.partialStart && ctx.p1DataIndex === 1) {
        style = [6, 6];
      }
      return style;
    }
    setDatasetStyling() {
      const pallette = this.getColourPallette();
      return pallette.map((colour) => {
        return {
          borderColor: colour.hex,
          backgroundColor: colour.hex,
          pointStyle: "circle",
          pointRadius: 4,
          pointHoverRadius: 10,
          pointHitRadius: 20,
          datalabels: {
            display: false
          },
          segment: {
            borderDash: (ctx) => this.setPartialStyle(ctx)
          }
        };
      });
    }
    setToolTipOptions() {
      const ctx = this;
      return {
        callbacks: {
          title(context) {
            const { label, dataset } = context[0];
            const { label: establishmentId } = dataset;
            const title = ctx.singleDataset ? `${label}` : `${establishmentId}: ${label}`;
            return title;
          },
          label(context) {
            const { label } = context;
            const { data, label: legend } = context.dataset;
            const value = data[context.dataIndex];
            ctx.setHoverValue({ label, value, legend, ctx });
            return value;
          }
        }
      };
    }
    setOptions() {
      return {
        scales: {
          y: {
            min: 0,
            ticks: {
              fontSize: 12
            }
          },
          x: {
            ticks: {
              fontSize: 12
            }
          }
        }
      };
    }
  };

  // src/dpr/components/_dashboards/scorecard/clientClass.mjs
  var Pagination2 = class extends DprClientClass {
    static getModuleName() {
      return "scorecard";
    }
    initialise() {
      this.scorecard = this.getElement();
      this.value = this.scorecard.querySelector(".dpr-scorecard__value");
      this.ragStatus = this.scorecard.querySelector(".dpr-scorecard__value-description");
      this.initHover();
    }
    initHover() {
      this.value.addEventListener("mouseover", () => __async(this, null, function* () {
        this.ragStatus.classList.add("dpr-scorecard__value-description--active");
      }));
      this.value.addEventListener("mouseout", () => __async(this, null, function* () {
        this.ragStatus.classList.remove("dpr-scorecard__value-description--active");
      }));
    }
  };

  // src/dpr/all.mjs
  function initAll() {
    const loadingHelper = new DprLoadingHelper();
    const components = [
      Autocomplete,
      CardGroup,
      Columns,
      AsyncFilters2,
      InteractiveFilters,
      Pagination,
      DataTable,
      DprAsyncPolling,
      DprCatalogueSearch,
      BookmarkToggle,
      DateInput,
      DprAsyncRequestList,
      DprRecentlyViewedList,
      DateRangeInput,
      ShowMore,
      BarChartVisualisation,
      DoughnutChartVisualisation,
      LineChartVisualisation,
      AsyncFilters,
      Pagination2,
      IconButtonList,
      DownloadMessage,
      DprSyncLoading,
      GranularDateRangeInput
    ];
    const customParseFormat = window.dayjs_plugin_customParseFormat;
    dayjs.extend(customParseFormat);
    components.forEach((Component) => {
      const $elements = document.querySelectorAll(`[data-dpr-module="${Component.getModuleName()}"]`);
      $elements.forEach(($element) => __async(null, null, function* () {
        try {
          new Component($element, loadingHelper).initialise();
        } catch (error) {
          console.log(error);
        }
      }));
    });
  }
})();
//# sourceMappingURL=bundle.mjs.map
