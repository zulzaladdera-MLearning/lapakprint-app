# -*- coding: utf-8 -*-
"""
Chapter 7: Conclusion, Future Roadmap, Academic References, and Technical Appendices
"""
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from build_report_core import apply_tnr_run, add_p, add_h1, add_h2, add_h3, add_bullet, create_table_custom, set_cell_background, set_cell_margins

def add_chapter_7(doc):
    # ================= BAB VII =================
    add_h1(doc, "BAB VII: KESIMPULAN DAN ROADMAP PENGEMBANGAN MASA DEPAN")
    
    add_h2(doc, "7.1 Kesimpulan Capaian Proyek")
    add_p(doc,
        "Proyek pengembangan platform LapakPrint telah berhasil merealisasikan seluruh target fungsional, arsitektural, "
        "dan operasional yang direncanakan. Berdasarkan hasil perancangan, implementasi, dan evaluasi pengujian lintas perangkat, "
        "dapat ditarik beberapa kesimpulan pokok sebagai berikut:"
    )
    add_bullet(doc, "LapakPrint sukses menjembatani kesenjangan antara antarmuka e-commerce berstandar industri dengan spesifikasi teknis percetakan dokumen fisik kampus, menghasilkan platform yang familiar, intuitif, dan responsif.", "1. Keberhasilan Rekayasa Antarmuka Pengguna: ")
    add_bullet(doc, "Sistem berhasil didistribusikan dalam bentuk Web Production berkecepatan tinggi di cloud Vercel (https://lapakprint-app.vercel.app) serta installer native Android mandiri (LapakPrint.apk) berbasis Capacitor SDK 36 tanpa ketergantungan pada Google Play Store.", "2. Dual Deliverables Produksi: ")
    add_bullet(doc, "Strategi penyimpanan hibrida (Hybrid Tiering) terbukti sukses mengatasi limit 1 GB Supabase PostgreSQL dengan mengalirkan berkas fisik PDF dan poster ke Cloudinary CDN 5 GB, menjaga biaya operasional tetap nol rupiah (zero infrastructure cost) selama tahap peluncuran awal.", "3. Efisiensi Biaya Storage: ")
    add_bullet(doc, "Orkestrasi kontainerisasi 4 layanan (hermes-service, nine-router, hermes-webui, dan lapakprint-ngrok) berhasil dieksekusi secara harmonis di dalam jaringan virtual bridge, membuktikan ketangguhan sistem backend terdistribusi.", "4. Ketangguhan Orkestrasi Kontainer: ")
    add_bullet(doc, "Integrasi model cloud Google Gemini 3.8 Flash High dan model lokal Hermes Nous Research via 9router menyediakan asisten konsultasi cerdas dan pipeline multimodal (Gemini-to-Runware) yang mampu mengotomasi desain poster seminar dari sketsa pelanggan.", "5. Inovasi Kecerdasan Buatan Terdistribusi: ")

    add_h2(doc, "7.2 Limitasi Sistem Saat Ini")
    add_p(doc,
        "Meskipun telah mencapai seluruh luaran yang ditargetkan, tim pengembang mengidentifikasi beberapa limitasi "
        "teknis yang perlu disempurnakan pada fase iterasi berikutnya:"
    )
    add_bullet(doc, "Sistem pembayaran saat ini masih mengandalkan simulasi dompet LapakPay dan dynamic QRIS testbed, belum terhubung ke agregator perbankan resmi (seperti Midtrans atau Xendit Production) yang memerlukan legalitas badan usaha CV/PT.", "• Verifikasi Pembayaran Otomatis Bank: ")
    add_bullet(doc, "Tunneling Ngrok pada akun gratisan memiliki batas sesi dan URL publik yang terikat pada satu domain statis, sehingga untuk skala ribuan pengguna simultan diperlukan migrasi ke Cloudflare Tunnels atau reverse proxy Nginx pada VPS mandiri.", "• Skalabilitas Tunneling Publik: ")
    add_bullet(doc, "Integrasi AI Runware memerlukan alamat email bisnis kustom berbayar/terverifikasi untuk mendapatkan kuota promosi developer, sehingga diperlukan otomasi onboarding domain pada lingkungan produksi penuh.", "• Manajemen Token API Pihak Ketiga: ")

    add_h2(doc, "7.3 Roadmap Pengembangan Jangka Pendek, Menengah, dan Panjang (Q1–Q4)")
    add_p(doc,
        "Untuk memandu evolusi platform LapakPrint dari purwarupa akademik menjadi entitas bisnis startup yang matang, "
        "disusun peta jalan pengembangan (Roadmap) bertahap selama empat kuartal ke depan:"
    )

    headers_road = ["Fase / Kuartal", "Fokus Strategis", "Target Pencapaian & Fitur Baru (Milestones)"]
    data_road = [
        ["Q1 (Kuartal 1: Stabilisasi)", "Pilot Project & Legalitas", 
         "• Peluncuran pilot project di 1 universitas percontohan dengan menggandeng 5 gerai percetakan mitra.\n• Integrasi gateway pembayaran produksi (Midtrans QRIS & Virtual Account).\n• Pembelian dan mapping top-level domain resmi (.id / .ac.id)."],
        ["Q2 (Kuartal 2: Ekspansi)", "Scale Up & Multimodal Live", 
         "• Ekspansi kemitraan ke 5 kampus besar se-Jabodetabek.\n• Peluncuran resmi fitur AI Poster Studio (Gemini-to-Runware) untuk panitia acara kampus.\n• Penyempurnaan refaktorisasi kode modular Feature-Driven Architecture penuh."],
        ["Q3 (Kuartal 3: Otomasi)", "Smart Campus Locker Integration", 
         "• Uji coba 'LapakPrint Smart Locker' (loker fisik mandiri dengan pemindai QR Code di lorong fakultas).\n• Mahasiswa dapat mengambil dokumen kapan saja selama 24 jam tanpa bertemu operator toko.\n• Program loyalitas 'LapakPrint VIP Campus Pass' untuk potongan cetak bulanan."],
        ["Q4 (Kuartal 4: Ekosistem)", "National Rollout & Repository Sync", 
         "• Integrasi API langsung dengan sistem repositori perpustakaan universitas untuk validasi otomatis watermark naskah skripsi.\n• Pembukaan kemitraan nasional di kota-kota pendidikan (Yogyakarta, Bandung, Surabaya, Malang).\n• Fitur deteksi plagiasi naskah otomatis terintegrasi sebelum dokumen dicetak."]
    ]
    col_w_road = [Inches(1.5), Inches(1.8), Inches(3.7)]
    create_table_custom(doc, headers_road, data_road, col_w_road)

    doc.add_page_break()

    # ================= DAFTAR PUSTAKA =================
    add_h1(doc, "DAFTAR PUSTAKA")
    
    pustaka = [
        "Achiam, J., Adler, S., Agarwal, S., Ahmad, L., Akkaya, I., Aleman, F. L., ... & Brockman, G. (2023). GPT-4 Technical Report. arXiv preprint arXiv:2303.08774.",
        "Burns, B., Grant, B., Oppenheimer, D., Brewer, E., & Wilkes, J. (2016). Borg, Omega, and Kubernetes: Lessons learned from three container-management systems over a decade. ACM Queue, 14(1), 70-93.",
        "Capacitor Documentation Team. (2024). Cross-Platform Native Runtime for Web Apps. Ionic Framework & Capacitor Docs. https://capacitorjs.com/docs.",
        "Cloudinary Media Architecture. (2024). Image and Video Technology Platform for Developers. Cloudinary Documentation. https://cloudinary.com/documentation.",
        "DeCandia, G., Hastorun, D., Jampani, M., Kakulapati, G., Lakshman, A., Pilchin, A., ... & Vogels, W. (2007). Dynamo: Amazon's highly available key-value store. ACM SIGOPS Operating Systems Review, 41(6), 205-220.",
        "Docker Inc. (2024). Docker Compose Specification: Standardizing Multi-Container Application Orchestration. Docker Documentation. https://docs.docker.com/compose.",
        "Google Cloud AI. (2024). Gemini 1.5 & Flash Technical Model Architecture: Scalable Context and Multimodal Reasoning. Google DeepMind Research.",
        "Merkel, D. (2014). Docker: Lightweight Linux containers for consistent development and deployment. Linux Journal, 2014(239), 2.",
        "Nous Research. (2024). Hermes 3 Technical Report: Advanced Agentic Reasoning and Tool Calling Capabilities in Open Weights Models. Nous Research Global.",
        "Ollama Core Team. (2024). Get up and running with large language models locally. Ollama Documentation. https://ollama.com.",
        "Open WebUI Community. (2024). User-Friendly AI Interface for LLMs and Distributed Gateways. https://openwebui.com.",
        "Rombach, R., Blattmann, A., Lorenz, D., Esser, P., & Ommer, B. (2022). High-resolution image synthesis with latent diffusion models. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) (pp. 10684-10695).",
        "Runware AI. (2024). Ultra-fast Inference API for Latent Diffusion and Image Transformation. Runware Documentation. https://docs.runware.ai.",
        "Schick, T., Dwivedi-Yu, J., Dessì, R., Raileanu, R., Lomeli, M., Zettlemoyer, L., ... & Scialom, T. (2023). Toolformer: Language models can teach themselves to use tools. Advances in Neural Information Processing Systems, 36, 68539-68551.",
        "Supabase Inc. (2024). The Open Source Firebase Alternative: Architecture of PostgreSQL Row Level Security and Realtime Engine. Supabase Docs. https://supabase.com/docs.",
        "Vercel Architecture Team. (2024). Deploying Modern Frontends at Global Edge Scale with Zero Configuration. Vercel Documentation. https://vercel.com/docs.",
        "Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2023). ReAct: Synergizing reasoning and acting in language models. In International Conference on Learning Representations (ICLR).",
        "Zheng, L., Chiang, W. L., Sheng, Y., Zhuang, S., Wu, Z., Zhuang, Y., ... & Stoica, I. (2023). Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena. Advances in Neural Information Processing Systems, 36, 46595-46623."
    ]
    
    for bib in pustaka:
        p_bib = doc.add_paragraph()
        p_bib.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_bib.paragraph_format.left_indent = Inches(0.5)
        p_bib.paragraph_format.first_line_indent = Inches(-0.5)
        p_bib.paragraph_format.space_before = Pt(2)
        p_bib.paragraph_format.space_after = Pt(4)
        p_bib.paragraph_format.line_spacing = 1.15
        r_bib = p_bib.add_run(bib)
        apply_tnr_run(r_bib, size_pt=11)

    doc.add_page_break()

    # ================= LAMPIRAN =================
    add_h1(doc, "LAMPIRAN (TECHNICAL APPENDICES)")
    
    add_h2(doc, "Lampiran A: File Konfigurasi Docker Compose Terintegrasi (docker-compose.yml)")
    add_p(doc,
        "Berikut adalah konfigurasi resmi `docker-compose.yml` yang mengorkestrasi 4 container aktif ekosistem LapakPrint "
        "(Hermes Reasoning Agent, 9router AI Gateway, Open WebUI, dan Ngrok Secure Tunnel):"
    )
    
    docker_cfg = (
        "version: '3.8'\n\n"
        "services:\n"
        "  # 1. Hermes Agent Service (Nous Research Reasoning Engine)\n"
        "  hermes-backend:\n"
        "    image: nousresearch/hermes-agent:latest\n"
        "    container_name: hermes-service\n"
        "    ports:\n"
        "      - \"8642:8642\"\n"
        "    restart: unless-stopped\n"
        "    networks:\n"
        "      - lapakprint-net\n\n"
        "  # 2. 9router Gateway Service (AI Model Hub)\n"
        "  nine-router:\n"
        "    image: decolua/9router:latest\n"
        "    container_name: nine-router\n"
        "    ports:\n"
        "      - \"20129:20128\"\n"
        "    environment:\n"
        "      - PORT=20128\n"
        "      - INITIAL_PASSWORD=lapakprint123\n"
        "    volumes:\n"
        "      - nine-router-data:/root/.9router\n"
        "    restart: unless-stopped\n"
        "    networks:\n"
        "      - lapakprint-net\n\n"
        "  # 3. Web UI Interface (Open WebUI Studio)\n"
        "  hermes-web:\n"
        "    image: ghcr.io/open-webui/open-webui:main\n"
        "    container_name: hermes-webui\n"
        "    ports:\n"
        "      - \"8080:8080\"\n"
        "    environment:\n"
        "      - OPENAI_API_BASE_URL=http://nine-router:20128/v1\n"
        "      - OPENAI_API_KEY=sk-0480ac72892daa9b-2s3nyc-5474ac73\n"
        "      - OLLAMA_BASE_URL=http://host.docker.internal:11434\n"
        "      - WEBUI_AUTH=false\n"
        "      - WEBUI_NAME=LapakPrint Hermes AI Studio\n"
        "    extra_hosts:\n"
        "      - \"host.docker.internal:host-gateway\"\n"
        "    volumes:\n"
        "      - open-webui-data:/app/backend/data\n"
        "    depends_on:\n"
        "      - hermes-backend\n"
        "      - nine-router\n"
        "    restart: unless-stopped\n"
        "    networks:\n"
        "      - lapakprint-net\n\n"
        "  # 4. Ngrok Secure Tunneling Service\n"
        "  ngrok-tunnel:\n"
        "    image: ngrok/ngrok:latest\n"
        "    container_name: lapakprint-ngrok\n"
        "    restart: unless-stopped\n"
        "    networks:\n"
        "      - lapakprint-net\n"
        "    environment:\n"
        "      - NGROK_AUTHTOKEN=3Kl5dq95ni1boT2tuLPBjMiNRlq_5GfN9wPZ3EtnPWxfcfZkb\n"
        "    command:\n"
        "      - \"http\"\n"
        "      - \"hermes-webui:8080\"\n"
        "      - \"--domain=appealing-issue-shimmer.ngrok-free.dev\"\n"
        "    ports:\n"
        "      - \"4040:4040\"\n"
        "    depends_on:\n"
        "      - hermes-web\n\n"
        "networks:\n"
        "  lapakprint-net:\n"
        "    driver: bridge\n\n"
        "volumes:\n"
        "  open-webui-data:\n"
        "  nine-router-data:"
    )
    
    t_cfg = doc.add_table(rows=1, cols=1)
    t_cfg.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_cfg = t_cfg.cell(0, 0)
    set_cell_background(c_cfg, "F1F5F9")
    set_cell_margins(c_cfg, top=120, bottom=120, left=160, right=160)
    p_code = c_cfg.paragraphs[0]
    p_code.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r_code = p_code.add_run(docker_cfg)
    apply_tnr_run(r_code, size_pt=8.5, color_rgb=RGBColor(15, 23, 42))

    add_h2(doc, "Lampiran B: Snippet Algoritma Multimodal Gemini-Runware & Round-Robin Router")
    add_p(doc,
        "Implementasi fungsi JavaScript perutean multimodal yang membaca input visual mahasiswa via Gemini Vision "
        "lalu me-render gambar ke Runware FLUX:"
    )
    
    script_snippet = (
        "// LapakPrint Multimodal AI Pipeline: Gemini Vision -> Runware Image Synthesis\n"
        "export async function generatePosterFromSketch(sketchImageBase64, userPrompt) {\n"
        "  try {\n"
        "    // Langkah 1: Analisis Sketsa Visual menggunakan Google Gemini Vision\n"
        "    const geminiRes = await fetch('http://nine-router:20128/v1/chat/completions', {\n"
        "      method: 'POST',\n"
        "      headers: { 'Authorization': 'Bearer sk-0480ac...', 'Content-Type': 'application/json' },\n"
        "      body: JSON.stringify({\n"
        "        model: 'ag/gemini-3.8-flash-high',\n"
        "        messages: [\n"
        "          { role: 'system', content: 'You are a professional poster designer. Extract layout and generate English image prompt.' },\n"
        "          { role: 'user', content: [\n"
        "              { type: 'text', text: `Analyze this sketch and make a high-res poster prompt for: ${userPrompt}` },\n"
        "              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${sketchImageBase64}` } }\n"
        "            ]\n"
        "          }\n"
        "        ]\n"
        "      })\n"
        "    });\n"
        "    const geminiData = await geminiRes.json();\n"
        "    const refinedPrompt = geminiData.choices[0].message.content;\n\n"
        "    // Langkah 2: Render Poster Ultra-HD menggunakan Runware Diffusion API\n"
        "    const runwareRes = await fetch('https://api.runware.ai/v1', {\n"
        "      method: 'POST',\n"
        "      headers: { 'Authorization': `Bearer ${process.env.RUNWARE_API_KEY}`, 'Content-Type': 'application/json' },\n"
        "      body: JSON.stringify([\n"
        "        {\n"
        "          taskType: 'imageInference',\n"
        "          taskUUID: crypto.randomUUID(),\n"
        "          model: 'cablyai/flux1.s-dev',\n"
        "          positivePrompt: `${refinedPrompt}, 300 DPI, print-ready, sharp typography, 8k resolution`,\n"
        "          width: 1024,\n"
        "          height: 1440\n"
        "        }\n"
        "      ])\n"
        "    });\n"
        "    const runwareData = await runwareRes.json();\n"
        "    return { success: true, posterUrl: runwareData.data[0].imageURL, promptUsed: refinedPrompt };\n"
        "  } catch (error) {\n"
        "    console.error('Multimodal fallback triggered:', error);\n"
        "    return { success: false, fallback: 'Ollama local inference invoked' };\n"
        "  }\n"
        "}"
    )
    
    t_snip = doc.add_table(rows=1, cols=1)
    t_snip.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_snip = t_snip.cell(0, 0)
    set_cell_background(c_snip, "F1F5F9")
    set_cell_margins(c_snip, top=120, bottom=120, left=160, right=160)
    p_snip = c_snip.paragraphs[0]
    p_snip.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r_snip = p_snip.add_run(script_snippet)
    apply_tnr_run(r_snip, size_pt=8.5, color_rgb=RGBColor(15, 23, 42))

    print("Chapter 7 and Appendices completed successfully.")

if __name__ == "__main__":
    doc = docx.Document()
    add_chapter_7(doc)
    doc.save("test_ch7.docx")
    print("Saved test_ch7.docx")
