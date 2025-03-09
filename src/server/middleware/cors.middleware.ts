import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import cors from "cors";

@injectable()
export class CorsMiddleware {

    

  corsVerify(req: Request, res: Response, next: NextFunction): void {  

    const allowedOrigins = ["http://localhost:3000", "http://localhost:3001",undefined];

    try {
      if (!req.path.startsWith("/api/")) {
        console.log("Applying CORS to route:", req.path);
        return cors({
            origin: function (
              origin: string | undefined,
              callback: (err: Error | null, allow?: boolean) => void
            ) {
              console.log("Origin:", origin);
              if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
              } else {
                callback(new Error("Not allowed by CORS"));
              }
            },
            methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
            allowedHeaders: "Content-Type,Authorization",
            credentials: true,
          })(req, res, next);
      }
      next();
    } catch (error) {
      console.error("authentication failed");
      res.status(403).json({ message: "Access denied" });
    }
  }
}
