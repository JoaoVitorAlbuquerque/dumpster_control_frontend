import { useParams } from "react-router-dom";
import { getActivityGuidelines } from "../../../app/utils/activityGuidelines";

export function RequestSuccess() {
  const { protocol, activity } = useParams();

  const rules = getActivityGuidelines(activity ?? "CLEANING");

  console.log("Activity:", activity);
  console.log("Rules:", rules);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg">
        {/* Header institucional */}
        <div className="bg-green-700 text-white rounded-t-2xl p-6">
          <h1 className="text-xl font-semibold">
            Sistema Municipal de Solicitações
          </h1>
        </div>

        <div className="p-8">
          {/* Sucesso */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700">
              Solicitação registrada com sucesso
            </h2>

            <p className="mt-3 text-gray-600">
              Guarde seu protocolo para acompanhar o atendimento.
            </p>
          </div>

          {/* Protocolo */}
          <div className="mt-6 bg-gray-100 rounded-xl p-5 text-center">
            <p className="text-sm text-gray-500">Protocolo</p>
            <p className="text-xl font-mono font-bold">{protocol}</p>
          </div>

          {/* Prazo */}
          <div className="mt-6 text-sm text-gray-700">
            <p>
              ⏱ Prazo médio de atendimento: <b>até 5 dias úteis</b>.
            </p>
          </div>

          {/* Orientações */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg text-gray-800">
              Orientações para descarte ({rules.title})
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <p className="font-semibold text-green-700 mb-2">
                  Materiais permitidos
                </p>

                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {rules.allowed.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-red-600 mb-2">
                  Materiais proibidos
                </p>

                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {rules.forbidden.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Consulta */}
          <div className="mt-8 p-5 bg-blue-50 rounded-xl">
            <h4 className="font-semibold text-blue-800">
              Acompanhar solicitação
            </h4>

            <p className="text-sm mt-2 text-gray-700">
              Você pode acompanhar o andamento da sua solicitação utilizando seu
              protocolo na página de consulta.
            </p>

            <a
              href="/consult-protocol"
              className="inline-block mt-3 text-blue-700 font-semibold"
            >
              Consultar protocolo →
            </a>
          </div>

          {/* Contato */}
          <div className="mt-8 text-sm text-gray-600 text-center">
            Em caso de dúvidas entre em contato com a Prefeitura.
          </div>
        </div>
      </div>
    </div>
  );
}
