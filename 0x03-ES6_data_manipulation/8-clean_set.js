export default function cleanSet(set, startString) {
  if (typeof startString !== 'string' || startString.length === 0) {
    return '';
  }

  const result = [...set]
    .filter((value) => value && value.startsWith(startString))
    .map((value) => value.slice(startString.length));

  return result.length > 0 ? `${result.join('-')}` : '';
}
