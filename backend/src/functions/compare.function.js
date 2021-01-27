export default function compare(data, filter) {
  const [key, operation, value] = filter;
  if (operation === "=") {
    return data[key] === value;
  } else if (operation === "!=" || operation === "<>") {
    return data[key] !== value;
  }
  return true;
}
