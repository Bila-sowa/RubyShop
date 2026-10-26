import { API_PREFIX } from '#shared/constants/index.js';

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function api(path, { method = 'GET', body, headers, ...rest } = {}) {
  const res = await fetch(`${API_PREFIX}${path}`, {
    method,
    credentials: 'include',
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...headers },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok)
    throw new ApiError(res.status, data?.error?.message ?? res.statusText, data?.error?.details);
  return data;
}
