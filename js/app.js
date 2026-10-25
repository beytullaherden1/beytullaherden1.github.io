/**
 * BEYTULLAH ERDEN — DEEP-TECH PORTFOLIO & WORKSPACE HUB
 * Pure Modular Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  initRoleTyper();
  initProfileToggle();
  initBackToTop();
  initProjectFilters();
  initQualiMaskSimulator();
  initCopyHelpers();
  initContactForm();
});

/* ==========================================================================
   1. Tab Navigation System with URL Hash Sync & Auto-Centering
   ========================================================================== */
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function switchTab(targetId, updateHash = true) {
    // Sanitize targetId
    const cleanId = targetId.replace('#', '');
    const targetPanel = document.getElementById(cleanId);
    const targetBtn = document.querySelector(`.tab-btn[data-target="${cleanId}"]`);

    if (!targetPanel || !targetBtn) return;

    // Update active states
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    targetBtn.classList.add('active');
    targetPanel.classList.add('active');

    // Smoothly center active button in horizontal mobile tab-navbar
    if (targetBtn.scrollIntoView) {
      targetBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    if (updateHash) {
      history.replaceState(null, null, `#${cleanId}`);
    }

    // On mobile, smooth scroll to content area if user clicked nav
    if (window.innerWidth < 1080) {
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        const topOffset = contentArea.getBoundingClientRect().top + window.pageYOffset - 16;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
  }

  // Click listeners for tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      switchTab(targetId);
    });
  });

  // Listeners for in-page link shortcuts (e.g. "İletişime Geç", "Projeleri İncele")
  document.querySelectorAll('[data-switch-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = el.getAttribute('data-switch-tab');
      switchTab(targetId);
    });
  });

  // Check URL hash on page load
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    switchTab(hash, false);
  }
}

/* ==========================================================================
   2. Dynamic Role Typer (Daktilo Efekti)
   ========================================================================== */
function initRoleTyper() {
  const typerElement = document.getElementById('roleTyper');
  if (!typerElement) return;

  const roles = [
    "Backend & Systems Engineer",
    "Deep-Tech AI Founder Candidate",
    "QualiMask & Vigil-AI Architect",
    "Statistical ML & Systems Researcher",
    "Observability & eBPF Kernel Explorer"
  ];

  let currentRoleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 2000;
  const pauseStart = 400;

  function typeTick() {
    const currentRole = roles[currentRoleIdx];

    if (!isDeleting) {
      typerElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === currentRole.length) {
        isDeleting = true;
        setTimeout(typeTick, pauseEnd);
        return;
      }
      setTimeout(typeTick, typeSpeed);
    } else {
      typerElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        isDeleting = false;
        currentRoleIdx = (currentRoleIdx + 1) % roles.length;
        setTimeout(typeTick, pauseStart);
        return;
      }
      setTimeout(typeTick, deleteSpeed);
    }
  }

  typeTick();
}

/* ==========================================================================
   3. Commercial Project Filtering (11 Canlı Sistem)
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.animation = 'panelFadeIn 0.25s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. QualiMask Live Interactive Simulator Desk (Human-in-the-Loop PII Anonymizer)
   ========================================================================== */
function initQualiMaskSimulator() {
  const inputArea = document.getElementById('qualiInput');
  const outputArea = document.getElementById('qualiOutput');
  const entityCountEl = document.getElementById('qualiEntityCount');
  const categoryCountEl = document.getElementById('qualiCategoryCount');
  const sampleAcademicBtn = document.getElementById('sampleAcademic');
  const sampleLegalBtn = document.getElementById('sampleLegal');
  const runMaskBtn = document.getElementById('runMaskBtn');

  if (!inputArea || !outputArea) return;

  const samples = {
    academic: `Mülakat Tarihi: 24 Kasım 2026
Araştırmacı: Prof. Dr. Ayşenur Tekin (Orta Doğu Teknik Üniversitesi)
Katılımcı: Caner Yılmaz (E-posta: caner.yilmaz@isbank.com.tr, Telefon: 0533 111 22 33)
Görüşme Notu: Katılımcı, Boğaziçi Üniversitesi Sosyal Bilimler Enstitüsü bünyesindeki tezinde Türkiye İş Bankası ve ODTÜ teknokent verilerini incelediğini belirtti. Katılımcının TCKN doğrulaması: 44556677889 ve IBAN: TR88 0006 4000 0001 2222 3333 44 üzerinden kayıt altına alındı. Lokasyon: Eskişehir ve Ankara saha çalışması.`,
    
    legal: `Dava Dosyası No: 2026/8412
Tanık: Ahmet Demirtaş (TCKN: 12345678901, Tel: 0544 987 65 43)
İlgili Kurum: Panama Endüstriyel Ltd. Şti. ve EFM Teknoloji A.Ş.
Görüşme Yeri: Isparta Merkez Ofisi.
Tarih: 12 Ekim 2026.
Banka Bilgisi: TR12 0001 5000 0002 9999 8888 77 nolu hesaba aktarım yapıldığı tespit edilmiştir. İletişim: avukat@hukukburosu.com`
  };

  // PII Detection patterns (Turkish format & regex rules)
  const piiRules = [
    {
      type: 'TCKN',
      badge: 'TCKN',
      regex: /\b\d{11}\b/g,
      format: (match, idx) => `[TCKN: ${idx}]`
    },
    {
      type: 'IBAN',
      badge: 'IBAN',
      regex: /TR\d{2}\s?(?:\d{4}\s?){5}\d{2}/gi,
      format: (match, idx) => `[IBAN: ${idx}]`
    },
    {
      type: 'TELEFON',
      badge: 'TELEFON',
      regex: /(?:\+?90\s?)?(?:0\s?)?5\d{2}[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}/g,
      format: (match, idx) => `[TELEFON: ${idx}]`
    },
    {
      type: 'E-POSTA',
      badge: 'E-POSTA',
      regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      format: (match, idx) => `[E-POSTA: ${idx}]`
    },
    {
      type: 'TARİH',
      badge: 'TARİH',
      regex: /\b\d{1,2}\s(?:Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylül|Ekim|Kasım|Aralık)\s\d{4}\b/gi,
      format: (match, idx) => `[TARİH: ${idx}]`
    },
    {
      type: 'KURUM',
      badge: 'KURUM',
      regex: /\b(?:Orta Doğu Teknik Üniversitesi|ODTÜ|Boğaziçi Üniversitesi Sosyal Bilimler Enstitüsü|Boğaziçi Üniversitesi|Türkiye İş Bankası|Panama Endüstriyel Ltd\. Şti\.|EFM Teknoloji A\.Ş\.)\b/g,
      format: (match, idx) => `[KURUM: ${idx}]`
    },
    {
      type: 'KİŞİ',
      badge: 'KİŞİ',
      regex: /\b(?:Prof\.\sDr\.\sAyşenur\sTekin|Ayşenur\sTekin|Caner\sYılmaz|Ahmet\sDemirtaş|Merve\sDemir|Sibel\sYener)\b/g,
      format: (match, idx) => `[KİŞİ: ${idx}]`
    },
    {
      type: 'LOKASYON',
      badge: 'LOKASYON',
      regex: /\b(?:Isparta|Eskişehir|Ankara|İstanbul)\b/g,
      format: (match, idx) => `[LOKASYON: ${idx}]`
    }
  ];

  function processMasking() {
    const rawText = inputArea.value;
    if (!rawText.trim()) {
      outputArea.innerHTML = '<span style="color: var(--silver-dim);">Maskelenmiş çıktı burada görüntülenecektir...</span>';
      if (entityCountEl) entityCountEl.textContent = '0 Varlık';
      if (categoryCountEl) categoryCountEl.textContent = '0 Kategori';
      return;
    }

    let maskedText = rawText;
    let totalEntities = 0;
    const detectedCategories = new Set();
    const counters = {};

    piiRules.forEach(rule => {
      counters[rule.type] = 0;
      maskedText = maskedText.replace(rule.regex, (match) => {
        counters[rule.type]++;
        totalEntities++;
        detectedCategories.add(rule.type);
        const placeholder = rule.format(match, counters[rule.type]);
        return `<mark class="masked-entity" title="Gizlenen: ${match}">${placeholder}</mark>`;
      });
    });

    // Format newlines as break tags
    outputArea.innerHTML = maskedText.replace(/\n/g, '<br>');

    if (entityCountEl) entityCountEl.textContent = `${totalEntities} Hassas Varlık`;
    if (categoryCountEl) categoryCountEl.textContent = `${detectedCategories.size} Kategori`;
  }

  // Event Listeners
  inputArea.addEventListener('input', processMasking);
  if (runMaskBtn) runMaskBtn.addEventListener('click', processMasking);

  if (sampleAcademicBtn) {
    sampleAcademicBtn.addEventListener('click', () => {
      inputArea.value = samples.academic;
      sampleAcademicBtn.classList.add('active');
      if (sampleLegalBtn) sampleLegalBtn.classList.remove('active');
      processMasking();
    });
  }

  if (sampleLegalBtn) {
    sampleLegalBtn.addEventListener('click', () => {
      inputArea.value = samples.legal;
      sampleLegalBtn.classList.add('active');
      if (sampleAcademicBtn) sampleAcademicBtn.classList.remove('active');
      processMasking();
    });
  }

  // Initial run with academic sample
  if (sampleAcademicBtn) {
    sampleAcademicBtn.click();
  }
}

/* ==========================================================================
   5. Mobile Profile Details Accordion Toggle
   ========================================================================== */
function initProfileToggle() {
  const toggleBtn = document.getElementById('profileDetailsToggle');
  const metaList = document.getElementById('profileMetaList');

  if (!toggleBtn || !metaList) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;
    
    toggleBtn.setAttribute('aria-expanded', String(nextState));
    metaList.classList.toggle('is-open', nextState);
    
    const textSpan = toggleBtn.querySelector('.toggle-text');
    if (textSpan) {
      textSpan.textContent = nextState 
        ? 'Özgeçmiş & Stack Bilgilerini Kapat' 
        : 'Özgeçmiş & Stack Detayları';
    }
  });
}

/* ==========================================================================
   6. Floating Back to Top System (Smooth Touch Support)
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 300) {
          backBtn.classList.add('visible');
        } else {
          backBtn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   7. Copy Helper (Email & Certificate Verification)
   ========================================================================== */
function initCopyHelpers() {
  document.querySelectorAll('[data-copy-text]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-text');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Kopyalandı: ${textToCopy}`);
      }).catch(() => {
        showToast('Kopyalama başarısız oldu.');
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.style.position = 'fixed';
    toast.style.bottom = 'max(24px, env(safe-area-inset-bottom, 24px))';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, 14px)';
    toast.style.maxWidth = 'calc(100% - 32px)';
    toast.style.width = 'max-content';
    toast.style.background = 'var(--bg-card-elevated)';
    toast.style.color = 'var(--primary-light)';
    toast.style.border = '1px solid var(--primary-border)';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = 'var(--radius-full)';
    toast.style.fontFamily = 'var(--font-mono)';
    toast.style.fontSize = '0.82rem';
    toast.style.fontWeight = '600';
    toast.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px var(--primary-glow)';
    toast.style.zIndex = '9999';
    toast.style.transition = 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
    toast.style.textAlign = 'center';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translate(-50%, 0)';

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, 14px)';
  }, 2600);
}

/* ==========================================================================
   8. Contact Form (Direct mailto trigger)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Lütfen gerekli alanları doldurun.');
      return;
    }

    const mailtoUrl = `mailto:beytullaherden@gmail.com?subject=${encodeURIComponent(`[İletişim] ${subject || 'İşbirliği Talebi'}`)}&body=${encodeURIComponent(`Gönderen: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`)}`;
    
    window.location.href = mailtoUrl;
    showToast('E-posta istemciniz hazırlanıyor...');
  });
}
