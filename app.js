/**
  Sadhana B Portfolio - Interactive Behaviors
  Replicating premium website UI/UX behaviors (Floating navigation, IDE widget switcher, reveals, 3D card tilt, scroll exit-reveals)
*/

document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation link observer & active highlights
  initNavigation();

  // Initialize mouse card glow positioning
  initCardGlowEffects();

  // Initialize mock IDE switcher (sadhana.ts vs api.ts)
  initIdeSwitcher();

  // Initialize scroll reveal visibility observers
  initScrollReveals();

  // Initialize 3D Card Tilt Effect (Aceternity UI replica)
  init3dCards();

  // Initialize CTA Banner 3D Tilt & Parallax effect
  initCtaTilt();

  // Initialize Contact Form Card 3D Tilt & Parallax effect
  initContactFormTilt();

  // Initialize Hero Scroll Parallax (Smooth divide exit/entrance)
  initHeroScrollParallax();

  // Initialize About Scroll Parallax (Smooth exit divide + blur/scale effect)
  initAboutScrollParallax();

  // Initialize Timeline Scroll Reveal Animations (3D + Progress Track)
  initTimelineScrollAnimation();

  // Initialize Project Scroll Reveal Zoom-in Animations
  initProjectScrollAnimation();

  // Initialize Project Details Modal for non-subpage Case Studies
  initProjectModal();

  // Initialize form validation & submit simulator
  initContactForm();
});

/* ==========================================
   1. Active Navigation States & Scroll Effects
   ========================================== */
function initNavigation() {
  const nav = document.querySelector('.header-nav');
  if (!nav) return;
  const navLinks = document.querySelectorAll('.nav-link-item a');
  const sections = document.querySelectorAll('section[id], header[id]');

  let lastScrollY = window.scrollY;

  // Add active state to nav links based on viewport scroll position
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Smart navbar hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      // Scrolling down - hide navbar
      nav.classList.add('nav-hidden');
    } else {
      // Scrolling up - show navbar
      nav.classList.remove('nav-hidden');
    }
    
    lastScrollY = currentScrollY;

    // Nav floating background visibility adjustment
    if (currentScrollY > 100) {
      nav.style.background = 'rgba(13, 15, 20, 0.9)';
      nav.style.boxShadow = '0 15px 40px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(109, 52, 228, 0.15)';
    } else {
      nav.style.background = 'rgba(13, 15, 20, 0.75)';
      nav.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (currentScrollY >= sectionTop - 280) {
        currentSection = section.getAttribute('id');
      }
    });

    // Special mapping to group related sections under the remaining links
    let mappedSection = currentSection;
    if (currentSection === 'tech-stack') {
      mappedSection = 'about';
    } else if (currentSection === 'experience') {
      mappedSection = 'projects';
    }

    navLinks.forEach(link => {
      link.parentElement.classList.remove('active');
      const href = link.getAttribute('href');
      // Handle page routing checks (if on Home page index.html with #anchors)
      if (href && (href === `#${mappedSection}` || href.endsWith(`#${mappedSection}`))) {
        link.parentElement.classList.add('active');
      }
    });
  });
}

/* ==========================================
   2. Glassmorphism Card Hover Spotlights
   ========================================== */
function initCardGlowEffects() {
  const cards = document.querySelectorAll('.premium-card-face, footer, .cta-banner-wrapper, .contact-form-side');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================
   3. Mock IDE Code Switcher Widget
   ========================================== */
const mockCodeSnippets = {
  sadhana: `
<span class="code-kw">const</span> <span class="code-var">developer</span> = {
  <span class="code-prop">name</span>: <span class="code-str">"Sadhana B"</span>,
  <span class="code-prop">role</span>: <span class="code-str">"MERN Stack Developer"</span>,
  <span class="code-prop">location</span>: <span class="code-str">"India"</span>,
  <span class="code-prop">passionate</span>: <span class="code-kw">true</span>,
  <span class="code-prop">skills</span>: [
    <span class="code-str">"React"</span>, <span class="code-str">"Node"</span>, <span class="code-str">"Express"</span>, 
    <span class="code-str">"MongoDB"</span>, <span class="code-str">"TypeScript"</span>, <span class="code-str">"Tailwind"</span>
  ],
  <span class="code-prop">openToWork</span>: <span class="code-kw">true</span>,
  <span class="code-prop">activeSeeker</span>: <span class="code-kw">true</span>
};

<span class="code-comment">// Ready to engineer next-gen products</span>
<span class="code-var">console</span>.<span class="code-fn">log</span>(<span class="code-str">"Let's build something amazing!"</span>);
  `.trim(),

  api: `
<span class="code-kw">import</span> { <span class="code-var">res</span> } <span class="code-kw">from</span> <span class="code-str">"hono"</span>;

<span class="code-kw">export async function</span> <span class="code-fn">POST</span>(<span class="code-var">req</span>: <span class="code-type">Request</span>) {
  <span class="code-kw">const</span> { <span class="code-var">company</span>, <span class="code-var">role</span> } = <span class="code-kw">await</span> <span class="code-var">req</span>.<span class="code-fn">json</span>();
  
  <span class="code-kw">if</span> (<span class="code-var">role</span> === <span class="code-str">"Software Engineer"</span>) {
    <span class="code-kw">return</span> <span class="code-var">res</span>.<span class="code-fn">json</span>({
      <span class="code-prop">status</span>: <span class="code-str">"interview_scheduled"</span>,
      <span class="code-prop">message</span>: <span class="code-str">"Let's chat! Email sent to sadhana.bala.cs@gmail.com"</span>
    });
  }
  
  <span class="code-kw">return</span> <span class="code-var">res</span>.<span class="code-fn">json</span>({ <span class="code-prop">status</span>: <span class="code-str">"received"</span> });
}
  `.trim()
};

let typingTimeout = null;
let loopTimeout = null;

function initIdeSwitcher() {
  const tabs = document.querySelectorAll('.ide-tab');
  const dots = document.querySelectorAll('.ide-switch-dot');
  const editor = document.querySelector('.mock-ide-editor code');
  const languageLabel = document.querySelector('.ide-lang-indicator');

  // Recursively wrap text characters in spans to preserve syntax highlighting tags
  function wrapTextCharacters(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const parent = node.parentNode;
      const fragment = document.createDocumentFragment();
      
      for (let char of text) {
        const span = document.createElement('span');
        span.className = 'typewriter-char';
        span.style.opacity = '0';
        span.style.transition = 'opacity 0.05s ease';
        span.textContent = char;
        fragment.appendChild(span);
      }
      
      parent.replaceChild(fragment, node);
    } else {
      const children = Array.from(node.childNodes);
      children.forEach(child => wrapTextCharacters(child));
    }
  }

  function selectTab(tabName, isAuto = false) {
    // Clear any active timeouts to prevent overlapping sequences
    clearTimeout(typingTimeout);
    clearTimeout(loopTimeout);

    // Update tabs active styling
    tabs.forEach(tab => {
      if (tab.getAttribute('data-file') === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update switcher indicator dots
    dots.forEach(dot => {
      if (dot.getAttribute('data-target') === tabName) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    const editorPre = document.querySelector('.mock-ide-editor');
    const archDiv = document.querySelector('.mock-ide-architecture');

    // Smooth transition: fade out active element
    const activeEl = tabName === 'architecture' ? editorPre : archDiv;
    const targetEl = tabName === 'architecture' ? archDiv : editorPre;

    if (activeEl) {
      activeEl.classList.add('mock-ide-content-hidden');
    }

    // Wait for fade-out transition, then swap elements
    setTimeout(() => {
      if (tabName === 'architecture') {
        if (editorPre) editorPre.style.display = 'none';
        if (archDiv) {
          archDiv.style.display = 'flex';
          archDiv.classList.add('mock-ide-content-hidden');
          // Trigger entry transition in next frame
          setTimeout(() => {
            archDiv.classList.remove('mock-ide-content-hidden');
          }, 50);
        }
        if (languageLabel) languageLabel.textContent = 'Architecture Visualizer';

        // If auto-cycling is active, switch back to sadhana.ts after 8 seconds
        if (isAuto) {
          loopTimeout = setTimeout(() => {
            selectTab('sadhana', true);
          }, 8000);
        }
      } else {
        if (archDiv) archDiv.style.display = 'none';
        if (editorPre) {
          editorPre.style.display = 'block';
          editorPre.classList.add('mock-ide-content-hidden');
          setTimeout(() => {
            editorPre.classList.remove('mock-ide-content-hidden');
          }, 50);
        }
        if (languageLabel) languageLabel.textContent = 'TypeScript';

        const codeSnippet = mockCodeSnippets[tabName];
        if (codeSnippet && editor) {
          // Create a temporary element to parse and wrap html elements
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = codeSnippet;
          wrapTextCharacters(tempDiv);
          
          // Inject wrapped nodes and show
          editor.innerHTML = tempDiv.innerHTML;
          editor.style.opacity = '1';
          
          const chars = editor.querySelectorAll('.typewriter-char');
          let index = 0;
          
          const startTyping = () => {
            chars.forEach(c => c.style.opacity = '0');
            index = 0;
            
            function type() {
              if (index < chars.length) {
                chars[index].style.opacity = '1';
                index++;
                typingTimeout = setTimeout(type, 12); // Snappy character speed
              } else {
                // Finished typing! Wait 4.5 seconds, then transition to architecture visualizer automatically
                loopTimeout = setTimeout(() => {
                  selectTab('architecture', true);
                }, 4500);
              }
            }
            
            type();
          };
          
          startTyping();
        }
      }
    }, 250);
  }

  // Bind tabs click (User clicks manually stop the auto loop)
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const file = tab.getAttribute('data-file');
      selectTab(file, false);
    });
  });

  // Bind dots click (User clicks manually stop the auto loop)
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = dot.getAttribute('data-target');
      selectTab(target, false);
    });
  });

  // Start typewriter typing automatically on page load with auto loop enabled
  selectTab('sadhana', true);
}

/* ==========================================
   4. Intersection Observer Scroll Reveals
   ========================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      } else {
        entry.target.classList.remove('reveal-visible');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================
   5. Interactive 3D Card Tilt Effect
   ========================================== */
function init3dCards() {
  const cards = document.querySelectorAll('.project-premium-card');

  cards.forEach(card => {
    const cardInner = card;
    cardInner.style.transformStyle = 'preserve-3d';
    cardInner.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease';

    // Target child elements to move in 3D relative space
    const imageBox = cardInner.querySelector('.project-card-image-box');
    const title = cardInner.querySelector('.project-title');
    const desc = cardInner.querySelector('.project-description');
    const techTags = cardInner.querySelector('.project-tech-icons-row');
    const footer = cardInner.querySelector('.project-card-footer');

    // Add translateZ styling triggers
    const subElements = [imageBox, title, desc, techTags, footer];
    subElements.forEach(el => {
      if (el) {
        el.style.transform = 'translateZ(0px)';
        el.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
    });

    cardInner.addEventListener('mousemove', (e) => {
      const rect = cardInner.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max tilt angle (degrees)
      const maxTilt = 12;
      const rotateX = ((centerY - y) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Translate children elements in Z depth axis
      if (imageBox) imageBox.style.transform = 'translateZ(30px)';
      if (title) title.style.transform = 'translateZ(20px)';
      if (desc) desc.style.transform = 'translateZ(25px)';
      if (techTags) techTags.style.transform = 'translateZ(45px)';
      if (footer) footer.style.transform = 'translateZ(35px)';
    });

    cardInner.addEventListener('mouseleave', () => {
      // Smooth reset back to normal
      cardInner.style.transform = 'rotateX(0deg) rotateY(0deg)';
      
      subElements.forEach(el => {
        if (el) el.style.transform = 'translateZ(0px)';
      });
    });
  });
}

/* ==========================================
   5.5. Interactive 3D Tilt Effect on CTA Banner
   ========================================== */
function initCtaTilt() {
  const ctaCard = document.querySelector('.cta-banner-wrapper');
  if (!ctaCard) return;

  const tagline = ctaCard.querySelector('.cta-tagline');
  const title = ctaCard.querySelector('.cta-banner-title');
  const desc = ctaCard.querySelector('.cta-banner-desc');
  const button = ctaCard.querySelector('#cta-contact-btn');

  const subElements = [tagline, title, desc, button];
  subElements.forEach(el => {
    if (el) {
      el.style.transform = 'translateZ(0px)';
      el.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
  });

  ctaCard.addEventListener('mousemove', (e) => {
    const rect = ctaCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt angle (degrees) - subtle 3D tilt
    const maxTilt = 4;
    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    ctaCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Translate children elements in Z depth axis
    if (tagline) tagline.style.transform = 'translateZ(20px)';
    if (title) title.style.transform = 'translateZ(35px)';
    if (desc) desc.style.transform = 'translateZ(25px)';
    if (button) button.style.transform = 'translateZ(45px)';
  });

  ctaCard.addEventListener('mouseleave', () => {
    // Smooth reset back to normal
    ctaCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    
    subElements.forEach(el => {
      if (el) el.style.transform = 'translateZ(0px)';
    });
  });
}

/* ==========================================
   5.8. Interactive 3D Tilt Effect on Contact Form Card
   ========================================== */
function initContactFormTilt() {
  const card = document.querySelector('.contact-form-side');
  if (!card) return;

  const inputs = card.querySelector('.form-inputs-group');
  const button = card.querySelector('.btn-contact-submit');

  const subElements = [inputs, button];
  subElements.forEach(el => {
    if (el) {
      el.style.transform = 'translateZ(0px)';
      el.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
  });

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt angle for usability while typing
    const maxTilt = 2.5;
    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    if (inputs) inputs.style.transform = 'translateZ(15px)';
    if (button) button.style.transform = 'translateZ(30px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    subElements.forEach(el => {
      if (el) el.style.transform = 'translateZ(0px)';
    });
  });
}

/* ==========================================
   6. Hero Scroll Parallax (Smooth divide on scroll down & back up)
   ========================================== */
function initHeroScrollParallax() {
  const heroLeft = document.querySelector('.hero-reveal-left');
  const heroRight = document.querySelector('.hero-reveal-right');
  const heroSection = document.getElementById('home');

  if (!heroLeft || !heroRight || !heroSection) return;

  // Clean up animations when they finish so they don't override JS inline styles
  const handleAnimationEnd = (el) => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(0px)';
    el.style.animation = 'none';
  };

  heroLeft.addEventListener('animationend', () => handleAnimationEnd(heroLeft));
  heroRight.addEventListener('animationend', () => handleAnimationEnd(heroRight));

  window.addEventListener('scroll', () => {
    // ── MOBILE: disable parallax ──
    if (window.innerWidth < 992) {
      return; // Do nothing, let CSS animations play naturally
    }

    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight || 600;

    // If user scrolled before animation finished, force animation to end/clear
    if (heroLeft.style.animation !== 'none') {
      heroLeft.style.animation = 'none';
      heroRight.style.animation = 'none';
    }

    if (scrollY === 0) {
      // Reset back to original visible positions
      heroLeft.style.transform = 'translateX(0px)';
      heroLeft.style.opacity = '1';
      heroRight.style.transform = 'translateX(0px)';
      heroRight.style.opacity = '1';
      return;
    }

    if (scrollY <= heroHeight + 100) {
      const percentage = scrollY / heroHeight;
      const translateAmount = percentage * 120; // Slide distance (120px)
      const opacityAmount = 1 - (percentage * 1.4); // Fade out slightly quicker

      // Move left content to the left & fade out
      heroLeft.style.transform = `translateX(${-translateAmount}px)`;
      heroLeft.style.opacity = Math.max(0, opacityAmount).toString();

      // Move right content to the right & fade out
      heroRight.style.transform = `translateX(${translateAmount}px)`;
      heroRight.style.opacity = Math.max(0, opacityAmount).toString();
    } else {
      // Ensure elements are fully invisible and translated when scrolled past
      heroLeft.style.transform = `translateX(-120px)`;
      heroLeft.style.opacity = '0';
      heroRight.style.transform = `translateX(120px)`;
      heroRight.style.opacity = '0';
    }
  });
}

/* ==========================================
   6.5. About Section Scroll Parallax (Premium exit divide + blur/scale effect)
   ========================================== */
function initAboutScrollParallax() {
  const aboutLeft = document.querySelector('.about-intro-col');
  const aboutRight = document.querySelector('.bento-resume-container');
  const aboutSection = document.getElementById('about');

  if (!aboutLeft || !aboutRight || !aboutSection) return;

  window.addEventListener('scroll', () => {
    // ── MOBILE: disable parallax completely ──
    // On mobile (< 992px), the blur+translateX causes blurry cards and overflow
    if (window.innerWidth < 992) {
      return; // Do nothing, let CSS IntersectionObserver handle reveal animations
    }

    const scrollY = window.scrollY;
    const sectionTop = aboutSection.offsetTop;
    const sectionHeight = aboutSection.clientHeight;
    
    // We start the divide animation when the section starts exiting the viewport at the top
    const startScroll = sectionTop - 100;
    const endScroll = sectionTop + sectionHeight;

    if (scrollY < startScroll) {
      // Normal state: fully visible, no transform, scale, or blur overrides
      aboutLeft.style.transform = '';
      aboutLeft.style.opacity = '';
      aboutLeft.style.filter = '';
      
      aboutRight.style.transform = '';
      aboutRight.style.opacity = '';
      aboutRight.style.filter = '';
    } else if (scrollY >= startScroll && scrollY <= endScroll) {
      const range = endScroll - startScroll;
      const progress = (scrollY - startScroll) / range; // 0 to 1

      const translateAmount = progress * 150; // Slide distance (150px)
      const scaleAmount = 1 - (progress * 0.08); // Scale down slightly (to 0.92)
      const opacityAmount = 1 - (progress * 1.5); // Fade out slightly quicker than full scroll
      const blurAmount = progress * 8; // Blur up to 8px

      // Move left column to the left, scale down, blur, and fade out
      aboutLeft.style.transform = `translateX(${-translateAmount}px) scale(${scaleAmount})`;
      aboutLeft.style.opacity = Math.max(0, opacityAmount).toString();
      aboutLeft.style.filter = `blur(${Math.min(8, blurAmount)}px)`;

      // Move right column to the right, scale down, blur, and fade out
      aboutRight.style.transform = `translateX(${translateAmount}px) scale(${scaleAmount})`;
      aboutRight.style.opacity = Math.max(0, opacityAmount).toString();
      aboutRight.style.filter = `blur(${Math.min(8, blurAmount)}px)`;
    } else {
      // Scrolled fully past the section
      aboutLeft.style.transform = 'translateX(-150px) scale(0.92)';
      aboutLeft.style.opacity = '0';
      aboutLeft.style.filter = 'blur(8px)';
      
      aboutRight.style.transform = 'translateX(150px) scale(0.92)';
      aboutRight.style.opacity = '0';
      aboutRight.style.filter = 'blur(8px)';
    }
  });
}


/* ==========================================
   6.8. Timeline Scroll Animation (3D Reveal Cards + Glowing Track Progress)
   ========================================== */
function initTimelineScrollAnimation() {
  const cards = document.querySelectorAll('.timeline-card');
  const lists = document.querySelectorAll('.timeline-list');

  if (cards.length === 0 || lists.length === 0) return;

  // Create progress bar overlay for each timeline track if they don't exist yet
  lists.forEach(list => {
    if (!list.querySelector('.timeline-progress-bar')) {
      const progressBar = document.createElement('div');
      progressBar.className = 'timeline-progress-bar';
      progressBar.style.position = 'absolute';
      progressBar.style.top = '0.5rem';
      progressBar.style.left = '0.75rem';
      progressBar.style.width = '2px';
      progressBar.style.height = '0%';
      progressBar.style.background = 'var(--accent-gradient)';
      progressBar.style.transform = 'translateX(-50%)';
      progressBar.style.transition = 'height 0.1s ease-out';
      progressBar.style.boxShadow = '0 0 8px #895AF5, 0 0 15px rgba(137, 90, 245, 0.5)';
      progressBar.style.zIndex = '2';
      list.appendChild(progressBar);
    }
  });

  const handleTimelineScroll = () => {
    const windowHeight = window.innerHeight;

    // 1. Update timeline progress bar height
    lists.forEach(list => {
      const rect = list.getBoundingClientRect();
      const progressBar = list.querySelector('.timeline-progress-bar');
      if (!progressBar) return;

      const listHeight = rect.height;
      const entryPoint = windowHeight - 120;
      const scrollInElement = entryPoint - rect.top;
      
      let progress = 0;
      if (scrollInElement > 0) {
        progress = Math.min(1, scrollInElement / listHeight);
      }
      progressBar.style.height = `${progress * 100}%`;
    });

    // 2. Animate timeline cards with a smooth 3D fade/scale reveal
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardTop = rect.top;
      const entryThreshold = windowHeight - 80;
      const revealZone = 250; // Distance in px over which the transition unfolds

      if (cardTop > entryThreshold) {
        // Below the reveal line: fully hidden/3D rotated
        card.style.transform = 'rotateX(10deg) translateY(30px) scale(0.96)';
        card.style.opacity = '0';
        card.style.filter = 'blur(4px)';
        card.classList.remove('revealed');
      } else if (cardTop <= entryThreshold && cardTop > entryThreshold - revealZone) {
        // In the transition zone
        const delta = entryThreshold - cardTop;
        const progress = delta / revealZone; // 0 to 1

        const rotateXVal = 10 * (1 - progress);
        const translateYVal = 30 * (1 - progress);
        const scaleVal = 0.96 + (0.04 * progress);
        const blurVal = 4 * (1 - progress);

        card.style.transform = `rotateX(${rotateXVal}deg) translateY(${translateYVal}px) scale(${scaleVal})`;
        card.style.opacity = progress.toString();
        card.style.filter = `blur(${blurVal}px)`;
        card.classList.remove('revealed');
      } else {
        // Fully revealed: clear inline styling to allow CSS hover translation to work
        card.style.transform = '';
        card.style.opacity = '1';
        card.style.filter = 'none';
        card.classList.add('revealed');
      }
    });
  };

  // Run once initially to style already-visible elements on load
  handleTimelineScroll();
  window.addEventListener('scroll', handleTimelineScroll);
}

/* ==========================================
   6.9. Project Scroll Zoom-in Animation
   ========================================== */
function initProjectScrollAnimation() {
  const wrappers = document.querySelectorAll('.project-card-perspective-wrapper');
  if (wrappers.length === 0) return;

  const handleProjectScroll = () => {
    const windowHeight = window.innerHeight;

    wrappers.forEach(wrapper => {
      const rect = wrapper.getBoundingClientRect();
      const cardTop = rect.top;
      // Triggers when card enters bottom section of screen
      const entryThreshold = windowHeight - 60;
      const revealZone = 260; // Progress range for scaling transition

      if (cardTop > entryThreshold) {
        // Below viewport
        wrapper.style.transform = 'scale(0.85) translateY(45px)';
        wrapper.style.opacity = '0';
        wrapper.style.filter = 'blur(4px)';
      } else if (cardTop <= entryThreshold && cardTop > entryThreshold - revealZone) {
        // Transitioning / Zooming in
        const delta = entryThreshold - cardTop;
        const progress = delta / revealZone; // 0 to 1

        const scaleVal = 0.85 + (0.15 * progress);
        const translateYVal = 45 * (1 - progress);
        const blurVal = 4 * (1 - progress);

        wrapper.style.transform = `scale(${scaleVal}) translateY(${translateYVal}px)`;
        wrapper.style.opacity = progress.toString();
        wrapper.style.filter = `blur(${blurVal}px)`;
      } else {
        // Fully revealed: clear inline styling to let 3D hovers function
        wrapper.style.transform = '';
        wrapper.style.opacity = '1';
        wrapper.style.filter = 'none';
      }
    });
  };

  handleProjectScroll();
  window.addEventListener('scroll', handleProjectScroll);
}

/* ==========================================
   6.9.5. Project Details Modal Logic
   ========================================== */
const projectDetailsData = {
  studynotion: {
    title: "StudyNotion EdTech",
    type: "EdTech Platform",
    desc: "StudyNotion is a fully functional, production-ready EdTech platform designed for online learning. It enables instructors to create, edit, and organize course tracks, video lessons, and curriculum details. Students can browse catalogs, enroll in courses, track progress, rate lessons, and manage their profiles.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Redux", "Razorpay"],
    github: "https://github.com/balasadhana",
    live: "https://github.com/balasadhana"
  },
  truewhisper: {
    title: "True Whisper",
    type: "Messaging Hub",
    desc: "True Whisper is an anonymous feedback and messaging platform. Users can create a personal profile URL, share it across social networks to collect honest, candid feedback, and view incoming messages inside a secure dashboard with full privacy protection.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "NextAuth.js", "React Hook Form"],
    github: "https://github.com/balasadhana",
    live: "https://github.com/balasadhana"
  },
  blogify: {
    title: "Blogify Portal",
    type: "Blogging Portal",
    desc: "Blogify is a responsive blogging platform built for developers and writers. It features full Markdown writing support, instant previews, category/tag aggregations, a reading-time estimator, and an administrative dashboard to draft, edit, publish, or delete posts.",
    tech: ["React", "Hono.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Cloudflare Workers"],
    github: "https://github.com/balasadhana",
    live: "https://github.com/balasadhana"
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-detail-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.project-modal-close-btn');
  const contentBody = modal.querySelector('.project-modal-content-body');
  const triggerBtns = document.querySelectorAll('.trigger-modal-btn');

  const openModal = (projectKey) => {
    const data = projectDetailsData[projectKey];
    if (!data) return;

    // Generate inner HTML content for the modal dynamically
    let tagsHtml = data.tech.map(t => `<span class="project-tag-badge" style="margin-right: 0.5rem; margin-bottom: 0.5rem; display: inline-block;">${t}</span>`).join('');
    
    contentBody.innerHTML = `
      <h2 class="modal-project-title">${data.title}</h2>
      <div class="modal-project-type">${data.type}</div>
      <p class="modal-project-desc">${data.desc}</p>
      
      <div class="modal-project-section-title">Tech Stack</div>
      <div class="modal-project-tags">${tagsHtml}</div>
      
      <div class="modal-project-ctas">
        <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 0.75rem 1.5rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.375rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          View Source
        </a>
        <a href="${data.live}" target="_blank" rel="noopener" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.375rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          Live Demo
        </a>
      </div>
    `;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const closeModal = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scrolling
  };

  // Bind trigger buttons
  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      openModal(projectKey);
    });
  });

  // Bind close button
  closeBtn.addEventListener('click', closeModal);

  // Bind click outside modal container to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Bind Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

/* ==========================================
   7. Form Validation & Simulation
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const successOverlay = document.querySelector('.form-success-card-overlay');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Full Name is required.');
      isFormValid = false;
    } else {
      hideError(nameInput);
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email Address is required.');
      isFormValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, 'Please provide a valid email format.');
      isFormValid = false;
    } else {
      hideError(emailInput);
    }

    // Validate Subject
    if (subjectInput) {
      if (!subjectInput.value.trim()) {
        showError(subjectInput, 'Subject is required.');
        isFormValid = false;
      } else {
        hideError(subjectInput);
      }
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Message content cannot be blank.');
      isFormValid = false;
    } else {
      hideError(messageInput);
    }

    if (isFormValid) {
      const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.btn-contact-submit');
      const originalBtnText = submitBtn.innerHTML;

      // Disable inputs and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending inquiry...`;

      // Send real email via formsubmit.co AJAX API
      fetch("https://formsubmit.co/ajax/balasadhana983@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            _subject: subjectInput ? subjectInput.value.trim() : 'New Contact Inquiry from Portfolio',
            message: messageInput.value.trim()
        })
      })
      .then(response => response.json())
      .then(data => {
        // Log message info in local storage database
        const logPayload = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput ? subjectInput.value.trim() : '',
          message: messageInput.value.trim(),
          submittedAt: new Date().toISOString()
        };
        
        try {
          const logs = JSON.parse(localStorage.getItem('messages_log') || '[]');
          logs.push(logPayload);
          localStorage.setItem('messages_log', JSON.stringify(logs));
        } catch (err) {
          console.warn('Storage log write error: ', err);
        }

        // Show card check screen overlay
        if (successOverlay) {
          successOverlay.classList.add('show');
        }

        // Reset form controls
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Auto close visual success card after 4 seconds
        setTimeout(() => {
          if (successOverlay) {
            successOverlay.classList.remove('show');
          }
        }, 4000);
      })
      .catch(error => {
        console.error("Email sending failed:", error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        alert("Sorry, there was a problem sending your message. Please try again or email directly.");
      });
    }
  });

  // Inputs typings cleaners
  const inputsToTrack = [nameInput, emailInput, messageInput];
  if (subjectInput) inputsToTrack.push(subjectInput);

  inputsToTrack.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        hideError(input);
      }
    });
  });

  function showError(input, message) {
    input.classList.add('invalid');
    const wrapper = input.closest('.form-field-wrapper');
    const errorMsg = wrapper ? wrapper.querySelector('.form-field-error') : null;
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.style.display = 'block';
    }
  }

  function hideError(input) {
    input.classList.remove('invalid');
    const wrapper = input.closest('.form-field-wrapper');
    const errorMsg = wrapper ? wrapper.querySelector('.form-field-error') : null;
    if (errorMsg) {
      errorMsg.style.display = 'none';
    }
  }
}
