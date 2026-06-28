import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.hr_office.createMany({
    data: [{ office_id: 1, name: "Төв оффис" }],
    skipDuplicates: true,
  });
  await prisma.shifts.createMany({
    data: [{ id: 1, name: "Үндсэн" }],
    skipDuplicates: true,
  });
  await prisma.schedule.createMany({
    data: [{ sched_id: 1, sched_name: "5 өдөр", work_day: 5, holiday: 2 }],
    skipDuplicates: true,
  });
  await prisma.deps.createMany({
    data: [
      { dep_id: 1, name: "Administration", schedule: 1, office_ident: 1 },
      { dep_id: 2, name: "Management", schedule: 1, office_ident: 1 },
      {
        dep_id: 3,
        name: "Research",
        parent_id: 2,
        schedule: 1,
        office_ident: 1,
      },
    ],
    skipDuplicates: true,
  });
  await prisma.occupation.createMany({
    data: [
      { occupation_id: 1, description: "Chief Executive Officer", sched_id: 1 },
      { occupation_id: 2, description: "HR Manager", sched_id: 1 },
      { occupation_id: 3, description: "Developer", sched_id: 1 },
      { occupation_id: 4, description: "Accountant", sched_id: 1 },
    ],
    skipDuplicates: true,
  });
  await prisma.education.createMany({
    data: [
      { education_id: 1, description: "Bachelor" },
      { education_id: 2, description: "Master" },
      { education_id: 3, description: "Doctor" },
    ],
    skipDuplicates: true,
  });
  await prisma.graduate.createMany({
    data: [
      { graduate_id: 1, description: "MUIS" },
      { graduate_id: 2, description: "ШУТИС" },
    ],
    skipDuplicates: true,
  });
  await prisma.country.createMany({
    data: [{ country_ident: 1, description: "Mongolia", country_code: "MN" }],
    skipDuplicates: true,
  });
  await prisma.nationality.createMany({
    data: [{ nationality_id: 1, description: "Монгол" }],
    skipDuplicates: true,
  });
  await prisma.marital_status.createMany({
    data: [
      { maritalstatus_id: 1, description: "Single" },
      { maritalstatus_id: 2, description: "Married" },
    ],
    skipDuplicates: true,
  });
  await prisma.work_skill.createMany({
    data: [
      {
        wskill_id: 1,
        description: "Ерөнхий",
        cost_normal: 0,
        cost_hard: 0,
        cost_other: 0,
      },
    ],
    skipDuplicates: true,
  });
  await prisma.branch.createMany({
    data: [
      {
        branch_id: 1,
        description: "Main branch",
        status: 1,
        legal_name: "My Company",
      },
    ],
    skipDuplicates: true,
  });
  await prisma.banks.createMany({
    data: [{ bank_id: 1, description: "Khan Bank", country_ident: 1 }],
    skipDuplicates: true,
  });
  await prisma.employee.createMany({
    data: [
      {
        employee_id: 1,
        name: "Michael",
        surname: "Williams",
        fullname: "Williams Michael",
        dep_ident: 2,
        post: "CEO",
        occupation_ident: 1,
        education_ident: 2,
        email: "michael@example.com",
        workphone: "70000001",
        status: "active",
        branch_ident: 1,
        bank_ident: 1,
        schedule: 1,
        office_ident: 1,
        salary: 0,
        working_year: 5,
        workyear_sector: 5,
      },
      {
        employee_id: 2,
        name: "Emma",
        surname: "Granger",
        fullname: "Granger Emma",
        dep_ident: 3,
        post: "HR Manager",
        occupation_ident: 2,
        education_ident: 1,
        email: "emma@example.com",
        workphone: "70000002",
        status: "active",
        branch_ident: 1,
        bank_ident: 1,
        schedule: 1,
        office_ident: 1,
        salary: 0,
        working_year: 2,
        workyear_sector: 2,
      },
      {
        employee_id: 3,
        name: "Simon",
        surname: "Jones",
        fullname: "Jones Simon",
        dep_ident: 3,
        post: "Developer",
        occupation_ident: 3,
        education_ident: 1,
        email: "simon@example.com",
        workphone: "70000003",
        status: "active",
        branch_ident: 1,
        bank_ident: 1,
        schedule: 1,
        office_ident: 1,
        salary: 0,
        working_year: 1,
        workyear_sector: 1,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
