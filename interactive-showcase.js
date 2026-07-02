/**
 * ══════════════════════════════════════════════════════════════════════════════
 * INTERACTIVE MULTIMEDIA SHOWCASE - WEBGL & GSAP
 * ══════════════════════════════════════════════════════════════════════════════
 * Hướng dẫn thay đổi ảnh / video:
 * - Thay đổi các đường dẫn trong mảng `SHOWCASE_DATA` bên dưới.
 * - Hỗ trợ định dạng:
 *    + Video: Sử dụng `type: 'video'` và cấp đường dẫn file mp4/webm hoặc link YouTube.
 *    + Ảnh: Sử dụng `type: 'image'` và cấp đường dẫn file jpg/png/webp hoặc link ảnh trực tuyến.
 */

const SHOWCASE_DATA = [
  {
    type: 'video',
    src: 'images/Video.mp4', //VIDEO 1
    poster: 'images/video-poster.jpg',
    title: 'Kỷ Luật & Sức Mạnh',
    subtitle: 'Huấn luyện Dân quân tự vệ xã Bình Mỹ',
    desc: 'Lực lượng vũ trang xã Bình Mỹ luôn tích cực học tập, rèn luyện kỹ thuật chiến đấu và nâng cao thể lực sẵn sàng ứng phó mọi tình huống.'
  },
  {
    type: 'video',
    src: 'images/hanhquan1.mp4', // VIDEO 2
    title: 'Kỷ Luật & Sức Mạnh',
    subtitle: 'Huấn luyện Dân quân tự vệ xã Bình Mỹ',
    desc: 'Lực lượng vũ trang xã Bình Mỹ luôn tích cực học tập, rèn luyện kỹ thuật chiến đấu và nâng cao thể lực sẵn sàng ứng phó mọi tình huống.'
  },
  {
    type: 'video',
    src: 'images/hanhquan2.mp4', //  VIDEO 3 
    poster: 'images/video-poster.jpg',
    title: 'Kỷ Luật & Sức Mạnh',
    subtitle: 'Huấn luyện Dân quân tự vệ xã Bình Mỹ',
    desc: 'Lực lượng vũ trang xã Bình Mỹ luôn tích cực học tập, rèn luyện kỹ thuật chiến đấu và nâng cao thể lực sẵn sàng ứng phó mọi tình huống.'
  },
  {
    type: 'image',
    src: 'images/anh3.jpg', // <--- Ảnh 1
    title: 'Kỷ Luật & Sức Mạnh',
    subtitle: 'Hanh quân rèn luyện',
    desc: 'Duy trì hành quân hàng tuần nâng cao sức khỏe và tinh thần đồng đội cho lực lượng dân quân tự vệ xã Bình Mỹ.'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop', // Ảnh 2
    title: 'Không Gian Số Ban CHQS',
    subtitle: 'Chuyển đổi số công tác quốc phòng',
    desc: 'Ứng dụng công nghệ hiện đại nhằm số hóa hồ sơ quản lý nghĩa vụ quân sự và tuyên truyền thông tin nhanh chóng, chính xác.'
  }
];

class InteractiveShowcase {
  constructor() {
    this.container = document.querySelector('.interactive-showcase-container');
    if (!this.container) return;

    this.currentIndex = 0;
    this.webglContainer = document.getElementById('showcase-webgl-canvas');
    this.mediaWrapper = document.querySelector('.showcase-media-frame');
    this.mediaContent = document.getElementById('showcase-main-media');
    this.titleEl = document.querySelector('.showcase-info-title');
    this.subtitleEl = document.querySelector('.showcase-info-subtitle');
    this.descEl = document.querySelector('.showcase-info-desc');
    this.indicatorContainer = document.querySelector('.showcase-indicators');

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.spheres = [];

    this.init();
  }

  init() {
    this.createIndicators();
    this.loadMedia(this.currentIndex);
    this.initWebGL();
    this.setupEventListeners();
    this.animateReveal();
  }

  // 1. TẠO CÁC NÚT ĐIỀU HƯỚNG DƯỚI DẠNG THUMBNAIL
  createIndicators() {
    this.indicatorContainer.innerHTML = '';
    SHOWCASE_DATA.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = `indicator-pill ${index === this.currentIndex ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="indicator-number">0${index + 1}</span>
        <span class="indicator-type">${item.type.toUpperCase()}</span>
      `;
      btn.addEventListener('click', () => this.switchMedia(index));
      this.indicatorContainer.appendChild(btn);
    });
  }

  // 2. TẢI VÀ ĐỔI NỘI DUNG MULTIMEDIA
  loadMedia(index) {
    const data = SHOWCASE_DATA[index];
    if (!data) return;

    // Reset media container
    this.mediaContent.innerHTML = '';

    if (data.type === 'video') {
      const video = document.createElement('video');
      video.src = data.src;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none'; // 🎯 Tối ưu: Không tải video cho đến khi cần
      video.controls = true;
      if (data.poster) video.setAttribute('poster', data.poster);
      
      // Thêm hiệu ứng gợn nhẹ bằng CSS cho video
      video.style.filter = 'contrast(1.05) brightness(0.95)';
      this.mediaContent.appendChild(video);
      // VideoOptimizer sẽ tự động nhận diện và quản lý video này
    } else {
      const img = document.createElement('img');
      img.src = data.src;
      img.alt = data.title;
      this.mediaContent.appendChild(img);
    }

    // Cập nhật text với GSAP transition mượt mà
    gsap.to([this.titleEl, this.subtitleEl, this.descEl], {
      opacity: 0,
      y: -10,
      duration: 0.2,
      stagger: 0.05,
      onComplete: () => {
        this.titleEl.textContent = data.title;
        this.subtitleEl.textContent = data.subtitle;
        this.descEl.textContent = data.desc;

        gsap.to([this.titleEl, this.subtitleEl, this.descEl], {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        });
      }
    });

    // Cập nhật trạng thái các nút
    const indicators = this.indicatorContainer.querySelectorAll('.indicator-pill');
    indicators.forEach((ind, i) => {
      if (i === index) ind.classList.add('active');
      else ind.classList.remove('active');
    });

    this.currentIndex = index;
  }

  // 3. CHUYỂN ĐỔI MEDIA VỚI HIỆU ỨNG GSAP ZOOM & OUT
  switchMedia(index) {
    if (index === this.currentIndex) return;

    // Hiệu ứng chuyển cảnh chất lỏng/zoom bằng GSAP
    gsap.to(this.mediaWrapper, {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        this.loadMedia(index);
        gsap.to(this.mediaWrapper, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.2)'
        });
      }
    });

    // Tạo hiệu ứng sóng xung kích WebGL trên bong bóng khi chuyển đổi
    this.triggerBubbleImpulse();
  }

  // 4. KÍCH HOẠT WEBGL: TẠO BỌNG NƯỚC/BONG BÓNG 3D PHÁT SÁNG NỀN CARD (Lấy cảm hứng từ Elva)
  initWebGL() {
    if (!this.webglContainer || typeof THREE === 'undefined') return;

    const width = this.webglContainer.clientWidth;
    const height = this.webglContainer.clientHeight;

    // Scene setup
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.z = 8;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.webglContainer.appendChild(this.renderer.domElement);

    // Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xE50914, 2, 20); // Đỏ quân đội
    pointLight1.position.set(3, 3, 2);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xbcce54, 1.5, 20); // Vàng/Xanh lá
    pointLight2.position.set(-3, -3, 2);
    this.scene.add(pointLight2);

    // Create Shiny Glassy Spheres (Bong bóng 3D tương tác)
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
    
    // Shader mô phỏng chất lỏng óng ánh như bong bóng xà phòng/thủy tinh
    const count = 12;
    for (let i = 0; i < count; i++) {
      const scale = 0.3 + Math.random() * 0.7;
      
      // Sử dụng MeshPhysicalMaterial để tạo độ bóng loáng cực cao
      const mat = new THREE.MeshPhysicalMaterial({
        color: i % 2 === 0 ? 0xE50914 : 0x2e7d32,
        roughness: 0.05,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transmission: 0.85, // Tạo hiệu ứng trong suốt xuyên thấu
        ior: 1.5,
        thickness: 0.5,
        transparent: true,
        opacity: 0.6,
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      
      // Vị trí ngẫu nhiên xung quanh khung hình
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3
      );
      
      mesh.scale.set(scale, scale, scale);

      // Lưu trữ các tham số chuyển động tự nhiên
      mesh.userData = {
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        baseZ: mesh.position.z,
        speedX: 0.002 + Math.random() * 0.004,
        speedY: 0.002 + Math.random() * 0.004,
        angleX: Math.random() * Math.PI * 2,
        angleY: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.5 + Math.random() * 1.5,
        noiseScale: 0.2 + Math.random() * 0.3
      };

      this.scene.add(mesh);
      this.spheres.push(mesh);
    }

    // Bắt đầu vòng lặp render
    this.animateWebGL();
  }

  animateWebGL() {
    requestAnimationFrame(() => this.animateWebGL());

    // Di chuyển chuột mượt mà (Lerp)
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    const time = Date.now() * 0.001;

    // Cập nhật chuyển động từng bong bóng
    this.spheres.forEach((sphere, index) => {
      const ud = sphere.userData;

      // 1. Chuyển động bay lơ lửng tự nhiên
      ud.angleX += ud.speedX;
      ud.angleY += ud.speedY;

      // Vị trí lý tưởng kết hợp lơ lửng
      let targetX = ud.baseX + Math.sin(ud.angleX) * 0.8;
      let targetY = ud.baseY + Math.cos(ud.angleY) * 0.8;

      // 2. Phản ứng đẩy/hút nhẹ theo con trỏ chuột
      const dx = this.mouse.x * 3 - sphere.position.x;
      const dy = this.mouse.y * 2 - sphere.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        // Đẩy bong bóng ra xa chuột một chút
        const force = (3 - dist) * 0.15;
        targetX -= (dx / dist) * force;
        targetY -= (dy / dist) * force;
      }

      // Gán vị trí mượt mà
      sphere.position.x += (targetX - sphere.position.x) * 0.05;
      sphere.position.y += (targetY - sphere.position.y) * 0.05;

      // 3. Biến dạng gợn sóng (Wobble) bề mặt bong bóng
      const scaleNoise = 1.0 + Math.sin(time * ud.wobbleSpeed) * 0.08;
      sphere.scale.set(
        sphere.scale.x + (scaleNoise * (sphere.scale.x / sphere.scale.x) - sphere.scale.x) * 0.1,
        sphere.scale.y + (scaleNoise * (sphere.scale.y / sphere.scale.y) - sphere.scale.y) * 0.1,
        sphere.scale.z + (scaleNoise * (sphere.scale.z / sphere.scale.z) - sphere.scale.z) * 0.1
      );

      // Tự xoay nhẹ
      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.003;
    });

    this.renderer.render(this.scene, this.camera);
  }

  // Hiệu ứng bùng nổ nhẹ của các bong bóng khi bấm chuyển media
  triggerBubbleImpulse() {
    if (!this.spheres.length) return;
    this.spheres.forEach(sphere => {
      const forceX = (Math.random() - 0.5) * 1.5;
      const forceY = (Math.random() - 0.5) * 1.5;

      gsap.to(sphere.position, {
        x: sphere.position.x + forceX,
        y: sphere.position.y + forceY,
        duration: 0.6,
        ease: 'power3.out',
        onComplete: () => {
          // Trả về vị trí cũ tự nhiên
          gsap.to(sphere.position, {
            x: sphere.userData.baseX,
            y: sphere.userData.baseY,
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      });
    });
  }

  // 5. CÁC SỰ KIỆN TƯƠNG TÁC CHUỘT (TILT 3D VÀ DI CHUYỂN BONG BÓNG)
  setupEventListeners() {
    window.addEventListener('resize', () => this.onWindowResize());

    // Di chuyển chuột tính toán tọa độ chuẩn hóa (-1 đến 1)
    window.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      this.mouse.targetX = (x - 0.5) * 2;
      this.mouse.targetY = -(y - 0.5) * 2;

      // Hiệu ứng Nghiêng 3D (Parallax Tilt) cho Media Card chính
      if (this.mediaWrapper) {
        const tiltX = (y - 0.5) * 12; // Nghiêng dọc tối đa 12 độ
        const tiltY = -(x - 0.5) * 12; // Nghiêng ngang tối đa 12 độ

        gsap.to(this.mediaWrapper, {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // Reset góc nghiêng khi chuột rời khỏi khung
    this.container.addEventListener('mouseleave', () => {
      this.mouse.targetX = 0;
      this.mouse.targetY = 0;

      if (this.mediaWrapper) {
        gsap.to(this.mediaWrapper, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.6)'
        });
      }
    });
  }

  onWindowResize() {
    if (!this.webglContainer || !this.renderer) return;
    const width = this.webglContainer.clientWidth;
    const height = this.webglContainer.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // 6. XUẤT HIỆN LẦN ĐẦU TIÊN (REVEAL) KHI CUỘN ĐẾN NƠI
  animateReveal() {
    gsap.fromTo('.showcase-header', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.interactive-showcase-container',
        start: 'top 80%'
      }
    });

    gsap.fromTo(this.mediaWrapper, {
      opacity: 0,
      scale: 0.9,
      rotateX: 20
    }, {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      duration: 1.2,
      ease: 'back.out(1.1)',
      scrollTrigger: {
        trigger: '.interactive-showcase-container',
        start: 'top 75%'
      }
    });
  }
}

// Khởi chạy khi tài liệu tải xong
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveShowcase();
});
