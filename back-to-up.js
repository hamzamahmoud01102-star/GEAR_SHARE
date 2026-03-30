const backToTopBtn = document.getElementById('back-to-top');

    function toggleButton() {
      if (window.scrollY > 400) {        
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'   
      });
    });

    window.addEventListener('scroll', toggleButton);

    toggleButton();
