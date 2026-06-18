/**
 * ══════════════════════════════════════════════════════════════════════════════
 * PARALLAX HERO BANNER CONFIGURATION & LOGIC
 * ══════════════════════════════════════════════════════════════════════════════
 * Hướng dẫn cấu hình hình ảnh / video cho banner:
 * - Thay đổi các giá trị trong đối tượng `HERO_BANNER_CONFIG` bên dưới.
 * - Hỗ trợ cả định dạng:
 *    + Video cục bộ (ví dụ: 'images/CodeGioiThieu.mp4')
 *    + Ảnh chất lượng cao (tĩnh) từ Unsplash hoặc thư mục cục bộ.
 */

const HERO_BANNER_CONFIG = {
  type: 'video', // 'video' hoặc 'image'
  src: 'images/VD1.mp4', // <--- SỬA ĐƯỜNG DẪN ẢNH HOẶC VIDEO BANNER CHÍNH TẠI ĐÂY
  poster: 'images/video-poster.jpg',
  headline: 'BẢO VỆ TỔ QUỐC',
  subheading: 'LỰC LƯỢNG VŨ TRANG NHÂN DÂN XÃ BÌNH MỸ',
  badgeText: 'Kỷ nguyên số & Hiện đại hóa',
  ctaText: 'Xem tài liệu công vụ',
  ctaLink: '#video-container'
};

class ParallaxHero {
  constructor() {
    this.section = document.querySelector('.parallax-hero-section');
    if (!this.section) return;

    this.mediaContainer = document.getElementById('hero-parallax-media');
    this.headline = document.querySelector('.hero-parallax-title');
    this.subheading = document.querySelector('.hero-parallax-desc');
    this.badge = document.querySelector('.hero-parallax-badge');
    this.cta = document.querySelector('.hero-parallax-cta');

    this.init();
  }

  init() {
    this.renderMedia();
    this.setupScrollTrigger();
  }

  renderMedia() {
    this.mediaContainer.innerHTML = '';

    if (HERO_BANNER_CONFIG.type === 'video') {
      const video = document.createElement('video');
      video.src = HERO_BANNER_CONFIG.src;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none'; // 🎯 Tối ưu: Không tải video cho đến khi cần
      if (HERO_BANNER_CONFIG.poster) video.setAttribute('poster', HERO_BANNER_CONFIG.poster);
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      this.mediaContainer.appendChild(video);
      // VideoOptimizer sẽ tự động nhận diện và quản lý video này
    } else {
      const img = document.createElement('img');
      img.src = HERO_BANNER_CONFIG.src;
      img.alt = HERO_BANNER_CONFIG.headline;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      this.mediaContainer.appendChild(img);
    }

    // Set text contents
    if (this.headline) this.headline.innerHTML = HERO_BANNER_CONFIG.headline.split('').map(char => `<span class="char-span">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
    if (this.subheading) this.subheading.textContent = HERO_BANNER_CONFIG.subheading;
    if (this.badge) this.badge.textContent = HERO_BANNER_CONFIG.badgeText;
    if (this.cta) {
      this.cta.textContent = HERO_BANNER_CONFIG.ctaText;
      this.cta.setAttribute('href', HERO_BANNER_CONFIG.ctaLink);
    }
  }

  setupScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Hiệu ứng Parallax cho nền video/ảnh (nền di chuyển chậm hơn khi cuộn)
    gsap.fromTo(this.mediaContainer, {
      yPercent: -15,
      scale: 1.15
    }, {
      yPercent: 15,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: this.section,
        start: 'top bottom', // khi đầu section chạm đáy viewport
        end: 'bottom top',   // khi đáy section chạm đầu viewport
        scrub: true         // bám sát hành vi cuộn chuột
      }
    });

    // 2. Chữ tiêu đề xuất hiện tách chữ (Split Characters) và di chuyển mượt mà
    const chars = this.headline.querySelectorAll('.char-span');
    gsap.fromTo(chars, {
      opacity: 0,
      y: 100,
      rotateX: -60,
      transformOrigin: '0% 50% -50'
    }, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.03,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: this.section,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    });

    // 3. Hiệu ứng làm mờ nền tối dần khi cuộn sâu xuống (Fade overlay)
    gsap.to('.hero-parallax-overlay', {
      opacity: 0.85,
      ease: 'none',
      scrollTrigger: {
        trigger: this.section,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // 4. Parallax nhẹ cho phần văn bản mô tả để tăng chiều sâu
    gsap.fromTo('.hero-parallax-content', {
      y: 0
    }, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: this.section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Đợi GSAP và ScrollTrigger tải hoàn tất rồi khởi chạy
  const checkInterval = setInterval(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      clearInterval(checkInterval);
      new ParallaxHero();
    }
  }, 100);
});
