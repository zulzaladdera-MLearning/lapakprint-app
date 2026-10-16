import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

def create_screenshot_box(doc, image_number, caption, description):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    set_cell_background(cell, "F8FAFC")
    set_cell_margins(cell, top=180, bottom=180, left=250, right=250)
    
    # Border
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="dashed" w:sz="6" w:space="0" w:color="94A3B8"/>
            <w:left w:val="dashed" w:sz="6" w:space="0" w:color="94A3B8"/>
            <w:bottom w:val="dashed" w:sz="6" w:space="0" w:color="94A3B8"/>
            <w:right w:val="dashed" w:sz="6" w:space="0" w:color="94A3B8"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(4)
    
    run_icon = p.add_run("📷\n")
    run_icon.font.size = Pt(20)
    
    run_placeholder = p.add_run(f"[ TEMPELKAN SCREENSHOT DI SINI ]\n")
    run_placeholder.bold = True
    run_placeholder.font.size = Pt(11)
    run_placeholder.font.color.rgb = RGBColor(30, 41, 59)
    
    run_desc = p.add_run(f"({description})\n")
    run_desc.italic = True
    run_desc.font.size = Pt(9.5)
    run_desc.font.color.rgb = RGBColor(100, 116, 139)
    
    # Caption below table
    p_cap = doc.add_paragraph()
    p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_cap.paragraph_format.space_before = Pt(4)
    p_cap.paragraph_format.space_after = Pt(14)
    run_cap = p_cap.add_run(f"{caption}")
    run_cap.bold = True
    run_cap.font.size = Pt(9.5)
    run_cap.font.color.rgb = RGBColor(71, 85, 105)

def style_heading_1(p):
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    for r in p.runs:
        r.bold = True
        r.font.size = Pt(14)
        r.font.color.rgb = RGBColor(15, 23, 42)

def style_heading_2(p):
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    for r in p.runs:
        r.bold = True
        r.font.size = Pt(12)
        r.font.color.rgb = RGBColor(2, 132, 199)

def style_heading_3(p):
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.keep_with_next = True
    for r in p.runs:
        r.bold = True
        r.font.size = Pt(11)
        r.font.color.rgb = RGBColor(51, 65, 85)

def build_report():
    doc = docx.Document()
    
    # Setup Page Margins: 1 inch (2.54 cm)
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        section.different_first_page_header_footer = True

    # Base normal font
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Calibri'
    normal_style.font.size = Pt(11)
    normal_style.font.color.rgb = RGBColor(30, 41, 59)
    normal_style.paragraph_format.line_spacing = 1.15
    normal_style.paragraph_format.space_after = Pt(6)

    # ================= COVER PAGE =================
    cover_title_p = doc.add_paragraph()
    cover_title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cover_title_p.paragraph_format.space_before = Pt(60)
    cover_title_p.paragraph_format.space_after = Pt(12)
    
    r_kicker = cover_title_p.add_run("LAPORAN AKHIR PROYEK TEKNOLOGI INFORMASI\n")
    r_kicker.font.size = Pt(11)
    r_kicker.font.bold = True
    r_kicker.font.color.rgb = RGBColor(2, 132, 199)
    
    r_main_title = cover_title_p.add_run("PENGEMBANGAN DAN DEPLOYMENT PLATFORM LAPAKPRINT:\nINTEGRASI 1 APLIKASI WEB DAN 1 APLIKASI MOBILE ANDROID\n")
    r_main_title.font.size = Pt(18)
    r_main_title.font.bold = True
    r_main_title.font.color.rgb = RGBColor(15, 23, 42)
    
    r_sub = cover_title_p.add_run("Implementasi dan Orkestrasi Menggunakan Cursor, Antigravity, Hermes Agent,\nDocker, 9router, Ngrok, dan Capacitor")
    r_sub.font.size = Pt(12)
    r_sub.font.italic = True
    r_sub.font.color.rgb = RGBColor(100, 116, 139)
    
    # Spacing line / badge
    p_badge = doc.add_paragraph()
    p_badge.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_badge.paragraph_format.space_before = Pt(40)
    p_badge.paragraph_format.space_after = Pt(50)
    r_badge = p_badge.add_run("— ECOSYSTEM ORCHESTRATION & CLOUD DEPLOYMENT REPORT —")
    r_badge.font.size = Pt(10)
    r_badge.font.bold = True
    r_badge.font.color.rgb = RGBColor(148, 163, 184)
    
    # Metadata Block
    meta_p = doc.add_paragraph()
    meta_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    meta_p.paragraph_format.space_before = Pt(80)
    meta_p.paragraph_format.space_after = Pt(0)
    
    r_meta_lbl = meta_p.add_run("Disusun Oleh:\n")
    r_meta_lbl.font.size = Pt(11)
    r_meta_lbl.font.color.rgb = RGBColor(100, 116, 139)
    
    r_author = meta_p.add_run("TIM PENGEMBANG LAPAKPRINT\n(Project Engineer & AI Workflow Specialist)\n\n")
    r_author.font.size = Pt(12)
    r_author.font.bold = True
    r_author.font.color.rgb = RGBColor(15, 23, 42)
    
    r_inst = meta_p.add_run("PROGRAM TEKNOLOGI INFORMASI DAN SISTEM KOMPUTER\nTAHUN 2026")
    r_inst.font.size = Pt(11)
    r_inst.font.bold = True
    r_inst.font.color.rgb = RGBColor(71, 85, 105)
    
    doc.add_page_break()

    # ================= DAFTAR ISI RINGKAS =================
    toc_p = doc.add_paragraph()
    r = toc_p.add_run("DAFTAR ISI")
    style_heading_1(toc_p)
    toc_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    toc_items = [
        ("BAB I: PENDAHULUAN", "1"),
        ("  1.1 Latar Belakang Proyek LapakPrint", "1"),
        ("  1.2 Rumusan Masalah", "1"),
        ("  1.3 Tujuan dan Luaran (Deliverables)", "2"),
        ("BAB II: ARSITEKTUR DAN LANDASAN TEORI (7 KOMPONEN)", "3"),
        ("  2.1 Arsitektur Terdistribusi LapakPrint", "3"),
        ("  2.2 Analisis 7 Komponen Teknologi", "3"),
        ("  2.3 Matriks Peran dan Alur Kerja Antar Komponen", "4"),
        ("BAB III: METODOLOGI, INSTALASI, DAN IMPLEMENTASI", "5"),
        ("  3.1 Instalasi dan Penggunaan Cursor IDE", "5"),
        ("  3.2 Instalasi dan Operasi Antigravity Agent Harness", "6"),
        ("  3.3 Kontainerisasi Hermes Agent dengan Docker", "7"),
        ("  3.4 Instalasi dan Pengoperasian Docker Engine", "8"),
        ("  3.5 Konfigurasi 9router AI Gateway", "9"),
        ("  3.6 Konfigurasi Ngrok Secure Tunneling", "10"),
        ("  3.7 Pengembangan Aplikasi Web dan Mobile (Capacitor)", "11"),
        ("BAB IV: HASIL PENGUJIAN DAN EVALUASI SISTEM", "13"),
        ("  4.1 Hasil Deployment Web Application (Vercel Cloud)", "13"),
        ("  4.2 Hasil Build dan Distribusi Native Mobile APK", "14"),
        ("  4.3 Matriks Pengujian Fungsionalitas dan Respon Cross-Device", "15"),
        ("BAB V: KESIMPULAN DAN TAUTAN PROYEK", "16"),
        ("  5.1 Kesimpulan", "16"),
        ("  5.2 Saran Pengembangan Lanjutan", "16"),
        ("  5.3 Lampiran URL Akses dan Berkas Installer", "17"),
    ]
    
    toc_table = doc.add_table(rows=0, cols=2)
    toc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    toc_table.autofit = False
    
    for title, pg in toc_items:
        row = toc_table.add_row()
        c1, c2 = row.cells
        c1.width = Inches(5.4)
        c2.width = Inches(1.1)
        
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_before = Pt(2)
        p1.paragraph_format.space_after = Pt(2)
        r1 = p1.add_run(title)
        if title.startswith("BAB"):
            r1.bold = True
            r1.font.color.rgb = RGBColor(15, 23, 42)
        else:
            r1.font.color.rgb = RGBColor(71, 85, 105)
            
        p2 = c2.paragraphs[0]
        p2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p2.paragraph_format.space_before = Pt(2)
        p2.paragraph_format.space_after = Pt(2)
        r2 = p2.add_run(pg)
        if title.startswith("BAB"):
            r2.bold = True
            
    doc.add_page_break()

    # ================= BAB I =================
    h1 = doc.add_paragraph()
    h1.add_run("BAB I: PENDAHULUAN")
    style_heading_1(h1)
    
    h2 = doc.add_paragraph()
    h2.add_run("1.1 Latar Belakang Proyek LapakPrint")
    style_heading_2(h2)
    
    p = doc.add_paragraph()
    p.add_run(
        "Kebutuhan mahasiswa dan civitas akademika terhadap layanan percetakan tugas kuliah, makalah, laporan praktikum, "
        "hingga jilid skripsi berstandar universitas merupakan aktivitas rutin dengan urgensi tinggi. Selama ini, proses "
        "tersebut menghadapi sejumlah kendala konvensional seperti antrean panjang di outlet percetakan mitra kampus, kendala format berkas, "
        "kurangnya transparansi harga, serta absennya sistem pembayaran digital yang terintegrasi langsung dengan verifikasi otomatis. "
        "Untuk menjawab tantangan tersebut, dirancanglah platform LapakPrint sebagai marketplace jasa percetakan kampus terpadu."
    )
    
    p = doc.add_paragraph()
    p.add_run(
        "Platform LapakPrint mengusung prinsip desain antarmuka pixel-matched berstandar e-commerce kelas dunia (Shopee-like UX) "
        "agar mahasiswa merasa sangat familiar saat memesan dokumen, memilih gramatur kertas, memilih jenis jilid hard/soft cover, "
        "memanfaatkan voucher diskon kampus, serta melakukan transaksi menggunakan dompet digital LapakPay dan QRIS terverifikasi. "
        "Sistem ini dituntut memiliki aksesibilitas lintas perangkat: dapat diakses melalui browser komputer/ponsel (Web App) "
        "maupun dipasang sebagai aplikasi mandiri berkinerja tinggi pada perangkat smartphone Android (Mobile APK)."
    )
    
    h2 = doc.add_paragraph()
    h2.add_run("1.2 Rumusan Masalah")
    style_heading_2(h2)
    
    p = doc.add_paragraph()
    p.add_run("Rumusan masalah teknis dan operasional yang dipecahkan dalam proyek ini meliputi:")
    
    problems = [
        "Bagaimana membangun dan mengoptimasi aplikasi web responsif berdesain Shopee-style tanpa adanya cacat visual font inflation pada berbagai merk smartphone Android dan iOS?",
        "Bagaimana membungkus (wrap) kode web Vite + React menjadi installer native Android (.APK) menggunakan Capacitor tanpa ketergantungan pada Google Play Store?",
        "Bagaimana mengorkestrasi ekosistem pengembangan modern yang melibatkan AI Coding Editor (Cursor), Otonomous Agent Harness (Antigravity), Reasoning Agent (Hermes Agent), Kontainerisasi (Docker), AI Gateway (9router), dan Secure Tunneling (Ngrok) secara sinergis?"
    ]
    for prob in problems:
        bp = doc.add_paragraph(style='List Bullet')
        bp.add_run(prob)

    h2 = doc.add_paragraph()
    h2.add_run("1.3 Tujuan dan Luaran (Deliverables)")
    style_heading_2(h2)
    
    p = doc.add_paragraph()
    p.add_run("Tujuan utama yang berhasil diselesaikan secara konkret adalah:")
    
    goals = [
        "Menghasilkan 1 Aplikasi Web Production yang di-host secara permanen di cloud Vercel (https://lapakprint-app.vercel.app).",
        "Menghasilkan 1 Aplikasi Mobile Native Android (LapakPrint.apk) berbasis Capacitor, SDK 36, dan Java 21 yang siap dipasang secara instan.",
        "Mengintegrasikan fitur tombol unduh installer langsung di dalam aplikasi web (Header & Halaman Profil Saya) agar pengguna mobile dapat langsung mengunduh APK.",
        "Mendokumentasikan instalasi dan konfigurasi 7 pilar instrumen: Cursor, Antigravity, Hermes Agent, Docker, 9router, Ngrok, serta Web & Mobile App."
    ]
    for g in goals:
        bp = doc.add_paragraph(style='List Bullet')
        bp.add_run(g)

    # ================= BAB II =================
    h1 = doc.add_paragraph()
    h1.add_run("BAB II: ARSITEKTUR DAN LANDASAN TEORI (7 KOMPONEN)")
    style_heading_1(h1)
    
    h2 = doc.add_paragraph()
    h2.add_run("2.1 Arsitektur Terdistribusi LapakPrint")
    style_heading_2(h2)
    
    p = doc.add_paragraph()
    p.add_run(
        "Arsitektur proyek LapakPrint dirancang dengan pola terdistribusi terisolasi (*isolated distributed development*). "
        "Lingkungan pengembangan lokal memisahkan layer inteligensi buatan (Hermes Agent & 9router), layer orkestrasi perintah (Cursor & Antigravity), "
        "layer penerobosan jaringan publik (Ngrok), dan layer eksekusi aplikasi multi-platform (Vercel & Android Gradle). "
        "Pola ini memastikan bahwa setiap komponen memiliki batasan port dan isolasi proses yang presisi tanpa terjadi interferensi."
    )
    
    h2 = doc.add_paragraph()
    h2.add_run("2.2 Analisis 7 Komponen Teknologi yang Digunakan")
    style_heading_2(h2)
    
    p = doc.add_paragraph()
    p.add_run("Berikut adalah telaah teoritis dan fungsional dari ketujuh komponen:")
    
    tools_desc = [
        ("1. Cursor (AI-First Code Editor)", "IDE modern berbasis fork VS Code yang dipersenjatai model LLM untuk inferensi kode konteks-penuh (full codebase context). Dalam proyek ini, Cursor digunakan untuk refactoring katalog produk cetak, audit kata kunci Shopee menjadi LapakPrint, dan penyusunan komponen modular React."),
        ("2. Antigravity (Autonomous Coding Agent)", "Agent harness otonom berkecepatan tinggi yang mengeksekusi aksi sistem secara terprogram melalui Code Mode dan Plan Mode. Antigravity mengelola build pipeline Gradle, instalasi OpenJDK 21 otomatis melalui winget, konfigurasi properti Android, serta automasi Vercel deployment."),
        ("3. Hermes Agent (Nous Research Reasoning Engine)", "Model penalaran otonom canggih yang dirancang khusus untuk memecahkan instruksi logika multi-langkah dan task reasoning. Dijalankan sebagai dedicated service mandiri pada port 8642."),
        ("4. Docker (Containerization Platform)", "Platform virtualisasi level sistem operasi berbasis container. Docker Desktop v29.7.2 digunakan untuk mengisolasi service `hermes-service` menggunakan image `nousresearch/hermes-agent:latest` sehingga dependensi library AI terisolasi sepenuhnya."),
        ("5. 9router (Local AI Gateway & Reverse Proxy)", "Gateway perutean model AI lokal yang berjalan di endpoint http://127.0.0.1:20128. 9router berfungsi memetakan permintaan prompt dari coding agent ke berbagai model engine secara efisien, menghemat latency jaringan dan biaya token."),
        ("6. Ngrok (Secure Cross-Device Tunneling)", "Layanan reverse proxy tunneling yang mengekspos port 3000 (Vite Dev Server) ke URL publik HTTPS (https://appealing-issue-shimmer.ngrok-free.dev). Memungkinkan pengujian tampilan pixel-perfect langsung dari browser smartphone fisik di berbagai merk tanpa kabel data."),
        ("7. Web & Mobile Platform (React + Capacitor)", "Aplikasi web dibangun menggunakan React 18, Vite 5, Tailwind CSS, dan Lucide Icons. Untuk platform mobile, digunakan @capacitor/core dan @capacitor/android untuk membungkus web assets menjadi binary APK native Android dengan package name id.lapakprint.app.")
    ]
    for title, desc in tools_desc:
        h3 = doc.add_paragraph()
        h3.add_run(title)
        style_heading_3(h3)
        bp = doc.add_paragraph()
        bp.add_run(desc)

    h2 = doc.add_paragraph()
    h2.add_run("2.3 Matriks Peran dan Alur Kerja Antar Komponen")
    style_heading_2(h2)
    
    # Table Matrix
    matrix_table = doc.add_table(rows=1, cols=4)
    matrix_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    matrix_table.autofit = False
    
    headers = ["Komponen", "Alamat / Port", "Fungsi Utama", "Status Integrasi"]
    hdr_row = matrix_table.rows[0]
    for i, h_text in enumerate(headers):
        cell = hdr_row.cells[i]
        set_cell_background(cell, "0284C7")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(10)
        
    matrix_data = [
        ("Cursor", "IDE Lokal", "Editing file sumber UI/UX & Refactor", "Aktif / Terverifikasi"),
        ("Antigravity", "CLI / Agent Harness", "Orkestrasi build, Java setup & Cloud deploy", "Aktif / Terverifikasi"),
        ("Hermes Agent", "0.0.0.0:8642", "Reasoning engine & Autonomous assistance", "Aktif (Container)"),
        ("Docker", "Daemon / Engine v29", "Isolasi runtime container hermes-service", "Aktif / Running"),
        ("9router", "127.0.0.1:20128", "Routing prompt model gateway", "Aktif / Listening"),
        ("Ngrok", "appealing-issue...dev", "Tunneling Vite port 3000 ke internet publik", "Aktif / Online"),
        ("Web App (Vercel)", "lapakprint-app.vercel.app", "Hosting cloud production web marketplace", "Aktif (Live 200 OK)"),
        ("Mobile App (APK)", "LapakPrint.apk", "Installer mandiri Android (SDK 36, Java 21)", "Build Sukses (4.2 MB)")
    ]
    
    for row_idx, item in enumerate(matrix_data):
        row = matrix_table.add_row()
        bg_col = "F8FAFC" if row_idx % 2 == 0 else "FFFFFF"
        for i, val in enumerate(item):
            cell = row.cells[i]
            set_cell_background(cell, bg_col)
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p = cell.paragraphs[0]
            if i in [0, 3]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(val)
            r.font.size = Pt(9.5)
            if i == 3:
                r.bold = True
                r.font.color.rgb = RGBColor(16, 185, 129)
                
    doc.add_page_break()

    # ================= BAB III =================
    h1 = doc.add_paragraph()
    h1.add_run("BAB III: METODOLOGI, INSTALASI, DAN IMPLEMENTASI")
    style_heading_1(h1)
    
    # 3.1 Cursor
    h2 = doc.add_paragraph()
    h2.add_run("3.1 Instalasi dan Penggunaan Cursor IDE")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "Cursor diinstal melalui installer resmi berbasis Windows x64. Setelah proses instalasi selesai, "
        "workspace direktori LapakPrint (D:\\Documents\\LapakPrint) dibuka ke dalam editor. "
        "Penggunaan Cursor dipusatkan pada audit seluruh komponen katalog cetak (src/data/productDetails.js, "
        "src/data/mockData.js, dan src/components/ShopeeHeader.jsx) untuk menghapus semua referensi teks maupun logo "
        "Shopee lama dan menggantinya dengan branding LapakPrint dan LapakPay."
    )
    create_screenshot_box(doc, "3.1", "Gambar 3.1: Antarmuka Editor Cursor Saat Pengelolaan Kode Sumber LapakPrint", "Screenshot tampilan Cursor IDE membuka folder proyek LapakPrint dengan panel navigasi file dan editor kode")

    # 3.2 Antigravity
    h2 = doc.add_paragraph()
    h2.add_run("3.2 Instalasi dan Operasi Antigravity Agent Harness")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "Antigravity bertindak sebagai konduktor otonom selama siklus hidup proyek. Antigravity mengeksekusi pengecekan kesiapan "
        "lingkungan (SDK Android, versi JDK Java, status port proses sistem, dan login token Vercel). "
        "Ketika ditemukan bahwa kompilasi Capacitor memerlukan Java 21 sementara sistem masih menggunakan versi lama, "
        "Antigravity secara otomatis memicu instalasi `Microsoft.OpenJDK.21` melalui package manager Windows (winget), "
        "mengonfigurasi ulang `android/gradle.properties`, dan mematikan daemon Gradle yang tidak kompatibel."
    )
    create_screenshot_box(doc, "3.2", "Gambar 3.2: Eksekusi Otomatisasi Antigravity Agent Harness pada Terminal", "Screenshot jendela Antigravity saat menjalankan inspeksi sistem, build pipeline, atau deployment")

    # 3.3 Docker & Hermes Agent
    h2 = doc.add_paragraph()
    h2.add_run("3.3 Instalasi dan Pengoperasian Docker Desktop & Hermes Agent")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "Docker Desktop Engine v29.7.2 diinstal dan dikonfigurasi dengan backend WSL2 (Windows Subsystem for Linux). "
        "Layanan penalaran Hermes Agent diunduh langsung dari registry publik Nous Research melalui perintah berikut:"
    )
    p_code = doc.add_paragraph()
    p_code.paragraph_format.left_indent = Inches(0.3)
    r_c = p_code.add_run(
        "docker pull nousresearch/hermes-agent:latest\n"
        "docker run -d --name hermes-service -p 8642:8642 nousresearch/hermes-agent:latest\n"
        "docker ps"
    )
    r_c.font.name = 'Consolas'
    r_c.font.size = Pt(9.5)
    r_c.font.color.rgb = RGBColor(15, 23, 42)
    
    p = doc.add_paragraph()
    p.add_run("Kontainer hermes-service berhasil berjalan aktif dengan binding port host 8642:8642.")
    create_screenshot_box(doc, "3.3", "Gambar 3.3: Dashboard Docker Desktop Menampilkan Container hermes-service Aktif", "Screenshot aplikasi Docker Desktop pada menu Containers menunjukkan status 'Running' pada port 8642")
    create_screenshot_box(doc, "3.4", "Gambar 3.4: Log Output Container Hermes Agent pada Terminal", "Screenshot terminal saat menjalankan perintah 'docker ps' atau 'docker logs hermes-service'")

    # 3.4 9router
    h2 = doc.add_paragraph()
    h2.add_run("3.4 Konfigurasi 9router AI Gateway")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "9router dijalankan pada loopback port 127.0.0.1:20128. Gateway ini menyediakan abstraction layer "
        "sehingga agen AI pengembang dapat mengirimkan permintaan inferensi model dengan latency minimal. "
        "Verifikasi status layanan dilakukan dengan melakukan query ping HTTP ke endpoint lokal."
    )
    create_screenshot_box(doc, "3.5", "Gambar 3.5: Gateway 9router Berjalan Aktif pada Port 20128", "Screenshot browser atau terminal curl yang menampilkan respons aktif dari http://127.0.0.1:20128")

    # 3.5 Ngrok
    h2 = doc.add_paragraph()
    h2.add_run("3.5 Konfigurasi Ngrok Secure Tunneling")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "Untuk menguji tampilan antarmuka secara real-time pada berbagai perangkat smartphone fisik tanpa kabel data, "
        "Vite dev server yang berjalan pada http://localhost:3000 ditautkan ke internet publik menggunakan ngrok. "
        "Konfigurasi `vite.config.js` ditambahkan opsi `server: { host: '0.0.0.0', allowedHosts: true }` "
        "untuk mencegah blokade 'Host Blocked' dari Vite security policy."
    )
    p_code = doc.add_paragraph()
    p_code.paragraph_format.left_indent = Inches(0.3)
    r_c = p_code.add_run(
        "ngrok http 3000\n"
        "# Forwarding: https://appealing-issue-shimmer.ngrok-free.dev -> http://localhost:3000"
    )
    r_c.font.name = 'Consolas'
    r_c.font.size = Pt(9.5)
    
    create_screenshot_box(doc, "3.6", "Gambar 3.6: Jendela Terminal Ngrok Menampilkan Sesi Online dan Public Forwarding URL", "Screenshot CLI Ngrok dengan status Online dan URL forwarding https://...ngrok-free.dev")

    # 3.6 Build Android & Capacitor
    h2 = doc.add_paragraph()
    h2.add_run("3.6 Pembangunan Aplikasi Mobile Native Menggunakan Capacitor")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "Aplikasi web diubah menjadi format native Android menggunakan Capacitor CLI. "
        "Setelah inisialisasi `@capacitor/android` dengan ID `id.lapakprint.app`, build web Vite disinkronkan ke folder native. "
        "Selanjutnya, kompilasi Gradle native dijalankan menggunakan Java 21 dan Android SDK Platform 36."
    )
    p_code = doc.add_paragraph()
    p_code.paragraph_format.left_indent = Inches(0.3)
    r_c = p_code.add_run(
        "npm run build\n"
        "npx cap sync\n"
        "cd android\n"
        ".\\gradlew.bat assembleDebug"
    )
    r_c.font.name = 'Consolas'
    r_c.font.size = Pt(9.5)
    
    p = doc.add_paragraph()
    p.add_run("Kompilasi sukses menghasilkan berkas installer mandiri: `app-debug.apk` dengan status **BUILD SUCCESSFUL** dalam 2m 28s.")
    create_screenshot_box(doc, "3.7", "Gambar 3.7: Output Terminal Gradle Menunjukkan Status BUILD SUCCESSFUL", "Screenshot terminal saat kompilasi Gradle assembleDebug selesai dengan pesan BUILD SUCCESSFUL")

    doc.add_page_break()

    # ================= BAB IV =================
    h1 = doc.add_paragraph()
    h1.add_run("BAB IV: HASIL PENGUJIAN DAN EVALUASI SISTEM")
    style_heading_1(h1)
    
    h2 = doc.add_paragraph()
    h2.add_run("4.1 Hasil Deployment Web Application (Vercel Cloud)")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "Aplikasi web LapakPrint berhasil dipublikasikan secara langsung ke cloud hosting global Vercel. "
        "Konfigurasi `vercel.json` disiapkan dengan rewrite route SPA sehingga navigasi halaman tidak menghasilkan error 404. "
        "Aplikasi web dapat diakses publik secara instan dengan protokol HTTPS berkecepatan tinggi."
    )
    
    p_box = doc.add_paragraph()
    p_box.paragraph_format.left_indent = Inches(0.3)
    r_link = p_box.add_run("🌐 URL Produksi Web LapakPrint: https://lapakprint-app.vercel.app")
    r_link.bold = True
    r_link.font.color.rgb = RGBColor(2, 132, 199)
    
    create_screenshot_box(doc, "4.1", "Gambar 4.1: Tampilan Live Web LapakPrint pada Browser Desktop", "Screenshot tampilan website live di Vercel memperlihatkan header oranye, banner flash sale, dan tombol Download App")
    create_screenshot_box(doc, "4.2", "Gambar 4.2: Tampilan Mobile Web LapakPrint (Responsive Smartphone View)", "Screenshot tampilan web saat dibuka melalui browser smartphone atau mode inspeksi mobile 360px")

    h2 = doc.add_paragraph()
    h2.add_run("4.2 Hasil Build dan Distribusi Native Mobile APK")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "Berkas binary installer Android (LapakPrint.apk) berukuran 4.25 MB (4,257,231 bytes) telah berhasil disalin "
        "ke direktori publik web (`public/downloads/LapakPrint.apk`) serta diunggah ke Vercel. "
        "Dengan skema ini, pengguna smartphone dapat mengunduh dan memasang aplikasi secara instan tanpa perlu masuk ke Google Play Store."
    )
    
    p_box2 = doc.add_paragraph()
    p_box2.paragraph_format.left_indent = Inches(0.3)
    r_link2 = p_box2.add_run("📲 Direct Link Unduhan APK: https://lapakprint-app.vercel.app/downloads/LapakPrint.apk")
    r_link2.bold = True
    r_link2.font.color.rgb = RGBColor(16, 185, 129)
    
    create_screenshot_box(doc, "4.3", "Gambar 4.3: Berkas LapakPrint.apk dan Proses Instalasi Native di HP Android", "Screenshot file LapakPrint.apk di File Manager laptop serta screenshot proses instalasi di smartphone Android")
    create_screenshot_box(doc, "4.4", "Gambar 4.4: Aplikasi LapakPrint Berjalan Standalone di Smartphone Android", "Screenshot aplikasi LapakPrint yang telah terpasang dan dibuka di layar smartphone Android")

    h2 = doc.add_paragraph()
    h2.add_run("4.3 Matriks Pengujian Fungsionalitas dan Respon Cross-Device")
    style_heading_2(h2)
    
    test_table = doc.add_table(rows=1, cols=4)
    test_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    test_table.autofit = False
    
    t_headers = ["Skenario Pengujian", "Ekspektasi Hasil", "Hasil Pengujian", "Status"]
    t_hdr_row = test_table.rows[0]
    for i, h_text in enumerate(t_headers):
        cell = t_hdr_row.cells[i]
        set_cell_background(cell, "0F172A")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(9.5)
        
    test_cases = [
        ("Akses URL Vercel", "Web terbuka cepat dengan status HTTP 200 OK", "Terbuka sempurna tanpa latensi", "LULUS"),
        ("Responsive Layout HP", "Teks menu 2 kata rapi tanpa font inflation", "Konsisten di Xiaomi, Oppo, Vivo, iPhone", "LULUS"),
        ("Pembersihan Shopee", "Tidak ada logo 'S' dan teks 'Shopee' muncul", "100% berganti LapakPrint & LapakPay", "LULUS"),
        ("Modal QRIS & LapakPay", "QRIS ter-generate dengan saldo escrow dinamis", "Modal pembayaran tampil interaktif", "LULUS"),
        ("Switch Peran Mitra/User", "Beralih antara portal Mahasiswa dan Mitra Percetakan", "Status peran beralih secara instan", "LULUS"),
        ("Tombol Unduh APK Header", "Memicu browser mengunduh LapakPrint.apk", "Berkas 4.2 MB terunduh otomatis", "LULUS"),
        ("Instalasi APK di HP", "Paket terinstal sebagai native app tanpa address bar", "Aplikasi berjalan mulus di Android", "LULUS")
    ]
    
    for row_idx, item in enumerate(test_cases):
        row = test_table.add_row()
        bg_col = "F8FAFC" if row_idx % 2 == 0 else "FFFFFF"
        for i, val in enumerate(item):
            cell = row.cells[i]
            set_cell_background(cell, bg_col)
            set_cell_margins(cell, top=70, bottom=70, left=90, right=90)
            p = cell.paragraphs[0]
            if i in [0, 3]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(val)
            r.font.size = Pt(9)
            if i == 3:
                r.bold = True
                r.font.color.rgb = RGBColor(16, 185, 129)

    doc.add_page_break()

    # ================= BAB V =================
    h1 = doc.add_paragraph()
    h1.add_run("BAB V: KESIMPULAN DAN TAUTAN PROYEK")
    style_heading_1(h1)
    
    h2 = doc.add_paragraph()
    h2.add_run("5.1 Kesimpulan")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "Berdasarkan seluruh tahapan perancangan, pengembangan, integrasi, dan pengujian yang telah dilaksanakan, "
        "dapat disimpulkan bahwa:"
    )
    
    conclusions = [
        "Seluruh 7 instrumen teknologi yang ditentukan (Cursor, Antigravity, Hermes Agent, Docker, 9router, Ngrok, dan Web/Mobile App) berhasil diintegrasikan secara harmonis tanpa konflik port dan sumber daya sistem.",
        "Aplikasi web LapakPrint telah berhasil dipublikasikan secara global di cloud Vercel (https://lapakprint-app.vercel.app) dengan desain Shopee-style yang responsif di seluruh brand smartphone.",
        "Aplikasi mobile mandiri berhasil dibuild menjadi file LapakPrint.apk (app-debug.apk) menggunakan Capacitor dan Gradle native dengan dukungan Java 21, memberikan kebebasan instalasi tanpa Play Store.",
        "Distribusi APK menjadi sangat mudah karena berkas installer disematkan langsung di dalam hosting web, memungkinkan pengguna mengunduh APK dalam 1 klik dari antarmuka aplikasi."
    ]
    for c in conclusions:
        bp = doc.add_paragraph(style='List Bullet')
        bp.add_run(c)

    h2 = doc.add_paragraph()
    h2.add_run("5.2 Saran Pengembangan Lanjutan")
    style_heading_2(h2)
    p = doc.add_paragraph()
    p.add_run(
        "Untuk pengembangan platform LapakPrint pada fase komersial skala penuh, disarankan beberapa peningkatan berikut:"
    )
    suggestions = [
        "Integrasi backend database realtime (seperti Supabase atau PostgreSQL) untuk sinkronisasi antrean cetak secara live antara mitra percetakan dan mahasiswa.",
        "Penerapan Web Push Notification menggunakan Firebase Cloud Messaging (FCM) pada aplikasi mobile agar mahasiswa menerima notifikasi instan saat dokumen selesai dijilid.",
        "Integrasi Payment Gateway resmi (seperti Midtrans atau Xendit) untuk otomatisasi settlement dana QRIS langsung ke rekening mitra percetakan kampus."
    ]
    for s in suggestions:
        bp = doc.add_paragraph(style='List Bullet')
        bp.add_run(s)

    h2 = doc.add_paragraph()
    h2.add_run("5.3 Lampiran Tautan Akses Proyek")
    style_heading_2(h2)
    
    links = [
        ("Web Application Live (Vercel)", "https://lapakprint-app.vercel.app"),
        ("Tautan Unduhan Langsung APK", "https://lapakprint-app.vercel.app/downloads/LapakPrint.apk"),
        ("Ngrok Cross-Device Testing Tunnel", "https://appealing-issue-shimmer.ngrok-free.dev"),
        ("Local 9router AI Gateway", "http://127.0.0.1:20128"),
        ("Local Hermes Agent Container", "http://localhost:8642"),
        ("Vite Local Development Server", "http://localhost:3000")
    ]
    
    link_table = doc.add_table(rows=1, cols=2)
    link_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    link_table.autofit = False
    
    l_hdr = link_table.rows[0]
    for i, title in enumerate(["Entitas Layanan", "Tautan URL / Endpoint"]):
        cell = l_hdr.cells[i]
        set_cell_background(cell, "0284C7")
        p = cell.paragraphs[0]
        r = p.add_run(title)
        r.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(10)
        
    for r_idx, (ent, url) in enumerate(links):
        row = link_table.add_row()
        bg_col = "F8FAFC" if r_idx % 2 == 0 else "FFFFFF"
        c1, c2 = row.cells
        set_cell_background(c1, bg_col)
        set_cell_background(c2, bg_col)
        set_cell_margins(c1, top=80, bottom=80, left=100, right=100)
        set_cell_margins(c2, top=80, bottom=80, left=100, right=100)
        
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(ent)
        r1.font.size = Pt(9.5)
        r1.bold = True
        
        p2 = c2.paragraphs[0]
        r2 = p2.add_run(url)
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = RGBColor(2, 132, 199)
        r2.underline = True

    # Save document
    output_path = "Laporan_Proyek_LapakPrint.docx"
    doc.save(output_path)
    print(f"Laporan berhasil dibuat: {output_path}")

if __name__ == "__main__":
    build_report()
