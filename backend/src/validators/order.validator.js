export const validateOrder = (data) => {
  const errors = [];
  if (!data.customerName || data.customerName.trim().length < 2) errors.push('Customer name is required.');
  if (!data.customerEmail || !data.customerEmail.includes('@')) errors.push('Valid customer email is required.');
  if (!Array.isArray(data.items) || data.items.length === 0) errors.push('Order must contain at least 1 item.');
  return { error: errors.length ? errors.join(' ') : null, value: data };
};
