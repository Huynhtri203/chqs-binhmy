/**
 * lang.js — Chuyển đổi ngôn ngữ Việt / English
 * Ban CHQS Xã Bình Mỹ · Cổng Thông Tin Điện Tử
 * -----------------------------------------------
 * Cách dùng: thêm attribute data-i18n="key" vào phần tử HTML,
 * sau đó gọi initLang() sau khi DOM đã sẵn sàng.
 */

const LANG_KEY = 'bchqs_lang';

const translations = {
  vi: {
    // ── HERO ──────────────────────────────────────────────────────────────────
    'hero.subtitle':    'Ban Chỉ huy Quân sự · Xã Bình Mỹ TP.HCM',
    'hero.title':       'CỔNG THÔNG TIN ĐIỆN TỬ',
    'hero.desc':        'Phục vụ nhân dân — Bảo vệ Tổ quốc — Xây dựng lực lượng vũ trang vững mạnh',

    // ── NAV ───────────────────────────────────────────────────────────────────
    'nav.home':         '🏠 Trang chủ',
    'nav.intro':        '📋 Giới thiệu',
    'nav.news':         '📰 Tin tức',
    'nav.faq':          '❓ Hỏi đáp',
    'nav.contact':      '📞 Liên hệ',
    'nav.lookup':       '🔍 Tra cứu CCCD',
    'nav.recruit':      '🪖 Tuyển quân',
    'nav.edu':          '🎓 Tuyển sinh',
    'nav.dieudong':     '📋 Quyết định ĐĐ',

    // ── STATS ─────────────────────────────────────────────────────────────────
    'stat.citizens':    'Công dân tuổi 17',
    'stat.founded':     'Năm thành lập',
    'stat.complete':    'Hoàn thành chỉ tiêu',

    // ── QUICK LINKS ───────────────────────────────────────────────────────────
    'ql.lookup':        '🔍 Tra cứu thông tin cá nhân',
    'ql.recruit':       '🪖 Đăng ký tuyển quân',
    'ql.edu':           '🎓 Đăng ký tuyển sinh',
    'ql.contact':       '📞 Liên hệ Ban CHQS',

    // ── HOME CARDS ────────────────────────────────────────────────────────────
    'home.news.title':          'TIN TỨC NỔI BẬT',
    'home.news.banner1.title':  'Lễ giao quân Nghĩa vụ Quân sự năm 2026',
    'home.news.banner1.meta':   'Tháng 02/2026 · Ban CHQS Xã Bình Mỹ',
    'home.news.banner2.title':  'Hội thao Quốc phòng năm 2026',
    'home.news.banner2.meta':   'Tháng 11/2026 · Đạt giải Nhì toàn đoàn',
    'home.news.viewall':        'Xem tất cả tin tức →',
    'home.notice.title':        'THÔNG BÁO MỚI NHẤT',
    'home.notice.1':            'Triệu tập đăng ký nghĩa vụ quân sự năm 2026',
    'home.notice.2':            'Lịch khám sức khỏe tuyển sinh trường quân đội năm 2026',
    'home.notice.3':            'Tuyên truyền Luật Nghĩa vụ Quân sự tại các ấp',

    // ── SLIDER CAPTIONS ───────────────────────────────────────────────────────
    'slide.1':  'Lễ giao quân Nghĩa vụ Quân sự năm 2026',
    'slide.2':  'Hội thao Quốc phòng năm 2026',
    'slide.3':  'Huấn luyện Dân quân tự vệ năm 2026',

    // ── GIỚI THIỆU ────────────────────────────────────────────────────────────
    'intro.history.title':  'LỊCH SỬ THÀNH LẬP',
    'intro.history.p1':     'Ban Chỉ huy Quân sự Xã Bình Mỹ được thành lập theo quy định của Luật Quốc phòng và Luật Dân quân tự vệ, là cơ quan quân sự địa phương thuộc UBND Xã Bình Mỹ, Thành phố Hồ Chí Minh.',
    'intro.history.p2':     'Trải qua hơn 25 năm xây dựng và phát triển, Ban CHQS Xã Bình Mỹ đã không ngừng lớn mạnh, hoàn thành xuất sắc nhiệm vụ quân sự — quốc phòng tại địa phương, góp phần bảo vệ vững chắc an ninh chính trị, trật tự an toàn xã hội trên địa bàn xã.',
    'intro.history.p3':     'Trong những năm qua, Ban CHQS xã liên tục được Bộ CHQS TP.HCM và UBND tặng bằng khen, giấy khen vì có thành tích xuất sắc trong công tác quân sự — quốc phòng địa phương.',
    'intro.duties.title':   'CHỨC NĂNG NHIỆM VỤ',
    'intro.duty.1':         'Tham mưu cho cấp ủy Đảng, chính quyền địa phương về công tác quân sự — quốc phòng trên địa bàn xã',
    'intro.duty.2':         'Xây dựng, huấn luyện, quản lý lực lượng dân quân tự vệ đạt tiêu chuẩn chiến đấu theo quy định',
    'intro.duty.3':         'Tổ chức thực hiện công tác tuyển quân, giao quân nghĩa vụ quân sự hàng năm đảm bảo đúng số lượng, chất lượng và tiến độ',
    'intro.duty.4':         'Quản lý hồ sơ quân sự, thống kê lực lượng dự bị động viên, công dân trong độ tuổi nghĩa vụ quân sự trên địa bàn',
    'intro.duty.5':         'Tuyên truyền, phổ biến giáo dục pháp luật về quốc phòng, an ninh, Luật Nghĩa vụ Quân sự cho nhân dân',
    'intro.duty.6':         'Phối hợp với lực lượng Công an xã trong công tác giữ gìn an ninh trật tự, phòng chống tội phạm, thiên tai, dịch bệnh',
    'intro.duty.7':         'Thực hiện chế độ trực sẵn sàng chiến đấu 24/7, đảm bảo xử lý kịp thời các tình huống phát sinh',
    'intro.org.title':      'CƠ CẤU TỔ CHỨC BAN CHQS',
    'intro.org.1.title':    'CHỈ HUY TRƯỞNG',
    'intro.org.1.desc':     'Phụ trách chung, chịu trách nhiệm toàn diện trước cấp trên và UBND xã',
    'intro.org.2.title':    'CHỈ HUY PHÓ — CHÍNH TRỊ VIÊN PHÓ',
    'intro.org.2.desc':     'Phụ trách công tác đảng, công tác chính trị, tư tưởng trong lực lượng',
    'intro.org.3.title':    'CHỈ HUY PHÓ — THAM MƯU',
    'intro.org.3.desc':     'Phụ trách công tác tham mưu, kế hoạch, huấn luyện, tuyển quân',
    'intro.org.4.title':    'TRUNG ĐỘI DÂN QUÂN THƯỜNG TRỰC',
    'intro.org.4.desc':     'Thực hiện nhiệm vụ trực sẵn sàng chiến đấu, tuần tra, bảo vệ địa bàn',
    'intro.org.5.title':    'LỰC LƯỢNG DÂN QUÂN TỰ VỆ CÁC ẤP',
    'intro.org.5.desc':     'Tổ chức theo từng ấp, phối hợp thực hiện nhiệm vụ quốc phòng — an ninh cơ sở',

    // ── TIN TỨC ───────────────────────────────────────────────────────────────
    'news.cat.1':   'Giao quân NVQS',
    'news.title.1': 'Lễ giao nhận quân Nghĩa vụ Quân sự năm 2026 tại xã Bình Mỹ',
    'news.date.1':  '📅 Tháng 02/2026',
    'news.cat.2':   'Hội thao Quốc phòng',
    'news.title.2': 'Xã Bình Mỹ đạt giải Nhì Hội thao Quốc phòng năm 2025',
    'news.date.2':  '📅 Tháng 11/2025',
    'news.cat.3':   'Huấn luyện Dân quân',
    'news.title.3': 'Kết thúc đợt huấn luyện dân quân tự vệ năm 2025 — 100% quân số hoàn thành',
    'news.date.3':  '📅 Tháng 10/2025',
    'news.cat.4':   'Trực SSCĐ',
    'news.title.4': 'Tăng cường công tác trực sẵn sàng chiến đấu dịp Tết Nguyên Đán 2026',
    'news.date.4':  '📅 Tháng 01/2026',
    'news.cat.5':   'Tuyên truyền NVQS',
    'news.title.5': 'Tuyên truyền Luật Nghĩa vụ Quân sự tại 6 ấp trên địa bàn xã Bình Mỹ',
    'news.date.5':  '📅 Tháng 12/2025',
    'news.cat.6':   'Tuyển sinh Quân sự',
    'news.title.6': 'Khai mạc đợt sơ tuyển tuyển sinh trường quân đội năm 2026 tại xã',
    'news.date.6':  '📅 Tháng 03/2026',

    // ── HỎI ĐÁP ──────────────────────────────────────────────────────────────
    'faq.section.title':  'CÂU HỎI THƯỜNG GẶP',
    'faq.q1': 'Công dân nam đến tuổi nào phải đăng ký nghĩa vụ quân sự?',
    'faq.a1': 'Theo Luật Nghĩa vụ Quân sự 2015, công dân nam đủ 17 tuổi phải đến Ban CHQS xã để đăng ký nghĩa vụ quân sự. Độ tuổi gọi nhập ngũ là từ đủ 18 tuổi đến hết 25 tuổi (hoặc đến 27 tuổi với trường hợp được tạm hoãn).',
    'faq.q2': 'Đang học đại học có phải nhập ngũ không?',
    'faq.a2': 'Sinh viên đang học tại các cơ sở giáo dục đại học được tạm hoãn gọi nhập ngũ trong thời gian học. Tuy nhiên vẫn phải đăng ký nghĩa vụ quân sự và sau khi tốt nghiệp sẽ được xem xét gọi nhập ngũ theo quy định.',
    'faq.q3': 'Thời hạn phục vụ tại ngũ là bao lâu?',
    'faq.a3': 'Thời hạn phục vụ tại ngũ trong thời bình là 24 tháng (2 năm). Hạ sĩ quan, binh sĩ phục vụ tại ngũ tham gia bảo vệ đảo, vùng biển, vùng trời của Tổ quốc hoặc đơn vị chiến đấu phòng thủ vùng đặc biệt khó khăn có thể kéo dài thêm theo quy định.',
    'faq.q4': 'Trốn tránh nghĩa vụ quân sự bị xử phạt như thế nào?',
    'faq.a4': 'Theo Nghị định 120/2013/NĐ-CP, không đăng ký nghĩa vụ quân sự phạt tiền từ 10-12 triệu đồng. Không chấp hành lệnh gọi nhập ngũ phạt tiền từ 15-25 triệu đồng. Trường hợp nghiêm trọng có thể bị truy cứu trách nhiệm hình sự.',
    'faq.q5': 'Công dân nữ có phải thực hiện nghĩa vụ quân sự không?',
    'faq.a5': 'Công dân nữ trong độ tuổi thực hiện nghĩa vụ quân sự, trong thời bình nếu tự nguyện và quân đội có nhu cầu thì được phục vụ tại ngũ. Một số ngành nghề trong quân đội ưu tiên tuyển nữ như quân y, thông tin, kỹ thuật.',
    'faq.q6': 'Làm thế nào để tra cứu thông tin hồ sơ quân sự cá nhân?',
    'faq.a6': 'Bạn có thể tra cứu thông tin hồ sơ quân sự cá nhân trực tiếp trên cổng thông tin này tại mục "Tra cứu". Chỉ cần nhập đúng số CCCD và họ tên khai sinh là xem được thông tin của mình.',
    'faq.q7': 'Liên hệ Ban CHQS xã ở đâu và giờ nào?',
    'faq.a7': 'Ban CHQS Xã Bình Mỹ đặt tại trụ sở UBND Xã Bình Mỹ, TP.HCM. Giờ làm việc: Thứ Hai đến Thứ Sáu, 7:30 – 11:30 và 13:30 – 17:00. Liên hệ qua Zalo: 09875948.. hoặc Facebook trang Ban CHQS Xã Bình Mỹ.',

    // ── LIÊN HỆ ──────────────────────────────────────────────────────────────
    'contact.section.title':  'THÔNG TIN LIÊN HỆ',
    'contact.map.open':       '🗺️ Mở Google Maps',
    'contact.addr.label':     'Địa chỉ',
    'contact.addr.value':     'UBND Xã Bình Mỹ, TP.HCM',
    'contact.hours.label':    'Giờ làm việc',
    'contact.hours.value':    'T2–T6: 7:30–11:30 & 13:30–17:00',
    'contact.zalo.label':     'Zalo',
    'contact.zalo.value':     '09875948..',
    'contact.fb.label':       'Facebook',
    'contact.fb.value':       'Ban CHQS Xã Bình Mỹ',
    'contact.form.title':     'GỬI CÂU HỎI / PHẢN ÁNH',
    'contact.form.name':      'Họ và tên *',
    'contact.form.name.ph':   'Nhập họ và tên',
    'contact.form.phone':     'Số điện thoại *',
    'contact.form.phone.ph':  'Số liên lạc',
    'contact.form.msg':       'Nội dung câu hỏi / phản ánh *',
    'contact.form.msg.ph':    'Nhập nội dung cần hỏi hoặc phản ánh...',
    'contact.form.submit':    'Gửi câu hỏi',
    'contact.form.success':   '✅ Đã nhận câu hỏi! Ban CHQS xã sẽ phản hồi qua số điện thoại của bạn trong vòng 1–2 ngày làm việc.',

    // ── SEARCH ────────────────────────────────────────────────────────────────
    'search.placeholder':     'Tìm kiếm tin tức, hỏi đáp, giới thiệu...',
    'search.hint':            'Nhập từ khóa để tìm kiếm nội dung trang...',
    'search.empty':           'Không tìm thấy kết quả cho',

    // ── FOOTER ────────────────────────────────────────────────────────────────
    'footer.name':    'BAN CHỈ HUY QUÂN SỰ XÃ BÌNH MỸ',
    'footer.addr':    'Thành phố Hồ Chí Minh',
    'footer.zalo':    'Zalo: 09875948..',
    'footer.lookup':  '🔍 Tra cứu',
    'footer.recruit': '🪖 Tuyển quân',
    'footer.edu':     '🎓 Tuyển sinh',

    // ── LANG BUTTON ───────────────────────────────────────────────────────────
    'lang.btn': '🇬🇧 EN',

    // ── HOẠT ĐỘNG SLIDER ──────────────────────────────────────────────────────
    'act.title':  'HOẠT ĐỘNG NỔI BẬT',
    'act.sub':    'Ban Chỉ huy Quân sự Xã Bình Mỹ',
    'act.tag.1':  'Giao quân NVQS',
    'act.name.1': 'Lễ giao nhận quân Nghĩa vụ Quân sự năm 2026',
    'act.date.1': '📅 Tháng 02/2026',
    'act.tag.2':  'Hội thao Quốc phòng',
    'act.name.2': 'Hội thao Quốc phòng năm 2026 — Giải Nhì toàn đoàn',
    'act.date.2': '📅 Tháng 11/2025',
    'act.tag.3':  'Huấn luyện Dân quân',
    'act.name.3': 'Huấn luyện Dân quân tự vệ năm 2025 — 100% hoàn thành',
    'act.date.3': '📅 Tháng 10/2025',
    'act.tag.4':  'Trực SSCĐ',
    'act.name.4': 'Trực sẵn sàng chiến đấu 24/7 dịp Tết Nguyên Đán 2026',
    'act.date.4': '📅 Tháng 01/2026',
    'act.tag.5':  'Tuyên truyền NVQS',
    'act.name.5': 'Tuyên truyền Luật Nghĩa vụ Quân sự tại 6 ấp xã Bình Mỹ',
    'act.date.5': '📅 Tháng 12/2025',
  },

  en: {
    // ── HERO ──────────────────────────────────────────────────────────────────
    'hero.subtitle':    'Military Command · Binh My Commune, HCMC',
    'hero.title':       'OFFICIAL INFORMATION PORTAL',
    'hero.desc':        'Serving the people — Defending the Homeland — Building a strong armed force',

    // ── NAV ───────────────────────────────────────────────────────────────────
    'nav.home':         '🏠 Home',
    'nav.intro':        '📋 About',
    'nav.news':         '📰 News',
    'nav.faq':          '❓ FAQ',
    'nav.contact':      '📞 Contact',
    'nav.lookup':       '🔍 ID Lookup',
    'nav.recruit':      '🪖 Enlistment',
    'nav.edu':          '🎓 Admission',

    // ── STATS ─────────────────────────────────────────────────────────────────
    'stat.citizens':    'Citizens aged 17',
    'stat.founded':     'Years established',
    'stat.complete':    'Quota fulfilled',

    // ── QUICK LINKS ───────────────────────────────────────────────────────────
    'ql.lookup':        '🔍 Personal record lookup',
    'ql.recruit':       '🪖 Military enlistment',
    'ql.edu':           '🎓 Military school admission',
    'ql.contact':       '📞 Contact Command HQ',

    // ── HOME CARDS ────────────────────────────────────────────────────────────
    'home.news.title':          'FEATURED NEWS',
    'home.news.banner1.title':  'Military Conscription Ceremony 2026',
    'home.news.banner1.meta':   'Feb 2026 · Binh My Commune Military Command',
    'home.news.banner2.title':  'Defense Sports Tournament 2026',
    'home.news.banner2.meta':   'Nov 2026 · 2nd Place Overall',
    'home.news.viewall':        'View all news →',
    'home.notice.title':        'LATEST ANNOUNCEMENTS',
    'home.notice.1':            'Call-up for military service registration 2026',
    'home.notice.2':            'Medical examination schedule for military school applicants 2026',
    'home.notice.3':            'Military Service Law outreach at local hamlets',

    // ── SLIDER CAPTIONS ───────────────────────────────────────────────────────
    'slide.1':  'Military Conscription Ceremony 2026',
    'slide.2':  'Defense Sports Tournament 2026',
    'slide.3':  'Militia Training Exercise 2026',

    // ── GIỚI THIỆU ────────────────────────────────────────────────────────────
    'intro.history.title':  'HISTORY & ESTABLISHMENT',
    'intro.history.p1':     'Binh My Commune Military Command was established in accordance with the Law on National Defense and the Law on Militia and Self-Defense Forces, serving as the local military authority under Binh My Commune People\'s Committee, Ho Chi Minh City.',
    'intro.history.p2':     'Over more than 25 years of development, the Command has grown steadily, excellently fulfilling its military and national defense duties, contributing to the firm protection of political security and social order in the commune.',
    'intro.history.p3':     'In recent years, the Command has continuously received commendations from the HCMC Military Command and the People\'s Committee for outstanding achievements in local military and defense work.',
    'intro.duties.title':   'FUNCTIONS & DUTIES',
    'intro.duty.1':         'Advise the Party Committee and local government on military and national defense affairs within the commune',
    'intro.duty.2':         'Build, train and manage the militia force to meet combat-readiness standards as required',
    'intro.duty.3':         'Organize annual conscription and military handover activities, ensuring correct numbers, quality and schedule',
    'intro.duty.4':         'Manage military records and compile statistics on reserve forces and citizens of conscription age',
    'intro.duty.5':         'Disseminate and educate the public on national defense, security, and the Law on Military Service',
    'intro.duty.6':         'Coordinate with the Commune Police in maintaining public order, preventing crime, natural disasters and epidemics',
    'intro.duty.7':         'Maintain 24/7 combat-readiness duty to ensure timely response to any arising situations',
    'intro.org.title':      'ORGANIZATIONAL STRUCTURE',
    'intro.org.1.title':    'COMMANDING OFFICER',
    'intro.org.1.desc':     'Overall command, fully accountable to superiors and the Commune People\'s Committee',
    'intro.org.2.title':    'DEPUTY COMMANDER — POLITICAL OFFICER',
    'intro.org.2.desc':     'Responsible for Party affairs, political work and ideological guidance within the force',
    'intro.org.3.title':    'DEPUTY COMMANDER — STAFF',
    'intro.org.3.desc':     'Responsible for staff advisory work, planning, training and conscription',
    'intro.org.4.title':    'STANDING MILITIA PLATOON',
    'intro.org.4.desc':     'Carries out combat-readiness duty, patrols and territorial protection',
    'intro.org.5.title':    'HAMLET-LEVEL MILITIA UNITS',
    'intro.org.5.desc':     'Organized by hamlet, coordinating national defense and grassroots security tasks',

    // ── TIN TỨC ───────────────────────────────────────────────────────────────
    'news.cat.1':   'Conscription',
    'news.title.1': 'Military Conscription Handover Ceremony 2026 at Binh My Commune',
    'news.date.1':  '📅 February 2026',
    'news.cat.2':   'Defense Sports',
    'news.title.2': 'Binh My Commune wins 2nd Place at Defense Sports Tournament 2025',
    'news.date.2':  '📅 November 2025',
    'news.cat.3':   'Militia Training',
    'news.title.3': 'Militia training exercise 2025 concluded — 100% completion rate',
    'news.date.3':  '📅 October 2025',
    'news.cat.4':   'Combat Readiness',
    'news.title.4': 'Enhanced combat-readiness duty during Lunar New Year 2026',
    'news.date.4':  '📅 January 2026',
    'news.cat.5':   'Law Outreach',
    'news.title.5': 'Military Service Law outreach conducted at all 6 hamlets of Binh My Commune',
    'news.date.5':  '📅 December 2025',
    'news.cat.6':   'Military Admission',
    'news.title.6': 'Opening of preliminary selection for military school applicants 2026',
    'news.date.6':  '📅 March 2026',

    // ── HỎI ĐÁP ──────────────────────────────────────────────────────────────
    'faq.section.title':  'FREQUENTLY ASKED QUESTIONS',
    'faq.q1': 'At what age must male citizens register for military service?',
    'faq.a1': 'Under the 2015 Law on Military Service, male citizens who have reached 17 years of age must register with the Commune Military Command. The call-up age for active duty is from 18 to 25 years old (or up to 27 for those who have been granted a deferral).',
    'faq.q2': 'Do university students have to join the military?',
    'faq.a2': 'Students enrolled in higher education institutions are granted a deferral for the duration of their studies. However, they must still register for military service, and may be called up after graduation in accordance with regulations.',
    'faq.q3': 'How long is the term of active military service?',
    'faq.a3': 'The term of active service in peacetime is 24 months (2 years). NCOs and soldiers serving in island defense, maritime, or airspace units, or in combat units in especially difficult areas, may serve longer as prescribed.',
    'faq.q4': 'What are the penalties for evading military service?',
    'faq.a4': 'Under Decree 120/2013/NĐ-CP, failure to register for military service is fined 10–12 million VND. Failure to comply with an induction order is fined 15–25 million VND. Serious cases may result in criminal prosecution.',
    'faq.q5': 'Are female citizens required to perform military service?',
    'faq.a5': 'Female citizens of conscription age may serve on active duty in peacetime if they volunteer and the military has a need. Some fields such as military medicine, communications and engineering prioritize female recruits.',
    'faq.q6': 'How can I look up my personal military record?',
    'faq.a6': 'You can look up your personal military record directly on this portal under the "Lookup" section. Simply enter your National ID number and full registered name to view your information.',
    'faq.q7': 'Where and when can I contact the Commune Military Command?',
    'faq.a7': 'Binh My Commune Military Command is located at Binh My Commune People\'s Committee, Ho Chi Minh City. Office hours: Monday to Friday, 7:30–11:30 and 13:30–17:00. Contact via Zalo: 09875948.. or the Facebook page of Binh My Commune Military Command.',

    // ── LIÊN HỆ ──────────────────────────────────────────────────────────────
    'contact.section.title':  'CONTACT INFORMATION',
    'contact.map.open':       '🗺️ Open Google Maps',
    'contact.addr.label':     'Address',
    'contact.addr.value':     'Binh My Commune People\'s Committee, HCMC',
    'contact.hours.label':    'Office Hours',
    'contact.hours.value':    'Mon–Fri: 7:30–11:30 & 13:30–17:00',
    'contact.zalo.label':     'Zalo',
    'contact.zalo.value':     '09875948..',
    'contact.fb.label':       'Facebook',
    'contact.fb.value':       'Binh My Commune Military Command',
    'contact.form.title':     'SEND A QUESTION / FEEDBACK',
    'contact.form.name':      'Full name *',
    'contact.form.name.ph':   'Enter your full name',
    'contact.form.phone':     'Phone number *',
    'contact.form.phone.ph':  'Contact number',
    'contact.form.msg':       'Question / feedback *',
    'contact.form.msg.ph':    'Enter your question or feedback...',
    'contact.form.submit':    'Send message',
    'contact.form.success':   '✅ Message received! The Military Command will respond to your phone number within 1–2 working days.',

    // ── SEARCH ────────────────────────────────────────────────────────────────
    'search.placeholder':     'Search news, FAQ, about...',
    'search.hint':            'Type a keyword to search page content...',
    'search.empty':           'No results found for',

    // ── FOOTER ────────────────────────────────────────────────────────────────
    'footer.name':    'BINH MY COMMUNE MILITARY COMMAND',
    'footer.addr':    'Ho Chi Minh City',
    'footer.zalo':    'Zalo: 09875948..',
    'footer.lookup':  '🔍 Lookup',
    'footer.recruit': '🪖 Enlistment',
    'footer.edu':     '🎓 Admission',

    // ── LANG BUTTON ───────────────────────────────────────────────────────────
    'lang.btn': '🇻🇳 VI',

    // ── HOẠT ĐỘNG SLIDER ──────────────────────────────────────────────────────
    'act.title':  'FEATURED ACTIVITIES',
    'act.sub':    'Binh My Commune Military Command',
    'act.tag.1':  'Conscription',
    'act.name.1': 'Military Conscription Handover Ceremony 2026',
    'act.date.1': '📅 February 2026',
    'act.tag.2':  'Defense Sports',
    'act.name.2': 'Defense Sports Tournament 2026 — 2nd Place Overall',
    'act.date.2': '📅 November 2025',
    'act.tag.3':  'Militia Training',
    'act.name.3': 'Militia Training Exercise 2025 — 100% Completion',
    'act.date.3': '📅 October 2025',
    'act.tag.4':  'Combat Readiness',
    'act.name.4': '24/7 Combat-Readiness Duty during Lunar New Year 2026',
    'act.date.4': '📅 January 2026',
    'act.tag.5':  'Law Outreach',
    'act.name.5': 'Military Service Law Outreach at all 6 Hamlets',
    'act.date.5': '📅 December 2025',
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Core helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Lấy ngôn ngữ hiện tại từ localStorage, mặc định là 'vi' */
function getCurrentLang() {
  return localStorage.getItem(LANG_KEY) || 'vi';
}

/** Lấy chuỗi dịch theo key; trả về key nếu không tìm thấy */
function t(key, lang) {
  lang = lang || getCurrentLang();
  return (translations[lang] && translations[lang][key]) || key;
}

/** Cập nhật toàn bộ DOM: áp dụng tất cả data-i18n */
function applyTranslations(lang) {
  lang = lang || getCurrentLang();

  // Nội dung text thường
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key, lang);
    if (val !== key) el.textContent = val;
  });

  // placeholder cho input / textarea
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = t(key, lang);
    if (val !== key) el.setAttribute('placeholder', val);
  });

  // Cập nhật nút ngôn ngữ
  const btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.textContent = t('lang.btn', lang);

  // Cập nhật placeholder tìm kiếm
  const si = document.getElementById('search-input');
  if (si) si.setAttribute('placeholder', t('search.placeholder', lang));

  // Cập nhật search hint
  const sh = document.getElementById('search-results');
  if (sh && sh.querySelector('.search-hint')) {
    sh.querySelector('.search-hint').textContent = t('search.hint', lang);
  }
}

/** Chuyển đổi ngôn ngữ và lưu vào localStorage */
function toggleLang() {
  const current = getCurrentLang();
  const next = current === 'vi' ? 'en' : 'vi';
  localStorage.setItem(LANG_KEY, next);
  applyTranslations(next);

  // Animate nút
  const btn = document.getElementById('lang-toggle-btn');
  if (btn) {
    btn.style.transform = 'scale(0.85)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
  }
}

/** Khởi tạo — gọi sau khi DOM sẵn sàng */
function initLang() {
  applyTranslations(getCurrentLang());
}

// ─────────────────────────────────────────────────────────────────────────────
// Auto-init khi DOM ready
// ─────────────────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLang);
} else {
  initLang();
}
