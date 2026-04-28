/*
  Warnings:

  - A unique constraint covering the columns `[passportNumber]` on the table `NaturalPerson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NaturalPerson_passportNumber_key" ON "NaturalPerson"("passportNumber");
