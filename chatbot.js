/**
 * chatbot.js — Widget chatbot Ban CHQS Xã Bình Mỹ
 * Cách dùng: <script src="chatbot.js"></script> trước </body>
 */

(function () {

  // ===== 1. INJECT CSS =====
  const style = document.createElement('style');
  style.textContent = `
    .chat-fab {
      position: fixed; bottom: 24px; right: 24px;
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, #922B21, #C0392B);
      border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(192,57,43,0.4);
      display: flex; align-items: center; justify-content: center;
      z-index: 998; transition: transform .2s, box-shadow .2s;
      animation: chatPulse 2.5s infinite;
    }
    .chat-fab:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(192,57,43,0.5); }
    .chat-fab-icon { font-size: 24px; }
    @keyframes chatPulse {
      0%,100% { box-shadow: 0 4px 20px rgba(192,57,43,0.4); }
      50%      { box-shadow: 0 4px 28px rgba(192,57,43,0.7); }
    }
    .chat-badge {
      position: absolute; top: -2px; right: -2px;
      background: #D4A017; color: #3D2000;
      font-size: 11px; font-weight: 800;
      width: 18px; height: 18px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid #fff;
    }
    .chat-window {
      position: fixed; bottom: 90px; right: 24px;
      width: 340px; max-height: 520px;
      background: #fff; border-radius: 16px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.2);
      display: none; flex-direction: column;
      z-index: 997; overflow: hidden;
      font-family: 'Be Vietnam Pro', sans-serif;
    }
    .chat-window.open { display: flex; animation: chatSlideUp .25s ease; }
    @keyframes chatSlideUp {
      from { opacity:0; transform:translateY(20px) scale(.95); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
    .chat-header {
      background: linear-gradient(90deg, #922B21, #C0392B);
      padding: 14px 16px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .chat-header-left { display: flex; align-items: center; gap: 10px; }
    .chat-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center; font-size: 18px;
    }
    .chat-name { font-size: 13px; font-weight: 700; color: #fff; }
    .chat-status { font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 1px; }
    .chat-close {
      background: rgba(255,255,255,0.2); border: none; color: #fff;
      width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
      font-size: 14px; display: flex; align-items: center; justify-content: center;
      transition: background .2s;
    }
    .chat-close:hover { background: rgba(255,255,255,0.35); }
    .chat-messages {
      flex: 1; overflow-y: auto; padding: 14px 12px;
      display: flex; flex-direction: column; gap: 10px;
      scrollbar-width: thin;
    }
    .chat-msg { display: flex; }
    .chat-msg.bot  { justify-content: flex-start; }
    .chat-msg.user { justify-content: flex-end; }
    .chat-bubble {
      max-width: 85%; padding: 10px 14px; border-radius: 14px;
      font-size: 13px; line-height: 1.5;
    }
    .chat-msg.bot  .chat-bubble { background: #F5F5F0; color: #1A1A1A; border-bottom-left-radius: 4px; }
    .chat-msg.user .chat-bubble { background: #C0392B; color: #fff; border-bottom-right-radius: 4px; }
    .chat-typing .chat-bubble { display: flex; gap: 4px; align-items: center; padding: 12px 16px; }
    .dot-typing {
      width: 7px; height: 7px; border-radius: 50%; background: #6B6B6B;
      animation: dotBounce 1.2s infinite;
    }
    .dot-typing:nth-child(2) { animation-delay: .2s; }
    .dot-typing:nth-child(3) { animation-delay: .4s; }
    @keyframes dotBounce {
      0%,80%,100% { transform: translateY(0); }
      40%         { transform: translateY(-6px); }
    }
    .chat-suggestions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .chat-suggestions button {
      font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 20px;
      border: 1.5px solid #C0392B; color: #C0392B; background: #FADBD8;
      cursor: pointer; font-family: inherit; transition: all .15s;
    }
    .chat-suggestions button:hover { background: #C0392B; color: #fff; }
    .chat-input-area {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 12px; border-top: 1px solid #E0DDD5; background: #fff;
    }
    .chat-input-area input {
      flex: 1; border: 1.5px solid #E0DDD5; border-radius: 20px;
      padding: 8px 14px; font-family: inherit; font-size: 13px; color: #1A1A1A;
      outline: none; background: #FAFAF8; transition: border-color .2s;
    }
    .chat-input-area input:focus { border-color: #C0392B; background: #fff; }
    .chat-input-area input::placeholder { color: #bbb; }
    .chat-input-area button {
      width: 36px; height: 36px; border-radius: 50%;
      background: #C0392B; border: none; color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background .15s;
    }
    .chat-input-area button:hover { background: #922B21; }
    @media (max-width: 400px) {
      .chat-window { width: calc(100vw - 32px); right: 16px; bottom: 86px; }
      .chat-fab    { right: 16px; bottom: 16px; }
    }
  `;
  document.head.appendChild(style);

  // ===== 2. INJECT HTML =====
  const html = `
    <button class="chat-fab" id="chat-fab" title="Hỏi đáp nhanh">
      <span class="chat-fab-icon" id="chat-fab-icon">💬</span>
      <span class="chat-badge" id="chat-badge">1</span>
    </button>

    <div class="chat-window" id="chat-window">
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-avatar">🪖</div>
          <div>
            <div class="chat-name">Hỗ trợ Ban CHQS</div>
            <div class="chat-status">🟢 Trực tuyến</div>
          </div>
        </div>
        <button class="chat-close" id="chat-close-btn">✕</button>
      </div>

      <div class="chat-messages" id="chat-messages">
        <div class="chat-msg bot">
          <div class="chat-bubble">
            👋 Xin chào! Mình là trợ lý của <b>Ban CHQS Xã Bình Mỹ</b>.<br><br>
            Chọn chủ đề bên dưới hoặc nhập câu hỏi vào ô chat!
          </div>
        </div>
        <div class="chat-suggestions" id="chat-suggestions">
          <button data-topic="nvqs">🪖 Nghĩa vụ quân sự</button>
          <button data-topic="tuyen-quan">📋 Tuyển quân 2026</button>
          <button data-topic="tuyen-sinh">🎓 Tuyển sinh quân đội</button>
          <button data-topic="tracuu">🔍 Tra cứu hồ sơ</button>
          <button data-topic="lienhe">📞 Liên hệ Ban CHQS</button>
        </div>
      </div>

      <div class="chat-input-area">
        <input type="text" id="chat-input" placeholder="Nhập câu hỏi...">
        <button id="chat-send-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px;">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  document.body.appendChild(wrap);

  // ===== 3. DỮ LIỆU TRẢ LỜI =====
  const KB = [
    { keys: ['tuổi','đăng ký','bao nhiêu tuổi','mấy tuổi','17','18'],
      ans: '📋 Công dân nam <b>đủ 17 tuổi</b> phải đến Ban CHQS xã đăng ký nghĩa vụ quân sự. Độ tuổi gọi nhập ngũ từ 18 đến hết 25 tuổi (hoặc 27 tuổi nếu được tạm hoãn).' },
    { keys: ['thời hạn','bao lâu','mấy năm','24 tháng','2 năm'],
      ans: '⏱️ Thời hạn phục vụ tại ngũ trong thời bình là <b>24 tháng (2 năm)</b>.' },
    { keys: ['đại học','sinh viên','tạm hoãn','hoãn'],
      ans: '🎓 Sinh viên đang học đại học được <b>tạm hoãn</b> nhập ngũ trong thời gian học. Sau tốt nghiệp sẽ được xem xét gọi nhập ngũ theo quy định.' },
    { keys: ['trốn','phạt','xử phạt','vi phạm','không chấp hành'],
      ans: '⚠️ Không đăng ký NVQS: phạt <b>10–12 triệu đồng</b>. Không chấp hành lệnh nhập ngũ: phạt <b>15–25 triệu đồng</b>. Trường hợp nghiêm trọng có thể bị truy cứu hình sự.' },
    { keys: ['nữ','phụ nữ','con gái'],
      ans: '👩 Công dân nữ <b>không bắt buộc</b> nhập ngũ. Nếu tự nguyện và quân đội có nhu cầu thì được phục vụ ở các ngành như quân y, thông tin, kỹ thuật.' },
    { keys: ['tuyển quân','nhập ngũ','giao quân','lễ giao quân'],
      ans: '🪖 Tuyển quân năm 2026: sơ tuyển tháng 12/2025, khám sức khỏe tháng 01/2026, giao quân tháng 02/2026. Xem chi tiết: <a href="tuyen-quan.html" style="color:#C0392B;font-weight:600;">Trang Tuyển quân</a>.' },
    { keys: ['hồ sơ','giấy tờ','cần chuẩn bị','nộp hồ sơ'],
      ans: '📄 Hồ sơ tuyển quân: CCCD, giấy khám sức khỏe, test ma túy, tờ khai lý lịch, bằng tốt nghiệp, hộ khẩu và 02 ảnh 3x4. Xem đầy đủ: <a href="tuyen-quan.html" style="color:#C0392B;font-weight:600;">Trang Tuyển quân</a>.' },
    { keys: ['sức khỏe','chiều cao','cân nặng'],
      ans: '🏥 Yêu cầu sức khỏe loại 1, 2 hoặc 3. Chiều cao từ <b>1,60m</b>, cân nặng từ <b>48kg</b> trở lên.' },
    { keys: ['tuyển sinh','trường quân đội','sĩ quan','học viện'],
      ans: '🎓 Đăng ký tuyển sinh trường quân đội phải qua Ban CHQS xã xét duyệt lý lịch trước. Xem thêm: <a href="tuyen-sinh.html" style="color:#C0392B;font-weight:600;">Trang Tuyển sinh</a>.' },
    { keys: ['tra cứu','hồ sơ cá nhân','xem thông tin','cccd','căn cước'],
      ans: '🔍 Tra cứu thông tin hồ sơ tại: <a href="tracuu.html" style="color:#C0392B;font-weight:600;">Trang Tra cứu</a>. Nhập số CCCD (12 chữ số) và họ tên khai sinh là xem được.' },
    { keys: ['liên hệ','địa chỉ','ở đâu','giờ làm','zalo','facebook','điện thoại'],
      ans: '📞 <b>Ban CHQS Xã Bình Mỹ</b><br>📍 UBND Xã Bình Mỹ, Huyện Củ Chi, TP.HCM<br>⏰ T2–T6: 7:30–11:30 & 13:30–17:00<br>📱 Zalo: 09875948..<br>👥 <a href="https://www.facebook.com/share/18g8qhhaEB/?mibextid=wwXIfr" target="_blank" style="color:#C0392B;">Facebook Ban CHQS</a>' },
    { keys: ['xin chào','chào','hello','hi'],
      ans: '👋 Xin chào! Mình có thể hỗ trợ về nghĩa vụ quân sự, tuyển quân, tuyển sinh hoặc tra cứu hồ sơ. Bạn cần gì?' },
    { keys: ['cảm ơn','thank'],
      ans: '😊 Không có gì! Nếu còn thắc mắc cứ hỏi mình nhé.' },
  ];

  const QUICK = {
    'nvqs':       'Nghĩa vụ quân sự là gì?',
    'tuyen-quan': 'Tuyển quân năm 2026 như thế nào?',
    'tuyen-sinh': 'Đăng ký tuyển sinh trường quân đội?',
    'tracuu':     'Làm thế nào để tra cứu hồ sơ?',
    'lienhe':     'Liên hệ Ban CHQS ở đâu?',
  };

  // ===== 4. LOGIC =====
  let chatOpen = false;

  function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chat-window').classList.toggle('open', chatOpen);
    document.getElementById('chat-fab-icon').textContent = chatOpen ? '✕' : '💬';
    document.getElementById('chat-badge').style.display = 'none';
    if (chatOpen) document.getElementById('chat-input').focus();
  }

  function addMsg(text, type) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg ' + type;
    div.innerHTML = `<div class="chat-bubble">${text}</div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function showTyping() {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg bot chat-typing';
    div.id = 'chat-typing';
    div.innerHTML = `<div class="chat-bubble">
      <div class="dot-typing"></div>
      <div class="dot-typing"></div>
      <div class="dot-typing"></div>
    </div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('chat-typing');
    if (el) el.remove();
  }

  function findAnswer(text) {
    const q = text.toLowerCase();
    for (const item of KB) {
      if (item.keys.some(k => q.includes(k))) return item.ans;
    }
    return null;
  }

  function sendMsg(text) {
    if (!text.trim()) return;
    document.getElementById('chat-input').value = '';
    const sugg = document.getElementById('chat-suggestions');
    if (sugg) sugg.remove();
    addMsg(text, 'user');
    showTyping();
    setTimeout(() => {
      removeTyping();
      const ans = findAnswer(text);
      addMsg(ans || '😔 Mình chưa có thông tin về câu hỏi này. Vui lòng liên hệ trực tiếp Ban CHQS qua Zalo <b>09875948..</b> hoặc đến trụ sở UBND Xã Bình Mỹ nhé!', 'bot');
    }, 800);
  }

  // ===== 5. GẮN SỰ KIỆN =====
  document.getElementById('chat-fab').addEventListener('click', toggleChat);
  document.getElementById('chat-close-btn').addEventListener('click', toggleChat);
  document.getElementById('chat-send-btn').addEventListener('click', () => {
    sendMsg(document.getElementById('chat-input').value.trim());
  });
  document.getElementById('chat-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMsg(e.target.value.trim());
  });
  document.querySelectorAll('.chat-suggestions button').forEach(btn => {
    btn.addEventListener('click', () => {
      const topic = btn.getAttribute('data-topic');
      if (QUICK[topic]) sendMsg(QUICK[topic]);
    });
  });

})();
