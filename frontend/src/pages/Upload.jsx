import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  CloudUpload,
  FileText,
  X,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Layers,
} from "lucide-react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null); // success | duplicate | error
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();

  /* ---------------- File Handling ---------------- */
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setStatus(null);
      setMessage("");
    }
  };

  const resetFile = () => {
    setFile(null);
    setStatus(null);
    setMessage("");
  };

  /* ---------------- Upload Logic ---------------- */
  const uploadFile = async () => {
    if (!file) return;

    setLoading(true);
    setStatus(null);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData);

      if (res.data.duplicateFile) {
        setStatus("duplicate");
        setMessage(
          "This file has already been uploaded. Please select a different file.",
        );
        setFile(null);
        setLoading(false);
        return;
      }

      setStatus("success");
      setMessage("File uploaded and reconciled successfully.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1400);
    } catch {
      setStatus("error");
      setMessage("Upload failed. Please check file format and try again.");
      setLoading(false);
    }
  };

  /* ---------------- Drag & Drop ---------------- */
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
      setStatus(null);
      setMessage("");
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 z-20 w-full bg-white  px-6 py-4 flex items-center gap-2">
        <Layers className="w-5 h-5 text-slate-600" />
        <h2 className="text-sm font-semibold text-green-800">
          Data Reconciliation
        </h2>
      </div>

      <div className="min-h-screen bg-slate-50 px-6 pt-24 pb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          <section className="lg:col-span-1">
            <h1 className="text-2xl font-semibold text-slate-900 mb-3">
              Data Ingestion
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Upload transaction datasets to initiate automated reconciliation.
              The system analyzes records, detects duplicates, and evaluates
              matching accuracy.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p className="text-slate-600">
                  Upload CSV or Excel transaction files
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p className="text-slate-600">
                  Records are automatically matched and validated
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p className="text-slate-600">
                  Review unmatched or duplicate entries
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT: Upload Panel */}
          <section className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-8 flex justify-center">
            <div className="w-full max-w-xl">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">
                Upload Transaction File
              </h2>

              {!file ? (
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  className={`relative border border-dashed rounded-lg p-12 text-center transition
                    ${
                      isDragging
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-300 bg-slate-50"
                    }`}
                >
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <CloudUpload
                    className="mx-auto mb-4 text-slate-400"
                    size={30}
                  />
                  <p className="text-sm font-medium text-slate-700">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    CSV, XLS, XLSX • Max 10MB
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between border rounded-lg p-4 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <FileText className="text-indigo-600" size={18} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>

                  {!loading && (
                    <button
                      onClick={resetFile}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* Status */}
              {message && (
                <div
                  className={`mt-5 rounded-md px-4 py-3 text-sm flex items-center gap-2
                    ${
                      status === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : status === "duplicate"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                    }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <AlertTriangle size={16} />
                  )}
                  {message}
                </div>
              )}

              {/* Action */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={uploadFile}
                  disabled={!file || loading}
                  className={`px-6 py-3 rounded-md text-sm font-semibold text-white flex items-center gap-2
                    ${
                      !file || loading
                        ? "bg-slate-300 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Processing
                    </>
                  ) : (
                    "Start Reconciliation"
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
