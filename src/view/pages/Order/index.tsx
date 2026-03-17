import { DownloadIcon, FilterIcon, X } from "lucide-react";
import { FiltersModal } from "./components/FiltersModal";
import { OrdersTable } from "./components/OrdersTable";
import { DeleteOrderModal } from "./modals/DeleteOrderModal";
import { EditOrderModal } from "./modals/EditOrderModal";
import { useOrderPageController } from "./useOrderPageController";
import { ResetIcon } from "@radix-ui/react-icons";
import { CalendarCheckIcon } from "../../components/icons/CalendarCheckIcon";
import { cn } from "../../../app/utils/cn";

export function OrderPage() {
  const {
    request,
    isLoading,
    isFiltersModalOpen,
    filters,
    totalCount,
    from,
    to,
    page,
    perPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    handleApplyFilters,
    handleResetFilters,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isEditOrderModalOpen,
    orderBeingEdited,
    handleOpenEditOrderModal,
    handleCloseEditOrderModal,
    // isDeleteOrderModalOpen,
    selectedOrder,
    handleOpenDeleteOrderModal,
    handleCloseDeleteOrderModal,
    downloadApprovedPdf,
    downloadExcelReport,
    selectedForPdf, //
    toggleSelectForPdf,
    toggleSelectAllOnPage,
    clearPdfSelection,
    isTodayFilterActive,
    handleTodayFilter,
    downloadSelectedPdf,
  } = useOrderPageController();

  return (
    <div>
      <div className="h-12 mb-4 bg-white flex items-center justify-between rounded-md px-4">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleOpenFiltersModal}
            className="flex items-center gap-1 cursor-pointer disabled:cursor-wait p-2 rounded-md bg-gray-200 hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            <FilterIcon />
            <span>Filtros</span>
          </button>

          {(filters.startDate ||
            filters.endDate ||
            filters.accountId !== undefined ||
            filters.status) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1 cursor-pointer p-2 rounded-md bg-gray-200 hover:bg-gray-100 transition-colors"
            >
              <ResetIcon className="w-4 h-4" />
              <span>Limpar Filtros</span>
            </button>
          )}

          <button
            onClick={() => downloadExcelReport(filters)}
            type="button"
            hidden
            className="flex items-center gap-1 cursor-pointer p-2 rounded-md bg-gray-200 hover:bg-gray-100 transition-colors"
          >
            {/* <DownloadFileIcon /> */}

            <span>Download XLSX</span>
          </button>

          {/* Botão Pedidos do Dia — vira filtro */}
          <button
            type="button"
            onClick={handleTodayFilter}
            className={cn(
              "flex items-center gap-1 cursor-pointer p-2 rounded-md transition-colors",
              isTodayFilterActive
                ? "bg-teal-600 text-white hover:bg-teal-700" // ativo
                : "bg-gray-200 hover:bg-gray-100", // inativo
            )}
          >
            <CalendarCheckIcon className="w-5 h-5" />
            <span>Pedidos do dia</span>
            {isTodayFilterActive && <X size={14} />}
          </button>

          {/* Botão PDF do dia — só aparece com filtro do dia ativo */}
          {isTodayFilterActive && (
            <button
              type="button"
              onClick={downloadApprovedPdf}
              className="flex items-center gap-1 cursor-pointer p-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>
                Exportar PDF
                {selectedForPdf.size > 0
                  ? ` (${selectedForPdf.size} selecionados)`
                  : " (todos)"}
              </span>
            </button>
          )}

          {/* Botão exportar selecionados — aparece ao selecionar ≥1 linha em QUALQUER filtro */}
          {selectedForPdf.size > 0 && !isTodayFilterActive && (
            <button
              type="button"
              onClick={downloadSelectedPdf}
              className="flex items-center gap-1 cursor-pointer p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>Exportar {selectedForPdf.size} selecionado(s)</span>
            </button>
          )}

          {/* Limpar seleção */}
          {selectedForPdf.size > 0 && (
            <button
              type="button"
              onClick={clearPdfSelection}
              className="flex items-center gap-1 cursor-pointer p-2 rounded-md bg-gray-200 hover:bg-gray-100 transition-colors text-sm"
            >
              <ResetIcon className="w-4 h-4" />
              <span>Limpar seleção</span>
            </button>
          )}
        </div>

        {totalCount! > 0 && (
          <span>
            Mostrando registros do <span className="font-bold">{from}</span> ao{" "}
            <span className="font-bold">{to}</span> de{" "}
            <span className="font-bold">{totalCount}</span> registros
          </span>
        )}
      </div>

      <OrdersTable
        orders={request}
        isLoading={isLoading}
        page={page}
        perPage={perPage}
        totalCount={totalCount}
        totalPages={totalPages}
        onGoToFirstPage={goToFirstPage}
        onGoToPreviousPage={goToPreviousPage}
        onGoToNextPage={goToNextPage}
        onGoToLastPage={goToLastPage}
        onOpenEditOrderModal={handleOpenEditOrderModal}
        onOpenDeleteOrderModal={handleOpenDeleteOrderModal}
        selectedForPdf={selectedForPdf} //
        onToggleSelectForPdf={toggleSelectForPdf} //
        onToggleSelectAllOnPage={toggleSelectAllOnPage} //
      />

      <FiltersModal
        open={isFiltersModalOpen}
        onClose={handleCloseFiltersModal}
        initialFilters={filters}
        onApplyFilters={handleApplyFilters}
      />

      {orderBeingEdited && (
        <EditOrderModal
          open={isEditOrderModalOpen}
          onClose={handleCloseEditOrderModal}
          order={orderBeingEdited}
        />
      )}

      {selectedOrder && (
        <DeleteOrderModal
          order={selectedOrder}
          onClose={handleCloseDeleteOrderModal}
        />
      )}
    </div>
  );
}
