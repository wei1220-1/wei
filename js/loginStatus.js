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

// 登入表單（用戶輸入名稱）
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // 假設你有一個 loginName 欄位讓用戶輸入名稱（可改為登入 email 無影響 UI 顯示）
    const nameInput = document.getElementById('loginEmail');
    const name = nameInput ? nameInput.value.trim().split('@')[0] : '使用者';

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);

    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModal) loginModal.hide();

    updateUserUI(true, name);
    alert("登入成功！");
  });
}

// 註冊表單使用註冊名稱登入
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('registerName');
    const name = nameInput ? nameInput.value.trim() : '使用者';

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);

    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (registerModal) registerModal.hide();

    updateUserUI(true, name);
    alert("註冊成功並已登入！");
  });
}
