// import { Input } from "../components/Input";
// import { useProtocolConsultPageController } from "./useProtocolConsultPageController";

// export function ProtocolConsultPage() {
//   const { protocolData, isLoading, errors, register, handleSubmit } =
//     useProtocolConsultPageController();

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Consulta de Protocolo
//           </h1>
//           <p className="text-gray-500 mt-2 text-sm">
//             Digite o número do protocolo para acompanhar sua solicitação
//           </p>
//         </div>

//         {/* Input */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <Input
//             type="text"
//             placeholder="Ex: 2024000123"
//             error={errors.protocol?.message}
//             // value={protocolData?.protocol || ""}
//             // className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             {...register("protocol")}
//           />

//           <button
//             onClick={handleSubmit}
//             className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold"
//           >
//             Consultar
//           </button>
//         </div>

//         {/* Captcha */}
//         {/* <div className="mb-6 flex justify-center">
//           <ReCAPTCHA
//             sitekey={RECAPTCHA_KEY}
//             onChange={(token) => setCaptchaToken(token)}
//           />
//         </div> */}

//         {/* Loading */}
//         {isLoading && (
//           <div className="text-center text-gray-500 animate-pulse">
//             Consultando protocolo...
//           </div>
//         )}

//         {/* Error */}
//         {errors.root && (
//           <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center">
//             {errors.root.message
//               ? errors.root.message
//               : "Erro ao consultar solicitação."}
//           </div>
//         )}

//         {/* Resultado */}
//         {protocolData && (
//           <div className="mt-6 bg-gray-50 p-6 rounded-xl border">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-bold text-lg">
//                 Protocolo: {protocolData.protocol}
//               </h2>
//               <StatusBadge status={protocolData.status} />
//             </div>

//             <div className="space-y-3 text-sm text-gray-700">
//               <div>
//                 <span className="font-semibold">Título:</span>{" "}
//                 {protocolData.title}
//               </div>

//               {protocolData.description && (
//                 <div>
//                   <span className="font-semibold">Descrição:</span>{" "}
//                   {protocolData.description}
//                 </div>
//               )}

//               <div>
//                 <span className="font-semibold">Data de abertura:</span>{" "}
//                 {new Date(protocolData.createdAt).toLocaleDateString("pt-BR")}
//               </div>

//               {protocolData.deliveryDate && (
//                 <div>
//                   <span className="font-semibold">Data de entrega:</span>{" "}
//                   {new Date(protocolData.deliveryDate).toLocaleDateString(
//                     "pt-BR",
//                   )}
//                 </div>
//               )}

//               {protocolData.activity && (
//                 <div>
//                   <span className="font-semibold">Atividade:</span>{" "}
//                   {protocolData.activity}
//                 </div>
//               )}

//               {protocolData.priority && (
//                 <div>
//                   <span className="font-semibold">Prioridade:</span>{" "}
//                   {protocolData.priority}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const base =
//     "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide";

//   if (status === "OPEN")
//     return (
//       <span className={`${base} bg-yellow-100 text-yellow-800`}>Aberto</span>
//     );

//   if (status === "IN_PROGRESS")
//     return (
//       <span className={`${base} bg-blue-100 text-blue-800`}>Em andamento</span>
//     );

//   if (status === "DELIVERED")
//     return (
//       <span className={`${base} bg-green-100 text-green-800`}>Entregue</span>
//     );

//   return <span className={`${base} bg-gray-200 text-gray-700`}>{status}</span>;
// }

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useProtocolConsultPageController } from "./useProtocolConsultPageController";

export function ProtocolConsultPage() {
  const { protocolData, isLoading, errors, register, handleSubmit } =
    useProtocolConsultPageController();

  return (
    <div className="h-full bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg sm:max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Consulta de Protocolo
          </h1>
          <p className="text-gray-500 mt-2 text-xs sm:text-sm">
            Digite o número do protocolo para acompanhar sua solicitação
          </p>
        </div>

        {/* Input + Botão */}
        <div className="flex items-center flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <Input
            type="text"
            placeholder="Ex: 2024000123"
            error={errors.protocol?.message}
            className="flex-1"
            {...register("protocol")}
          />

          <Button
            onClick={handleSubmit}
            // className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold w-full sm:w-auto"
          >
            Consultar
          </Button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center text-gray-500 animate-pulse">
            Consultando protocolo...
          </div>
        )}

        {/* Error */}
        {errors.root && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center">
            {errors.root.message
              ? errors.root.message
              : "Erro ao consultar solicitação."}
          </div>
        )}

        {/* Resultado */}
        {protocolData && (
          <div className="mt-4 sm:mt-6 bg-gray-50 p-4 sm:p-6 rounded-xl border">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="font-bold text-base sm:text-lg">
                Protocolo:{" "}
                <span className="font-semibold text-teal-600">
                  {protocolData.protocol}
                </span>
              </h2>
              <StatusBadge status={protocolData.status} />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-700">
              <div>
                <span className="font-semibold">Nome: </span>{" "}
                {protocolData.name}
              </div>

              {protocolData.description && (
                <div>
                  <span className="font-semibold">Descrição:</span>{" "}
                  {protocolData.description}
                </div>
              )}

              {protocolData.addressFormatted && (
                <div>
                  <span className="font-semibold">Endereço: </span>{" "}
                  {protocolData.addressFormatted}
                </div>
              )}

              <div>
                <span className="font-semibold">Data de abertura:</span>{" "}
                {new Date(protocolData.createdAt).toLocaleDateString("pt-BR")}
              </div>

              {protocolData.deliveryDate && (
                <div>
                  <span className="font-semibold">Data de entrega:</span>{" "}
                  {new Date(protocolData.deliveryDate).toLocaleDateString(
                    "pt-BR",
                  )}
                </div>
              )}

              {protocolData.activity && (
                <div>
                  <span className="font-semibold">Atividade:</span>{" "}
                  {protocolData.activity === "CLEANING"
                    ? "Limpeza"
                    : protocolData.activity === "TREE"
                      ? "Árvore"
                      : protocolData.activity === "CONSTRUCTION"
                        ? "Construção"
                        : protocolData.activity === "GROUND"
                          ? "Terra"
                          : "-"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status:
    | "REQUESTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED";
}) {
  const base = "px-3 py-1 rounded-full font-bold uppercase tracking-wide";

  if (status === "REQUESTED")
    return (
      <span className={`${base} bg-yellow-100 text-yellow-800`}>Aberto</span>
    );

  if (status === "UNDER_REVIEW")
    return (
      <span className={`${base} bg-purple-100 text-purple-800`}>
        Em análise
      </span>
    );

  if (status === "APPROVED")
    return (
      <span className={`${base} bg-green-100 text-green-800`}>Aprovado</span>
    );

  if (status === "DELIVERED")
    return (
      <span className={`${base} bg-green-100 text-green-800`}>Entregue</span>
    );

  if (status === "COMPLETED")
    return (
      <span className={`${base} bg-blue-100 text-blue-800`}>Concluído</span>
    );

  if (status === "CANCELLED")
    return <span className={`${base} bg-red-100 text-red-800`}>Cancelado</span>;

  return <span className={`${base} bg-gray-200 text-gray-700`}>{status}</span>;
}
