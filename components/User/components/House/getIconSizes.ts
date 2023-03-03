export default function getIconSizes(
  width: number,
  height: number,
  homeless?: boolean
): { width: number; height: number } {
  if (homeless) {
    return { width: 50, height: 50 };
  }

  return { width: width || 50, height: height || 50 };
}
