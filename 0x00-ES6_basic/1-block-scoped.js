export default function taskBlock(trueOrFalse) {
  const task = false;
  const task2 = true;

  if (trueOrFalse) {
    // No need to redeclare task and task2 here since the condition should not affect the result
  }

  return [task, task2];
}
