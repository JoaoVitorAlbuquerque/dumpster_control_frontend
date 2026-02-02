import { useState } from "react";
import type { Status } from "../../../../../app/services/requestsService/getAll";

export function useFiltersModal(
  initialFilters: {
    startDate?: Date;
    endDate?: Date;
    accountId?: null;
    status?: Status;
  } = {},
) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getUTCMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedStartDate, setSelectedStartDate] = useState(
    initialFilters?.startDate!,
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    initialFilters.endDate!,
  );
  const [onlyNullAccount, setOnlyNullAccount] = useState<boolean>(
    initialFilters.accountId === null,
  );
  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>(
    initialFilters.status,
  );
  const [searchTermStatus, setSearchTermStatus] = useState("");

  const statusOptions = [
    { value: "REQUESTED", label: "Solicitado" },
    { value: "UNDER_REVIEW", label: "Em avaliação" },
    { value: "APPROVED", label: "Aprovado" },
    { value: "DELIVERED", label: "Entregue" },
    { value: "COMPLETED", label: "Concluído" },
    { value: "CANCELLED", label: "Cancelado" },
  ];

  function handleChangeStartDate(date: Date) {
    setSelectedStartDate(date);
  }

  function handleChangeEndDate(date: Date) {
    setSelectedEndDate(date);
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  function handleChangeMonth(step: number) {
    setSelectedMonth((prevState) => prevState + step);
  }

  function toggleOnlyNullAccount() {
    setOnlyNullAccount((prev) => !prev);
  }

  function handleSelectedStatus(value: string) {
    setSelectedStatus(value as Status);
  }

  return {
    selectedMonth,
    selectedYear,
    handleChangeYear,
    handleChangeMonth,
    selectedStartDate,
    selectedEndDate,
    handleChangeStartDate,
    handleChangeEndDate,
    onlyNullAccount,
    toggleOnlyNullAccount,
    selectedStatus,
    handleSelectedStatus,
    searchTermStatus,
    setSearchTermStatus,
    statusOptions,
  };
}
