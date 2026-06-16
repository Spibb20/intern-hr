import Image from "next/image";
import { Card } from "@/components/ui/card";

export function EmployeeCard({ employee }: { employee: any }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex">
        <Image
          src={employee.image}
          width={140}
          height={140}
          alt={employee.name}
        />

        <div className="p-4 flex-1">
          <h3 className="font-semibold text-lg">{employee.name}</h3>

          <p className="text-sm text-muted-foreground">{employee.position}</p>

          <p className="text-sm">{employee.email}</p>

          <p className="text-sm">{employee.phone}</p>
        </div>
      </div>
    </Card>
  );
}
