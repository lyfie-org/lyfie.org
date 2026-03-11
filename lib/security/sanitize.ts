const CONTROL_CHAR_PATTERN = /[\u0000-\u001F\u007F]/g;

export const sanitizeText = (value: string): string =>
  value.replace(CONTROL_CHAR_PATTERN, "").trim();

export const sanitizeMultiline = (value: string): string =>
  sanitizeText(value).replace(/\s{3,}/g, " ");
