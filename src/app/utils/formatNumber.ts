export function formatNumber(value: number | string, digits?: number): string {
  const number = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(number)) return '0,00';

  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: digits || 2,
    maximumFractionDigits: digits || 2,
  });
}
