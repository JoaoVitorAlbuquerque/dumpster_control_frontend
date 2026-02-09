import { FiltersModal } from "./components/FiltersModal";
import { OrdersTable } from "./components/OrdersTable";
import { EditOrderModal } from "./modals/EditOrderModal";
import { useOrderPageController } from "./useOrderPageController";

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
  } = useOrderPageController();

  return (
    <div>
      <div className="h-12 mb-4 bg-white flex items-center justify-between rounded-md px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenFiltersModal}
            className="flex items-center gap-1 cursor-pointer disabled:cursor-wait p-2 rounded-md bg-gray-200 hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            {/* <FilterIcon /> */}
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
              {/* <ResetIcon className="w-4 h-4" /> */}
              <span>Limpar Filtros</span>
            </button>
          )}

          <button
            onClick={() => {}}
            type="button"
            className="flex items-center gap-1 cursor-pointer p-2 rounded-md bg-gray-200 hover:bg-gray-100 transition-colors"
          >
            {/* <DownloadFileIcon /> */}

            <span>Download XLSX</span>
          </button>
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
        // onOpenDeleteLumberMillModal={handleOpenDeleteLumberMillModal}
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
    </div>
  );
}
