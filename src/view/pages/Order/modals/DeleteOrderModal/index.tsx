import type { Request } from "../../../../../app/entities/Request";
import { ConfirmModal } from "../../../../components/ConfirmModal";
import { useDeleteOrderModalController } from "./useDeleteOrderModalController";

interface DeleteOrderModalProps {
  onClose(): void;
  order: Request | null;
}

export function DeleteOrderModal({ onClose, order }: DeleteOrderModalProps) {
  const { handleDeleteOrder, isLoading } = useDeleteOrderModalController(
    onClose,
    order,
  );

  return (
    <ConfirmModal
      title={`Tem certeza que deseja excluir o registro?`}
      description="Atenção esta ação não poderá ser desfeita!"
      onClose={onClose}
      onConfirm={handleDeleteOrder}
      isLoading={isLoading}
    />
  );
}
