export default function mapToInfinity(
  data: {
    element: string;
    amount: number;
    infinity: boolean;
  }[]
) {
  if (data.find((item) => item.infinity)) {
    const max = data.reduce((previous, current) => {
      return current.amount > previous ? current.amount : previous;
    }, 0);
    return data.map((item) => {
      if (item.infinity) {
        return {
          ...item,
          amount: max + 2,
        };
      }
      return item;
    });
  }
  return data;
}
