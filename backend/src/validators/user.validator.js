export const validateCreateUser = (data) => {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) errors.push('Name is required.');
  if (!data.email || !data.email.includes('@')) errors.push('Valid email is required.');
  if (!data.password || data.password.length < 6) errors.push('Password (min 6 chars) is required.');
  if (data.role && !['admin', 'manager', 'user'].includes(data.role)) errors.push('Invalid user role.');
  return { error: errors.length ? errors.join(' ') : null, value: data };
};

export const validateUpdateUser = (data) => {
  const errors = [];
  if (data.email && !data.email.includes('@')) errors.push('Invalid email format.');
  if (data.role && !['admin', 'manager', 'user'].includes(data.role)) errors.push('Invalid user role.');
  if (data.status && !['active', 'inactive', 'suspended'].includes(data.status)) errors.push('Invalid status.');
  return { error: errors.length ? errors.join(' ') : null, value: data };
};
