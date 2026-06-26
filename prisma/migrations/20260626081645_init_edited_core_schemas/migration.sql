-- CreateTable
CREATE TABLE "degree" (
    "degree_id" SERIAL NOT NULL,
    "description" VARCHAR(30) NOT NULL,
    "rpl_local" CHAR(1) DEFAULT 'N',

    CONSTRAINT "degree_pkey" PRIMARY KEY ("degree_id")
);

-- CreateTable
CREATE TABLE "talents" (
    "talent_id" SERIAL NOT NULL,
    "description" CHAR(30) NOT NULL,

    CONSTRAINT "talents_pkey" PRIMARY KEY ("talent_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "talents_description_key" ON "talents"("description");

-- CreateIndex
CREATE INDEX "emp_talents_talent_ident_idx" ON "emp_talents"("talent_ident");

-- CreateIndex
CREATE INDEX "employee_degree_ident_idx" ON "employee"("degree_ident");

-- CreateIndex
CREATE INDEX "employee_niigmiin_garal_ident_idx" ON "employee"("niigmiin_garal_ident");

-- CreateIndex
CREATE INDEX "employee_voting_work_ident_idx" ON "employee"("voting_work_ident");

-- CreateIndex
CREATE INDEX "employee_clothessize_ident_idx" ON "employee"("clothessize_ident");

-- CreateIndex
CREATE INDEX "employee_shoessize_ident_idx" ON "employee"("shoessize_ident");

-- CreateIndex
CREATE INDEX "employee_apartcond_ident_idx" ON "employee"("apartcond_ident");

-- CreateIndex
CREATE INDEX "employee_carowncond_ident_idx" ON "employee"("carowncond_ident");

-- CreateIndex
CREATE INDEX "employee_wskill_ident_idx" ON "employee"("wskill_ident");

-- CreateIndex
CREATE INDEX "employee_schedule_idx" ON "employee"("schedule");

-- CreateIndex
CREATE INDEX "employee_firedreason_ident_idx" ON "employee"("firedreason_ident");

-- CreateIndex
CREATE INDEX "employee_insur_ident_idx" ON "employee"("insur_ident");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_degree_ident_fkey" FOREIGN KEY ("degree_ident") REFERENCES "degree"("degree_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emp_talents" ADD CONSTRAINT "emp_talents_talent_ident_fkey" FOREIGN KEY ("talent_ident") REFERENCES "talents"("talent_id") ON DELETE CASCADE ON UPDATE CASCADE;
