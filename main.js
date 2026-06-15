// ===========================
// CẤU HÌNH API
// ===========================
const API_URL = 'https://script.google.com/macros/s/AKfycbzKqZNlfsxmxy4_sWy15AL_3oJtAHXXnTGgIeEeklz65tnKta5pnD5unlz4wjaoaKHchQ/exec';

// ===========================
// HÀM TIỆN ÍCH
// ===========================
function show(id, val) {
  document.getElementById(id).textContent = val || '—';
}

function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function setErr(msg) {
  document.getElementById('err-text').textContent = msg;
  document.getElementById('err').style.display = 'flex';
}

function clearErr() {
  document.getElementById('err').style.display = 'none';
}

// ===========================
// HÀM TRA CỨU CHÍNH
// ===========================
async function lookup() {
  const cccd    = document.getElementById('inp').value.trim();
  const hoten   = document.getElementById('inp-hoten').value.trim();
  const captcha = grecaptcha.getResponse();

  clearErr();
  document.getElementById('result').style.display = 'none';
  document.getElementById('loading').style.display = 'none';

  // Kiểm tra đầu vào
  if (!cccd)              { setErr('Vui lòng nhập số CCCD.'); return; }
  if (cccd.length !== 12) { setErr('Số CCCD phải đủ 12 chữ số.'); return; }
  if (!hoten)             { setErr('Vui lòng nhập họ và tên.'); return; }
  if (!captcha)           { setErr('Vui lòng xác nhận "Tôi không phải robot".'); return; }

  document.getElementById('loading').style.display = 'block';

  try {
    const url  = `${API_URL}?cccd=${encodeURIComponent(cccd)}&hoten=${encodeURIComponent(hoten)}`;
    const res  = await fetch(url);
    const json = await res.json();

    document.getElementById('loading').style.display = 'none';

    if (!json.ok) {
      setErr('Không tìm thấy thông tin. Kiểm tra lại số CCCD và họ tên khai sinh.');
      grecaptcha.reset();
      return;
    }

    // Hiển thị kết quả
    const d = json.data;
    const tenKhaiSinh = d.hoten || d.hotenGop.split('\n')[0].trim();

    show('r-gcn', d.gcn);
    show('r-cccd', d.cccd);
    show('r-name', tenKhaiSinh);
    document.getElementById('r-cccd-disp').textContent = 'CCCD: ' + d.cccd;
    document.getElementById('r-stt').textContent = d.stt ? 'STT ' + d.stt : '—';
    document.getElementById('r-avatar').textContent = initials(tenKhaiSinh);
    show('r-hoten', d.hotenGop);
    show('r-trinhdoVH', d.trinhdoVH);
    show('r-noicu', d.noicu);
    show('r-thanhphan', d.thanhphan);
    show('r-cmkt', d.cmkt);
    show('r-chame', d.chame);

    document.getElementById('result').style.display = 'block';
    grecaptcha.reset();

  } catch (e) {
    document.getElementById('loading').style.display = 'none';
    setErr('Không thể kết nối dữ liệu. Vui lòng thử lại sau.');
    grecaptcha.reset();
  }
}
