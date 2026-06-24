/**
 * ══════════════════════════════════════════════════════════════
 *  CỔNG TRA CỨU VĂN BẢN TUYÊN TRUYỀN — Google Apps Script API
 *  Ban CHQS Xã Bình Mỹ
 *
 *  CÁCH DEPLOY:
 *  1. Mở script.google.com → New Project → dán code này
 *  2. Extensions → Apps Script → Deploy → New Deployment
 *  3. Type: Web App | Execute as: Me | Who has access: Anyone
 *  4. Copy URL → dán vào GAS_URL trong loginvb.html & tracuuvb.html
 *
 *  CẤU TRÚC GOOGLE SHEETS:
 *  Sheet 1: LichSuTruyCap  — Timestamp | HoTen | SoDienThoai | Device | Browser
 *  Sheet 2: DanhMucVanBan  — ID | LoaiVanBan | Thang | TieuDe | SoVanBan | MoTa | NgayCapNhat | LinkDrive
 * ══════════════════════════════════════════════════════════════
 */

// ── ID Google Spreadsheet của bạn ──
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// ── Tên các sheet ──
const SHEET_LOG  = 'LichSuTruyCap';
const SHEET_DOCS = 'DanhMucVanBan';

// ── CORS helper ──
function buildResponse(data, status) {
  const json = JSON.stringify(data);
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET handler
 * Params: action, category, month, q
 */
function doGet(e) {
  try {
    const action   = (e.parameter.action   || 'documents').toLowerCase();
    const category = e.parameter.category  || '';
    const month    = e.parameter.month     || '';
    const q        = e.parameter.q         || '';

    if (action === 'documents' || action === 'search') {
      const docs = getDocuments({ category, month, q });
      return buildResponse({ success: true, count: docs.length, documents: docs });
    }

    if (action === 'stats') {
      const stats = getStats();
      return buildResponse({ success: true, stats });
    }

    return buildResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return buildResponse({ success: false, error: err.message });
  }
}

/**
 * POST handler
 * Body JSON: { action, hoTen, soDienThoai, device, browser, timestamp }
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = (body.action || '').toLowerCase();

    if (action === 'savevisitor') {
      saveVisitor(body);
      return buildResponse({ success: true, message: 'Visitor saved' });
    }

    return buildResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return buildResponse({ success: false, error: err.message });
  }
}

/* ──────────────────────────────────────────
   SAVE VISITOR — ghi nhật ký truy cập
────────────────────────────────────────── */
function saveVisitor(data) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet   = ss.getSheetByName(SHEET_LOG);

  // Tạo sheet nếu chưa có
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_LOG);
    sheet.appendRow(['Timestamp','HoTen','SoDienThoai','Device','Browser']);
    sheet.getRange(1,1,1,5).setFontWeight('bold').setBackground('#0d1b2a').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  const row = [
    data.timestamp || new Date().toISOString(),
    data.hoTen     || '',
    data.soDienThoai || '',
    data.device    || '',
    data.browser   || '',
  ];
  sheet.appendRow(row);

  // Auto-resize columns
  sheet.autoResizeColumns(1, 5);
}

/* ──────────────────────────────────────────
   GET DOCUMENTS — lấy danh mục văn bản
────────────────────────────────────────── */
function getDocuments({ category, month, q }) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet   = ss.getSheetByName(SHEET_DOCS);

  // Tạo sheet mẫu nếu chưa có
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_DOCS);
    const headers = ['ID','LoaiVanBan','Thang','TieuDe','SoVanBan','MoTa','NgayCapNhat','LinkDrive'];
    sheet.appendRow(headers);
    sheet.getRange(1,1,1,8).setFontWeight('bold').setBackground('#0d1b2a').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    // Thêm hàng mẫu
    sheet.appendRow([1,'Trung Ương','06/2026','Nghị quyết số XX về tăng cường quốc phòng','NQ-01/TW','Mô tả nội dung văn bản',new Date().toLocaleDateString('vi-VN'),'https://drive.google.com/file/d/EXAMPLE/view']);
    return [];
  }

  const data  = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0].map(h => String(h).trim());
  const rows    = data.slice(1);

  let docs = rows
    .filter(row => row[0] !== '' && row[0] !== null) // bỏ hàng trống
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = String(row[i] || '').trim(); });
      return obj;
    });

  // Filter category
  if (category) {
    docs = docs.filter(d => d.LoaiVanBan === category);
  }

  // Filter month
  if (month) {
    docs = docs.filter(d => d.Thang === month);
  }

  // Filter search
  if (q) {
    const lq = q.toLowerCase();
    docs = docs.filter(d =>
      d.TieuDe.toLowerCase().includes(lq) ||
      (d.SoVanBan || '').toLowerCase().includes(lq) ||
      (d.MoTa || '').toLowerCase().includes(lq)
    );
  }

  // Sort: mới nhất trước (by Thang desc then ID desc)
  docs.sort((a, b) => {
    const parseMonth = s => {
      const [m, y] = (s || '01/2000').split('/');
      return new Date(+y, +m - 1);
    };
    const diff = parseMonth(b.Thang) - parseMonth(a.Thang);
    if (diff !== 0) return diff;
    return Number(b.ID) - Number(a.ID);
  });

  return docs;
}

/* ──────────────────────────────────────────
   GET STATS — thống kê nhanh
────────────────────────────────────────── */
function getStats() {
  const all = getDocuments({});
  const now = new Date();
  const thisMonth = String(now.getMonth() + 1).padStart(2,'0') + '/' + now.getFullYear();

  const byCategory = {};
  all.forEach(d => {
    byCategory[d.LoaiVanBan] = (byCategory[d.LoaiVanBan] || 0) + 1;
  });

  return {
    total: all.length,
    thisMonth: all.filter(d => d.Thang === thisMonth).length,
    byCategory,
  };
}

/* ──────────────────────────────────────────
   TEST FUNCTION — chạy thủ công để kiểm tra
────────────────────────────────────────── */
function testGetDocuments() {
  const result = getDocuments({ category: '', month: '', q: '' });
  Logger.log(JSON.stringify(result, null, 2));
}

function testSaveVisitor() {
  saveVisitor({
    hoTen: 'Nguyễn Văn Test',
    soDienThoai: '0909123456',
    device: 'Desktop',
    browser: 'Chrome',
    timestamp: new Date().toISOString(),
  });
  Logger.log('Visitor saved OK');
}
