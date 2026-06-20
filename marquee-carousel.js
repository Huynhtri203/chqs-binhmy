/* ═══════════════════════════════════════════════════════════════════════════
   marquee-carousel.js  –  Carousel Chạy Ngang (NotebookLM Style)
   Ban CHQS Xã Bình Mỹ
   Tối ưu:
     • CSS animation bắt đầu ở trạng thái PAUSED
     • IntersectionObserver bật/tắt theo viewport
     • Video trong card: preload="none", lazy-play khi card visible
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ── DỮ LIỆU THẺ MẪU ──────────────────────────────────────────────────────
   Thay đổi nội dung, ảnh, video tại đây.
   ─────────────────────────────────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  {
    type   : 'review',
    quote  : '\"Hệ thống cổng thông tin giúp tôi tra cứu lịch huấn luyện và các thông báo tuyển quân rất nhanh chóng, không cần đến trực tiếp.\"',
    name   : 'Trần Trọng Tín',
    role   : 'Công dân xã Bình Mỹ',
    avatar : 'images/tin.jpg',
  },
  {
    type   : 'image',
    src    : 'images/Toan2.jpg',
    title  : 'Tăng gia',
    desc   : 'Toàn đơn vị',
  },
  {
    type   : 'review',
    quote  : '\"Việc đăng ký dân quân tự vệ qua cổng điện tử tiết kiệm rất nhiều thời gian. Giao diện rõ ràng, dễ sử dụng.\"',
    name   : 'Trần Trọng Tín',
    role   : 'Chiến sĩ DQTV xã Bình Mỹ',
    avatar : 'images/tin.jpg',
  },
  {
    type   : 'video',
    src    : 'images/videotoan.mp4',
    poster : 'images/toan.jpg',
    title  : 'ẹc ẹc',
    desc   : 'éc éc éc',
  },
  {
    type   : 'review',
    quote  : '\"Nhờ hệ thống số hóa, công tác quản lý quân nhân tại xã được minh bạch và hiệu quả hơn trước rất nhiều.\"',
    name   : 'Lý Trọng Nguyên',
    role   : 'Chiến sĩ',
    avatar : 'images/nguyen.jpg',
  },
  {
    type   : 'image',
    src    : 'images/anh2.jpg',
    title  : 'Cổ vũ hội thi xe đạp cúp truyền hình',
    desc   : 'Toàn đơn vị',
  },
  {
    type   : 'review',
    quote  : '\"Cổng thông tin cập nhật lịch tuyển sinh quân sự rất đúng hạn, giúp tôi chuẩn bị hồ sơ kịp thời.\"',
    name   : 'Nguyễn Đức Toàn',
    role   : 'Thanh niên xã Bình Mỹ',
    avatar : 'images/toan.jpg',
  },
];

/* ── XÂY DỰNG HTML MỘT THẺ ─────────────────────────────────────────────── */
function buildCard(item) {
  if (item.type === 'review') {
    return `
      <div class="marquee-card">
        <p class="review-text">${item.quote}</p>
        <div class="review-author">
          <img class="author-avatar" src="${item.avatar}" alt="${item.name}"
               onerror="this.src='https://placehold.co/44x44/7b1113/ffffff?text=${item.name[0]}'">
          <div>
            <span class="author-name">${item.name}</span>
            <span class="author-role">${item.role}</span>
          </div>
        </div>
      </div>`;
  }

  if (item.type === 'image') {
    return `
      <div class="marquee-card card-type-image">
        <div class="card-media-wrapper">
          <img src="${item.src}" alt="${item.title}" loading="lazy">
        </div>
        <div class="card-info">
          <p class="card-info-title">${item.title}</p>
          <p class="card-info-desc">${item.desc}</p>
        </div>
      </div>`;
  }

  if (item.type === 'video') {
    /* preload="none" — tuyệt đối không tải video trước khi người dùng nhìn thấy */
    return `
      <div class="marquee-card card-type-video">
        <div class="card-media-wrapper">
          <video
            src="${item.src}"
            ${item.poster ? `poster="${item.poster}"` : ''}
            preload="none"
            muted
            loop
            playsinline
            data-lazy-video
          ></video>
          <div class="card-video-overlay">
            <div class="play-pulse-icon">▶</div>
          </div>
        </div>
        <div class="card-info">
          <p class="card-info-title">${item.title}</p>
          <p class="card-info-desc">${item.desc}</p>
        </div>
      </div>`;
  }

  return '';
}

/* ── ĐIỀN VÀ NHÂN ĐÔI TRACK ─────────────────────────────────────────────── */
function populateTrack(track) {
  const html = MARQUEE_ITEMS.map(buildCard).join('');
  /* Nhân đôi để tạo hiệu ứng vô tận liền mạch (CSS translateX -50%) */
  track.innerHTML = html + html;
}

/* ── VIDEO LAZY-PLAY TRONG CARD ──────────────────────────────────────────── */
function initCarouselVideoLazy() {
  const cardVideos = document.querySelectorAll('[data-lazy-video]');
  if (!cardVideos.length) return;

  const vidObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const vid = entry.target;
      if (entry.isIntersecting) {
        if (vid.readyState === 0) vid.load();
        vid.play().catch(() => {});
        vid.classList.add('video-playing');
      } else {
        vid.pause();
        vid.classList.remove('video-playing');
      }
    });
  }, { threshold: 0.4 });

  cardVideos.forEach(v => vidObserver.observe(v));
}

/* ── DRAG-TO-SCROLL ──────────────────────────────────────────────────────── */
function initDragScroll(wrapper) {
  let isDown = false, startX = 0, scrollLeft = 0;

  wrapper.addEventListener('mousedown', e => {
    isDown = true;
    wrapper.classList.add('dragging');
    startX     = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });
  wrapper.addEventListener('mouseleave', () => { isDown = false; wrapper.classList.remove('dragging'); });
  wrapper.addEventListener('mouseup',    () => { isDown = false; wrapper.classList.remove('dragging'); });
  wrapper.addEventListener('mousemove',  e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  /* Touch */
  let touchStartX = 0, touchScrollLeft = 0;
  wrapper.addEventListener('touchstart', e => {
    touchStartX    = e.touches[0].pageX;
    touchScrollLeft = wrapper.scrollLeft;
  }, { passive: true });
  wrapper.addEventListener('touchmove', e => {
    const x    = e.touches[0].pageX;
    const walk = (touchStartX - x) * 1.2;
    wrapper.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });
}

/* ── INTERSECTION OBSERVER: BẬT/TẮT CSS ANIMATION ──────────────────────────
   Animation bắt đầu PAUSED (khai báo trong CSS đã có sẵn hoặc set ở đây).
   Chỉ chạy khi section xuất hiện trong viewport.
   ─────────────────────────────────────────────────────────────────────────── */
function initMarqueeVisibility(section, track) {
  /* Đặt paused ngay từ đầu để không lãng phí CPU khi trang mới load */
  track.style.animationPlayState = 'paused';

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      /* Đồng bộ tất cả .marquee-track (bao gồm cả bản clone nếu có) */
      document.querySelectorAll('.marquee-track').forEach(t => {
        t.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    });
  }, {
    threshold : 0.05,  // 5% section vào viewport là đủ để bắt đầu
    rootMargin: '0px',
  });

  sectionObserver.observe(section);
}

/* ── ĐIỂM VÀO CHÍNH ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.marquee-carousel-section');
  const wrapper = document.querySelector('.marquee-wrapper');
  const track   = document.querySelector('.marquee-track');

  if (!section || !wrapper || !track) return;

  /* 1. Điền nội dung */
  populateTrack(track);

  /* 2. Dừng animation cho đến khi vào viewport */
  initMarqueeVisibility(section, track);

  /* 3. Drag-to-scroll */
  initDragScroll(wrapper);

  /* 4. Video lazy-play trong card */
  initCarouselVideoLazy();

  /* Dừng animation khi đang drag để không xung đột */
  wrapper.addEventListener('mousedown', () => {
    document.querySelectorAll('.marquee-track').forEach(t => {
      t.style.animationPlayState = 'paused';
    });
  });
  wrapper.addEventListener('mouseup', () => {
    /* Chỉ resume nếu section vẫn visible */
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      document.querySelectorAll('.marquee-track').forEach(t => {
        t.style.animationPlayState = 'running';
      });
    }
  });
});
