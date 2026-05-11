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

const padTwoDigits = (value: number): string => String(value).padStart(2, "0");

export const toDateTimeLocalValue = (value?: string | null): string => {
  if (!value) {
    return "";
  }

  if (
    value.length >= 16 &&
    value[4] === "-" &&
    value[7] === "-" &&
    value[10] === "T" &&
    value[13] === ":"
  ) {
    return value.slice(0, 16);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const year = parsed.getFullYear();
  const month = padTwoDigits(parsed.getMonth() + 1);
  const day = padTwoDigits(parsed.getDate());
  const hours = padTwoDigits(parsed.getHours());
  const minutes = padTwoDigits(parsed.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const validateEventDateRange = (
  startTime: string,
  endTime?: string | null,
): string | null => {
  if (!startTime) {
    return "Starttid er påkrevd.";
  }

  const startDate = new Date(startTime);
  if (Number.isNaN(startDate.getTime())) {
    return "Starttid har ugyldig format.";
  }

  if (!endTime) {
    return null;
  }

  const endDate = new Date(endTime);
  if (Number.isNaN(endDate.getTime())) {
    return "Sluttid har ugyldig format.";
  }

  if (endDate.getTime() < startDate.getTime()) {
    return "Sluttid kan ikke være før starttid.";
  }

  return null;
};
