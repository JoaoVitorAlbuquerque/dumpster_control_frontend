export function StatusBarShape(props: any) {
  const { x, y, width, height, payload } = props;

  let color = "#8884d8"; // padrão
  switch (payload.status) {
    case "REQUESTED":
      color = "#3498db"; // azul
      break;
    case "UNDER_REVIEW":
      color = "#f1c40f"; // amarelo
      break;
    case "APPROVED":
      color = "#2ecc71"; // verde
      break;
    case "DELIVERED":
      color = "#9b59b6"; // roxo
      break;
    case "COMPLETED":
      color = "#27ae60"; // verde escuro
      break;
    case "CANCELLED":
      color = "#e74c3c"; // vermelho
      break;
  }

  return <rect x={x} y={y} width={width} height={height} fill={color} />;
}
