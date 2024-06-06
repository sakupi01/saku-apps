/*
 * Check if the required dependencies are installed
 */
export const checkTailwindCSS = async () => {
  try {
    require.resolve("tailwindcss");
    return true;
  } catch {
    return false;
  }
};
