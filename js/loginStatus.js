function updateUserUI(isLoggedIn, name = '') {
  const userMenu = document.getElementById('userMenu');
  const userDropdown = document.getElementById('userDropdown');

  if (!userMenu || !userDropdown) return;

  if (isLoggedIn) {
    userDropdown.innerHTML = `<span class="fw-bold">${name.charAt(0)}</span>`;
    userMenu.innerHTML = '<li><a class="dropdown-item" href="#" id="logoutBtn">登出</a></li>';
    bindLogout();
  } else {
    userDropdown.innerHTML = '<i class="bi bi-person-circle" style="font-size: 1.5rem;"></i>';
    userMenu.innerHTML = `
      <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">登入</a></li>
      <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">註冊</a></li>
    `;
  }
}

function bindLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      updateUserUI(false);
      alert("登出成功！");
    });
  }
}

window.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const name = localStorage.getItem('userName') || '';
  updateUserUI(isLoggedIn, name);
});
