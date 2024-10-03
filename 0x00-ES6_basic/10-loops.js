export default function appendToEachArrayValue(array, appendString) {
  const result = [];

  for (const value of array) {
    result.push(appendString + value); // Push the modified value to the new array
  }

  return result; // Return the new array instead of modifying the input array
}
