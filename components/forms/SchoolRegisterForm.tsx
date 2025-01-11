"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { undefined, z } from "zod";
import { registerSchemaSchool } from "@/lib/schemas/registerSchemaSchool";
import { useToast } from "@/hooks/use-toast";

export default function SchoolRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    zipcode: "",
    city: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof z.infer<typeof registerSchemaSchool>, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field only if it exists
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const result = registerSchemaSchool.safeParse(formData);

    if (!result.success) {
      const validationErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        validationErrors[issue.path[0] as keyof typeof errors] = issue.message;
      });
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const data = result.data;

    const response = await fetch("/api/registerSchool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast({
        title: "Registration Successful",
        description: `${formData.name} has been registered.`,
        className: "bg-green-400",
        duration: 2000,
      });
      router.push("/school-login");
    } else {
      const errorMessage = await response.text();
      toast({
        className: "bg-red-700 text-white",
        description: errorMessage || "An unexpected error occurred.",
        duration: 2000,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Please fill out the form below to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {["name", "address", "zipcode", "city", "email", "password"].map(
            (field) => (
              <div className="grid gap-2 mb-3" key={field}>
                <Label htmlFor={field} className="capitalize">
                  {field.replace("zipcode", "Zip Code")}
                </Label>
                <Input
                  id={field}
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={`Enter ${field}`}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  aria-invalid={!!errors[field as keyof typeof errors]}
                  aria-describedby={`${field}-error`}
                />
                {errors[field as keyof typeof errors] && (
                  <p
                    id={`${field}-error`}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors[field as keyof typeof errors]}
                  </p>
                )}
              </div>
            ),
          )}
          <CardFooter className="flex justify-end mt-5 pb-0">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
