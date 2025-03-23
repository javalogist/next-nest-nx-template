import { registerAs } from '@nestjs/config';

export default registerAs('throttle', () => ({
  ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60, // Default 60 seconds
  limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 10 // Default 10 requests
}));
