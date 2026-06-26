/*
  Warnings:

  - The primary key for the `banks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the `DEPS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EDUCATION` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OCCUPATION` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `academic_degrees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `administrative_units` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departure_reasons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `driving_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_driving_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_educations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_trainings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_positions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rank_levels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specializations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specialty_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trainings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `work_locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DEPS" DROP CONSTRAINT "DEPS_PARENT_ID_fkey";

-- DropForeignKey
ALTER TABLE "administrative_units" DROP CONSTRAINT "administrative_units_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_driving_categories" DROP CONSTRAINT "employee_driving_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_driving_categories" DROP CONSTRAINT "employee_driving_categories_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_educations" DROP CONSTRAINT "employee_educations_academic_degree_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_educations" DROP CONSTRAINT "employee_educations_education_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_educations" DROP CONSTRAINT "employee_educations_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_educations" DROP CONSTRAINT "employee_educations_profession_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_educations" DROP CONSTRAINT "employee_educations_specialization_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_languages" DROP CONSTRAINT "employee_languages_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_languages" DROP CONSTRAINT "employee_languages_language_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_tags" DROP CONSTRAINT "employee_tags_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_tags" DROP CONSTRAINT "employee_tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_trainings" DROP CONSTRAINT "employee_trainings_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_trainings" DROP CONSTRAINT "employee_trainings_training_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_academic_degree_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_address_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_bank_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_birth_place_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_country_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_dep_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_departure_reason_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_education_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_employee_type_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_job_position_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_manager_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_occupation_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_rank_level_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_work_location_id_fkey";

-- DropForeignKey
ALTER TABLE "job_positions" DROP CONSTRAINT "job_positions_dep_id_fkey";

-- DropForeignKey
ALTER TABLE "job_positions" DROP CONSTRAINT "job_positions_occupation_id_fkey";

-- DropForeignKey
ALTER TABLE "professions" DROP CONSTRAINT "professions_specialty_type_id_fkey";

-- DropForeignKey
ALTER TABLE "specializations" DROP CONSTRAINT "specializations_profession_id_fkey";

-- DropIndex
DROP INDEX "banks_name_key";

-- AlterTable
ALTER TABLE "banks" DROP CONSTRAINT "banks_pkey",
DROP COLUMN "code",
DROP COLUMN "created_at",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "updated_at",
ADD COLUMN     "address" VARCHAR(70),
ADD COLUMN     "bank_code" VARCHAR(20),
ADD COLUMN     "bank_id" SERIAL NOT NULL,
ADD COLUMN     "banknumber" VARCHAR(20),
ADD COLUMN     "bic_code" VARCHAR(20),
ADD COLUMN     "code_salary" VARCHAR(20),
ADD COLUMN     "country_ident" INTEGER,
ADD COLUMN     "description" VARCHAR(100),
ADD COLUMN     "email" VARCHAR(50),
ADD COLUMN     "modified_date" TIMESTAMP(3),
ADD COLUMN     "phone" VARCHAR(15),
ADD COLUMN     "recacc" CHAR(12),
ADD COLUMN     "reccust_ident" INTEGER,
ADD CONSTRAINT "banks_pkey" PRIMARY KEY ("bank_id");

-- DropTable
DROP TABLE "DEPS";

-- DropTable
DROP TABLE "EDUCATION";

-- DropTable
DROP TABLE "OCCUPATION";

-- DropTable
DROP TABLE "academic_degrees";

-- DropTable
DROP TABLE "administrative_units";

-- DropTable
DROP TABLE "countries";

-- DropTable
DROP TABLE "departure_reasons";

-- DropTable
DROP TABLE "driving_categories";

-- DropTable
DROP TABLE "employee_driving_categories";

-- DropTable
DROP TABLE "employee_educations";

-- DropTable
DROP TABLE "employee_languages";

-- DropTable
DROP TABLE "employee_tags";

-- DropTable
DROP TABLE "employee_trainings";

-- DropTable
DROP TABLE "employee_types";

-- DropTable
DROP TABLE "employees";

-- DropTable
DROP TABLE "job_positions";

-- DropTable
DROP TABLE "languages";

-- DropTable
DROP TABLE "professions";

-- DropTable
DROP TABLE "rank_levels";

-- DropTable
DROP TABLE "specializations";

-- DropTable
DROP TABLE "specialty_types";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "trainings";

-- DropTable
DROP TABLE "work_locations";

-- DropEnum
DROP TYPE "AdministrativeUnitType";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "KanbanState";

-- DropEnum
DROP TYPE "LanguageLevel";

-- DropEnum
DROP TYPE "LocationType";

-- DropEnum
DROP TYPE "MaritalStatus";

-- CreateTable
CREATE TABLE "employee" (
    "employee_id" SERIAL NOT NULL,
    "name" CHAR(25) NOT NULL,
    "surname" CHAR(25),
    "dep_ident" SMALLINT,
    "post" CHAR(25),
    "birthday" TIMESTAMP(3),
    "emdno" CHAR(14),
    "ndno" CHAR(14),
    "working_year" SMALLINT NOT NULL DEFAULT 0,
    "wskill_ident" INTEGER,
    "salary" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "inworkdate" TIMESTAMP(3),
    "g_date" TIMESTAMP(3),
    "g_enddate" TIMESTAMP(3),
    "homephone" CHAR(14),
    "workphone" CHAR(14),
    "fullname" VARCHAR(208),
    "calctype" SMALLINT,
    "workcondtn" SMALLINT,
    "status" CHAR(8) DEFAULT 'active',
    "manager_exp" VARCHAR(12) DEFAULT 'no',
    "occupation_ident" INTEGER,
    "grade" CHAR(1),
    "gender" CHAR(1),
    "education_ident" INTEGER,
    "graduate_ident" INTEGER,
    "ecode" CHAR(20),
    "is_soldier" CHAR(3),
    "loginpass" VARCHAR(20),
    "bycard" SMALLINT,
    "email" VARCHAR(50),
    "bank_ident" INTEGER,
    "branch_ident" INTEGER,
    "schedule" INTEGER,
    "registerno" VARCHAR(20),
    "tenderer" SMALLINT,
    "ten_days" SMALLINT,
    "asset_owner" SMALLINT DEFAULT 1,
    "item_owner" SMALLINT DEFAULT 1,
    "registered_date" TIMESTAMP(3),
    "ovog" CHAR(25),
    "job_type" VARCHAR(20),
    "job_figure" VARCHAR(20) DEFAULT 'Main',
    "maritalstatus_ident" INTEGER,
    "apartcond_ident" INTEGER,
    "carowncond_ident" INTEGER,
    "contract_num" CHAR(10),
    "nationality_ident" INTEGER,
    "niigmiin_garal_ident" INTEGER,
    "country_ident" INTEGER,
    "voting_work_ident" INTEGER,
    "degree_ident" INTEGER,
    "passport" VARCHAR(14),
    "clothessize_ident" INTEGER,
    "shoessize_ident" INTEGER,
    "income" INTEGER,
    "contract_emp" VARCHAR(12) NOT NULL DEFAULT 'no',
    "branchyear" INTEGER,
    "birthyear" INTEGER,
    "died" VARCHAR(12) NOT NULL DEFAULT 'no',
    "hr" VARCHAR(12) NOT NULL DEFAULT 'no',
    "realtor" SMALLINT,
    "insur_ident" INTEGER,
    "limited" SMALLINT,
    "loc_code" VARCHAR(4),
    "ibank_number" VARCHAR(20),
    "blood_type" CHAR(2),
    "emptype" SMALLINT,
    "changed_date" TIMESTAMP(3),
    "command_ident" INTEGER,
    "move_type" SMALLINT,
    "workyear_sector" SMALLINT NOT NULL DEFAULT 0,
    "firedreason_ident" INTEGER,
    "taken_leave" SMALLINT,
    "leave_type" SMALLINT,
    "test_month" SMALLINT,
    "foreign_emp" SMALLINT,
    "wagetest_emp" SMALLINT,
    "office_ident" INTEGER,
    "section_ident" INTEGER,
    "empno" VARCHAR(10),
    "grade_perc" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "perc1" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "perc2" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "phone2" VARCHAR(14),
    "grade_amount" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "grade_start" TIMESTAMP(3),
    "grade_end" TIMESTAMP(3),
    "grade_level" VARCHAR(10),
    "occupation_ident2" INTEGER,
    "sal_percent" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "sal_amount" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "wtype" SMALLINT,
    "disabled_emp" SMALLINT,
    "photo_url" VARCHAR(300),
    "pos_related" BOOLEAN,
    "etax_code" VARCHAR(30),
    "urgiin_ovog" VARCHAR(100),
    "command_no" VARCHAR(10),
    "command_description" VARCHAR(100),
    "auth_usercompany_id" INTEGER,
    "timetry_id" VARCHAR(25),
    "use_timetry" SMALLINT,
    "auth_user_id" INTEGER,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "deps" (
    "dep_id" SMALLSERIAL NOT NULL,
    "name" CHAR(25),
    "parent_id" SMALLINT,
    "acc_num" CHAR(12),
    "cust_ident" INTEGER,
    "exptype_ident" INTEGER,
    "socins_acc" CHAR(12),
    "schedule" INTEGER,
    "sclass" SMALLINT,
    "office_ident" INTEGER,
    "list_acc" CHAR(12),
    "porder" SMALLINT,
    "print_columns" VARCHAR(500),
    "print_columns_adv" VARCHAR(500),

    CONSTRAINT "deps_pkey" PRIMARY KEY ("dep_id")
);

-- CreateTable
CREATE TABLE "occupation" (
    "occupation_id" SERIAL NOT NULL,
    "description" CHAR(100) NOT NULL,
    "fdbexp_ident" INTEGER,
    "occup" SMALLINT,
    "occupation_character" VARCHAR(20),
    "sched_id" INTEGER,
    "oclass_code" VARCHAR(4),
    "oclass_code2024" VARCHAR(10),

    CONSTRAINT "occupation_pkey" PRIMARY KEY ("occupation_id")
);

-- CreateTable
CREATE TABLE "education" (
    "education_id" SERIAL NOT NULL,
    "description" CHAR(25) NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "country" (
    "country_ident" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "country_code" VARCHAR(10),
    "code4bank" VARCHAR(5),

    CONSTRAINT "country_pkey" PRIMARY KEY ("country_ident")
);

-- CreateTable
CREATE TABLE "nationality" (
    "nationality_id" SERIAL NOT NULL,
    "description" CHAR(50) NOT NULL,

    CONSTRAINT "nationality_pkey" PRIMARY KEY ("nationality_id")
);

-- CreateTable
CREATE TABLE "citytown" (
    "city_id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "region_code" VARCHAR(10),

    CONSTRAINT "citytown_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "district" (
    "district_id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "code" INTEGER,
    "loc_code" INTEGER,
    "city_ident" INTEGER NOT NULL,
    "region_code" VARCHAR(10),

    CONSTRAINT "district_pkey" PRIMARY KEY ("district_id")
);

-- CreateTable
CREATE TABLE "marital_status" (
    "maritalstatus_id" SERIAL NOT NULL,
    "description" CHAR(30),
    "rpl_local" CHAR(1) DEFAULT 'N',

    CONSTRAINT "marital_status_pkey" PRIMARY KEY ("maritalstatus_id")
);

-- CreateTable
CREATE TABLE "apartment_cond" (
    "apartcond_id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "rpl_local" CHAR(1) DEFAULT 'N',

    CONSTRAINT "apartment_cond_pkey" PRIMARY KEY ("apartcond_id")
);

-- CreateTable
CREATE TABLE "carown_cond" (
    "carowncond_id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "rpl_local" CHAR(1) DEFAULT 'N',

    CONSTRAINT "carown_cond_pkey" PRIMARY KEY ("carowncond_id")
);

-- CreateTable
CREATE TABLE "niigmiin_garal" (
    "niigmiin_garal_id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "rpl_local" CHAR(1) DEFAULT 'N',

    CONSTRAINT "niigmiin_garal_pkey" PRIMARY KEY ("niigmiin_garal_id")
);

-- CreateTable
CREATE TABLE "voting_work" (
    "voting_work_id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "voting_work_pkey" PRIMARY KEY ("voting_work_id")
);

-- CreateTable
CREATE TABLE "graduate" (
    "graduate_id" SERIAL NOT NULL,
    "description" CHAR(25) NOT NULL,

    CONSTRAINT "graduate_pkey" PRIMARY KEY ("graduate_id")
);

-- CreateTable
CREATE TABLE "insur_type" (
    "insur_id" SERIAL NOT NULL,
    "insur_code" VARCHAR(10),
    "description" VARCHAR(100),
    "sal_type" SMALLINT,
    "ins_order" INTEGER,
    "colnum" SMALLINT,
    "ndsh_percent" DECIMAL(18,2),
    "emp_percent" DECIMAL(18,2),
    "insur_codenew" VARCHAR(10),

    CONSTRAINT "insur_type_pkey" PRIMARY KEY ("insur_id")
);

-- CreateTable
CREATE TABLE "fired_reason" (
    "firedreason_id" SERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,

    CONSTRAINT "fired_reason_pkey" PRIMARY KEY ("firedreason_id")
);

-- CreateTable
CREATE TABLE "clothes_size_type" (
    "typeid" SERIAL NOT NULL,
    "clothessize" CHAR(10) NOT NULL,
    "sizetype" CHAR(7) NOT NULL,
    "size_other_man" CHAR(10),
    "size_other_woman" CHAR(10),

    CONSTRAINT "clothes_size_type_pkey" PRIMARY KEY ("typeid")
);

-- CreateTable
CREATE TABLE "work_skill" (
    "wskill_id" SERIAL NOT NULL,
    "description" CHAR(25) NOT NULL,
    "cost_normal" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "cost_hard" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "cost_other" DECIMAL(18,15) NOT NULL DEFAULT 0,

    CONSTRAINT "work_skill_pkey" PRIMARY KEY ("wskill_id")
);

-- CreateTable
CREATE TABLE "branch" (
    "branch_id" SERIAL NOT NULL,
    "description" CHAR(25) NOT NULL,
    "boss" CHAR(30),
    "gen_accountant" CHAR(30),
    "status" SMALLINT NOT NULL,
    "legal_name" CHAR(40),
    "address" CHAR(90),
    "registerno" CHAR(20),
    "ttd" CHAR(20),
    "org_type" CHAR(25),
    "accountant" CHAR(25),
    "custid" INTEGER,
    "manager" INTEGER,
    "bankname" VARCHAR(30),
    "banknumber" VARCHAR(20),
    "phone" VARCHAR(60),
    "hrmanager" VARCHAR(30),
    "tradeunion_name" VARCHAR(100),
    "tradeunion_assoc" VARCHAR(100),
    "tradeunion_head" VARCHAR(100),
    "chkdate" TIMESTAMP(3),
    "logo" BYTEA,
    "is_sync" VARCHAR(3),
    "modified_date" TIMESTAMP(3),
    "boss_sign1" BYTEA,
    "account_sign1" BYTEA,
    "stamp_acc" BYTEA,
    "stamp_boss" BYTEA,
    "emd_cust" INTEGER,
    "emdacc" CHAR(12),
    "taxable" VARCHAR(12),
    "email" VARCHAR(100),

    CONSTRAINT "branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "hr_office" (
    "office_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "hr_office_pkey" PRIMARY KEY ("office_id")
);

-- CreateTable
CREATE TABLE "shifts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "sched_id" SERIAL NOT NULL,
    "sched_name" VARCHAR(30) NOT NULL,
    "work_day" INTEGER NOT NULL,
    "holiday" INTEGER NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("sched_id")
);

-- CreateTable
CREATE TABLE "profession_type" (
    "professiontype_id" SERIAL NOT NULL,
    "description" CHAR(100) NOT NULL,

    CONSTRAINT "profession_type_pkey" PRIMARY KEY ("professiontype_id")
);

-- CreateTable
CREATE TABLE "edu_type" (
    "education_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "rpl_local" CHAR(1) DEFAULT 'N',

    CONSTRAINT "edu_type_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "educ" (
    "educ_id" SMALLSERIAL NOT NULL,
    "employee_ident" INTEGER NOT NULL,
    "edu_ident" INTEGER NOT NULL,
    "startdate" TIMESTAMP(3),
    "start_year" SMALLINT NOT NULL,

    CONSTRAINT "educ_pkey" PRIMARY KEY ("educ_id")
);

-- CreateTable
CREATE TABLE "spec_edu_type" (
    "spec_edu_type_id" SERIAL NOT NULL,
    "description" CHAR(30) NOT NULL,

    CONSTRAINT "spec_edu_type_pkey" PRIMARY KEY ("spec_edu_type_id")
);

-- CreateTable
CREATE TABLE "spec_edu" (
    "spec_edu_id" SERIAL NOT NULL,
    "employee_ident" INTEGER NOT NULL,
    "spec_edu_type_ident" INTEGER NOT NULL,
    "org_edu" VARCHAR(30) NOT NULL,
    "certify_number" CHAR(20),
    "certify_date" TIMESTAMP(3),
    "profession" VARCHAR(20),
    "end_date" TIMESTAMP(3),
    "spec_profession" VARCHAR(20),
    "certify_year" SMALLINT NOT NULL,

    CONSTRAINT "spec_edu_pkey" PRIMARY KEY ("spec_edu_id")
);

-- CreateTable
CREATE TABLE "flanguages" (
    "flanguage_id" SERIAL NOT NULL,
    "description" CHAR(30) NOT NULL,
    "rpl_local" CHAR(1) DEFAULT 'N',

    CONSTRAINT "flanguages_pkey" PRIMARY KEY ("flanguage_id")
);

-- CreateTable
CREATE TABLE "lang_level" (
    "langlevel_id" SERIAL NOT NULL,
    "level_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "lang_level_pkey" PRIMARY KEY ("langlevel_id")
);

-- CreateTable
CREATE TABLE "foreign_lang" (
    "foreignlang_id" SERIAL NOT NULL,
    "employee_ident" INTEGER NOT NULL,
    "flanguage_ident" INTEGER NOT NULL,
    "understand_lvl" CHAR(15),
    "speaking_lvl" CHAR(15),
    "reading_lvl" CHAR(15),
    "writing_lvl" CHAR(15),
    "description" VARCHAR(50),

    CONSTRAINT "foreign_lang_pkey" PRIMARY KEY ("foreignlang_id")
);

-- CreateTable
CREATE TABLE "hr_training" (
    "training_id" SERIAL NOT NULL,
    "emp_ident" INTEGER NOT NULL,
    "tr_type" SMALLINT NOT NULL DEFAULT 1,
    "description" VARCHAR(50) NOT NULL,
    "start_date" TIMESTAMP(3),
    "days" SMALLINT,
    "amount" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "pay_type" SMALLINT NOT NULL,
    "training_center" VARCHAR(100),
    "start_year" SMALLINT NOT NULL,

    CONSTRAINT "hr_training_pkey" PRIMARY KEY ("training_id")
);

-- CreateTable
CREATE TABLE "emp_photo" (
    "photo_id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "photo" BYTEA,

    CONSTRAINT "emp_photo_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "employee_history" (
    "history_id" SERIAL NOT NULL,
    "employee_ident" INTEGER NOT NULL,
    "name" CHAR(25) NOT NULL,
    "surname" CHAR(25),
    "post" CHAR(25),
    "birthday" TIMESTAMP(3),
    "emdno" CHAR(14),
    "ndno" CHAR(14),
    "working_year" SMALLINT NOT NULL DEFAULT 0,
    "salary" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "inworkdate" TIMESTAMP(3),
    "g_date" TIMESTAMP(3),
    "g_enddate" TIMESTAMP(3),
    "homephone" CHAR(14),
    "workphone" CHAR(14),
    "calctype" SMALLINT,
    "status" CHAR(8) DEFAULT 'active',
    "manager_exp" VARCHAR(3) DEFAULT 'no',
    "occupation_ident" INTEGER,
    "gender" CHAR(1),
    "education_ident" INTEGER,
    "graduate_ident" INTEGER,
    "ecode" CHAR(20),
    "bycard" SMALLINT,
    "email" VARCHAR(50),
    "register" VARCHAR(20),
    "passport" VARCHAR(20),
    "inworknumber" VARCHAR(10),
    "address" VARCHAR(100),
    "ndsh_deps" INTEGER,
    "hoat_deps" INTEGER,
    "fired_number" VARCHAR(10),
    "fired_date" TIMESTAMP(3),
    "fired_ident" INTEGER,
    "dep_ident" INTEGER,
    "s_ident" INTEGER,
    "bonus" VARCHAR(20),
    "workcondtn" SMALLINT,
    "country_ident" INTEGER,
    "country1_ident" INTEGER,
    "changed_date" TIMESTAMP(3),
    "comand_no" VARCHAR(10),
    "command_ident" INTEGER,
    "contract_emp" VARCHAR(12) DEFAULT 'no',
    "branch_ident" INTEGER,
    "move_type" SMALLINT,
    "firedreason_ident" INTEGER,
    "emptype" SMALLINT,
    "fullname" VARCHAR(208),
    "isdefault" SMALLINT,
    "foreign_emp" SMALLINT,
    "wagetest_emp" SMALLINT,
    "command_description" VARCHAR(100),
    "insur_ident" INTEGER,

    CONSTRAINT "employee_history_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "driver_type" (
    "driver_type_id" SERIAL NOT NULL,
    "description" VARCHAR(30) NOT NULL,
    "rpl_local" CHAR(1) DEFAULT 'N',

    CONSTRAINT "driver_type_pkey" PRIMARY KEY ("driver_type_id")
);

-- CreateTable
CREATE TABLE "driver" (
    "id_driver" SERIAL NOT NULL,
    "employee_ident" INTEGER NOT NULL,
    "number_driver" VARCHAR(15),
    "inserted_ognoo" TIMESTAMP(3),
    "drivertype" INTEGER NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id_driver")
);

-- CreateTable
CREATE TABLE "emp_grade" (
    "grade_id" SERIAL NOT NULL,
    "emp_ident" INTEGER,
    "grade_level" VARCHAR(100),
    "grade_start" TIMESTAMP(3),
    "grade_end" TIMESTAMP(3),
    "sal_amount" DECIMAL(18,15) NOT NULL DEFAULT 0,

    CONSTRAINT "emp_grade_pkey" PRIMARY KEY ("grade_id")
);

-- CreateTable
CREATE TABLE "emp_vacation" (
    "emp_ident" INTEGER NOT NULL,
    "xmonth" SMALLINT DEFAULT 0,
    "dep_ident" INTEGER,
    "myear" SMALLINT NOT NULL,
    "mmonth" SMALLINT NOT NULL,
    "is_vacation" VARCHAR(12) DEFAULT 'no',
    "v_day" SMALLINT NOT NULL DEFAULT 0,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),

    CONSTRAINT "emp_vacation_pkey" PRIMARY KEY ("emp_ident","myear","mmonth")
);

-- CreateTable
CREATE TABLE "hr_absents" (
    "absent_id" SERIAL NOT NULL,
    "emp_ident" INTEGER NOT NULL,
    "absent_type" SMALLINT NOT NULL,
    "days" SMALLINT,
    "times" SMALLINT,
    "minutes" SMALLINT,
    "time_str" VARCHAR(20),
    "adate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hr_absents_pkey" PRIMARY KEY ("absent_id")
);

-- CreateTable
CREATE TABLE "command" (
    "command_id" SERIAL NOT NULL,
    "employee_ident" INTEGER NOT NULL,
    "command" VARCHAR(50),
    "outdate" TIMESTAMP(3),
    "human_command" VARCHAR(25),
    "commandno" VARCHAR(10) NOT NULL,
    "path" VARCHAR(100),
    "rpl_local" CHAR(1) DEFAULT 'N',
    "command_type" SMALLINT,

    CONSTRAINT "command_pkey" PRIMARY KEY ("command_id")
);

-- CreateTable
CREATE TABLE "emp_assets" (
    "empasset_id" SERIAL NOT NULL,
    "emp_ident" INTEGER NOT NULL,
    "asset_ident" INTEGER NOT NULL,
    "sdate" TIMESTAMP(3),
    "inactive_date" TIMESTAMP(3),
    "quantity" DECIMAL(18,15) NOT NULL DEFAULT 0,
    "inactiv" SMALLINT DEFAULT 0,
    "assettrans_ident" INTEGER,
    "barcode" VARCHAR(30),
    "atype" SMALLINT,
    "master_id" INTEGER,
    "user_name" CHAR(20) NOT NULL DEFAULT 'system',
    "atr_id" INTEGER,

    CONSTRAINT "emp_assets_pkey" PRIMARY KEY ("empasset_id")
);

-- CreateTable
CREATE TABLE "emp_talents" (
    "emp_ident" INTEGER NOT NULL,
    "talent_ident" INTEGER NOT NULL,
    "trained_year" SMALLINT,
    "description" VARCHAR(200),

    CONSTRAINT "emp_talents_pkey" PRIMARY KEY ("emp_ident","talent_ident")
);

-- CreateIndex
CREATE INDEX "employee_dep_ident_idx" ON "employee"("dep_ident");

-- CreateIndex
CREATE INDEX "employee_occupation_ident_idx" ON "employee"("occupation_ident");

-- CreateIndex
CREATE INDEX "employee_occupation_ident2_idx" ON "employee"("occupation_ident2");

-- CreateIndex
CREATE INDEX "employee_education_ident_idx" ON "employee"("education_ident");

-- CreateIndex
CREATE INDEX "employee_graduate_ident_idx" ON "employee"("graduate_ident");

-- CreateIndex
CREATE INDEX "employee_bank_ident_idx" ON "employee"("bank_ident");

-- CreateIndex
CREATE INDEX "employee_branch_ident_idx" ON "employee"("branch_ident");

-- CreateIndex
CREATE INDEX "employee_country_ident_idx" ON "employee"("country_ident");

-- CreateIndex
CREATE INDEX "employee_nationality_ident_idx" ON "employee"("nationality_ident");

-- CreateIndex
CREATE INDEX "employee_maritalstatus_ident_idx" ON "employee"("maritalstatus_ident");

-- CreateIndex
CREATE INDEX "employee_office_ident_idx" ON "employee"("office_ident");

-- CreateIndex
CREATE INDEX "employee_registerno_idx" ON "employee"("registerno");

-- CreateIndex
CREATE INDEX "employee_status_idx" ON "employee"("status");

-- CreateIndex
CREATE INDEX "deps_parent_id_idx" ON "deps"("parent_id");

-- CreateIndex
CREATE INDEX "deps_schedule_idx" ON "deps"("schedule");

-- CreateIndex
CREATE INDEX "deps_office_ident_idx" ON "deps"("office_ident");

-- CreateIndex
CREATE INDEX "occupation_sched_id_idx" ON "occupation"("sched_id");

-- CreateIndex
CREATE INDEX "district_city_ident_idx" ON "district"("city_ident");

-- CreateIndex
CREATE INDEX "educ_employee_ident_idx" ON "educ"("employee_ident");

-- CreateIndex
CREATE INDEX "educ_edu_ident_idx" ON "educ"("edu_ident");

-- CreateIndex
CREATE INDEX "spec_edu_employee_ident_idx" ON "spec_edu"("employee_ident");

-- CreateIndex
CREATE INDEX "spec_edu_spec_edu_type_ident_idx" ON "spec_edu"("spec_edu_type_ident");

-- CreateIndex
CREATE INDEX "foreign_lang_employee_ident_idx" ON "foreign_lang"("employee_ident");

-- CreateIndex
CREATE INDEX "foreign_lang_flanguage_ident_idx" ON "foreign_lang"("flanguage_ident");

-- CreateIndex
CREATE INDEX "hr_training_emp_ident_idx" ON "hr_training"("emp_ident");

-- CreateIndex
CREATE INDEX "emp_photo_emp_id_idx" ON "emp_photo"("emp_id");

-- CreateIndex
CREATE INDEX "employee_history_employee_ident_idx" ON "employee_history"("employee_ident");

-- CreateIndex
CREATE INDEX "driver_employee_ident_idx" ON "driver"("employee_ident");

-- CreateIndex
CREATE INDEX "driver_drivertype_idx" ON "driver"("drivertype");

-- CreateIndex
CREATE INDEX "emp_grade_emp_ident_idx" ON "emp_grade"("emp_ident");

-- CreateIndex
CREATE INDEX "hr_absents_emp_ident_idx" ON "hr_absents"("emp_ident");

-- CreateIndex
CREATE INDEX "command_employee_ident_idx" ON "command"("employee_ident");

-- CreateIndex
CREATE INDEX "emp_assets_emp_ident_idx" ON "emp_assets"("emp_ident");

-- CreateIndex
CREATE INDEX "banks_country_ident_idx" ON "banks"("country_ident");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_dep_ident_fkey" FOREIGN KEY ("dep_ident") REFERENCES "deps"("dep_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_wskill_ident_fkey" FOREIGN KEY ("wskill_ident") REFERENCES "work_skill"("wskill_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_occupation_ident_fkey" FOREIGN KEY ("occupation_ident") REFERENCES "occupation"("occupation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_occupation_ident2_fkey" FOREIGN KEY ("occupation_ident2") REFERENCES "occupation"("occupation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_education_ident_fkey" FOREIGN KEY ("education_ident") REFERENCES "education"("education_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_graduate_ident_fkey" FOREIGN KEY ("graduate_ident") REFERENCES "graduate"("graduate_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_bank_ident_fkey" FOREIGN KEY ("bank_ident") REFERENCES "banks"("bank_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_branch_ident_fkey" FOREIGN KEY ("branch_ident") REFERENCES "branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_schedule_fkey" FOREIGN KEY ("schedule") REFERENCES "shifts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_maritalstatus_ident_fkey" FOREIGN KEY ("maritalstatus_ident") REFERENCES "marital_status"("maritalstatus_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_apartcond_ident_fkey" FOREIGN KEY ("apartcond_ident") REFERENCES "apartment_cond"("apartcond_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_carowncond_ident_fkey" FOREIGN KEY ("carowncond_ident") REFERENCES "carown_cond"("carowncond_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_nationality_ident_fkey" FOREIGN KEY ("nationality_ident") REFERENCES "nationality"("nationality_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_niigmiin_garal_ident_fkey" FOREIGN KEY ("niigmiin_garal_ident") REFERENCES "niigmiin_garal"("niigmiin_garal_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_country_ident_fkey" FOREIGN KEY ("country_ident") REFERENCES "country"("country_ident") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_voting_work_ident_fkey" FOREIGN KEY ("voting_work_ident") REFERENCES "voting_work"("voting_work_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_clothessize_ident_fkey" FOREIGN KEY ("clothessize_ident") REFERENCES "clothes_size_type"("typeid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_shoessize_ident_fkey" FOREIGN KEY ("shoessize_ident") REFERENCES "clothes_size_type"("typeid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_insur_ident_fkey" FOREIGN KEY ("insur_ident") REFERENCES "insur_type"("insur_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_firedreason_ident_fkey" FOREIGN KEY ("firedreason_ident") REFERENCES "fired_reason"("firedreason_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_office_ident_fkey" FOREIGN KEY ("office_ident") REFERENCES "hr_office"("office_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deps" ADD CONSTRAINT "deps_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "deps"("dep_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deps" ADD CONSTRAINT "deps_schedule_fkey" FOREIGN KEY ("schedule") REFERENCES "shifts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deps" ADD CONSTRAINT "deps_office_ident_fkey" FOREIGN KEY ("office_ident") REFERENCES "hr_office"("office_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occupation" ADD CONSTRAINT "occupation_sched_id_fkey" FOREIGN KEY ("sched_id") REFERENCES "schedule"("sched_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banks" ADD CONSTRAINT "banks_country_ident_fkey" FOREIGN KEY ("country_ident") REFERENCES "country"("country_ident") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_city_ident_fkey" FOREIGN KEY ("city_ident") REFERENCES "citytown"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educ" ADD CONSTRAINT "educ_employee_ident_fkey" FOREIGN KEY ("employee_ident") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educ" ADD CONSTRAINT "educ_edu_ident_fkey" FOREIGN KEY ("edu_ident") REFERENCES "edu_type"("education_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spec_edu" ADD CONSTRAINT "spec_edu_employee_ident_fkey" FOREIGN KEY ("employee_ident") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spec_edu" ADD CONSTRAINT "spec_edu_spec_edu_type_ident_fkey" FOREIGN KEY ("spec_edu_type_ident") REFERENCES "spec_edu_type"("spec_edu_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreign_lang" ADD CONSTRAINT "foreign_lang_employee_ident_fkey" FOREIGN KEY ("employee_ident") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreign_lang" ADD CONSTRAINT "foreign_lang_flanguage_ident_fkey" FOREIGN KEY ("flanguage_ident") REFERENCES "flanguages"("flanguage_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_training" ADD CONSTRAINT "hr_training_emp_ident_fkey" FOREIGN KEY ("emp_ident") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emp_photo" ADD CONSTRAINT "emp_photo_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_history" ADD CONSTRAINT "employee_history_employee_ident_fkey" FOREIGN KEY ("employee_ident") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_employee_ident_fkey" FOREIGN KEY ("employee_ident") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_drivertype_fkey" FOREIGN KEY ("drivertype") REFERENCES "driver_type"("driver_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emp_grade" ADD CONSTRAINT "emp_grade_emp_ident_fkey" FOREIGN KEY ("emp_ident") REFERENCES "employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emp_vacation" ADD CONSTRAINT "emp_vacation_emp_ident_fkey" FOREIGN KEY ("emp_ident") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_absents" ADD CONSTRAINT "hr_absents_emp_ident_fkey" FOREIGN KEY ("emp_ident") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "command" ADD CONSTRAINT "command_employee_ident_fkey" FOREIGN KEY ("employee_ident") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emp_assets" ADD CONSTRAINT "emp_assets_emp_ident_fkey" FOREIGN KEY ("emp_ident") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emp_talents" ADD CONSTRAINT "emp_talents_emp_ident_fkey" FOREIGN KEY ("emp_ident") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
