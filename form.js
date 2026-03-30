const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      clearErrors();

      let isValid = true;

      const name = document.getElementById('name').value.trim();
      if (name === '') {
        showError('nameError', 'Please enter your full name');
        isValid = false;
      } else if (name.length < 3) {
        showError('nameError', 'Name must be at least 3 characters');
        isValid = false;
      }

      const email = document.getElementById('email').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
        showError('emailError', 'Please enter your email address');
        isValid = false;
      } else if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
      }
      const subject = document.getElementById('subject').value.trim();
      if (subject === '') {
        showError('subjectError', 'Please enter a subject');
        isValid = false;
      } else if (subject.length < 5) {
        showError('subjectError', 'Subject must be at least 5 characters');
        isValid = false;
      }

      const message = document.getElementById('message').value.trim();
      if (message === '') {
        showError('messageError', 'Please write your message');
        isValid = false;
      } else if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
        submitBtn.disabled = true;

        setTimeout(() => {
          alert('✅ Message sent successfully!\nWe will contact you soon.');
          
          form.reset();
          
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });

    function showError(errorId, message) {
      const errorElement = document.getElementById(errorId);
      errorElement.textContent = message;
    }

    function clearErrors() {
      document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
      });
    }