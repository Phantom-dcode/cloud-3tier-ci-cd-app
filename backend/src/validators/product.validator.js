export const validateProduct = (data) => {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) errors.push('Product name is required.');
  if (!data.sku || data.sku.trim().length < 3) errors.push('SKU (min 3 chars) is required.');
  if (!data.category) errors.push('Category is required.');
  if (data.price === undefined || isNaN(Number(data.price)) || Number(data.price) < 0) errors.push('Valid positive price is required.');
  if (data.stock === undefined || isNaN(Number(data.stock)) || Number(data.stock) < 0) errors.push('Valid positive stock is required.');
  return { error: errors.length ? errors.join(' ') : null, value: data };
};
