import React, { useState } from 'react';

function App() {
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [triageData, setTriageData] = useState(null);
  const [error, setError] = useState('');

  const handleTriageSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setLoading(true);
    setError('');
    setTriageData(null);

    try {
      const response = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textMessage: inputMessage })
      });

      const result = await response.json();
      
      if (result.success) {
        setTriageData(result.data);
      } else {
        setError(result.error || 'Failed to analyze dispatch data.');
      }
    } catch (err) {
      setError('Cannot connect to AI Backend Server. Ensure it is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'CRITICAL': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'HIGH': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'MEDIUM': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans antialiased p-6 flex flex-col items-center">
      <header className="w-full max-w-5xl border-b border-slate-800 pb-4 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-wider text-emerald-400">RESCUIFY AI</h1>
        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          AI CORE OPERATIONAL
        </div>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Input Console */}
        <section className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Emergency Intake Console</h2>
            <p className="text-sm text-slate-400 mb-6">
              Enter unstructured natural language panic reports below. The AI core will parse emergency parameters instantly.
            </p>
            
            <form onSubmit={handleTriageSubmit} className="space-y-4">
              <textarea
                className="w-full h-40 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none transition-all placeholder:text-slate-600"
                placeholder='Example: "A massive accident happened near highway block 4, a car hit a pole and gas is leaking. Two people are trapped inside and need immediate ambulance units!"'
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? 'Processing via AI Core...' : 'Analyze & Dispatch Incident'}
              </button>
            </form>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium">
              ⚠️ {error}
            </div>
          )}
        </section>

        {/* Right Output Dashboard */}
        <section className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-xl flex flex-col">
          <h2 className="text-lg font-bold mb-4">Automated Triage Dispatch Data</h2>
          
          {!triageData && !loading && (
            <div className="flex-1 border-2 border-dashed border-slate-700/60 rounded-xl flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <p className="text-sm">Awaiting incoming automated data stream...</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-400">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-mono tracking-widest animate-pulse">EXTRACTING PARAMETERS...</p>
            </div>
          )}

          {triageData && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority Level</span>
                  <span className={`px-3 py-1 rounded-md text-xs font-black border tracking-wider uppercase ${getUrgencyColor(triageData.urgency)}`}>
                    {triageData.urgency}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 border border-slate-700/40 p-3 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Crisis Category</span>
                    <span className="text-sm font-semibold text-slate-200">{triageData.category}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-700/40 p-3 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Extracted Location</span>
                    <span className="text-sm font-semibold text-emerald-400 truncate block">{triageData.extracted_location}</span>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-700/40 p-4 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Recommended Dispatch Action</span>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">{triageData.recommended_action}</p>
                </div>
              </div>

              <div className="border-t border-slate-700/60 pt-4 mt-auto">
                <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] py-2 px-3 rounded-lg text-center">
                  ⚡ Pipeline complete. Data routed to response teams.
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;