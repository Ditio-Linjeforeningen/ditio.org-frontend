export const formatDate = (value?: string | null): string => {
  if (!value) {
    return "Ikke satt";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString("nb-NO");
};

export const formatDateTime = (value?: string | null): string => {
  if (!value) {
    return "Ikke satt";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString("nb-NO");
};
