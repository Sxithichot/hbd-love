const pages = document.querySelectorAll('.page');
let currentPage = 0;
let noClickCount = 0;

function showPage(index) {
  pages.forEach((p, i) => {
    p.classList.toggle('hidden', i !== index);
  });
  currentPage = index;
}

function selectAnswer(answer) {
  if (answer === 'yes') {
    goToNextPage();
  } else {
    noClickCount++;
    const yesBtn = document.getElementById('yesButton');
    yesBtn.style.transform = `scale(${1 + noClickCount * 0.05})`;

    if (noClickCount < 4) {
      showPopup(`Are you sure? 😢`);
    } else {
      showBigPopup();
    }
  }
}

function showPopup(text) {
  const popup = document.createElement('div');
  popup.textContent = text;
  popup.className = 'popup';
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

function showBigPopup() {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const bigPopup = document.createElement('div');
  bigPopup.className = 'big-popup';
  bigPopup.innerHTML = `YES!! 💖<br><small>(คลิกเพื่อไปต่อ)</small>`;

  overlay.appendChild(bigPopup);
  document.body.appendChild(overlay);

  overlay.onclick = () => {
    overlay.remove();
    goToNextPage();
  };
}

function goToNextPage() {
  showPage(1); // ไปหน้า 2
}

function checkDate() {
  const day = document.getElementById('day').value;
  const month = document.getElementById('month').value;
  const year = document.getElementById('year').value;
  const errorMsg = document.getElementById('error-message');

  const correctDay = "14";
  const correctMonth = "6";
  const correctYear = "2025";

  if (day === correctDay && month === correctMonth && year === correctYear) {
    errorMsg.textContent = "";
    showPage(2); // ไปหน้า 3
  } else {
    errorMsg.textContent = "ตอบผิดน้า ลองอีกครั้งนะคะ 🥺💔";
  }
}

window.onload = () => {
  showPage(0);

  const daySelect = document.getElementById('day');
  const yearSelect = document.getElementById('year');

  for (let i = 1; i <= 31; i++) {
    daySelect.innerHTML += `<option value="${i}">${i}</option>`;
  }

  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 2000; y--) {
    yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
  }

  initReasonsPage();
};

// ===== Page 3: Reasons (กดได้ชัวร์ด้วย event delegation) =====
function initReasonsPage() {
  const list = document.getElementById("reasonsList");
  const bar = document.getElementById("progressBar");
  const text = document.getElementById("progressText");
  const nextBtn = document.getElementById("reasonsNext");
  if (!list) return;

  function updateProgress() {
    const items = [...document.querySelectorAll("#reasonsList .reason-item")];
    const revealed = items.filter(i => i.classList.contains("revealed")).length;
    const total = items.length;

    if (text) text.textContent = `${revealed} / ${total} revealed`;
    if (bar) bar.style.width = `${Math.round((revealed / total) * 100)}%`;

    if (revealed === total) {
      nextBtn.disabled = false;
      nextBtn.classList.add("enabled");
    }
  }

  list.addEventListener("click", (e) => {
    const item = e.target.closest(".reason-item");
    if (!item) return;
    item.classList.toggle("revealed");
    updateProgress();
  });

  updateProgress();
}
