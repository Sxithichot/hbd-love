const pages = document.querySelectorAll('.page');
let currentPage = 0;
let noClickCount = 0;

function showPage(index) {
  pages.forEach((p, i) => p.classList.toggle('hidden', i !== index));
  currentPage = index;
}

function showPageById(pageId) {
  pages.forEach(p => p.classList.add('hidden'));
  const el = document.getElementById(pageId);
  if (!el) return;

  el.classList.remove('hidden');

  const idx = [...pages].findIndex(p => p.id === pageId);
  if (idx >= 0) currentPage = idx;
}

function goToNextPage() {
  showPage(currentPage + 1);
}

function selectAnswer(answer) {
  if (answer === 'yes') {
    goToNextPage(); // page1 -> page2
  } else {
    noClickCount++;
    const yesBtn = document.getElementById('yesButton');
    if (yesBtn) yesBtn.style.transform = `scale(${1 + noClickCount * 0.05})`;

    if (noClickCount < 4) {
      showPopup('Are you sure? 😢');
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

function checkDate() {
  const day = document.getElementById('day')?.value;
  const month = document.getElementById('month')?.value;
  const year = document.getElementById('year')?.value;
  const errorMsg = document.getElementById('error-message');

  const correctDay = "14";
  const correctMonth = "6";
  const correctYear = "2025";

  if (day === correctDay && month === correctMonth && year === correctYear) {
    if (errorMsg) errorMsg.textContent = "";
    showPageById('page3'); // เข้า Reasons
  } else {
    if (errorMsg) errorMsg.textContent = "ตอบผิดน้า ลองอีกครั้งนะคะ 🥺💔";
  }
}

/* ===== Page 3: Reasons ===== */
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

    if (nextBtn) {
      if (revealed === total) {
        nextBtn.disabled = false;
        nextBtn.classList.add("enabled");
        nextBtn.style.cursor = "pointer";
      } else {
        nextBtn.disabled = true;
        nextBtn.classList.remove("enabled");
        nextBtn.style.cursor = "not-allowed";
      }
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

window.onload = () => {
  showPage(0);

  // ใส่วัน/ปี
  const daySelect = document.getElementById('day');
  const yearSelect = document.getElementById('year');

  if (daySelect && daySelect.options.length <= 1) {
    for (let i = 1; i <= 31; i++) {
      daySelect.innerHTML += `<option value="${i}">${i}</option>`;
    }
  }

  if (yearSelect && yearSelect.options.length <= 1) {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 2000; y--) {
      yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
    }
  }

  initReasonsPage();
};
function finishFinal(){
  showPopup("สุขสันต์วันเกิดนะ 💖");
}
