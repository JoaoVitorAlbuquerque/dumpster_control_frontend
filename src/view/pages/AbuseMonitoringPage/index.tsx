import { Spinner } from "../../components/Spinner";
import { AbuseHistoryModal } from "./modals/AbuseHistoryModal";
import { useAbuseMonitoringPageController } from "./useAbuseMonitoringPageController";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function AbuseMonitoringPage() {
  const {
    selectedYear,
    setSelectedYear,
    abuseReportData,
    isinitialLoadingAbuseReport,
    isErrorAbuseReport,
    handleDownloadExcel,
    isHistoryModalOpen,
    historyModalPayload,
    handleOpenHistoryModal,
    handleCloseHistoryModal,
  } = useAbuseMonitoringPageController();

  if (isinitialLoadingAbuseReport) {
    return (
      <div className="w-full mt-2 flex items-center justify-center">
        <Spinner className="w-6 h-6" />
      </div>
    );
  }

  if (isErrorAbuseReport)
    return <div className="p-8 text-red-500">Erro ao carregar dados.</div>;

  // Pegamos apenas o Top 10 para o gráfico não ficar espremido
  const topCpfs = abuseReportData?.rankingCpf.slice(0, 10) || [];
  const topAddresses = abuseReportData?.rankingAddress.slice(0, 10) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header e Controles */}
      <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Monitoramento de Abusos
        </h1>

        <div className="flex items-center gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {[2023, 2024, 2025, 2026, 2027].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button
            onClick={handleDownloadExcel}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            {/* <DownloadIcon /> */}
            <span>Exportar XLSX</span>
          </button>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-red-600">
            Top 10 CPFs Infratores
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCpfs} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="cpf"
                  type="category"
                  width={100}
                  fontSize={12}
                />
                <Tooltip />
                <Bar
                  dataKey="total"
                  fill="#ef4444"
                  radius={[0, 4, 4, 0]}
                  name="Qtd. Caçambas"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-orange-600">
            Top 10 Endereços Suspeitos
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topAddresses}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="address"
                  type="category"
                  width={150}
                  fontSize={10}
                />
                <Tooltip />
                <Bar
                  dataKey="total"
                  fill="#f97316"
                  radius={[0, 4, 4, 0]}
                  name="Qtd. Caçambas"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabelas Detalhadas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-700">
              Ranking Detalhado: Por CPF (Limite: 6/ano)
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3">CPF</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Ação</th>
                </tr>
              </thead>
              <tbody>
                {abuseReportData?.rankingCpf.map((item: any) => (
                  <tr key={item.cpf} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {item.cpf}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {item.total}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleOpenHistoryModal("cpf", item)}
                        className="text-blue-600 hover:underline font-medium cursor-pointer"
                      >
                        Ver Histórico
                      </button>
                    </td>
                  </tr>
                ))}
                {abuseReportData?.rankingCpf.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      Nenhum abuso detectado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-700">
              Ranking Detalhado: Por Endereço (Limite: 4/ano)
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3">Endereço</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Ação</th>
                </tr>
              </thead>
              <tbody>
                {abuseReportData?.rankingAddress.map((item: any) => (
                  <tr key={item.address} className="border-b hover:bg-gray-50">
                    <td
                      className="px-4 py-3 font-medium text-gray-900 truncate max-w-xs"
                      title={item.address}
                    >
                      {item.address}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {item.total}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleOpenHistoryModal("address", item)}
                        className="text-blue-600 hover:underline font-medium cursor-pointer"
                      >
                        Ver Histórico
                      </button>
                    </td>
                  </tr>
                ))}
                {abuseReportData?.rankingAddress.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      Nenhum abuso detectado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {historyModalPayload && (
        <AbuseHistoryModal
          open={isHistoryModalOpen}
          onClose={handleCloseHistoryModal}
          payload={historyModalPayload}
        />
      )}
    </div>
  );
}
