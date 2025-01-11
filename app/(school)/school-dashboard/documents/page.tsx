import AttendanceSheet from "@/components/docs/AttendanceSheet";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Docs() {
  return (
    <>
      <div className="pl-10 md:block">
        <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">Generate an attendance sheet.</p>
        <Separator />
        <div className="flex flex-col items-center justify-center gap-6 mt-16">
          <AttendanceSheet />
        </div>
      </div>
    </>
  );
}
