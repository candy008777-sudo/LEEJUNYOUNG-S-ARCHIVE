document.addEventListener("DOMContentLoaded", () => {
  const categories = [
    "boho_traveler",
    "brat_girl",
    "classic_american",
    "clean_girl",
    "cowboy_core",
    "eclectic_grandpa",
    "glamoratti",
    "granola_girl",
    "grunge_revival",
    "librarian_core",
    "minimal_chic",
    "mob_wife",
    "model_off_duty",
    "sporty_street_girl",
    "street_military"
  ];

  const scrollArea = document.querySelector(".glow-scroll");
  const label = document.querySelector(".glow-category");
  const counter = document.querySelector(".glow-counter span");
  const cards = [...document.querySelectorAll(".glow-card")];
  const images = cards.map((card) => card.querySelector("img"));
  let activeIndex = -1;
  let ticking = false;

  const imagePath = (category, position) =>
    `images/glow-up/${category}/${category}_${position + 1}.webp`;

  const preloadCategory = (index) => {
    const category = categories[index];
    if (!category) return;
    for (let position = 0; position < 5; position += 1) {
      const preload = new Image();
      preload.src = imagePath(category, position);
    }
  };

  const showCategory = (index) => {
    const nextIndex = Math.max(0, Math.min(categories.length - 1, index));
    if (nextIndex === activeIndex) return;

    activeIndex = nextIndex;
    const category = categories[activeIndex];
    label.textContent = category.replaceAll("_", " ");
    counter.textContent = String(activeIndex + 1).padStart(2, "0");

    images.forEach((image, position) => {
      image.src = imagePath(category, position);
      image.alt = `${category.replaceAll("_", " ")} 이미지 ${position + 1}`;
    });

    preloadCategory(activeIndex + 1);
  };

  const updateFromScroll = () => {
    const rect = scrollArea.getBoundingClientRect();
    const availableScroll = scrollArea.offsetHeight - window.innerHeight;
    const progress = availableScroll > 0
      ? Math.max(0, Math.min(0.9999, -rect.top / availableScroll))
      : 0;
    showCategory(Math.floor(progress * categories.length));
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateFromScroll);
  }, { passive: true });

  window.addEventListener("resize", updateFromScroll);
  preloadCategory(0);
  preloadCategory(1);
  updateFromScroll();
});
