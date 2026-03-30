const btn = document.getElementById('theme-toggle');
    const body = document.body;

    function updateButton() {
      const isDark = body.classList.contains('dark');
      btn.textContent = isDark ? '☀️' : '🌙 ';
    }
    btn.addEventListener('click', () => {
      if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      updateButton();
    });
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.remove('dark');
      body.classList.add('light');
    } else {
      body.classList.add('dark');
    }
    updateButton();
