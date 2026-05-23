document.addEventListener("DOMContentLoaded", () => {
  
  // 1. ANIMATION DE TEXTE DYNAMIQUE (TYPING EFFECT)
  const words = ["Développeuse Web Full-Stack", "Passionnée de Gestion IT", "Créatrice d'Applications Desktop"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const textElement = document.getElementById("changing-text");

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1800; // Pause quand le mot est complet
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause avant le mot suivant
    }

    setTimeout(typeEffect, typeSpeed);
  }
  
  if (textElement) typeEffect();


  // 2. ANIMATION DES BARRES DE COMPÉTENCES AU SCROLL
  const skillBars = document.querySelectorAll(".bar span");
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute("data-width");
        
        bar.style.width = targetWidth;
        bar.style.transition = "width 1.5s cubic-bezier(0.1, 1, 0.1, 1)";
        
        skillsObserver.unobserve(bar); 
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => skillsObserver.observe(bar));


  // 3. MENU DE NAVIGATION ACTIF AU SCROLL
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}` || (link.getAttribute("href") === "#" && !currentSectionId)) {
        link.classList.add("active");
      }
    });
  });

});