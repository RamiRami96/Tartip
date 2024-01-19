export function generateUniqueId(): number {
  const timestamp = new Date().getTime();

  const random = Math.random();

  const uniqueNumber = parseFloat(`${timestamp}.${random}`);

  return uniqueNumber;
}
