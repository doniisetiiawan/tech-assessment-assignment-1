interface PriceProps {
  amount: string;
}

export default function Price({ amount }: PriceProps) {
  return (
    <strong>
      {amount}
      <small> USD</small>
    </strong>
  );
}
