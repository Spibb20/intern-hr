import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.employeeTag.deleteMany();
  await prisma.department.updateMany({ data: { managerId: null } });
  await prisma.employee.deleteMany();
  await prisma.departureReason.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.workLocation.deleteMany();
  await prisma.employeeType.deleteMany();
  await prisma.jobPosition.deleteMany();
  await prisma.department.deleteMany();

  await prisma.department.createMany({
    data: [
      { id: "dep_admin", name: "Administration", color: "#22d3ee" },
      { id: "dep_mgmt", name: "Management", color: "#d946a6" },
      { id: "dep_rnd", name: "Research & Development", color: "#34d399" },
    ],
  });

  await prisma.jobPosition.createMany({
    data: [
      { id: "job_consultant", name: "Consultant", departmentId: "dep_rnd" },
      {
        id: "job_ceo",
        name: "Chief Executive Officer",
        departmentId: "dep_mgmt",
      },
      { id: "job_dev", name: "Experienced Developer", departmentId: "dep_rnd" },
      { id: "job_sales", name: "Sales Manager", departmentId: "dep_admin" },
    ],
  });

  await prisma.employeeType.createMany({
    data: [
      { id: "et_employee", name: "Employee" },
      { id: "et_consultant", name: "Consultant" },
      { id: "et_contractor", name: "Contractor" },
      { id: "et_intern", name: "Intern" },
    ],
  });

  await prisma.workLocation.createMany({
    data: [
      {
        id: "wl_office",
        name: "Main Office",
        address: "250 Executive Park Blvd",
        locationType: "office",
      },
      { id: "wl_home", name: "Home", locationType: "home" },
    ],
  });

  await prisma.tag.createMany({
    data: [
      { id: "tag_consultant", name: "Consultant", color: "#0d9488" },
      { id: "tag_employee", name: "Employee", color: "#b45309" },
      { id: "tag_demo", name: "Demo", color: "#7c3aed" },
    ],
  });

  await prisma.departureReason.createMany({
    data: [
      { id: "dr_fired", name: "Fired" },
      { id: "dr_resigned", name: "Resigned" },
      { id: "dr_retired", name: "Retired" },
    ],
  });

  const employees = [
    {
      id: "emp_emma",
      name: "Emma Granger",
      workEmail: "granger@mycompany.example.com",
      workPhone: "(555)-768-6230",
      workMobile: "(555)-768-6231",
      avatarUrl: "/employees/emma.png",
      jobPositionId: "job_consultant",
      jobTitle: "Consultant",
      departmentId: "dep_rnd",
      employeeTypeId: "et_consultant",
      workLocationId: "wl_office",
      company: "My Company",
      gender: "female",
      monthlyHours: 160,
      kanbanState: "normal",
    },
    {
      id: "emp_michael",
      name: "Michael Williams",
      workEmail: "williams@mycompany.example.com",
      workPhone: "(555)-768-6230",
      workMobile: "(555)-768-6232",
      avatarUrl: "/employees/michael.png",
      jobPositionId: "job_ceo",
      jobTitle: "Chief Executive Officer",
      departmentId: "dep_mgmt",
      employeeTypeId: "et_employee",
      workLocationId: "wl_office",
      company: "My Company",
      gender: "male",
      maritalStatus: "married",
      monthlyHours: 160,
      kanbanState: "done",
    },
    {
      id: "emp_simon",
      name: "Simon Jones",
      workEmail: "jones@mycompany.example.com",
      workPhone: "(555)-768-6230",
      workMobile: "(555)-768-6233",
      avatarUrl: "/employees/simon.png",
      jobPositionId: "job_dev",
      jobTitle: "Experienced Developer",
      departmentId: "dep_rnd",
      managerId: "emp_michael",
      employeeTypeId: "et_employee",
      workLocationId: "wl_office",
      company: "My Company",
      gender: "male",
      maritalStatus: "single",
      monthlyHours: 160,
      kanbanState: "normal",
    },
    {
      id: "emp_admin1",
      name: "Olivia Brown",
      workEmail: "brown@mycompany.example.com",
      workPhone: "(555)-768-6240",
      jobPositionId: "job_sales",
      jobTitle: "Sales Manager",
      departmentId: "dep_admin",
      employeeTypeId: "et_employee",
      workLocationId: "wl_office",
      company: "My Company",
      gender: "female",
      monthlyHours: 160,
      kanbanState: "normal",
    },
  ] as const;

  for (const employee of employees) {
    await prisma.employee.create({ data: employee });
  }

  await prisma.department.update({
    where: { id: "dep_mgmt" },
    data: { managerId: "emp_michael" },
  });

  await prisma.employeeTag.createMany({
    data: [
      { employeeId: "emp_emma", tagId: "tag_consultant" },
      { employeeId: "emp_emma", tagId: "tag_demo" },
      { employeeId: "emp_michael", tagId: "tag_employee" },
      { employeeId: "emp_michael", tagId: "tag_demo" },
      { employeeId: "emp_simon", tagId: "tag_employee" },
      { employeeId: "emp_simon", tagId: "tag_demo" },
      { employeeId: "emp_admin1", tagId: "tag_employee" },
    ],
  });
}

main()
  .finally(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
