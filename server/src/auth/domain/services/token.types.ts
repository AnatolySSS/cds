export interface JwtPayload {
  sub: string; // ID пользователя
  iat?: number; // время создания токена (timestamp)
  exp?: number; // время истечения токена (timestamp)
}
