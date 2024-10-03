export default function taskBlock(trueOrFalse) {
  let task = false; // Use 'let' instead of 'var'
  let task2 = true; // Use 'let' instead of 'var'

  if (trueOrFalse) {
    task = false; // Update the value instead of redeclaring
    task2 = true; // Update the value instead of redeclaring
  }

  return [task, task2];
}
