import { useCallback, useState } from "react";
import { useRequests } from "../../../app/hooks/useRequests";
import { useSearchParams } from "react-router-dom";
import { getFiltersFromSearchParams } from "../../../app/utils/getFiltersFromSearchParams";
import type {
  RequestFilters,
  Status,
} from "../../../app/services/requestsService/getAll";

export function useOrderPageController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilters = getFiltersFromSearchParams(searchParams);
  const [filters, setFilters] = useState<RequestFilters>(initialFilters);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const handleOpenFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(true);
  }, []);

  const handleCloseFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(false);
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
  };
}
