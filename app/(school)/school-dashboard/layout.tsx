import "../../globals.css";
import React from "react";
import { ClassProvider } from "@/components/context/ClassContext";
import SchoolNavBar from "@/components/navigation/SchoolNavBar";
import { Toaster } from "@/components/ui/toaster";
import RealTimeClockWithDate from "@/components/calendar/CurrentTime";

export default function SchoolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sm:flex bg-seasame h-screen ">
      <div className="absolute top-0 right-0 sm:mt-10 sm:mr-2 mr-10">
        <RealTimeClockWithDate />
      </div>
      <ClassProvider>
        <nav>
          <SchoolNavBar />
        </nav>
        <main className="w-full scroll py-8 md:pr-10">{children}</main>
        <Toaster />
      </ClassProvider>
    </div>
  );
}
