/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * VIDEO OPTIMIZATION UTILITY - Lazy Load & Intersection Observer
 * ═══════════════════════════════════════════════════════════════════════════════
 * Xử lý tối ưu tải video: chỉ tải và phát khi video xuất hiện trên màn hình
 * Sử dụng preload="none" để tiết kiệm băng thông trang đầu tiên
 */

'use strict';

class VideoOptimizer {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    this.createObserver();
    this.observeAllVideos();
    
    // Quan sát các video được tạo động (từ JS)
    this.observeDynamicVideos();
  }

  /**
   * Tạo IntersectionObserver để kiểm soát video
   * - Khi video vào viewport: load + play
   * - Khi video rời viewport: pause
   */
  createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            // Video vào viewport - tải và phát
            this.loadAndPlayVideo(video);
          } else {
            // Video rời viewport - dừng
            this.pauseVideo(video);
          }
        });
      },
      {
        threshold: 0.1, // 10% của video xuất hiện là đủ
        rootMargin: '100px', // Bắt đầu tải trước 100px trước khi vào viewport
      }
    );
  }

  /**
   * Quan sát tất cả video hiện có trên trang
   */
  observeAllVideos() {
    document.querySelectorAll('video').forEach((video) => {
      if (!video.hasAttribute('data-video-observed')) {
        video.setAttribute('data-video-observed', 'true');
        this.observer.observe(video);
      }
    });
  }

  /**
   * Quan sát các video được tạo động (MutationObserver)
   * Để tự động apply optimization cho video mới được thêm vào DOM
   */
  observeDynamicVideos() {
    const bodyObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const videos = node.tagName === 'VIDEO' 
              ? [node] 
              : node.querySelectorAll('video');
            
            videos.forEach((video) => {
              if (!video.hasAttribute('data-video-observed')) {
                video.setAttribute('data-video-observed', 'true');
                video.setAttribute('preload', 'none');
                this.observer.observe(video);
              }
            });
          }
        });
      });
    });

    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
    });
  }

  /**
   * Tải và phát video
   */
  loadAndPlayVideo(video) {
    // Chỉ tải nếu chưa tải
    if (video.readyState === 0 && video.src) {
      video.load();
    }

    // Phát video nếu có autoplay attribute
    if (video.hasAttribute('autoplay')) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video autoplay bị chặn:', err);
        });
      }
    }

    video.classList.add('video-loading');
  }

  /**
   * Dừng video
   */
  pauseVideo(video) {
    video.pause();
    video.classList.remove('video-loading');
  }

  /**
   * Bắt đầu quan sát một video mới (được tạo động)
   */
  observeNewVideo(video) {
    if (!video.hasAttribute('data-video-observed')) {
      video.setAttribute('data-video-observed', 'true');
      video.setAttribute('preload', 'none');
      this.observer.observe(video);
    }
  }

  /**
   * Dừng quan sát video (khi cần cleanup)
   */
  unobserveVideo(video) {
    this.observer.unobserve(video);
    video.removeAttribute('data-video-observed');
  }
}

/**
 * Khởi chạy VideoOptimizer khi DOM sẵn sàng
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.videoOptimizer = new VideoOptimizer();
  });
} else {
  window.videoOptimizer = new VideoOptimizer();
}

/**
 * Export for external use
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VideoOptimizer;
}
