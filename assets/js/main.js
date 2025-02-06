const scrollToTopBtn = document.getElementById('scrollToTop');
    
// Tampilkan button ketika scroll lebih dari 300px
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
    }
});

// Scroll to top dengan animasi smooth ketika button diklik
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

 // Inisialisasi AOS
 AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Ambil nilai input
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validasi sederhana
        if (!name || !email || !message) {
            alert('Mohon isi semua field yang diperlukan');
            return;
        }

        // Simulasi pengiriman form
        alert('Terima kasih! Pesan Anda telah terkirim.');
        contactForm.reset();
    });
}

// Animasi hover untuk product cards
const productCards = document.querySelectorAll('.group');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.querySelector('img').style.transform = 'scale(1.1)';
    });

    card.addEventListener('mouseleave', function () {
        this.querySelector('img').style.transform = 'scale(1)';
    });
});

// Sticky header dengan perubahan style saat scroll
const header = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('bg-white/95', 'backdrop-blur-sm');
        header.classList.remove('bg-white/80');
    } else {
        header.classList.remove('bg-white/95', 'backdrop-blur-sm');
        header.classList.add('bg-white/80');
    }
});

// Newsletter subscription handler
const newsletterForm = document.querySelector('footer input[type="email"]');
const newsletterButton = newsletterForm?.nextElementSibling;

if (newsletterButton) {
    newsletterButton.addEventListener('click', function () {
        const email = newsletterForm.value;
        if (!email) {
            alert('Mohon masukkan alamat email Anda');
            return;
        }

        alert('Terima kasih telah berlangganan newsletter kami!');
        newsletterForm.value = '';
    });
}

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
      });
  });

  // Enhanced scroll behavior for navbar
  const navbar = document.querySelector('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add/remove background blur and shadow based on scroll position
      if (currentScroll > 0) {
          navbar.classList.add('backdrop-blur-sm', 'bg-white/90');
          navbar.classList.remove('bg-white');
      } else {
          navbar.classList.remove('backdrop-blur-sm', 'bg-white/90');
          navbar.classList.add('bg-white');
      }

      // Hide/show navbar based on scroll direction
      if (currentScroll > lastScroll && currentScroll > 100) {
          navbar.style.transform = 'translateY(-100%)';
      } else {
          navbar.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
  });