import jwt from 'jsonwebtoken';

const SECRET = process.env.ADMIN_JWT_SECRET || 'dev_admin_secret_change_me';
export const TOKEN_NAME = 'admin_token';

export function signAdmin(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyAdmin(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
