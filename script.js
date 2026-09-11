document.addEventListener("DOMContentLoaded", () => {
  const archive = document.querySelector(".archive");
  const visual = document.querySelector(".archive-right");
  const nextButton = document.querySelector(".theme-next");
  const categoryLinks = document.querySelectorAll(".category-list a");

  if (!archive || !visual) return;

  /* Add future project modes here using the same four values. */
  const themes = {
    makeup: {
      background: "#F9F9F9",
      color: "#050505",
      visualBackground: "#F9F9F9",
      image: "images/glow-up/glow-up-cover.webp?v=20260904-1",
      href: "glow-up.html",
      label: "GLOW UP 추구미 이미지 프로젝트 보기"
    },
    "makeup-thumbnails": {
      background: "#F9F9F9",
      color: "#050505",
      visualBackground: "#000000",
      image: "images/makeup-thumbnails/makeup-cover.webp?v=20260904-1",
      href: "makeup-thumbnails.html",
      label: "GLOW UP 메이크업 썸네일 프로젝트 보기"
    },
    "space-disasters": {
      background: "#E5D7B6",
      color: "#415389",
      visualBackground: "#130A1B",
      image: "images/space/space-cover.webp",
      href: "space-disasters.html",
      label: "우주의 재난재해 프로젝트 보기"
    },
    sheer: {
      background: "#556C6D",
      color: "#EAEEEF",
      visualBackground: "#EAEEEF",
      image: "images/sheer/sheer-cover.webp",
      href: "sheer.html",
      label: "Sheer 프로젝트 보기"
    },
    theia: {
      background: "#D4F9FF",
      color: "#021D29",
      visualBackground: "#021D29",
      image: "images/theia/theia_cover.webp",
      href: "theia.html",
      label: "THEIA 프로젝트 보기"
    },
    nexus: {
      background: "#54192A",
      color: "#F4FCFF",
      visualBackground: "#F4FCFF",
      image: "images/nexus/nexus_cover.webp",
      href: "nexus.html",
      label: "NEXUS 프로젝트 보기"
    },
    hanacard: {
      background: "#ECE8E3",
      color: "#070B17",
      visualBackground: "#070B17",
      image: "images/hanacard/hanacard-cover.webp",
      href: "hanacard.html",
      label: "하나카드 Plate 디자인 프로젝트 보기"
    }
  };

  const themeOrder = ["space-disasters", "makeup", "makeup-thumbnails", "theia", "sheer", "hanacard", "nexus"];
  let currentThemeIndex = 0;
  const mobile = matchMedia('(max-width: 767px)');
  const thumbnails = {
    makeup: 'images/glow-up/glow-up-thumb.webp?v=20260904-1',
    'makeup-thumbnails': 'images/makeup-thumbnails/makeup-thumb.webp?v=20260904-1',
    'space-disasters': 'images/space/space-thumb.webp',
    sheer: 'images/sheer/sheer-thumb.webp',
    theia: 'images/theia/theia-thumb.webp',
    nexus: 'images/nexus/nexus_thumb.webp',
    hanacard: 'images/hanacard/hanacard-thumb.webp?v=20260904-3'
  };
  Object.values(thumbnails).forEach(src => { const img = new Image(); img.src = src; });

  Object.values(themes).forEach((theme) => {
    const image = new Image();
    image.src = theme.image;
  });

  const applyTheme = (themeName) => {
    const theme = themes[themeName];
    if (!theme) return;

    archive.style.setProperty("--archive-background", theme.background);
    archive.style.setProperty("--archive-color", theme.color);
    archive.style.setProperty("--archive-visual-background", theme.visualBackground);
    const source = mobile.matches ? thumbnails[themeName] : theme.image;
    visual.style.backgroundImage = `url("${source}")`;
    visual.setAttribute("aria-label", theme.label);

    if (theme.href) {
      visual.href = theme.href;
      visual.removeAttribute("aria-disabled");
    } else {
      visual.removeAttribute("href");
      visual.setAttribute("aria-disabled", "true");
    }
    document.body.dataset.theme = themeName;
    currentThemeIndex = themeOrder.indexOf(themeName);
  };

  applyTheme(document.body.dataset.theme);
  mobile.addEventListener('change', () => applyTheme(document.body.dataset.theme));

  categoryLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      applyTheme(link.dataset.theme);
    });
    link.addEventListener("click", (event) => {
      if (link.getAttribute("href") === "#") event.preventDefault();
      applyTheme(link.dataset.theme);
    });
  });

  nextButton?.addEventListener("click", () => {
    currentThemeIndex = (currentThemeIndex + 1) % themeOrder.length;
    applyTheme(themeOrder[currentThemeIndex]);
  });

  visual.addEventListener("click", (event) => {
    if (visual.getAttribute("aria-disabled") === "true") event.preventDefault();
  });
});
