/**
 * bywave.world - Conversion Rate Optimization & Interactive Helpers
 */

function copyCoupon(code, redirectUrl) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`✅ 优惠码 [ ${code} ] 已复制到剪贴板！正在为您前往官网...`);
      if (redirectUrl) {
        setTimeout(() => {
          window.open(redirectUrl, '_blank');
        }, 800);
      }
    }).catch(() => {
      fallbackCopy(code, redirectUrl);
    });
  } else {
    fallbackCopy(code, redirectUrl);
  }
}

function fallbackCopy(code, redirectUrl) {
  const textArea = document.createElement("textarea");
  textArea.value = code;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`✅ 优惠码 [ ${code} ] 已成功复制！`);
    if (redirectUrl) {
      setTimeout(() => {
        window.open(redirectUrl, '_blank');
      }, 800);
    }
  } catch (err) {
    showToast(`提示：优惠码为 [ ${code} ]，请手动复制使用`);
    if (redirectUrl) {
      window.open(redirectUrl, '_blank');
    }
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  let toast = document.getElementById('croToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'croToast';
    toast.className = 'cro-toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   Interactive Airport Filter & Comparison Engine
   ========================================================================== */
const currentFilters = {
  price: 'all',
  line: 'all',
  client: 'all',
  status: 'all'
};

document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.getElementById('airportFilterBar');
  if (!filterBar) return;

  const buttons = filterBar.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const group = btn.closest('.filter-group');
      const type = group.getAttribute('data-filter-type');
      const val = btn.getAttribute('data-val');

      // Update active state in group
      group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update state
      currentFilters[type] = val;
      applyFilters();
    });
  });
});

function applyFilters() {
  const container = document.getElementById('brandContainer');
  if (!container) return;

  const cards = container.querySelectorAll('.brand-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardPrice = card.getAttribute('data-price-tier');
    const cardLine = card.getAttribute('data-line-tier');
    const cardClient = card.getAttribute('data-has-custom-client');
    const cardStatus = card.getAttribute('data-status');

    let match = true;

    if (currentFilters.price !== 'all' && cardPrice !== currentFilters.price) match = false;
    if (currentFilters.line !== 'all' && cardLine !== currentFilters.line) match = false;
    if (currentFilters.client !== 'all' && cardClient !== 'true') match = false;
    if (currentFilters.status !== 'all' && cardStatus !== currentFilters.status) match = false;

    if (match) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countEl = document.getElementById('matchCount');
  if (countEl) countEl.innerText = visibleCount;
}

function resetFilters() {
  const filterBar = document.getElementById('airportFilterBar');
  if (!filterBar) return;

  filterBar.querySelectorAll('.filter-group').forEach(group => {
    group.querySelectorAll('.filter-btn').forEach((btn, idx) => {
      if (idx === 0) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  });

  currentFilters.price = 'all';
  currentFilters.line = 'all';
  currentFilters.client = 'all';
  currentFilters.status = 'all';

  applyFilters();
}

function applySorting() {
  const select = document.getElementById('sortSelect');
  const container = document.getElementById('brandContainer');
  if (!select || !container) return;

  const val = select.value;
  const cards = Array.from(container.querySelectorAll('.brand-card'));

  cards.sort((a, b) => {
    if (val === 'rank-asc') {
      return parseInt(a.getAttribute('data-rank')) - parseInt(b.getAttribute('data-rank'));
    } else if (val === 'rating-desc') {
      return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
    }
    return 0;
  });

  cards.forEach(card => container.appendChild(card));
}
