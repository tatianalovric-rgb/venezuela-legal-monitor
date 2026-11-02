import React from 'react';
import { Scale, BookOpen, GitCompare, Calculator, Printer, PlusCircle, Radio, RefreshCw } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  onOpenReportView,
  totalCount,
  liveCount,
  isAutoSyncing,
  setIsAutoSyncing,
  onRefreshLive,
  isSyncing
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo y Nombre */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">LexVen<span className="text-blue-600">Monitor</span></span>
                
                {/* Indicador de Auto-Actualización */}
                <button
                  onClick={() => setIsAutoSyncing(!isAutoSyncing)}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                    isAutoSyncing
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                  title="Haz clic para activar o pausar la sincronización automática"
                >
                  <span className={`inline-block w-2 h-2 rounded-full ${isAutoSyncing ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                  <span>{isAutoSyncing ? 'Auto-Sync Activo' : 'Auto-Sync Pausado'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Monitor Legislativo, Gacetas Oficiales y Noticias Jurídicas • Venezuela
              </p>
            </div>
          </div>

          {/* Navegación Principal */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Leyes & Análisis</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-bold">
                {totalCount}
              </span>
            </button>

            {/* Pestaña: Noticias en Vivo */}
            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'live'
                  ? 'bg-white text-rose-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>Noticias en Vivo</span>
              {liveCount > 0 && (
                <span className="text-xs px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-bold">
                  {liveCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('comparator')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'comparator'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>Antes vs. Después</span>
            </button>

            <button
              onClick={() => setActiveTab('calculators')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'calculators'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Simuladores</span>
            </button>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <button
              onClick={onRefreshLive}
              disabled={isSyncing}
              className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors border border-slate-200"
              title="Sincronizar noticias en tiempo real"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
            </button>

            <button
              onClick={onOpenReportView}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-300 shadow-sm"
              title="Descargar o imprimir reporte ejecutivo en formato PDF"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Reporte PDF</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-600/25 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Añadir</span>
            </button>
          </div>
        </div>

        {/* Barra móvil de pestañas */}
        <div className="flex lg:hidden py-2 border-t border-slate-200 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg text-center whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Leyes ({totalCount})
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg text-center whitespace-nowrap flex items-center justify-center gap-1 ${
              activeTab === 'live' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Radio className="w-3 h-3 animate-pulse" />
            <span>En Vivo ({liveCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('comparator')}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg text-center whitespace-nowrap ${
              activeTab === 'comparator' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Comparador
          </button>
          <button
            onClick={() => setActiveTab('calculators')}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg text-center whitespace-nowrap ${
              activeTab === 'calculators' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Simuladores
          </button>
        </div>
      </div>
    </header>
  );
}
