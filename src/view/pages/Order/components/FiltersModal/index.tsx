import { Button } from "../../../../components/Button";
import { useFiltersModal } from "./useFiltersModal";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Modal } from "../../../../components/Modal";
import { cn } from "../../../../../app/utils/cn";
import type { Status } from "../../../../../app/services/requestsService/getAll";
import { Select } from "../../../../components/Select";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: {
    startDate: Date;
    endDate: Date;
    accountId?: null;
    status?: Status;
  }): void;
  initialFilters: {
    startDate?: Date;
    endDate?: Date;
    accountId?: null;
    status?: Status;
  };
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
  initialFilters,
}: FiltersModalProps) {
  const {
    handleChangeStartDate,
    selectedStartDate,
    handleChangeEndDate,
    selectedEndDate,
    onlyNullAccount,
    toggleOnlyNullAccount,
    selectedStatus,
    handleSelectedStatus,
    statusOptions,
  } = useFiltersModal(initialFilters);

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div className="mt-2 text-[#343a40]">
        <span className="text-lg tracking-[-1px] font-bold">Data</span>

        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-col gap-1 flex-1">
            <span className="font-semibold">Data inicial:</span>
            <DatePickerInput
              value={selectedStartDate}
              onChange={handleChangeStartDate}
            />
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <span className="font-semibold">Data final:</span>
            <DatePickerInput
              value={selectedEndDate}
              onChange={handleChangeEndDate}
            />
          </div>
        </div>

        {/* BOTÃO TOGGLE */}
        <div className="mt-6">
          <span className="text-lg tracking-[-1px] font-bold text-[#343a40]">
            Usuário
          </span>

          <button
            type="button"
            onClick={toggleOnlyNullAccount}
            className={cn(
              "mt-2 w-full p-2 rounded-md transition-colors font-medium cursor-pointer",
              onlyNullAccount ? "bg-teal-700" : "bg-gray-200 hover:bg-gray-100",
            )}
          >
            <span
              className={cn(onlyNullAccount ? "text-white" : "text-gray-800")}
            >
              {onlyNullAccount
                ? "Filtrando: solicitação usuário"
                : "Pendente solicitação usuário"}
            </span>
          </button>
        </div>

        <div className="mt-6">
          <span className="text-lg tracking-[-1px] font-bold text-[#343a40]">
            Status
          </span>

          <div className="space-y-2 mt-2">
            <Select
              placeholder="Selecione o status"
              // error={}
              onChange={handleSelectedStatus}
              value={selectedStatus}
              disabled={false}
              options={statusOptions}
            />
          </div>
        </div>
      </div>

      <Button
        className="w-full mt-10"
        onClick={() =>
          onApplyFilters({
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            accountId: onlyNullAccount ? null : undefined,
            status: selectedStatus,
          })
        }
      >
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
