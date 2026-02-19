import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

import { useRequestsAnalytics } from "../../../app/hooks/useRequestsAnalytics";
import { StatusBarShape } from "./components/StatusBarShape";
import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";

export function Dashboard() {
  const { requestAnalytics, isLoadingAnalytics, isErrorAnalytics } =
    useRequestsAnalytics({
      bucket: "day",
      // startDate/endDate opcionais
    });
  const { signout } = useAuth();

  if (isLoadingAnalytics) return <div>Carregando…</div>;
  if (isErrorAnalytics || !requestAnalytics)
    return <div>Erro ao carregar dados</div>;

  return (
    <div className="flex flex-col gap-6">
      {/* Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card title="Total" value={requestAnalytics.summary.total} />
        <Card title="Abertas" value={requestAnalytics.summary.open} />
        <Card title="Entregues" value={requestAnalytics.summary.delivered} />
        <Card title="Concluídas" value={requestAnalytics.summary.completed} />
        <Card title="Canceladas" value={requestAnalytics.summary.cancelled} />
        <Button onClick={signout}>Sair</Button>
      </div>

      {/* Linha: volume */}
      <div className="h-[320px] bg-white rounded-xl p-4">
        <h3 className="font-bold mb-3">Volume (criado x entregue)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={requestAnalytics.timeSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="created" />
            <Line type="monotone" dataKey="delivered" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Barras: status */}
      <div className="h-[320px] bg-white rounded-xl p-4">
        <h3 className="font-bold mb-3">Solicitações por status</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={requestAnalytics.byStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" shape={<StatusBarShape />} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SLA */}
      <div className="grid grid-cols-2 gap-4">
        <Card
          title="Tempo médio até entrega (h)"
          value={
            Number(requestAnalytics.sla.avgToDeliverHours).toFixed(1) || "—"
          }
        />
        <Card
          title="Tempo médio até conclusão (h)"
          value={
            Number(requestAnalytics.sla.avgToCompleteHours).toFixed(1) || "—"
          }
        />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
