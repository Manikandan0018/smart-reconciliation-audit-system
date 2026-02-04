import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { Layers } from "lucide-react";

import Uploadbtn from "../components/Uploadbtn";
import ReconciliationCard from "../components/ReconciliationCard";
import AuthLoader from "../components/AuthLoader";

/* ---------- Stat Card ---------- */
const StatCard = ({ title, value, icon, accent }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-sm transition">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className={`p-2 rounded-lg ${accent} bg-opacity-10`}>{icon}</div>
    </div>
    <p className="text-3xl font-semibold text-slate-900">
      {typeof value === "number" ? value.toLocaleString() : value}
    </p>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <>
      <AuthLoader/>
      </>
    );
  }

  return (
    <>
      <div className="flex p-5 fixed z-20 w-full bg-white items-center gap-2">
        <Layers className="w-5 h-5 text-slate-600" />
        <h2 className="text-green-700">Data Reconciliation</h2>
      </div>

      <div className="min-h-screen bg-[#f9fafb]">
        {/* ---------- HERO (TOP 20%) ---------- */}
        <section className="relative  min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Gradient + Blur */}
          <div className="absolute inset-0 hero-gradient blur-[60px] scale-110" />
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
            <h1 className="text-3xl barrio-regular sm:text-4xl lg:text-6xl text-slate-900">
              Smart Reconciliation System
            </h1>

            <p className="mt-4  text-slate-600 max-w-2xl">
              Automatically reconcile large datasets, identify mismatches,
              duplicates, and track reconciliation accuracy in real time.
            </p>

            <div className="mt-6 scale-150 ">
              <Link to="/upload">
                <Uploadbtn />
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- CONTENT ---------- */}
        <main className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <ReconciliationCard
              title="Total Records"
              value={stats.total}
              description="All ingested records across uploaded datasets."
              accent="#2563eb"
            />

            <ReconciliationCard
              title="Matched"
              value={stats.matched}
              description="Automatically reconciled with high confidence."
              accent="#059669"
            />

            <ReconciliationCard
              title="Unmatched"
              value={stats.unmatched}
              description="Records requiring manual review."
              accent="#d97706"
            />

            <ReconciliationCard
              title="Duplicates"
              value={stats.duplicate}
              description="Duplicate entries detected during reconciliation."
              accent="#dc2626"
            />

            <ReconciliationCard
              title="Accuracy"
              value={`${stats.accuracy}%`}
              description="Overall reconciliation confidence score."
              accent="#4f46e5"
            />
          </div>
        </main>
      </div>
    </>
  );
}
