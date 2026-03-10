export function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-xl p-4 text-sm w-56">
      <h3 className="font-semibold text-gray-700 mb-3">Legenda do Mapa</h3>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#2563eb]"></div>
          <span>Área permitida para solicitação</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-300"></div>
          <span>Limite da cidade</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span>Caçamba em serviço</span>
        </div>

        {/* <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-blue-500"></div>
          <span>Endereço selecionado</span>
        </div> */}
      </div>
    </div>
  );
}
