/**
 * User interaction utilities for prompts and dialogs
 */

export const promptForTaskName = (): string | null => {
  const taskName = prompt('Anna tehtävälle nimi:', '');
  return taskName?.trim() || null;
};

export const promptForSessionDescription = (): string | null => {
  const description = prompt('Kuvaa työistunto:', '');
  return description?.trim() || null;
};