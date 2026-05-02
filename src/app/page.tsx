"use client";

import { useState } from 'react';

interface TeacherData {
  [key: string]: any;
}

export default function Home() {
  const [fteachcode, setFteachcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TeacherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rouletteStatus, setRouletteStatus] = useState('READY TO SPIN');

  const formatLabel = (key: string) => {
    // Remove leading 'f' and split camelCase/snake_case for display
    let label = key.startsWith('f') ? key.substring(1) : key;
    // Handle specific acronyms or just split by case
    return label
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const isSensitive = (key: string) => {
    const lowKey = key.toLowerCase();
    return lowKey.includes('email') || 
           lowKey.includes('mobile') || 
           lowKey.includes('phone') || 
           lowKey.includes('dob') || 
           lowKey.includes('pan') || 
           lowKey.includes('aadhar') ||
           lowKey.includes('bank') ||
           lowKey.includes('ifsc') ||
           lowKey.includes('pass');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fteachcode.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/teacher?fteachcode=${encodeURIComponent(fteachcode)}`);
      const result = await res.json();

      if (result.status === 'success' && result.data?.data) {
        setData(result.data.data);
      } else {
        setError('Teacher record not found or access denied.');
      }
    } catch (err) {
      setError('Failed to query the Transparency Tool. Connection refused.');
    } finally {
      setLoading(false);
    }
  };

  const spinRoulette = () => {
    const statuses = [
      'PENDING FOREVER',
      'REJECTED WITHOUT REVIEW',
      'LOST IN SYSTEM',
      'CONTACT FACULTY (IF THEY CARE)',
      'IGNORED BY ADMIN',
      'DELETED BY ACCIDENT'
    ];
    setRouletteStatus('SPINNING...');
    setTimeout(() => {
      setRouletteStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 1000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 md:p-24">
      {/* Header */}
      <header className="w-full max-w-5xl mb-16 text-center">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4">
          Presidency<span className="text-white/40">Blacked</span>
        </h1>
        <p className="text-white/50 font-mono text-sm uppercase tracking-widest bg-white/5 inline-block px-4 py-1 rounded-full">
          Premium Academic Neglect & Transparency Portal
        </p>
      </header>

      {/* Search Section */}
      <div className="w-full max-w-2xl mb-12">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <input
            type="text"
            className="glowing-input text-center text-xl"
            placeholder="ENTER FACULTY CODE"
            value={fteachcode}
            onChange={(e) => setFteachcode(e.target.value)}
          />
          <button 
            type="submit" 
            className="glowing-button text-lg uppercase tracking-widest"
            disabled={loading}
          >
            {loading ? 'PENETRATING DATABASE...' : 'INITIATE QUERY'}
          </button>
        </form>
        {error && (
          <p className="text-[#ff3333] text-center mt-6 font-mono text-lg animate-pulse">
            [ACCESS_DENIED]: {error}
          </p>
        )}
      </div>

      {/* Data Dashboard */}
      {data && (
        <div className="w-full max-w-6xl flex flex-col gap-8 mb-12 animate-in fade-in zoom-in-95 duration-1000">
          {/* Primary Profile Header */}
          <div className="glass-panel p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#00ff00] opacity-50 shadow-[0_0_20px_#00ff00]"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <div className="flex-1">
                <span className="label text-xs font-bold tracking-[0.3em] opacity-30 mb-4 block">FILE_IDENTITY_RECOVERED</span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                  {data.fteachname || 'UNKNOWN'}
                </h2>
                <div className="flex flex-wrap gap-6 items-center mt-8">
                  <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                    <span className="text-[10px] block opacity-40 font-mono mb-1">FACULTY_ID</span>
                    <span className="font-mono text-xl tracking-widest font-bold">{data.fteachcode}</span>
                  </div>
                  {data.fdesignation && (
                    <div className="bg-[#00ff00]/10 px-4 py-2 rounded-lg border border-[#00ff00]/20">
                      <span className="text-[10px] block opacity-40 font-mono mb-1 text-[#00ff00]">CLEARANCE_LVL</span>
                      <span className="text-xl font-bold text-[#00ff00] uppercase tracking-tighter">{data.fdesignation}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-left md:text-right flex flex-col gap-2 max-w-sm">
                <span className="label text-[10px] opacity-30">HOST_ORGANIZATION</span>
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-white/90 leading-tight">
                  {data.funivname || 'UNSPECIFIED'}
                </div>
                {data.fcollname && (
                  <div className="text-base text-white/40 font-mono mt-2 italic border-l-2 md:border-l-0 md:border-r-2 border-white/10 px-4">
                    {data.fcollname}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Data Section */}
            <div className="lg:col-span-8 glass-panel p-10">
              <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-[#00ff00] animate-pulse shadow-[0_0_10px_#00ff00]"></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.4em]">Full Database Snapshot</h3>
                </div>
                <span className="text-[10px] font-mono text-white/30">DE-ENCRYPTION_SUCCESSFUL</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16">
                {Object.entries(data)
                  .filter(([key]) => !['fteachname', 'fteachcode', 'fdesignation', 'funivname', 'fcollname'].includes(key))
                  .map(([key, value]) => {
                    const sensitive = isSensitive(key);
                    const isEmail = key.toLowerCase().includes('email');
                    const displayValue = (value === null || value === undefined || value === '') 
                      ? 'NULL' 
                      : String(value);

                    return (
                      <div key={key} className={`group transition-all ${isEmail ? 'md:col-span-2' : ''} ${sensitive ? 'p-6 rounded-xl bg-[#ff3333]/5 border border-[#ff3333]/20 shadow-[0_0_15px_rgba(255,51,51,0.05)]' : 'border-b border-white/10 pb-4'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`label text-[10px] font-bold tracking-widest ${sensitive ? 'text-[#ff3333] opacity-100' : 'opacity-40'}`}>
                            {formatLabel(key)}
                          </span>
                          {sensitive && (
                            <span className="text-[8px] bg-[#ff3333] text-black px-1 font-black rounded-sm">SENSITIVE</span>
                          )}
                        </div>
                        <div className={`text-xl md:text-2xl break-words font-medium tracking-tight ${sensitive ? 'text-white' : 'text-white/80'} ${displayValue === 'NULL' ? 'text-white/10 font-mono italic' : ''} ${isEmail ? 'whitespace-nowrap' : ''}`}>
                          {displayValue}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Sidebar / Metadata */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <div className="glass-panel p-8 border-dashed bg-white/[0.02]">
                <h3 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">Breach Statistics</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end text-sm font-mono">
                    <span className="opacity-30 text-xs">TOTAL_VECTORS</span>
                    <span className="text-2xl font-bold">{Object.keys(data).length}</span>
                  </div>
                  <div className="flex justify-between items-end text-sm font-mono">
                    <span className="opacity-30 text-xs">THREAT_LEVEL</span>
                    <span className="text-[#ff3333] text-2xl font-bold">CRITICAL</span>
                  </div>
                  <div className="flex justify-between items-end text-sm font-mono">
                    <span className="opacity-30 text-xs">BYPASS_METHOD</span>
                    <span className="text-blue-400 font-bold">CORS_INJECTION</span>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between text-[10px] font-mono mb-2">
                      <span className="opacity-40 uppercase">Memory Extraction</span>
                      <span className="text-[#00ff00]">COMPLETE</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00ff00] h-full w-full shadow-[0_0_10px_#00ff00]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl border-2 border-[#ff3333] bg-[#ff3333]/10 text-[#ff3333] font-black text-xs font-mono leading-relaxed shadow-[0_0_30px_rgba(255,51,51,0.2)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="animate-ping w-2 h-2 rounded-full bg-[#ff3333]"></span>
                  CRITICAL PRIVACY ALERT
                </div>
                THIS FACULTY DATA IS HIGHLY SENSITIVE. MISUSE OF PHONE NUMBERS OR EMAILS WILL BE TRACED BACK TO YOUR IP. DO NOT EXPOSE TO UNVETTED THIRD PARTIES.
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Security Audit Ledger */}
      <div className="w-full max-w-6xl mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
            Security_Audit<span className="text-[#ff3333]">_Ledger</span>
          </h2>
          <div className="h-[1px] flex-1 bg-white/10"></div>
          <span className="text-[12px] font-mono opacity-40">VERIFIED_EXPLOITS: 03</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: "0x0A2",
              title: "Results IDOR",
              vector: "Auth Bypass",
              severity: "CRITICAL",
              status: "ACTIVE",
              poc: "https://coe.pgi-intraconnect.in/#/result",
              desc: "Unauthorized access to comprehensive academic records and results across the institution."
            },
            {
              id: "0x0BC",
              title: "Linways PII",
              vector: "ID Manipulation",
              severity: "HIGH",
              status: "VULNERABLE",
              poc: ".../attendance-report?redir=true",
              desc: "Broken Access Control allows retrieval of private parent names and student contact info."
            },
            {
              id: "0x0FF",
              title: "Admin Hijack",
              vector: "Admin Bypass",
              severity: "CRITICAL",
              status: "VULNERABLE",
              poc: "https://dvs1.pgi-intraconnect.in/#/admin",
              desc: "Administrative dashboard access achieved through session manipulation and interception."
            }
          ].map((bug) => (
            <div key={bug.id} className="glass-panel p-8 border-t-4 border-t-[#ff3333] hover:translate-y-[-4px] transition-all duration-500 group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/60">{bug.id}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded shadow-[0_0_15px_rgba(255,51,51,0.4)] animate-pulse ${bug.severity === 'CRITICAL' ? 'bg-[#ff3333] text-black' : 'bg-orange-500 text-black'}`}>
                    {bug.severity}
                  </span>
                </div>
                
                <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-[#ff3333] transition-colors leading-tight">{bug.title}</h3>
                <p className="text-[11px] font-mono text-white/40 mb-6 leading-relaxed">{bug.desc}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest opacity-30 block mb-2 font-bold">PoC</span>
                  <div className="bg-black/60 p-3 rounded-lg font-mono text-[10px] text-[#00ff00] border border-white/10 break-all shadow-inner">
                    {bug.poc}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-[9px] opacity-30 uppercase font-bold">Status</span>
                  <span className="text-[10px] font-black font-mono text-[#00ff00]">[{bug.status}]</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-white/20 text-[10px] uppercase tracking-widest font-mono">
        © 2026 PresidencyBlacked // Transparency Portfolio // For Educational Purposes Only
      </footer>
    </main>
  );
}


