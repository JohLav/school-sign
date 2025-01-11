"use client";

import { Separator } from "@/components/ui/separator";
import Logout from "@/components/logout";
import { useIsMobile } from "@/hooks/useIsMobile";

// next
import Link from "next/link";

// ui
import { Button } from "@/components/ui/button";
import React from "react";

export default function SchoolSettings() {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="px-10 pb-16">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account.</p>
        <Separator />
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <Button className="bg-purple text-seasame" variant="outline">
          <Link href="/school-dashboard/settings/profil">
            School informations
          </Link>
        </Button>
        {isMobile && <Logout />}
      </div>
    </>
  );
}
