export default function comparision(a: number, b: number): number {
  console.log(a, b, 100 * Math.abs((a - b) / ((a + b) / 2)));
  return 100 * Math.abs((a - b) / ((a + b) / 2));
}
