-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- CreateEnum
CREATE TYPE "PartyType" AS ENUM ('NATURAL', 'LEGAL', 'INDIVIDUAL', 'FINANCIAL_ORGANIZATION');

-- CreateTable
CREATE TABLE "Region" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CassationDistrict" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER,

    CONSTRAINT "CassationDistrict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourtType" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER,

    CONSTRAINT "CourtType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Court" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "site" TEXT,
    "regionId" UUID NOT NULL,
    "cassDistrictId" UUID NOT NULL,
    "typeId" UUID NOT NULL,
    "serverNumbers" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Court_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Division" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "number" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" UUID NOT NULL,
    "cn" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "divisionId" UUID NOT NULL,
    "login" TEXT NOT NULL,
    "is_present" BOOLEAN NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "dn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "refreshTokenHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NaturalPerson" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "middleName" TEXT,
    "surname" TEXT,
    "passportSeries" TEXT,
    "passportNumber" TEXT,

    CONSTRAINT "NaturalPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualEntrepreneur" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "inn" TEXT NOT NULL,
    "ogrnip" TEXT,
    "registrationDate" TIMESTAMP(3),

    CONSTRAINT "IndividualEntrepreneur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalEntity" (
    "id" UUID NOT NULL,
    "shortName" TEXT NOT NULL,
    "fullName" TEXT,
    "inn" VARCHAR(12) NOT NULL,
    "ogrn" VARCHAR(13),
    "actualAddress" TEXT,
    "legalAddress" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "registrationDate" TIMESTAMP(3),

    CONSTRAINT "LegalEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialActivityType" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER,

    CONSTRAINT "FinancialActivityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialOrganization" (
    "id" UUID NOT NULL,
    "activityTypeId" UUID NOT NULL,
    "terminationDate" DATE,
    "terminationDecisionNumber" TEXT,
    "externalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "actualAddress" TEXT,
    "email" TEXT,
    "fullName" TEXT,
    "inn" VARCHAR(12) NOT NULL,
    "legalAddress" TEXT,
    "ogrn" VARCHAR(13),
    "phone" TEXT,
    "registrationDate" DATE,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "FinancialOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" UUID NOT NULL,
    "type" "PartyType" NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourtCaseType" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "CourtCaseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourtCase" (
    "id" UUID NOT NULL,
    "courtCaseTypeId" UUID NOT NULL,
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CourtCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProceduralStatus" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProceduralStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourtCaseParty" (
    "id" UUID NOT NULL,
    "courtCaseId" UUID NOT NULL,
    "partyId" UUID NOT NULL,
    "proceduralStatusId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourtCaseParty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Representation" (
    "id" UUID NOT NULL,
    "courtCaseId" UUID NOT NULL,
    "representativeId" UUID NOT NULL,
    "representedId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Representation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instance" (
    "id" UUID NOT NULL,
    "courtId" UUID NOT NULL,
    "courtCaseId" UUID NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "link" TEXT,
    "regDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Instance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Region_code_key" ON "Region"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CassationDistrict_name_key" ON "CassationDistrict"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CassationDistrict_code_key" ON "CassationDistrict"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CourtType_name_key" ON "CourtType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourtType_code_key" ON "CourtType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Court_name_key" ON "Court"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Division_name_key" ON "Division"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Division_code_key" ON "Division"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Division_number_key" ON "Division"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_cn_key" ON "Employee"("cn");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_login_key" ON "Employee"("login");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialActivityType_code_key" ON "FinancialActivityType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialActivityType_name_key" ON "FinancialActivityType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialOrganization_inn_key" ON "FinancialOrganization"("inn");

-- CreateIndex
CREATE UNIQUE INDEX "CourtCaseType_name_key" ON "CourtCaseType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourtCaseType_code_key" ON "CourtCaseType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CourtCase_uid_key" ON "CourtCase"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "ProceduralStatus_name_key" ON "ProceduralStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourtCaseParty_courtCaseId_partyId_proceduralStatusId_key" ON "CourtCaseParty"("courtCaseId", "partyId", "proceduralStatusId");

-- CreateIndex
CREATE UNIQUE INDEX "Instance_courtId_caseNumber_key" ON "Instance"("courtId", "caseNumber");

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_cassDistrictId_fkey" FOREIGN KEY ("cassDistrictId") REFERENCES "CassationDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CourtType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NaturalPerson" ADD CONSTRAINT "NaturalPerson_id_fkey" FOREIGN KEY ("id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualEntrepreneur" ADD CONSTRAINT "IndividualEntrepreneur_id_fkey" FOREIGN KEY ("id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalEntity" ADD CONSTRAINT "LegalEntity_id_fkey" FOREIGN KEY ("id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialOrganization" ADD CONSTRAINT "FinancialOrganization_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "FinancialActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialOrganization" ADD CONSTRAINT "FinancialOrganization_id_fkey" FOREIGN KEY ("id") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourtCase" ADD CONSTRAINT "CourtCase_courtCaseTypeId_fkey" FOREIGN KEY ("courtCaseTypeId") REFERENCES "CourtCaseType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourtCaseParty" ADD CONSTRAINT "CourtCaseParty_courtCaseId_fkey" FOREIGN KEY ("courtCaseId") REFERENCES "CourtCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourtCaseParty" ADD CONSTRAINT "CourtCaseParty_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourtCaseParty" ADD CONSTRAINT "CourtCaseParty_proceduralStatusId_fkey" FOREIGN KEY ("proceduralStatusId") REFERENCES "ProceduralStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Representation" ADD CONSTRAINT "Representation_courtCaseId_fkey" FOREIGN KEY ("courtCaseId") REFERENCES "CourtCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Representation" ADD CONSTRAINT "Representation_representativeId_fkey" FOREIGN KEY ("representativeId") REFERENCES "CourtCaseParty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Representation" ADD CONSTRAINT "Representation_representedId_fkey" FOREIGN KEY ("representedId") REFERENCES "CourtCaseParty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instance" ADD CONSTRAINT "Instance_courtCaseId_fkey" FOREIGN KEY ("courtCaseId") REFERENCES "CourtCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instance" ADD CONSTRAINT "Instance_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
