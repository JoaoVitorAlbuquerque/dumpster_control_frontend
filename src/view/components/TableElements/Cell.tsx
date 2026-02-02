import { twMerge } from "tailwind-merge";

interface CellProps extends React.ComponentProps<"td"> {}

export function Cell(props: CellProps) {
  return (
    <td
      {...props}
      className={twMerge(
        "p-4 text-sm font-normal text-[#333333]",
        props.className,
      )}
    />
  );
}
