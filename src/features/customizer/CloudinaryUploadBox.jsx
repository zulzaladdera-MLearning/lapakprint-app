import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, Loader2, ExternalLink } from 'lucide-react';
import { uploadToCloudinary, formatFileSize } from '../../services/cloudinary';

export default function CloudinaryUploadBox({ onUploadComplete, initialFile = null }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedMetadata, setUploadedMetadata] = useState(initialFile);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setUploading(true);
    setProgress(10);

    try {
      const metadata = await uploadToCloudinary(file, (p) => {
        setProgress(Math.max(15, p));
      });

      setUploadedMetadata(metadata);
      setUploading(false);
      setProgress(100);

      if (onUploadComplete) {
        onUploadComplete(metadata);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Gagal mengunggah berkas ke Cloudinary CDN.');
      setUploading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <UploadCloud className="w-4 h-4 text-sky-600" />
          Unggah Berkas Cetak (Hybrid Cloudinary CDN 5 GB)
        </label>
        <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
          Free Tier Optimized
        </span>
      </div>

      <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
        Berkas fisik (PDF tugas, skripsi, poster) disimpan di Cloudinary CDN berkecepatan tinggi agar tidak menguras kuota 1 GB database.
      </p>

      {!uploadedMetadata && !uploading && (
        <label className="border-2 border-dashed border-sky-300 hover:border-sky-500 bg-sky-50/50 hover:bg-sky-50/80 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all">
          <UploadCloud className="w-8 h-8 text-sky-500 mb-2 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700">Klik untuk Pilih Dokumen / Drag & Drop</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Mendukung PDF, DOCX, JPG, PNG (Maksimal 100 MB)</span>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
        </label>
      )}

      {uploading && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2 text-sky-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-xs font-bold">Mengalirkan ke Cloudinary CDN... {progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-sky-500 h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400">Enkripsi aman HTTPS & pembuatan URL direct access...</span>
        </div>
      )}

      {uploadedMetadata && (
        <div className="bg-white border border-emerald-300 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-800 truncate">
                {uploadedMetadata.original_filename}
              </p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
                <span>{formatFileSize(uploadedMetadata.bytes)}</span>
                <span>•</span>
                <span className="text-emerald-600 font-medium">Tersimpan di Cloudinary CDN</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {uploadedMetadata.secure_url && (
              <a
                href={uploadedMetadata.secure_url}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded-lg flex items-center gap-1 font-semibold"
              >
                <span>Lihat</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <label className="text-[10px] text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg cursor-pointer font-medium">
              Ganti
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mt-2.5 bg-rose-50 border border-rose-200 rounded-xl p-2.5 flex items-center space-x-2 text-rose-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}
    </div>
  );
}
