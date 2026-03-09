import { useState } from "react";
import { useAbuseReports } from "../../../app/hooks/useAbuseReports";
import { httpClient } from "../../../app/services/httpClient";
import toast from "react-hot-toast";

export function useAbuseMonitoringPageController() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyModalPayload, setHistoryModalPayload] = useState<{
    type: "cpf" | "address";
    data: any;
  } | null>(null);

  const {
    abuseReportData,
    isinitialLoadingAbuseReport,
    isLoadingAbuseReport,
    isErrorAbuseReport,
    refetchAbuseReport,
  } = useAbuseReports(selectedYear);

  const handleDownloadExcel = async () => {
    try {
      const response = await httpClient.get(
        `/requests/abuse/export?year=${selectedYear}`,
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
      link.setAttribute("download", `relatorio${Date.now().toString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Download do arquivo XLSX concluído com êxito.");
    } catch (error) {
      toast.error("Erro ao baixar arquivo XLSX");
    }
  };

  const handleOpenHistoryModal = (type: "cpf" | "address", data: any) => {
    setHistoryModalPayload({ type, data });
    setIsHistoryModalOpen(true);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalPayload(null);
    setIsHistoryModalOpen(false);
  };

  return {
    selectedYear,
    setSelectedYear,
    abuseReportData,
    isinitialLoadingAbuseReport,
    isLoadingAbuseReport,
    isErrorAbuseReport,
    refetchAbuseReport,
    handleDownloadExcel,
    isHistoryModalOpen,
    historyModalPayload,
    handleOpenHistoryModal,
    handleCloseHistoryModal,
  };
}
