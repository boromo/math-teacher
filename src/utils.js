
export function getRandomEquation() {
  const operation = Math.random() > 0.5 ? "+" : "-";
  let result = Math.ceil(Math.random() * 20);
  let a = Math.ceil(Math.random() * result);
  let b = result - a;
  if (operation === "-") {
    a = result;
    b = Math.ceil(Math.random() * a);
    result = a - b;
  }
  return {
    result,
    a,
    b,
    operation
  };
}