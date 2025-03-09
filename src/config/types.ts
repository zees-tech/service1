let TYPES = {
  RedisService: Symbol.for("RedisService"),
  ProxyService: Symbol.for("ProxyService"),
  AuthMiddleware: Symbol.for("AuthMiddleware"),
  RoleMiddleware: Symbol.for("RoleMiddleware"),
  ErrorMiddleware: Symbol.for("ErrorMiddleware"),
  CorsMiddleware: Symbol.for("CorsMiddleware"),
};

export default TYPES;
