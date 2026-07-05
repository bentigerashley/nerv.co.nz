type Props = {
  color: string;
};

export default function WindowButton({ color }: Props) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="h-4 w-4 rounded-full hover:opacity-80 transition cursor-pointer"
    />
  );
}
