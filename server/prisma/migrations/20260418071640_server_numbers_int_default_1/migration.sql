/*
  Warnings:

  - Made the column `serverNumbers` on table `Court` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Court" ALTER COLUMN "serverNumbers" SET NOT NULL,
ALTER COLUMN "serverNumbers" SET DEFAULT 1;
