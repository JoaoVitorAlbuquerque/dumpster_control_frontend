interface TableProps extends React.ComponentProps<"table"> {}

export function Table(props: TableProps) {
  return (
    <div className="border border-[#cccccc] rounded-lg">
      <table className="w-full" {...props} />
    </div>
  );
}
