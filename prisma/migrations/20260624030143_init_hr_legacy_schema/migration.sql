/*
  Warnings:

  - The primary key for the `departure_reasons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `departure_reasons` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `employee_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `employee_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `employee_types` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `employees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `company` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `job_title` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `employees` table. All the data in the column will be lost.
  - The `id` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `job_position_id` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `manager_id` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `employee_type_id` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `work_location_id` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `job_positions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `department_id` on the `job_positions` table. All the data in the column will be lost.
  - The `id` column on the `job_positions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tags` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `work_locations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `work_locations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `departments` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `employee_id` on the `employee_tags` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tag_id` on the `employee_tags` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `first_name` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdministrativeUnitType" AS ENUM ('country', 'province', 'capital', 'district', 'sum', 'khoroo', 'bag');

-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('basic', 'intermediate', 'advanced', 'fluent', 'native');

-- DropForeignKey
ALTER TABLE "departments" DROP CONSTRAINT "departments_manager_id_fkey";

-- DropForeignKey
ALTER TABLE "departments" DROP CONSTRAINT "departments_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_tags" DROP CONSTRAINT "employee_tags_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_tags" DROP CONSTRAINT "employee_tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_department_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_employee_type_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_job_position_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_manager_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_work_location_id_fkey";

-- DropForeignKey
ALTER TABLE "job_positions" DROP CONSTRAINT "job_positions_department_id_fkey";

-- DropIndex
DROP INDEX "employees_department_id_idx";

-- DropIndex
DROP INDEX "job_positions_department_id_idx";

-- AlterTable
ALTER TABLE "departure_reasons" DROP CONSTRAINT "departure_reasons_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "departure_reasons_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "employee_tags" DROP CONSTRAINT "employee_tags_pkey",
DROP COLUMN "employee_id",
ADD COLUMN     "employee_id" INTEGER NOT NULL,
DROP COLUMN "tag_id",
ADD COLUMN     "tag_id" INTEGER NOT NULL,
ADD CONSTRAINT "employee_tags_pkey" PRIMARY KEY ("employee_id", "tag_id");

-- AlterTable
ALTER TABLE "employee_types" DROP CONSTRAINT "employee_types_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "employee_types_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "employees" DROP CONSTRAINT "employees_pkey",
DROP COLUMN "company",
DROP COLUMN "department_id",
DROP COLUMN "job_title",
DROP COLUMN "name",
DROP COLUMN "nationality",
ADD COLUMN     "academic_degree_id" INTEGER,
ADD COLUMN     "address_unit_id" INTEGER,
ADD COLUMN     "bank_account" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bank_id" INTEGER,
ADD COLUMN     "birth_place_id" INTEGER,
ADD COLUMN     "country_id" INTEGER,
ADD COLUMN     "dep_id" SMALLINT,
ADD COLUMN     "departure_reason_id" INTEGER,
ADD COLUMN     "dismissed_at" DATE,
ADD COLUMN     "education_id" INTEGER,
ADD COLUMN     "family_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "hired_at" DATE,
ADD COLUMN     "last_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "occupation_id" INTEGER,
ADD COLUMN     "rank_level_id" INTEGER,
ADD COLUMN     "register_number" TEXT NOT NULL DEFAULT '',
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "job_position_id",
ADD COLUMN     "job_position_id" INTEGER,
DROP COLUMN "manager_id",
ADD COLUMN     "manager_id" INTEGER,
DROP COLUMN "employee_type_id",
ADD COLUMN     "employee_type_id" INTEGER,
DROP COLUMN "work_location_id",
ADD COLUMN     "work_location_id" INTEGER,
ADD CONSTRAINT "employees_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "job_positions" DROP CONSTRAINT "job_positions_pkey",
DROP COLUMN "department_id",
ADD COLUMN     "dep_id" SMALLINT,
ADD COLUMN     "occupation_id" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "job_positions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tags" DROP CONSTRAINT "tags_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "work_locations" DROP CONSTRAINT "work_locations_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "work_locations_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "departments";

-- CreateTable
CREATE TABLE "DEPS" (
    "DEP_ID" SMALLSERIAL NOT NULL,
    "NAME" CHAR(25),
    "PARENT_ID" SMALLINT,
    "ACC_NUM" VARCHAR(50),
    "CUST_IDENT" INTEGER,
    "EXPTYPE_IDENT" INTEGER,
    "SOCINS_ACC" VARCHAR(50),
    "SCHEDULE" INTEGER,
    "SCLASS" SMALLINT,
    "OFFICE_IDENT" INTEGER,
    "LIST_ACC" VARCHAR(50),
    "PORDER" SMALLINT,
    "PRINT_COLUMNS" VARCHAR(500),
    "PRINT_COLUMNS_ADV" VARCHAR(100),

    CONSTRAINT "DEPS_pkey" PRIMARY KEY ("DEP_ID")
);

-- CreateTable
CREATE TABLE "OCCUPATION" (
    "OCCUPATION_ID" SERIAL NOT NULL,
    "DESCRIPTION" CHAR(100) NOT NULL,
    "FDBEXP_IDENT" INTEGER,
    "OCCUP" SMALLINT,
    "OCCUPATION_CHARACTER" VARCHAR(20),
    "SCHED_ID" INTEGER,
    "OCLASS_CODE" VARCHAR(4),
    "OCLASS_CODE2024" VARCHAR(10),

    CONSTRAINT "OCCUPATION_pkey" PRIMARY KEY ("OCCUPATION_ID")
);

-- CreateTable
CREATE TABLE "EDUCATION" (
    "EDUCATION_ID" SERIAL NOT NULL,
    "DESCRIPTION" CHAR(25) NOT NULL,

    CONSTRAINT "EDUCATION_pkey" PRIMARY KEY ("EDUCATION_ID")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name_mn" TEXT NOT NULL,
    "name_en" TEXT NOT NULL DEFAULT '',
    "iso2" TEXT NOT NULL,
    "iso3" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrative_units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT '',
    "unit_type" "AdministrativeUnitType" NOT NULL,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "administrative_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rank_levels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rank_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_degrees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_degrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_languages" (
    "employee_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "level" "LanguageLevel",

    CONSTRAINT "employee_languages_pkey" PRIMARY KEY ("employee_id","language_id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_trainings" (
    "employee_id" INTEGER NOT NULL,
    "training_id" INTEGER NOT NULL,
    "started_at" DATE,
    "ended_at" DATE,
    "certificate_no" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "employee_trainings_pkey" PRIMARY KEY ("employee_id","training_id")
);

-- CreateTable
CREATE TABLE "specialty_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialty_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "specialty_type_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "professions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specializations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "profession_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specializations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_educations" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "school_name" TEXT NOT NULL,
    "education_id" INTEGER,
    "academic_degree_id" INTEGER,
    "profession_id" INTEGER,
    "specialization_id" INTEGER,
    "started_at" DATE,
    "graduated_at" DATE,
    "diploma_no" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "employee_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driving_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driving_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_driving_categories" (
    "employee_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "employee_driving_categories_pkey" PRIMARY KEY ("employee_id","category_id")
);

-- CreateIndex
CREATE INDEX "DEPS_PARENT_ID_idx" ON "DEPS"("PARENT_ID");

-- CreateIndex
CREATE UNIQUE INDEX "countries_iso2_key" ON "countries"("iso2");

-- CreateIndex
CREATE INDEX "administrative_units_parent_id_idx" ON "administrative_units"("parent_id");

-- CreateIndex
CREATE INDEX "administrative_units_unit_type_idx" ON "administrative_units"("unit_type");

-- CreateIndex
CREATE UNIQUE INDEX "administrative_units_name_parent_id_key" ON "administrative_units"("name", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "rank_levels_name_key" ON "rank_levels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "academic_degrees_name_key" ON "academic_degrees"("name");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE INDEX "employee_languages_language_id_idx" ON "employee_languages"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "trainings_name_key" ON "trainings"("name");

-- CreateIndex
CREATE INDEX "employee_trainings_training_id_idx" ON "employee_trainings"("training_id");

-- CreateIndex
CREATE UNIQUE INDEX "specialty_types_name_key" ON "specialty_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "professions_name_key" ON "professions"("name");

-- CreateIndex
CREATE INDEX "professions_specialty_type_id_idx" ON "professions"("specialty_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "specializations_name_key" ON "specializations"("name");

-- CreateIndex
CREATE INDEX "specializations_profession_id_idx" ON "specializations"("profession_id");

-- CreateIndex
CREATE INDEX "employee_educations_employee_id_idx" ON "employee_educations"("employee_id");

-- CreateIndex
CREATE INDEX "employee_educations_education_id_idx" ON "employee_educations"("education_id");

-- CreateIndex
CREATE INDEX "employee_educations_academic_degree_id_idx" ON "employee_educations"("academic_degree_id");

-- CreateIndex
CREATE INDEX "employee_educations_profession_id_idx" ON "employee_educations"("profession_id");

-- CreateIndex
CREATE INDEX "employee_educations_specialization_id_idx" ON "employee_educations"("specialization_id");

-- CreateIndex
CREATE UNIQUE INDEX "banks_name_key" ON "banks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "driving_categories_name_key" ON "driving_categories"("name");

-- CreateIndex
CREATE INDEX "employee_driving_categories_category_id_idx" ON "employee_driving_categories"("category_id");

-- CreateIndex
CREATE INDEX "employee_tags_tag_id_idx" ON "employee_tags"("tag_id");

-- CreateIndex
CREATE INDEX "employees_dep_id_idx" ON "employees"("dep_id");

-- CreateIndex
CREATE INDEX "employees_occupation_id_idx" ON "employees"("occupation_id");

-- CreateIndex
CREATE INDEX "employees_education_id_idx" ON "employees"("education_id");

-- CreateIndex
CREATE INDEX "employees_job_position_id_idx" ON "employees"("job_position_id");

-- CreateIndex
CREATE INDEX "employees_manager_id_idx" ON "employees"("manager_id");

-- CreateIndex
CREATE INDEX "employees_employee_type_id_idx" ON "employees"("employee_type_id");

-- CreateIndex
CREATE INDEX "employees_work_location_id_idx" ON "employees"("work_location_id");

-- CreateIndex
CREATE INDEX "employees_country_id_idx" ON "employees"("country_id");

-- CreateIndex
CREATE INDEX "employees_birth_place_id_idx" ON "employees"("birth_place_id");

-- CreateIndex
CREATE INDEX "employees_address_unit_id_idx" ON "employees"("address_unit_id");

-- CreateIndex
CREATE INDEX "employees_academic_degree_id_idx" ON "employees"("academic_degree_id");

-- CreateIndex
CREATE INDEX "employees_rank_level_id_idx" ON "employees"("rank_level_id");

-- CreateIndex
CREATE INDEX "employees_bank_id_idx" ON "employees"("bank_id");

-- CreateIndex
CREATE INDEX "employees_departure_reason_id_idx" ON "employees"("departure_reason_id");

-- CreateIndex
CREATE INDEX "employees_register_number_idx" ON "employees"("register_number");

-- CreateIndex
CREATE INDEX "job_positions_dep_id_idx" ON "job_positions"("dep_id");

-- CreateIndex
CREATE INDEX "job_positions_occupation_id_idx" ON "job_positions"("occupation_id");

-- AddForeignKey
ALTER TABLE "DEPS" ADD CONSTRAINT "DEPS_PARENT_ID_fkey" FOREIGN KEY ("PARENT_ID") REFERENCES "DEPS"("DEP_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_positions" ADD CONSTRAINT "job_positions_dep_id_fkey" FOREIGN KEY ("dep_id") REFERENCES "DEPS"("DEP_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_positions" ADD CONSTRAINT "job_positions_occupation_id_fkey" FOREIGN KEY ("occupation_id") REFERENCES "OCCUPATION"("OCCUPATION_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_dep_id_fkey" FOREIGN KEY ("dep_id") REFERENCES "DEPS"("DEP_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_occupation_id_fkey" FOREIGN KEY ("occupation_id") REFERENCES "OCCUPATION"("OCCUPATION_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "EDUCATION"("EDUCATION_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_job_position_id_fkey" FOREIGN KEY ("job_position_id") REFERENCES "job_positions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_employee_type_id_fkey" FOREIGN KEY ("employee_type_id") REFERENCES "employee_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_work_location_id_fkey" FOREIGN KEY ("work_location_id") REFERENCES "work_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_birth_place_id_fkey" FOREIGN KEY ("birth_place_id") REFERENCES "administrative_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_address_unit_id_fkey" FOREIGN KEY ("address_unit_id") REFERENCES "administrative_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_academic_degree_id_fkey" FOREIGN KEY ("academic_degree_id") REFERENCES "academic_degrees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_rank_level_id_fkey" FOREIGN KEY ("rank_level_id") REFERENCES "rank_levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_departure_reason_id_fkey" FOREIGN KEY ("departure_reason_id") REFERENCES "departure_reasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_tags" ADD CONSTRAINT "employee_tags_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_tags" ADD CONSTRAINT "employee_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrative_units" ADD CONSTRAINT "administrative_units_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "administrative_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_languages" ADD CONSTRAINT "employee_languages_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_languages" ADD CONSTRAINT "employee_languages_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_trainings" ADD CONSTRAINT "employee_trainings_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_trainings" ADD CONSTRAINT "employee_trainings_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professions" ADD CONSTRAINT "professions_specialty_type_id_fkey" FOREIGN KEY ("specialty_type_id") REFERENCES "specialty_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specializations" ADD CONSTRAINT "specializations_profession_id_fkey" FOREIGN KEY ("profession_id") REFERENCES "professions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_educations" ADD CONSTRAINT "employee_educations_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_educations" ADD CONSTRAINT "employee_educations_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "EDUCATION"("EDUCATION_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_educations" ADD CONSTRAINT "employee_educations_academic_degree_id_fkey" FOREIGN KEY ("academic_degree_id") REFERENCES "academic_degrees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_educations" ADD CONSTRAINT "employee_educations_profession_id_fkey" FOREIGN KEY ("profession_id") REFERENCES "professions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_educations" ADD CONSTRAINT "employee_educations_specialization_id_fkey" FOREIGN KEY ("specialization_id") REFERENCES "specializations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_driving_categories" ADD CONSTRAINT "employee_driving_categories_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_driving_categories" ADD CONSTRAINT "employee_driving_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "driving_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
