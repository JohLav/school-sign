import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Role } from "@prisma/client";
import { registerSchemaSchool } from "@/lib/schemas/registerSchemaSchool";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      // Validate input
      const data = registerSchemaSchool.parse(req.body);
      console.log("Parsed Data:", data);
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Find or create school
      const school = data.schoolId
        ? await prisma.school.findUnique({ where: { id: data.schoolId } })
        : await prisma.school.create({
            data: {
              name: data.name,
              address: data.address,
              zipcode: data.zipcode,
              city: data.city,
            },
          });

      if (!school) {
        return res.status(400).json({ error: "School not found or created" });
      }

      const userExists = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (userExists) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          school: { connect: { id: school.id } },
          role: Role.SCHOOL,
        },
      });

      res.status(201).json({ user });
    } catch (error: any) {
      console.error("API Error:", error);
      if (error.name === "ZodError") {
        res
          .status(400)
          .json({ error: "Validation failed", details: error.errors });
      } else if (error.code === "P2002") {
        res.status(400).json({ error: "Email already in use" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
