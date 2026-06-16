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

const documentationOpenButton = document.querySelector("[data-open-documentation]");
const documentationCloseButton = document.querySelector("[data-close-documentation]");
const slideThreeDocumentation = document.querySelector("#slide-three-documentation");

if (documentationOpenButton && documentationCloseButton && slideThreeDocumentation) {
  documentationOpenButton.addEventListener("click", (event) => {
    event.stopPropagation();
    slideThreeDocumentation.hidden = false;
    documentationOpenButton.setAttribute("aria-expanded", "true");
  });

  documentationCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();
    slideThreeDocumentation.hidden = true;
    documentationOpenButton.setAttribute("aria-expanded", "false");
    documentationOpenButton.focus();
  });

  slideThreeDocumentation.addEventListener("click", (event) => {
    if (event.target === slideThreeDocumentation) {
      slideThreeDocumentation.hidden = true;
      documentationOpenButton.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !slideThreeDocumentation.hidden) {
      slideThreeDocumentation.hidden = true;
      documentationOpenButton.setAttribute("aria-expanded", "false");
      documentationOpenButton.focus();
    }
  });
}

const websiteOpenButton = document.querySelector("[data-open-website]");
const websiteCloseButton = document.querySelector("[data-close-website]");
const slideThreeWebsite = document.querySelector("#slide-three-website");
const slideThreeWebsiteIframe = slideThreeWebsite ? slideThreeWebsite.querySelector("iframe") : null;

function loadSlideThreeWebsite() {
  if (!slideThreeWebsiteIframe) {
    return;
  }

  const websiteSrc = slideThreeWebsiteIframe.dataset.src;

  if (websiteSrc && !slideThreeWebsiteIframe.getAttribute("src")) {
    slideThreeWebsiteIframe.setAttribute("src", websiteSrc);
  }
}

function closeSlideThreeWebsite(shouldFocusButton = false) {
  if (!websiteOpenButton || !slideThreeWebsite) {
    return;
  }

  slideThreeWebsite.hidden = true;
  websiteOpenButton.setAttribute("aria-expanded", "false");

  if (shouldFocusButton) {
    websiteOpenButton.focus();
  }
}

if (websiteOpenButton && websiteCloseButton && slideThreeWebsite) {
  websiteOpenButton.addEventListener("click", (event) => {
    event.stopPropagation();
    loadSlideThreeWebsite();
    slideThreeWebsite.hidden = false;
    websiteOpenButton.setAttribute("aria-expanded", "true");
  });

  websiteCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeSlideThreeWebsite(true);
  });

  slideThreeWebsite.addEventListener("click", (event) => {
    if (event.target === slideThreeWebsite) {
      closeSlideThreeWebsite();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !slideThreeWebsite.hidden) {
      closeSlideThreeWebsite(true);
    }
  });
}
