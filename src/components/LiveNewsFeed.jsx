import React, { useState, useMemo } from 'react';
import { Radio, RefreshCw, ExternalLink, PlusCircle, CheckCircle2, Clock, Newspaper, Search, ShieldAlert, Sparkles, Filter, FileText, Star, BookOpen } from 'lucide-react';
import { CATEGORIES, IMPACT_LEVELS } from '../data/legalUpdates';

export default function LiveNewsFeed({
  liveNews,
  isLoading,
  lastUpdated,
  onRefresh,
  onImportToMonitor,
  importedIds
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyGacetas, setOnlyGacetas] = useState(false);

  // Filtrado reactivo en tiempo real
  const filteredNews = useMemo(() => {
    return liveNews.filter(item => {
      // Filtro de sólo gacetas oficiales confirmadas
      if (onlyGacetas && !item.hasOfficialGaceta && !/gaceta oficial n/i.test(item.gaceta)) {
        return false;
      }
      // Filtro de categoría
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Filtro de búsqueda
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title?.toLowerCase().includes(q);
        const inSource = item.sourceName?.toLowerCase().includes(q);
        const inGaceta = item.gaceta?.toLowerCase().includes(q);
        const inQue = item.deQueSeTrata?.toLowerCase().includes(q);
        const inPuntos = item.loMasImportante?.some(p => p.toLowerCase().includes(q));
        if (!inTitle && !inSource && !inGaceta && !inQue && !inPuntos) return false;
      }
      return true;
    });
  }, [liveNews, onlyGacetas, selectedCategory, searchQuery]);

  const gacetasCount = useMemo(() => {
    return liveNews.filter(i => i.hasOfficialGaceta || /gaceta oficial n/i.test(i.gaceta)).length;
  }, [liveNews]);

  return (
    <div className="space-y-6">
      
      {/* Banner de Sincronización en Vivo */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-indigo-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-black tracking-wider uppercase text-emerald-400">
                Radar Jurídico & Gacetas Oficiales en Tiempo Real • Venezuela
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Actualizaciones Legislativas, Gacetas y Noticias Analizadas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Cada noticia y Gaceta Oficial publicada se procesa automáticamente para extraer el <strong>número de Gaceta</strong>, un <strong>resumen de lo que se trata</strong> y el <strong>resumen de lo más importante</strong> para la toma de decisiones legales y operativas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="text-right text-xs text-slate-300 hidden sm:block">
              <div>Última sincronización:</div>
              <div className="font-mono font-bold text-emerald-400">
                {lastUpdated ? new Date(lastUpdated).toLocaleTimeString('es-VE') : 'Actualizando...'}
              </div>
            </div>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Sincronizando fuentes...' : 'Actualizar Noticias Ahora'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Filtros del Feed en Vivo */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Input Buscador */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en noticias (ej. Gaceta 43485, SENIAT facturación, SUNAVI, tasa BCV, amnistía)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Toggle de Gacetas Confirmadas */}
          <button
            onClick={() => setOnlyGacetas(!onlyGacetas)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
              onlyGacetas
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Sólo con Gaceta Oficial ({gacetasCount})</span>
          </button>
        </div>

        {/* Píldoras de Materias */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({liveNews.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = liveNews.filter(i => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label.split(' ')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat.id ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conteo de Resultados */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-600 font-bold">
        <span>Mostrando {filteredNews.length} publicaciones analizadas</span>
        {onlyGacetas && (
          <span className="text-amber-700 flex items-center gap-1">
            <span>Filtro activo: Únicamente ejemplares de Gaceta Oficial</span>
            <button onClick={() => setOnlyGacetas(false)} className="underline hover:text-amber-900 ml-1">Ver todas</button>
          </span>
        )}
      </div>

      {/* Lista de Tarjetas de Noticias en Vivo */}
      {isLoading && liveNews.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">Conectando con fuentes jurídicas y de noticias de Venezuela...</h4>
          <p className="text-xs text-slate-500 mt-1">Escaneando gacetas oficiales y publicaciones en tiempo real...</p>
        </div>
      ) : filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNews.map((item) => {
            const isImported = importedIds.has(item.title);
            const categoryInfo = CATEGORIES.find(c => c.id === item.category) || { label: item.category };
            const impactInfo = IMPACT_LEVELS[item.impact] || IMPACT_LEVELS.medio;
            const hasGacetaOficial = /gaceta oficial n/i.test(item.gaceta);

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group hover:border-blue-400"
              >
                <div>
                  {/* Fila 1: Fuente, Fecha, Categoría e Impacto */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
                        <Newspaper className="w-3 h-3 text-slate-500" />
                        <span>{item.sourceName}</span>
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {categoryInfo.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${impactInfo.badge}`}>
                        {impactInfo.label}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                    </div>
                  </div>

                  {/* Fila 2: IDENTIFICACIÓN PROMINENTE DE LA GACETA OFICIAL */}
                  <div className="mb-3">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border ${
                      hasGacetaOficial
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      <FileText className={`w-3.5 h-3.5 shrink-0 ${hasGacetaOficial ? 'text-amber-400' : 'text-slate-500'}`} />
                      <span>{item.gaceta}</span>
                    </div>
                  </div>

                  {/* Título de la Noticia */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* SECCIÓN OBLIGATORIA 1: Resumen de lo que se trata */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 mb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>¿De qué se trata esta actualización?</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {item.deQueSeTrata || item.summary}
                    </p>
                  </div>

                  {/* SECCIÓN OBLIGATORIA 2: Resumen de lo más importante */}
                  {item.loMasImportante && item.loMasImportante.length > 0 && (
                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/90 mb-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-950">
                        <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                        <span>Resumen de lo más importante:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-800">
                        {item.loMasImportante.map((punto, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                            <span className="leading-snug">{punto}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Institución & Afectados */}
                  <div className="text-[11px] text-slate-600 space-y-0.5 mb-2 px-1">
                    <div>
                      <strong>🏛️ Ente Emisor: </strong>
                      <span>{item.entity}</span>
                    </div>
                    <div>
                      <strong>🎯 Afecta a: </strong>
                      <span>{item.analysis?.aQuienAfecta || 'Empresas y particulares'}</span>
                    </div>
                  </div>

                </div>

                {/* Acciones de la Tarjeta */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Fuente original</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {isImported ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Agregada al Monitor</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onImportToMonitor(item)}
                      className="inline-flex items-center gap-1.5 font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-95"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Incorporar al Monitor</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
          <p className="text-base font-bold text-slate-800">No se encontraron noticias con los filtros seleccionados.</p>
          <p className="text-xs text-slate-500 mt-1">Prueba desactivando el filtro de Gaceta o limpiando el buscador.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setOnlyGacetas(false); }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Restablecer Filtros
          </button>
        </div>
      )}

    </div>
  );
}
