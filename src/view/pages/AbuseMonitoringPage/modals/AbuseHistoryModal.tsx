interface AbuseHistoryModalProps {
  open: boolean;
  onClose: () => void;
  payload: {
    type: "cpf" | "address";
    data: any; // Aqui você pode tipar como CpfRankingItem | AddressRankingItem
  };
}

// Helper para traduzir o status
const statusMap: Record<string, { label: string; color: string }> = {
  REQUESTED: { label: "Solicitada", color: "bg-blue-100 text-blue-800" },
  APPROVED: { label: "Aprovada", color: "bg-green-100 text-green-800" },
  DELIVERED: { label: "Entregue", color: "bg-purple-100 text-purple-800" },
  COMPLETED: { label: "Concluída", color: "bg-gray-100 text-gray-800" },
  CANCELLED: { label: "Cancelada", color: "bg-red-100 text-red-800" },
  UNDER_REVIEW: { label: "Em Análise", color: "bg-yellow-100 text-yellow-800" },
};

export function AbuseHistoryModal({
  open,
  onClose,
  payload,
}: AbuseHistoryModalProps) {
  if (!open || !payload.data) return null;

  const { type, data } = payload;
  const requests = data.requests || [];

  // Pega os dados do usuário com base na primeira requisição (já que o CPF é o mesmo)
  const firstRequest = requests[0];
  const requesterName =
    firstRequest?.account?.name || firstRequest?.name || "Não informado";
  const requesterEmail =
    firstRequest?.account?.email || firstRequest?.email || "Não informado";

  const title =
    type === "cpf" ? `Histórico do CPF: ${data.cpf}` : `Histórico do Endereço`;
  const subtitle = type === "address" ? data.address : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-md hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Card de Dados do Usuário */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-md flex items-start gap-4">
            <div className="h-10 w-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
              {requesterName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-1">
                Dados do Solicitante Principal
              </h3>
              <p className="text-gray-800 font-medium">{requesterName}</p>
              <p className="text-gray-600 text-sm">{requesterEmail}</p>
            </div>
          </div>

          {/* Tabela de Histórico */}
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Caçambas Solicitadas ({requests.length})
          </h3>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Protocolo</th>
                  <th className="px-4 py-3">Status</th>
                  {type === "cpf" && (
                    <th className="px-4 py-3">Endereço Destino</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((req: any) => {
                  const statusInfo = statusMap[req.status] || {
                    label: req.status,
                    color: "bg-gray-100 text-gray-800",
                  };
                  return (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(req.orderDate).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {req.protocol || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      {type === "cpf" && (
                        <td
                          className="px-4 py-3 truncate max-w-[200px]"
                          title={req.addressFormatted}
                        >
                          {req.addressFormatted || req.address}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
