import React, { useState } from 'react';
import { X, PlusCircle, Save } from 'lucide-react';
import { CATEGORIES } from '../data/legalUpdates';

export default function AddUpdateModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    gaceta: '',
    date: new Date().toISOString().split('T')[0],
    category: 'tributaria',
    entity: 'Asamblea Nacional',
    impact: 'alto',
    status: 'Vigente',
    summary: '',
    deQueSeTrata: '',
    loMasImportante: '',
    queCambio: '',
    aQuienAfecta: '',
    impactoEconomico: '',
    obligacionesInmediatas: '',
    sancionesRiesgos: '',
    tags: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.gaceta || !formData.summary) {
      alert('Por favor completa al menos el título, número de Gaceta Oficial y resumen del cambio.');
      return;
    }

    const loMasImportanteArray = formData.loMasImportante
      ? formData.loMasImportante.split('\n').filter(Boolean)
      : formData.obligacionesInmediatas
      ? formData.obligacionesInmediatas.split('\n').filter(Boolean)
      : [formData.summary];

    const newUpdate = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      shortTitle: formData.shortTitle || formData.title,
      gaceta: formData.gaceta,
      date: formData.date,
      category: formData.category,
      entity: formData.entity,
      impact: formData.impact,
      status: formData.status,
      summary: formData.summary,
      deQueSeTrata: formData.deQueSeTrata || formData.summary,
      loMasImportante: loMasImportanteArray,
      analysis: {
        queCambio: formData.queCambio || formData.summary,
        aQuienAfecta: formData.aQuienAfecta || 'Empresas y particulares en Venezuela',
        impactoEconomico: formData.impactoEconomico || 'Impacto en cumplimiento y costos operativos',
        obligacionesInmediatas: loMasImportanteArray,
        sancionesRiesgos: formData.sancionesRiesgos || 'Sanciones según el marco normativo aplicable',
      },
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : ['Nueva Norma', 'Gaceta Oficial']
    };

    onSave(newUpdate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Registrar Nueva Reforma o Gaceta Oficial</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Título Oficial de la Ley / Decreto / Providencia *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej. Providencia Administrativa que regula..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nombre Corto / Asunto Clave</label>
              <input
                type="text"
                value={formData.shortTitle}
                onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })}
                placeholder="Ej. Ajuste de Alícuota..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Número de Gaceta Oficial donde se publica *</label>
              <input
                type="text"
                required
                value={formData.gaceta}
                onChange={(e) => setFormData({ ...formData, gaceta: e.target.value })}
                placeholder="Ej. Gaceta Oficial N° 43.485 / G.O. N° 6.833 Ext."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Materia Legal</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nivel de Impacto</label>
              <select
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="critico">🔴 Crítico / Urgente</option>
                <option value="alto">🟠 Alto Impacto</option>
                <option value="medio">🔵 Impacto Medio</option>
                <option value="bajo">⚪ Informativo / Bajo</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Fecha de Publicación</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ente Emisor</label>
              <input
                type="text"
                value={formData.entity}
                onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                placeholder="Ej. SENIAT, BCV, SUDEBAN, Presidencia..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Etiquetas (separadas por comas)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Ej. Impuestos, Dólar, Nómina"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">📖 Resumen de lo que se trata *</label>
            <textarea
              rows={2}
              required
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value, deQueSeTrata: e.target.value })}
              placeholder="Explica sintéticamente de qué se trata la norma, su contexto y objetivo..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">⭐ Resumen de lo más importante (Puntos clave, uno por línea)</label>
            <textarea
              rows={3}
              value={formData.loMasImportante}
              onChange={(e) => setFormData({ ...formData, loMasImportante: e.target.value })}
              placeholder="Ej:&#10;• Alícuota del 9% patronal&#10;• Gravamen sobre bonos no salariales&#10;• Declaración mensual obligatoria ante el SENIAT"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">¿A quién afecta directamente?</label>
              <input
                type="text"
                value={formData.aQuienAfecta}
                onChange={(e) => setFormData({ ...formData, aQuienAfecta: e.target.value })}
                placeholder="Ej. Empresas privadas con más de 10 empleados..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Impacto Financiero u Operativo</label>
              <input
                type="text"
                value={formData.impactoEconomico}
                onChange={(e) => setFormData({ ...formData, impactoEconomico: e.target.value })}
                placeholder="Ej. Incremento de 5% en flujo de caja..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-md shadow-blue-600/20"
            >
              <Save className="w-4 h-4" />
              <span>Guardar en el Monitor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
