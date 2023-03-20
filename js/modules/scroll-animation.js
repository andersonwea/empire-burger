const initScrollAnimation = () => {
  const sections = document.querySelectorAll('[data-anime^="scroll"]');

  if (sections.length) {
    const halfWindow = window.innerHeight * 0.6;

    const animeScroll = () => {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const isSectionVisible = sectionTop - halfWindow < 0;

        if (isSectionVisible) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
    };
    animeScroll();

    window.addEventListener("scroll", animeScroll);
  }
};

export default initScrollAnimation;
