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
