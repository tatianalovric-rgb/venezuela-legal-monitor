import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function ComplianceCalculator() {
  const [activeTab, setActiveTab] = useState('pensiones');

  // Estado para Calculadora de Pensiones (9%)
  const [salarioBasico, setSalarioBasico] = useState(130); // Bs.
  const [bonoDivisas, setBonoDivisas] = useState(150); // USD por trabajador
  const [numTrabajadores, setNumTrabajadores] = useState(10);
  const [tasaBcv, setTasaBcv] = useState(48.50); // Tasa referencial oficial

  // Estado para Calculadora IGTF (3%)
  const [montoCompra, setMontoCompra] = useState(100);
  const [monedaCompra, setMonedaCompra] = useState('USD');
  const [medioPago, setMedioPago] = useState('divisa_efectivo');

  // Estado para Armonización Municipal LOCAPTEM
  const [actividadSector, setActividadSector] = useState('comercio_general');
  const [alicuotaAlcaldia, setAlicuotaAlcaldia] = useState(4.5);

  // Cálculos Pensiones
  const totalNominaPorTrabajadorUSD = (salarioBasico / tasaBcv) + parseFloat(bonoDivisas || 0);
  const totalNominaEmpresaUSD = totalNominaPorTrabajadorUSD * (parseInt(numTrabajadores) || 1);
  const aportePensionesUSD = totalNominaEmpresaUSD * 0.09;
  const aportePensionesBS = aportePensionesUSD * tasaBcv;

  // Cálculos IGTF
  const esGravableIgtf = medioPago === 'divisa_efectivo' || medioPago === 'transferencia_extranjera';
  const igtfCalculado = esGravableIgtf ? (parseFloat(montoCompra || 0) * 0.03) : 0;
  const totalPagar = parseFloat(montoCompra || 0) + igtfCalculado;

  // Cálculos LOCAPTEM
  const topesPorSector = {
    comercio_general: 3.0,
    industria: 2.5,
    servicios: 3.0,
    farmacia_alimentos: 1.5,
    licores_tabaco: 5.5,
  };
  const topeLegal = topesPorSector[actividadSector] || 3.0;
  const excedeTope = parseFloat(alicuotaAlcaldia || 0) > topeLegal;
  const diferenciaExceso = (parseFloat(alicuotaAlcaldia || 0) - topeLegal).toFixed(2);

  return (
    <div className="space-y-6">
      
      {/* Selector de Calculadora */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>Simuladores de Impacto Financiero & Tributario</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Calcula con precisión las obligaciones monetarias introducidas por las reformas legales vigentes en Venezuela.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('pensiones')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'pensiones'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Contribución de Pensiones (9%)
          </button>

          <button
            onClick={() => setActiveTab('igtf')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'igtf'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Simulador de IGTF (3% Divisas)
          </button>

          <button
            onClick={() => setActiveTab('locaptem')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'locaptem'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semáforo de Alícuota Municipal (LOCAPTEM)
          </button>
        </div>
      </div>

      {/* VISTA 1: CALCULADORA DE PENSIONES 9% */}
      {activeTab === 'pensiones' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Formulario Inputs */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Parámetros de Nómina y Compensación
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Número de Trabajadores en Nómina
                </label>
                <input
                  type="number"
                  min="1"
                  value={numTrabajadores}
                  onChange={(e) => setNumTrabajadores(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tasa Oficial BCV de Referencia (Bs/$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={tasaBcv}
                  onChange={(e) => setTasaBcv(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bonificación No Salarial Mensual Promedio por Trabajador (USD)
              </label>
              <input
                type="number"
                value={bonoDivisas}
                onChange={(e) => setBonoDivisas(e.target.value)}
                placeholder="Ej. 150 (Bono de guerra, ayuda económica en divisas)"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                ⚠️ La Ley de Pensiones grava explícitamente bonos que no forman parte del salario legal ordinario.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Salario Mínimo / Base Formal por Trabajador (Bs.)
              </label>
              <input
                type="number"
                value={salarioBasico}
                onChange={(e) => setSalarioBasico(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Resultado Impacto */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
                Liquidación Estimada SENIAT (9%)
              </span>

              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Aporte Total Patronal a Enterar por Mes:
              </h4>

              <div className="mt-3">
                <span className="text-4xl font-black text-emerald-400">
                  ${aportePensionesUSD.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm text-slate-300 ml-2">USD / mes</span>
              </div>

              <div className="mt-1 text-slate-400 text-sm font-mono">
                ≈ Bs. {aportePensionesBS.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Masa laboral total:</span>
                  <span className="font-bold text-white">${totalNominaEmpresaUSD.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Costo parafiscal por trabajador:</span>
                  <span className="font-bold text-emerald-400">${(aportePensionesUSD / (numTrabajadores || 1)).toFixed(2)} USD/mes</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Deducibilidad en ISLR:</span>
                  <span className="font-bold text-emerald-300">Sí (Gasto Operativo Deducible)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-tight">
              📌 Fundamento: G.O. N° 6.806 Ext. El pago debe declararse y enterarse a través del portal del SENIAT según el terminal de RIF.
            </div>
          </div>
        </div>
      )}

      {/* VISTA 2: CALCULADORA IGTF 3% */}
      {activeTab === 'igtf' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Datos de la Operación de Compra / Pago
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Monto Base de la Factura o Compra ($)
              </label>
              <input
                type="number"
                value={montoCompra}
                onChange={(e) => setMontoCompra(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Medio de Pago Empleado por el Cliente
              </label>
              <select
                value={medioPago}
                onChange={(e) => setMedioPago(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="divisa_efectivo">💵 Dólares o Euros en Efectivo (Aplica 3% IGTF)</option>
                <option value="transferencia_extranjera">📱 Zelle / Transferencia Internacional directa (Aplica 3% IGTF)</option>
                <option value="bolivares_pago_movil">💳 Pago Móvil / Tarjeta de Débito Nacional en Bs. (Exento 0% IGTF)</option>
                <option value="cuenta_custodia">🏦 Tarjeta de Débito con cargo a cuenta nacional en divisas (Exento)</option>
              </select>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <span className="font-bold">Regla de Percepción:</span>
              <p>
                Si el establecimiento comercial es Sujeto Pasivo Especial (SPE) designado por el SENIAT, está obligado por ley a percibir el 3% cuando el cliente pague en moneda extranjera sin mediación del sistema bancario nacional.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-3">
                Desglose en Ticket Fiscal
              </span>

              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Total a Cobrar al Consumidor:
              </h4>

              <div className="mt-3">
                <span className="text-4xl font-black text-blue-400">
                  ${totalPagar.toFixed(2)}
                </span>
                <span className="text-sm text-slate-300 ml-2">USD</span>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Monto Base Bien/Servicio:</span>
                  <span className="font-bold text-white">${parseFloat(montoCompra || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Alícuota IGTF aplicable:</span>
                  <span className={`font-bold ${esGravableIgtf ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {esGravableIgtf ? '3.00%' : '0.00% (Exento)'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Monto del Impuesto IGTF:</span>
                  <span className="font-bold text-amber-300">${igtfCalculado.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              📌 Fundamento: G.O. N° 6.687 Ext. El agente de percepción debe enterar los montos al SENIAT quincenalmente.
            </div>
          </div>
        </div>
      )}

      {/* VISTA 3: AUDITORÍA LOCAPTEM MUNICIPAL */}
      {activeTab === 'locaptem' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Verificador de Legalidad de Alícuotas Municipales
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sector o Rama de Actividad Económica
              </label>
              <select
                value={actividadSector}
                onChange={(e) => setActividadSector(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="comercio_general">Comercio General y Venta al Mayor/Menor (Tope LOCAPTEM: 3.0%)</option>
                <option value="servicios">Servicios Profesionales, Técnicos y Consultorías (Tope: 3.0%)</option>
                <option value="industria">Industria y Manufactura (Tope: 2.5%)</option>
                <option value="farmacia_alimentos">Farmacia, Salud y Alimentos Esenciales (Tope: 1.5%)</option>
                <option value="licores_tabaco">Licores y Cigarrillos (Tope máximo especial: 5.5%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alícuota Porcentual Cobrada por tu Alcaldía (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={alicuotaAlcaldia}
                onChange={(e) => setAlicuotaAlcaldia(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Ingresa el porcentaje que figura en tu recibo de Impuesto sobre Actividades Económicas (ISAE) del municipio.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-3 ${
                excedeTope 
                  ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {excedeTope ? '🚨 COBRO ILEGAL / EXCESIVO' : '✅ CONFORME A LA LEY NACIONAL'}
              </span>

              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Dictamen Legal Automático:
              </h4>

              <div className="mt-3">
                <span className={`text-3xl font-black ${excedeTope ? 'text-red-400' : 'text-emerald-400'}`}>
                  {excedeTope ? `Excede en +${diferenciaExceso}%` : 'Dentro del Límite'}
                </span>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Tope legal máximo fijado por LOCAPTEM:</span>
                  <span className="font-bold text-white">{topeLegal.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Alícuota actual de la ordenanza:</span>
                  <span className="font-bold text-amber-300">{parseFloat(alicuotaAlcaldia || 0).toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              {excedeTope ? (
                <p className="text-red-300 font-medium">
                  ⚖️ Tu empresa puede interponer un recurso de amparo tributario o solicitar el ajuste inmediato de la ordenanza conforme al Art. 30 de la LOCAPTEM.
                </p>
              ) : (
                <p className="text-emerald-300 font-medium">
                  👌 La ordenanza de tu alcaldía respeta los techos armonizados nacionales vigentes.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
