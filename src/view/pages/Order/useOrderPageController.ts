import { useCallback, useState } from "react";
import { useRequests } from "../../../app/hooks/useRequests";
import { useSearchParams } from "react-router-dom";
import { getFiltersFromSearchParams } from "../../../app/utils/getFiltersFromSearchParams";
import type {
  RequestFilters,
  Status,
} from "../../../app/services/requestsService/getAll";
import type { Request } from "../../../app/entities/Request";
import toast from "react-hot-toast";
import { httpClient } from "../../../app/services/httpClient";

export function useOrderPageController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [orderBeingEdited, setOrderBeingEdited] = useState<null | Request>(
    null,
  );
  const [isDeleteOrderModalOpen, setIsDeleteOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Request | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilters = getFiltersFromSearchParams(searchParams);
  const [filters, setFilters] = useState<RequestFilters>(initialFilters);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [selectedForPdf, setSelectedForPdf] = useState<Set<string>>(new Set()); //
  const [isTodayFilterActive, setIsTodayFilterActive] = useState(false); //
  const [isLoadingDownloadPdf, setIsLoadingDownloadPdf] = useState(false); //

  const toggleSelectForPdf = useCallback((id: string) => {
    setSelectedForPdf((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAllOnPage = useCallback((orders: Request[]) => {
    setSelectedForPdf((prev) => {
      const next = new Set(prev);
      const allSelected = orders.every((o) => next.has(o.id));
      allSelected
        ? orders.forEach((o) => next.delete(o.id))
        : orders.forEach((o) => next.add(o.id));
      return next;
    });
  }, []);

  const clearPdfSelection = useCallback(() => {
    setSelectedForPdf(new Set());
  }, []);

  // Filtro "Pedidos do Dia" — aplica hoje como startDate e endDate + status APPROVED
  const handleTodayFilter = useCallback(() => {
    if (isTodayFilterActive) {
      // Desativa — volta ao estado sem filtro
      setIsTodayFilterActive(false);
      setFilters({});
      setSearchParams({});
      clearPdfSelection();
    } else {
      // const today = new Date();
      // today.setHours(0, 0, 0, 0);
      // const todayEnd = new Date();
      // todayEnd.setHours(23, 59, 59, 999);

      // Sincroniza com searchParams igual ao handleApplyFilters
      setSearchParams({
        // startDate: today.toISOString(),
        // endDate: todayEnd.toISOString(),
        status: "APPROVED",
      });

      setIsTodayFilterActive(true);
      setFilters({
        // startDate: today,
        // endDate: todayEnd,
        status: "APPROVED",
      });
      setPage(1);
      clearPdfSelection();
    }
  }, [isTodayFilterActive, clearPdfSelection, setSearchParams]);

  const handleOpenFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(true);
  }, []);

  const handleCloseFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(false);
  }, []);

  const handleOpenEditOrderModal = useCallback((order: Request) => {
    setOrderBeingEdited(order);
    setIsEditOrderModalOpen(true);
  }, []);

  const handleCloseEditOrderModal = useCallback(() => {
    setOrderBeingEdited(null);
    setIsEditOrderModalOpen(false);
  }, []);

  const handleOpenDeleteOrderModal = useCallback((order: Request) => {
    setSelectedOrder(order);
    setIsDeleteOrderModalOpen(true);
  }, []);

  const handleCloseDeleteOrderModal = useCallback(() => {
    setSelectedOrder(null);
    setIsDeleteOrderModalOpen(false);
  }, []);

  const { request, isLoading, totalCount } = useRequests(
    filters,
    page,
    perPage,
  );

  const totalPages = Math.ceil(totalCount! / perPage);

  const from = (page - 1) * perPage + 1;

  const to = Math.min(page * perPage, totalCount!);

  function goToNextPage() {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }

  function goToPreviousPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  function goToFirstPage() {
    setPage(1);
  }

  function goToLastPage() {
    const lastPage = Math.ceil(totalCount! / perPage);

    setPage(lastPage);
  }

  function handleApplyFilters({
    startDate,
    endDate,
    accountId,
    status,
  }: {
    startDate: Date;
    endDate: Date;
    accountId?: null;
    status?: Status;
  }) {
    const params: Record<string, string> = {};

    if (startDate) params.startDate = startDate.toISOString();
    if (endDate) params.endDate = endDate.toISOString();
    if (accountId === null) params.accountId = "null";
    if (status) params.status = status;

    setSearchParams(params);

    setFilters({
      startDate,
      endDate,
      accountId,
      status,
    });

    setPage(1);
    setIsFiltersModalOpen(false);
  }

  function handleResetFilters() {
    setSearchParams({});
    setFilters({});
  }

  // Download PDF dos pedidos do dia (approved), respeitando seleção
  const downloadApprovedPdf = async () => {
    try {
      const ids = selectedForPdf.size > 0 ? [...selectedForPdf] : undefined;

      setIsLoadingDownloadPdf(true);

      const response = await httpClient.get("/requests/approved/pdf", {
        responseType: "blob",
        params: ids ? { ids: ids.join(",") } : undefined,
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Pedidos_do_dia_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setIsLoadingDownloadPdf(false);
      toast.success("Download do PDF concluído.");
    } catch {
      toast.error("Erro ao baixar PDF");
    }
  };

  // Download PDF das linhas selecionadas (qualquer filtro)
  const downloadSelectedPdf = async () => {
    if (selectedForPdf.size === 0) return;

    try {
      setIsLoadingDownloadPdf(true);
      const response = await httpClient.get("/requests/export/pdf", {
        responseType: "blob",
        params: { ids: [...selectedForPdf].join(",") },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Selecionados_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setIsLoadingDownloadPdf(false);
      toast.success("Download do PDF concluído.");
    } catch {
      toast.error("Erro ao baixar PDF");
    }
  };

  // const downloadApprovedPdf = async () => {
  //   try {
  //     const ids = selectedForPdf.size > 0 ? [...selectedForPdf] : undefined;

  //     const response = await httpClient.get("/requests/approved/pdf", {
  //       responseType: "blob",
  //       params: ids ? { ids: ids.join(",") } : undefined,
  //     });

  //     const blob = new Blob([response.data], { type: "application/pdf" });

  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute(
  //       "download",
  //       `Pedidos_do_dia_${Date.now().toString()}.pdf`,
  //     );
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //     window.URL.revokeObjectURL(url);
  //     toast.success("Download do pdf concluído com êxito.");
  //   } catch (error) {
  //     toast.error("Erro ao baixar pdf");
  //   }
  // };

  async function downloadExcelReport(filters: RequestFilters) {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });

      const response = await httpClient.get(
        `/requests/export/excel?${params}`,
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "relatorio-solicitacoes.xlsx";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Download do Excel concluído com êxito.");
    } catch (error) {
      toast.error("Erro ao baixar Excel");
    }
  }

  return {
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
    isDeleteOrderModalOpen,
    selectedOrder,
    handleOpenDeleteOrderModal,
    handleCloseDeleteOrderModal,
    downloadApprovedPdf,
    downloadExcelReport,
    selectedForPdf, //
    toggleSelectForPdf, //
    toggleSelectAllOnPage, //
    clearPdfSelection, //
    isTodayFilterActive, //
    handleTodayFilter, //
    downloadSelectedPdf, //
    isLoadingDownloadPdf, //
  };
}
