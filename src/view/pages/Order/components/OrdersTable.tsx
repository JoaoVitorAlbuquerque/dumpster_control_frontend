import type { Request } from "../../../../app/entities/Request";
import { cn } from "../../../../app/utils/cn";
import { formatDate } from "../../../../app/utils/formatDate";
import { Button } from "../../../components/Button";
import { Spinner } from "../../../components/Spinner";
import { TableComponents } from "../../../components/TableElements";

interface OrdersTableProps {
  orders: Request[];
  isLoading: boolean;
  totalCount: number | undefined;
  page: number;
  perPage: number;
  totalPages: number;
  onGoToFirstPage(): void;
  onGoToPreviousPage(): void;
  onGoToNextPage(): void;
  onGoToLastPage(): void;
  onOpenEditOrderModal(order: Request): void;
}

export function OrdersTable({
  orders,
  isLoading,
  totalCount,
  page,
  perPage,
  totalPages,
  onGoToFirstPage,
  onGoToPreviousPage,
  onGoToNextPage,
  onGoToLastPage,
  onOpenEditOrderModal,
}: OrdersTableProps) {
  return (
    <>
      <div className="bg-[#f1f3f5] rounded-2xl w-full h-full pb-8 px-4 overflow-auto max-h-[640px]">
        <TableComponents.Table>
          <thead className="sticky top-0 bg-gray-200 z-10">
            <tr className="bg-gray-600/20">
              <TableComponents.Header>Data Pedido</TableComponents.Header>
              <TableComponents.Header>Data Entrega</TableComponents.Header>
              <TableComponents.Header>Data Finalizado</TableComponents.Header>
              <TableComponents.Header>Endereço</TableComponents.Header>
              <TableComponents.Header>Nome</TableComponents.Header>
              <TableComponents.Header>Atividade</TableComponents.Header>
              <TableComponents.Header>Contato</TableComponents.Header>
              <TableComponents.Header>Andamento</TableComponents.Header>
              <TableComponents.Header>Prioridade</TableComponents.Header>
              {/* <TableComponents.Header>Solicitado por</TableComponents.Header> */}
              <TableComponents.Header>Observação</TableComponents.Header>
              <TableComponents.Header>Ações</TableComponents.Header>
            </tr>
          </thead>

          {!isLoading &&
            orders.map((order) => (
              <tbody key={order.id}>
                <TableComponents.Row>
                  <TableComponents.Cell>
                    {formatDate(new Date(order.orderDate))}
                  </TableComponents.Cell>
                  <TableComponents.Cell>
                    {order.deliveryDate
                      ? formatDate(new Date(order.deliveryDate))
                      : "-"}
                  </TableComponents.Cell>
                  <TableComponents.Cell>
                    {order.completionDate
                      ? formatDate(new Date(order.completionDate))
                      : "-"}
                  </TableComponents.Cell>
                  <TableComponents.Cell>
                    {order.addressFormatted ?? order.address}
                  </TableComponents.Cell>
                  <TableComponents.Cell>{order.name}</TableComponents.Cell>
                  <TableComponents.Cell>
                    <span className="p-3 rounded-full bg-gray-500 font-semibold text-white">
                      {order.activity === "CLEANING"
                        ? "Limpeza"
                        : order.activity === "TREE"
                          ? "Corte de Árvore"
                          : order.activity === "CONSTRUCTION"
                            ? "Construção"
                            : order.activity === "GROUND"
                              ? "Terra"
                              : "-"}
                    </span>
                  </TableComponents.Cell>
                  <TableComponents.Cell>{order.contact}</TableComponents.Cell>
                  <TableComponents.Cell>
                    <span
                      className={cn(
                        "p-3 rounded-full bg-amber-500 font-semibold text-white",
                        order.status === "UNDER_REVIEW" && "bg-yellow-500",
                        order.status === "APPROVED" && "bg-green-500",
                        order.status === "DELIVERED" && "bg-green-500",
                        order.status === "COMPLETED" && "bg-green-500",
                        order.status === "CANCELLED" && "bg-red-500",
                      )}
                    >
                      {order.status === "REQUESTED"
                        ? "Solicitado"
                        : order.status === "UNDER_REVIEW"
                          ? "Em revisão"
                          : order.status === "APPROVED"
                            ? "Aprovado"
                            : order.status === "DELIVERED"
                              ? "Entregue"
                              : order.status === "COMPLETED"
                                ? "Concluído"
                                : order.status === "CANCELLED"
                                  ? "Cancelado"
                                  : "-"}
                    </span>
                  </TableComponents.Cell>
                  <TableComponents.Cell>
                    <span
                      className={cn(
                        "p-3 rounded-full bg-slate-500 font-semibold text-white",
                        order.priority === "HIGH" && "bg-red-500",
                      )}
                    >
                      {order.priority === "HIGH" ? "Alta" : "Baixa"}
                    </span>
                  </TableComponents.Cell>
                  <TableComponents.Cell>
                    {order.description}
                  </TableComponents.Cell>
                  <TableComponents.Cell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenEditOrderModal(order)}
                        className="cursor-pointer"
                      >
                        {/* <SquarePen className="text-[#00786f]" /> */}
                        Editar
                      </button>

                      <button onClick={() => order} className="cursor-pointer">
                        {/* <TrashIcon className="w-6 h-6 text-[#c92a2a]" /> */}
                        Deletar
                      </button>
                    </div>
                  </TableComponents.Cell>
                </TableComponents.Row>
              </tbody>
            ))}
        </TableComponents.Table>

        {isLoading && (
          <div className="w-full mt-2 flex items-center justify-center">
            <Spinner className="w-6 h-6" />
          </div>
        )}
      </div>

      {totalCount! > perPage && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-4">
          {/* <div className="flex justify-center gap-2 mt-4"> */}
          <Button
            onClick={onGoToFirstPage}
            disabled={page === 1}
            className="px-4 py-2 rounded disabled:opacity-50 transition-all"
          >
            <div className="flex items-center justify-center gap-1">
              {/* <ChevronsRightIcon className="rotate-180" /> */}

              <span>Primeira página</span>
            </div>
          </Button>

          <Button
            onClick={onGoToPreviousPage}
            disabled={page === 1}
            className="px-4 py-2 rounded disabled:opacity-50 transition-all"
          >
            <div className="flex items-center justify-center gap-1">
              {/* <ChevronRightIcon className="rotate-180" /> */}

              <span>Página anterior</span>
            </div>
          </Button>

          <span className="flex items-center font-semibold border border-slate-700 p-1 rounded-md">
            Página {page} de {totalPages}
          </span>

          <Button
            onClick={onGoToNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 rounded disabled:opacity-50 transition-all"
          >
            <div className="flex items-center justify-center gap-1">
              <span>Próxima página</span>

              {/* <ChevronRightIcon /> */}
            </div>
          </Button>

          <Button
            onClick={onGoToLastPage}
            disabled={page === totalPages}
            className="px-4 py-2 rounded disabled:opacity-50 transition-all"
          >
            <div className="flex items-center justify-center gap-1">
              <span>Última página</span>

              {/* <ChevronsRightIcon /> */}
            </div>
          </Button>
        </div>
      )}
    </>
  );
}
