/*
  Warnings:

  - Added the required column `url` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "lightDescription" TEXT NOT NULL,
    "detailedDescription" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Project" ("detailedDescription", "id", "image", "lightDescription", "name") SELECT "detailedDescription", "id", "image", "lightDescription", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
