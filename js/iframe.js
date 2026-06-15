const embedParams = new URLSearchParams(window.location.search);

if (embedParams.get("embed") === "true") {
  document.documentElement.setAttribute("data-embed", "true");
}

if (embedParams.get("embed") === "true" && embedParams.get("scrollbar") !== "visible") {
  document.documentElement.setAttribute("data-embed-scrollbar", "hidden");
}

const previewToggleButton = document.querySelector('[aria-controls="slide-one-preview"]');
const slideOnePreview = document.querySelector("#slide-one-preview");
const previewIframe = slideOnePreview ? slideOnePreview.querySelector("iframe") : null;
const previewSrcHiddenScrollbar = "https://miawski.github.io/T06_presentation/?embed=true&scrollbar=hidden";
const previewSrcVisibleScrollbar = "https://miawski.github.io/T06_presentation/?embed=true&scrollbar=visible";

function setPreviewScrollbarMode(previewIsExpanded) {
  if (!previewIframe) {
    return;
  }

  if (previewIsExpanded) {
    previewIframe.removeAttribute("scrolling");
    previewIframe.setAttribute("src", previewSrcVisibleScrollbar);
  } else {
    previewIframe.setAttribute("scrolling", "no");
    previewIframe.setAttribute("src", previewSrcHiddenScrollbar);
  }
}

function collapsePreview(shouldFocusButton = false) {
  if (!previewToggleButton || !slideOnePreview) {
    return;
  }

  slideOnePreview.removeAttribute("data-expanded");
  previewToggleButton.setAttribute("aria-expanded", "false");
  previewToggleButton.setAttribute("aria-label", "Udvid preview");
  previewToggleButton.textContent = "";
  setPreviewScrollbarMode(false);

  if (shouldFocusButton) {
    previewToggleButton.focus();
  }
}

function expandPreview() {
  if (!previewToggleButton || !slideOnePreview) {
    return;
  }

  slideOnePreview.setAttribute("data-expanded", "true");
  previewToggleButton.setAttribute("aria-expanded", "true");
  previewToggleButton.setAttribute("aria-label", "Luk preview");
  previewToggleButton.textContent = "";
  setPreviewScrollbarMode(true);
}

if (previewToggleButton && slideOnePreview) {
  setPreviewScrollbarMode(false);

  slideOnePreview.addEventListener("click", () => {
    if (!slideOnePreview.hasAttribute("data-expanded")) {
      expandPreview();
    }
  });

  previewToggleButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const previewIsExpanded = previewToggleButton.getAttribute("aria-expanded") === "true";

    if (previewIsExpanded) {
      collapsePreview();
    } else {
      expandPreview();
    }
  });

  document.addEventListener("click", (event) => {
    if (!slideOnePreview.hasAttribute("data-expanded")) {
      return;
    }

    if (event.target === previewToggleButton || previewToggleButton.contains(event.target)) {
      return;
    }

    if (slideOnePreview.contains(event.target)) {
      return;
    }

    if (event.target.closest("#slide-one-preview iframe")) {
      return;
    }

    collapsePreview();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && slideOnePreview.hasAttribute("data-expanded")) {
      collapsePreview(true);
    }
  });
}
