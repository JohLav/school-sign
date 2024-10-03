"use client";

import { Separator } from "@/components/ui/separator";
import Logout from "@/components/logout";
import { useIsMobile } from "@/hooks/useIsMobile";
import React from "react";

export default function StudentSettings() {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="space-y-6 pl-10 pb-16 md:block">
        <div className="space-y-0.5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your account settings.
              </p>
            </div>
          </div>
        </div>
        <Separator />
        {isMobile && <Logout />}
      </div>
    </>
  );
}
