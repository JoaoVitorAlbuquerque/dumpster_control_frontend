interface RowProps extends React.ComponentProps<"tr"> {}

export function Row(props: RowProps) {
  return (
    <tr className="border-b border-gray-[#cccccc66] bg-white" {...props} />
  );
}
