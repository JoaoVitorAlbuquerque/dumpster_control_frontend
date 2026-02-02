interface HeaderProps extends React.ComponentProps<"th"> {}

export function Header(props: HeaderProps) {
  return (
    <th
      className="p-4 text-sm text-gray-[#333333e6] font-bold text-left"
      {...props}
    />
  );
}
