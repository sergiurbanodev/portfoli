import { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import { authMiddleware } from "../middlewares/authMiddleware";

const removeExtension = (fileName: string): string => {
  return fileName.split(".").shift() ?? "";
};

export const loadRoutes = (
  router: Router,
  routePath: string,
  isPrivate: boolean = false
) => {
  fs.readdirSync(routePath).filter((file: string) => {
    const fileWithoutExt = removeExtension(file);
    const skip = ["index"].includes(fileWithoutExt);

    if (!skip) {
      const route = require(path.join(routePath, fileWithoutExt));

      if (isPrivate) {
        router.use(`/${fileWithoutExt}`, authMiddleware, route);
        console.log(`Loaded Private Route -> ${route}`);
      } else {
        router.use(`/${fileWithoutExt}`, route);
        console.log(`Loaded Public Route -> ${route}`);
      }
    }
  });
};
