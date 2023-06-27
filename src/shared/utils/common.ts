export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertObjectToFormData(data: Record<string, unknown>): FormData {
  return Object.keys(data).reduce((formData, key) => {
    const value = data[key];

    if (value instanceof Blob || typeof value === 'string') {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }

    return formData;
  }, new FormData());
}
