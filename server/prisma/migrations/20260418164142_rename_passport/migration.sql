/*
  Warnings:

  - You are about to drop the column `passportSeries` on the `NaturalPerson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndividualEntrepreneur" ALTER COLUMN "registrationDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Instance" ALTER COLUMN "regDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "LegalEntity" ALTER COLUMN "registrationDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "NaturalPerson" DROP COLUMN "passportSeries";
