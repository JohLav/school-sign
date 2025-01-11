"use client";

import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ModifyIcon } from "@/components/icons/ModifyIcon";

export default function SchoolDetails() {
  const [school, setSchool] = useState<any | null>(null);
  const [schoolId, setSchoolId] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(school);

  useEffect(() => {
    const fetchSchoolId = async () => {
      try {
        const response = await fetch("/api/getClassIdByToken");
        if (response.ok) {
          const data = await response.json();

          setSchoolId(data.user.schoolId);
        } else {
          console.error("Erreur lors de la récupération du classId");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du classId", error);
      }
    };

    fetchSchoolId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/school`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data, "DATA");

          setSchool(data || null);
          setLoading(false);
        } else {
          const errorData = await res.json();
          setError(
            errorData.error || "An error occurred while fetching the student",
          );
          setLoading(false);
        }
      } catch (err) {
        console.error("Request Error:", err);
        setError("An unexpected error occurred. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolId]);

  return (
      <>
        <div className="px-10 pb-16">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account.</p>
          <Separator/>
        </div>
        <div className="flex flex-col items-center justify-center  gap-6 mt-10">
          {error && <p className="text-red-500">{error}</p>}

          {loading ? (
              <p className="h-full w-full flex items-center justify-center">
                Loading...
              </p>
          ) : (
              <>
                {school ? (
                    <div className="sm:w-full md:w-auto">

                      <Card className="relative m-10">
                        <CardHeader>
                          <CardTitle>School informations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="flex mb-2">
                            Establishment: {school.name}
                          </p>
                          <p className="flex mb-2">
                            Address: {school.address}
                          </p>
                          <p className="flex mb-2">
                            Zipcode: {school.zipcode}
                          </p>
                          <p className="flex mb-2">
                            City: {school.city}
                          </p>
                          <Link
                              className="absolute right-0 top-0 p-3"
                              href={`/school-dashboard/settings/profil/update`}
                          >
                            <button>
                              <ModifyIcon/>
                            </button>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                ) : (
                    <p className="h-full w-full flex items-center justify-center">
                      No school found with this ID.
                    </p>
                )}
              </>
          )}
        </div>
      </>
  );
}
