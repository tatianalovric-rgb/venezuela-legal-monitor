import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import FiltersBar from './components/FiltersBar';
import LegalCard from './components/LegalCard';
import LegalDetailModal from './components/LegalDetailModal';
import BeforeAfterComparator from './components/BeforeAfterComparator';
import ComplianceCalculator from './components/ComplianceCalculator';
import AddUpdateModal from './components/AddUpdateModal';
import ExecutiveReportView from './components/ExecutiveReportView';
import LiveNewsFeed from './components/LiveNewsFeed';
import { INITIAL_LEGAL_UPDATES, CATEGORIES } from './data/legalUpdates';
import { ShieldCheck, Sparkles, AlertCircle, RefreshCw, Radio, BellRing, CheckCircle, ArrowRight, FileText, Star } from 'lucide-react';

const STORAGE_KEY = 'lexven_legal_updates_v2';
const LIVE_STORAGE_KEY = 'lexven_live_news_v2';

export default function App() {
  // Carga desde localStorage o datos iniciales con enriquecimiento de campos
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const initialMap = new Map(INITIAL_LEGAL_UPDATES.map(i => [i.id, i]));
        return parsed.map(item => {
          if (initialMap.has(item.id)) {
            const initial = initialMap.get(item.id);
            return {
              ...initial,
              ...item,
              deQueSeTrata: item.deQueSeTrata || initial.deQueSeTrata,
              loMasImportante: item.loMasImportante || initial.loMasImportante,
              gaceta: item.gaceta || initial.gaceta
            };
          }
          return item;
        });
      }
    } catch (e) {
      console.error('Error al cargar de localStorage', e);
    }
    return INITIAL_LEGAL_UPDATES;
  });

  // Noticias en tiempo real / live news
  const [liveNews, setLiveNews] = useState(() => {
    try {
      const saved = localStorage.getItem(LIVE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [isAutoSyncing, setIsAutoSyncing] = useState(true);
  const [newNewsAlert, setNewNewsAlert] = useState(null);

  // Pestaña activa: 'dashboard' | 'live' | 'comparator' | 'calculators'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState('all');

  // Modales y vistas
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportViewOpen, setIsReportViewOpen] = useState(false);
  const [initialCompId, setInitialCompId] = useState(null);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error guardando en localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(LIVE_STORAGE_KEY, JSON.stringify(liveNews));
    } catch (_) {}
  }, [liveNews]);

  // Función para consultar noticias en vivo (soporta dev server local y GitHub Pages estático)
  const fetchLiveUpdates = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoadingLive(true);
    try {
      let response;
      try {
        response = await fetch('/api/live-news?refresh=true');
      } catch (_) {}

      // Si no hay dev server local activo (ej. en GitHub Pages), cargar live-news.json
      if (!response || !response.ok) {
        response = await fetch('./live-news.json');
      }

      if (response && response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.items)) {
          setLiveNews(prevNews => {
            const prevTitles = new Set(prevNews.map(n => n.title));
            const newArrivals = data.items.filter(n => !prevTitles.has(n.title));
            if (newArrivals.length > 0 && prevNews.length > 0) {
              setNewNewsAlert(`Se han detectado ${newArrivals.length} nuevas publicaciones jurídicas en Venezuela.`);
            }
            return data.items;
          });
          setLastSyncTime(data.updatedAt || new Date().toISOString());
        }
      }
    } catch (err) {
      console.warn('No se pudo conectar al servicio de noticias en vivo:', err);
    } finally {
      if (!isSilent) setIsLoadingLive(false);
    }
  }, []);

  // Carga inicial y auto-sync periódico (cada 2 minutos)
  useEffect(() => {
    fetchLiveUpdates();

    if (!isAutoSyncing) return;

    const interval = setInterval(() => {
      fetchLiveUpdates(true);
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchLiveUpdates, isAutoSyncing]);

  // Conjunto de títulos ya incorporados al monitor oficial
  const importedTitles = useMemo(() => {
    return new Set(items.map(i => i.title));
  }, [items]);

  // Incorporar una noticia en vivo al monitor oficial
  const handleImportToMonitor = (liveItem) => {
    const formattedItem = {
      ...liveItem,
      id: `imported-${Date.now()}`,
      status: 'Importada desde Fuentes en Vivo',
      deQueSeTrata: liveItem.deQueSeTrata || liveItem.summary,
      loMasImportante: liveItem.loMasImportante || liveItem.analysis?.obligacionesInmediatas || [],
      gaceta: liveItem.gaceta || 'Gaceta Oficial de Venezuela'
    };
    setItems(prev => [formattedItem, ...prev]);
  };

  // Lista única de entes emisores para el filtro
  const entitiesList = useMemo(() => {
    const list = new Set();
    items.forEach(i => {
      if (i.entity) {
        i.entity.split('/').forEach(e => list.add(e.trim()));
      }
    });
    return Array.from(list).sort();
  }, [items]);

  // Filtrado reactivo en tiempo real para el Dashboard
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title?.toLowerCase().includes(q);
        const inShort = item.shortTitle?.toLowerCase().includes(q);
        const inGaceta = item.gaceta?.toLowerCase().includes(q);
        const inSummary = item.summary?.toLowerCase().includes(q);
        const inQue = item.deQueSeTrata?.toLowerCase().includes(q);
        const inPuntos = item.loMasImportante?.some(p => p.toLowerCase().includes(q));
        const inTags = item.tags?.some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inShort && !inGaceta && !inSummary && !inQue && !inPuntos && !inTags) {
          return false;
        }
      }

      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (selectedImpact !== 'all' && item.impact !== selectedImpact) {
        return false;
      }

      if (selectedEntity !== 'all' && !item.entity?.toLowerCase().includes(selectedEntity.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [items, searchQuery, selectedCategory, selectedImpact, selectedEntity]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedImpact('all');
    setSelectedEntity('all');
  };

  const handleAddNewItem = (newItem) => {
    setItems(prev => [newItem, ...prev]);
  };

  const handleCompareItem = (item) => {
    if (item.id === 'ley-pensiones-2024') setInitialCompId('comp-pensiones');
    else if (item.id === 'locaptem-armonizacion-2023') setInitialCompId('comp-tributos-municipales');
    else if (item.id === 'igtf-divisas-reforma') setInitialCompId('comp-igtf');
    else if (item.id === 'extincion-dominio-2023') setInitialCompId('comp-dominio');
    setActiveTab('comparator');
  };

  const handleResetDefaultData = () => {
    if (confirm('¿Deseas restaurar el catálogo oficial de normas a su versión original enriquecida?')) {
      setItems(INITIAL_LEGAL_UPDATES);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  if (isReportViewOpen) {
    return (
      <ExecutiveReportView
        items={items}
        onClose={() => setIsReportViewOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Cabecera Superior */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenReportView={() => setIsReportViewOpen(true)}
        totalCount={items.length}
        liveCount={liveNews.length}
        isAutoSyncing={isAutoSyncing}
        setIsAutoSyncing={setIsAutoSyncing}
        onRefreshLive={() => fetchLiveUpdates(false)}
        isSyncing={isLoadingLive}
      />

      {/* Alerta flotante de nuevas noticias detectadas */}
      {newNewsAlert && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 shadow-md flex items-center justify-between gap-3 text-xs sm:text-sm font-bold no-print animate-in slide-in-from-top">
          <div className="flex items-center gap-2 max-w-7xl mx-auto flex-1">
            <BellRing className="w-4 h-4 animate-bounce" />
            <span>{newNewsAlert}</span>
            <button
              onClick={() => {
                setActiveTab('live');
                setNewNewsAlert(null);
              }}
              className="ml-3 underline hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>Ver en el radar en vivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            onClick={() => setNewNewsAlert(null)}
            className="p-1 hover:bg-amber-600 rounded-lg cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Banner Informativo Superior */}
      <section className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white py-7 px-4 sm:px-6 lg:px-8 border-b border-indigo-950 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Gacetas Oficiales • Resumen de lo que se trata • Puntos Críticos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Monitor Legislativo & Análisis Regulatorio • Venezuela
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Monitoreo continuo de publicaciones en Gaceta Oficial, decretos y resoluciones del SENIAT, BCV, SUDEBAN, SAREN, SUNAVI y la Asamblea Nacional. Cada reforma incluye su <strong>Gaceta Oficial</strong>, <strong>de qué se trata</strong> y el <strong>resumen de lo más importante</strong>.
            </p>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('live')}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Radar en Vivo ({liveNews.length})</span>
              </button>

              <button
                onClick={() => setIsReportViewOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white text-blue-950 font-bold text-xs hover:bg-blue-50 transition-all shadow-md"
              >
                Informe PDF
              </button>
            </div>
            
            <span className="text-[11px] text-slate-400 font-mono">
              Auto-Sync: {isAutoSyncing ? 'Cada 2 min' : 'Manual'}
            </span>
          </div>
        </div>
      </section>

      {/* Contenedor Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* PESTAÑA 1: DASHBOARD Y LEYES */}
        {activeTab === 'dashboard' && (
          <div>
            <DashboardStats items={items} />

            <FiltersBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedImpact={selectedImpact}
              setSelectedImpact={setSelectedImpact}
              selectedEntity={selectedEntity}
              setSelectedEntity={setSelectedEntity}
              entitiesList={entitiesList}
              onResetFilters={handleResetFilters}
            />

            <div className="flex items-center justify-between mb-4 px-1">
              <p className="text-xs font-bold text-slate-600">
                Mostrando <span className="text-blue-600 font-black">{filteredItems.length}</span> de {items.length} reformas analizadas
              </p>

              {filteredItems.length !== items.length && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  Ver todas las leyes
                </button>
              )}
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <LegalCard
                    key={item.id}
                    item={item}
                    onSelect={(selected) => setSelectedModalItem(selected)}
                    onCompare={handleCompareItem}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800">No se encontraron reformas con esos criterios</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Prueba modificando la búsqueda por palabra clave o eliminando los filtros seleccionados.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Restablecer Filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA 2: RADAR DE NOTICIAS EN VIVO */}
        {activeTab === 'live' && (
          <LiveNewsFeed
            liveNews={liveNews}
            isLoading={isLoadingLive}
            lastUpdated={lastSyncTime}
            onRefresh={() => fetchLiveUpdates(false)}
            onImportToMonitor={handleImportToMonitor}
            importedIds={importedTitles}
          />
        )}

        {/* PESTAÑA 3: COMPARADOR ANTES VS DESPUÉS */}
        {activeTab === 'comparator' && (
          <BeforeAfterComparator initialSelectedId={initialCompId} />
        )}

        {/* PESTAÑA 4: CALCULADORAS DE IMPACTO */}
        {activeTab === 'calculators' && (
          <ComplianceCalculator />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 space-y-2 no-print">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleResetDefaultData}
            className="hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restaurar datos iniciales</span>
          </button>
          <span>•</span>
          <button
            onClick={() => setActiveTab('live')}
            className="hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            <Radio className="w-3 h-3 text-rose-500" />
            <span>Radar de noticias ({liveNews.length} detectadas)</span>
          </button>
          <span>•</span>
          <button
            onClick={() => setIsReportViewOpen(true)}
            className="hover:text-blue-600 transition-colors"
          >
            Exportar reporte PDF
          </button>
        </div>
        <p>
          LexVen Monitor • Actualizaciones automáticas y análisis jurídico continuo de la legislación de Venezuela.
        </p>
      </footer>

      {/* Modal de Detalle */}
      {selectedModalItem && (
        <LegalDetailModal
          item={selectedModalItem}
          onClose={() => setSelectedModalItem(null)}
          onPrintSingle={(item) => {
            window.print();
          }}
        />
      )}

      {/* Modal para Añadir Nueva Norma */}
      <AddUpdateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddNewItem}
      />

    </div>
  );
}
