export const copyContent = async (data: string) => {
  try {
    await navigator.clipboard.writeText(data);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
