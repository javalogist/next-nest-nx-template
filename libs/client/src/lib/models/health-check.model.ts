export interface HealthCheckData {
  status: string; // e.g., 'ok' or 'down'
  info: Record<string, { status: string }>; // Can contain multiple services
  error: Record<string, any>; // Empty object or error details
  details: Record<string, { status: string }>; // Can contain multiple services
}
