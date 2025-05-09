export const formatLKR = (amount) => {
  if (!amount && amount !== 0) return '';
  const numericAmount = Number(amount);
  // Only format with decimals if there are decimal places
  const hasDecimals = numericAmount % 1 !== 0;
  return numericAmount.toLocaleString('en-LK', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
    useGrouping: true
  });
};

export const parseLKR = (value) => {
  if (!value && value !== 0) return '';
  // Convert to string first to handle both string and number inputs
  const strValue = String(value);
  // Remove any non-digit characters except decimal point and minus sign
  const numericValue = strValue.replace(/[^\d.-]/g, '');
  // Return empty string if not a valid number
  return isNaN(numericValue) ? '' : numericValue;
};