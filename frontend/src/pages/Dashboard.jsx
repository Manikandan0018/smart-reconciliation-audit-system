import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { Layers, Lock } from "lucide-react";

import ReconciliationCard from "../components/ReconciliationCard";
import AuthLoader from "../components/AuthLoader";
import { useAuth } from "../context/AuthContext";

/*  Info Banner  */
const ViewerNotice = () => (
  <div className="mt-6 flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm font-medium">
    <Lock size={18} />
    Upload access is restricted. Please contact an administrator for
    permissions.
  </div>
);

export default function Dashboard() {
  const { user } = useAuth(); 
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
    return <AuthLoader />;
  }

  return (
    <>
      {/* Top Bar */}
      <div className="flex p-5 fixed z-20 w-full bg-white items-center gap-2 border-b">
        <Layers className="w-5 h-5 text-slate-600" />
        <h2 className="text-green-700 font-semibold">Data Reconciliation</h2>
      </div>

      <div className="min-h-screen bg-[#f9fafb] pt-16">
        {/*  HERO  */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 hero-gradient blur-[60px] scale-110" />
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900">
              Smart Reconciliation System
            </h1>

            <p className="mt-4 text-slate-600 max-w-2xl">
              Automatically reconcile datasets, identify mismatches, duplicates,
              and track accuracy in real time.
            </p>

            {/* ROLE-AWARE CTA  */}
            <div className="mt-6 scale-110">
              {user.role === "Viewer" ? (
                <ViewerNotice />
              ) : (
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
                >
                  Upload Data
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ---------- STATS ---------- */}
        <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <ReconciliationCard
              title="Total Records"
              value={stats.total}
              description="All ingested records."
              accent="#2563eb"
            />
            <ReconciliationCard
              title="Matched"
              value={stats.matched}
              description="Successfully reconciled."
              accent="#059669"
            />
            <ReconciliationCard
              title="Unmatched"
              value={stats.unmatched}
              description="Needs review."
              accent="#d97706"
            />
            <ReconciliationCard
              title="Duplicates"
              value={stats.duplicate}
              description="Duplicate entries found."
              accent="#dc2626"
            />
            <ReconciliationCard
              title="Accuracy"
              value={`${stats.accuracy}%`}
              description="Reconciliation accuracy."
              accent="#4f46e5"
            />
          </div>
        </main>
      </div>
    </>
  );
}
