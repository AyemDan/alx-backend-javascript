export default function iterateThroughObject(reportWithIterator) {
  const employeeNames = [...reportWithIterator];
  return employeeNames.join(' | ');
}
