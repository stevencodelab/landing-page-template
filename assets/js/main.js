 // Initialize AOS animation
 AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  // Mobile menu functionality
  function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const menuContent = menu.querySelector('div');
    
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      setTimeout(() => {
        menuContent.classList.remove('-translate-x-full');
      }, 10);
    } else {
      menuContent.classList.add('-translate-x-full');
      setTimeout(() => {
        menu.classList.add('hidden');
      }, 300);
    }
  }


  function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Close modal when clicking outside the image
  document.getElementById('imageModal').addEventListener('click', function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

  // Close modal with escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });