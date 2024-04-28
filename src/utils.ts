/**
 * Formats the given number of seconds into a string in the format "minutes:seconds".
 *
 * @param {number} seconds - The number of seconds to format.
 * @return {string} The formatted time string.
 */
export const TimePadder = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();
  return `${minutes}:${formattedSeconds}`;
};
