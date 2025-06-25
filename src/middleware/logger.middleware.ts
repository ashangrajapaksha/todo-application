import { Request, Response, NextFunction } from "express";

/**
 * Request logging middleware
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`📥 ${timestamp} - ${method} ${url} - IP: ${ip}`);

  // Log request body for POST/PUT requests (excluding sensitive data)
  if ((method === "POST" || method === "PUT") && req.body) {
    console.log("📋 Request Body:", JSON.stringify(req.body, null, 2));
  }

  // Log response time
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const statusEmoji = statusCode >= 400 ? "❌" : "✅";

    console.log(
      `${statusEmoji} ${method} ${url} - ${statusCode} - ${duration}ms`
    );
  });

  next();
};
