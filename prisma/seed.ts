import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Schools
  const school1 = await prisma.school.create({
    data: {
      name: "Springfield Elementary",
      address: "742 Evergreen Terrace",
      zipcode: "12345",
      city: "Springfield",
      users: {
        create: [
          {
            firstname: "Alice",
            lastname: "Johnson",
            email: "alice.johnson@springfield.edu",
            password: "Securepassword@1",
            role: Role.SCHOOL,
          },
          // {
          //   firstname: "Ashley",
          //   lastname: "Burlington",
          //   email: "ashley.burlington@springfield.edu",
          //   password: "securepassword2",
          //   role: Role.TEACHER,
          // }
        ],
      },
    },
  });

  const school2 = await prisma.school.create({
    data: {
      name: "Shelbyville High",
      address: "123 Oak Lane",
      zipcode: "54321",
      city: "Shelbyville",
    },
  });

  const school3 = await prisma.school.create({
    data: {
      name: "Green Valley High",
      address: "123 Main St",
      zipcode: "12345",
      city: "Sample City",
      users: {
        create: [
          {
            firstname: "Bob",
            lastname: "Smith",
            email: "bob.smith@greenvalley.edu",
            password: "12345JoJo%",
            role: Role.SCHOOL,
          },
        ],
      },
    },
  });

  const school4 = await prisma.school.create({
    data: {
      name: "Sunset Academy",
      address: "456 Elm St",
      zipcode: "67890",
      city: "Oceanview",
      users: {
        create: [
          {
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@sunsetacademy.com",
            password: "Password123!",
            role: Role.SCHOOL,
          },
        ],
      },
    },
  });

  const school4 = await prisma.school.create({
    data: {
      name: "Lakeside High School",
      address: "789 Lakeview Rd",
      zipcode: "54321",
      city: "Riverside",
      users: {
        create: [
          {
            firstname: "Jane",
            lastname: "Doe",
            email: "jane.doe@lakeside.edu",
            password: "SecurePass123%",
            role: Role.SCHOOL,
          },
        ],
      },
    },
  });

  // Create Classsections
  const class1 = await prisma.classsection.create({
    data: {
      name: "5th Grade",
      schoolId: school1.id,
    },
  });

  const class2 = await prisma.classsection.create({
    data: {
      name: "8th Grade",
      schoolId: school2.id,
    },
  });

  const class3 = await prisma.classsection.create({
    data: {
      name: "9th Grade",
      schoolId: school3.id,
    },
  });

  const class4 = await prisma.classsection.create({
    data: {
      name: "10th Grade",
      schoolId: school4.id,
    },
  });

  // Create Users
  const teacher1 = await prisma.user.create({
    data: {
      firstname: "Edna",
      lastname: "Krabappel",
      email: "edna.krabappel@school1.com",
      password: "Securepassword$0",
      role: Role.TEACHER,
      schoolId: school1.id,
      classId: class1.id,
    },
  });

  const student1 = await prisma.user.create({
    data: {
      firstname: "Bart",
      lastname: "Simpson",
      email: "bart.simpson@school1.com",
      password: "Securepassword!2",
      role: Role.STUDENT,
      schoolId: school1.id,
      classId: class1.id,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      firstname: "Lisa",
      lastname: "Simpson",
      email: "lisa.simpson@school1.com",
      password: "Securepassword%3",
      role: Role.STUDENT,
      schoolId: school1.id,
      classId: class1.id,
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      firstname: "Seymour",
      lastname: "Skinner",
      email: "seymour.skinner@school2.com",
      password: "Securepassword*4",
      role: Role.TEACHER,
      schoolId: school2.id,
      classId: class2.id,
    },
  });

  // Create Lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      name: "Math Basics",
      dateStart: new Date("2025-01-15T08:00:00.000Z"),
      dateEnd: new Date("2025-01-15T09:30:00.000Z"),
      classId: class1.id,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      name: "History Overview",
      dateStart: new Date("2025-01-16T10:00:00.000Z"),
      dateEnd: new Date("2025-01-16T11:30:00.000Z"),
      classId: class2.id,
    },
  });

  // Create Signs
  await prisma.sign.create({
    data: {
      hashedSign: "hashed_signature_1",
      date: new Date("2025-01-15T09:00:00.000Z"),
      userId: student1.id,
      lessonId: lesson1.id,
    },
  });

  await prisma.sign.create({
    data: {
      hashedSign: "hashed_signature_2",
      date: new Date("2025-01-16T11:00:00.000Z"),
      userId: student2.id,
      lessonId: lesson2.id,
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient, Role } from "@prisma/client";
//
// const prisma = new PrismaClient();

// async function main() {
//   // Seed Schools
//   const school1 = await prisma.school.create({
//     data: {
//       name: "Green Valley High",
//       address: "123 Main St",
//       zipcode: "12345",
//       city: "Sample City",
//       users: {
//         create: [
//           {
//             firstname: "Alice",
//             lastname: "Johnson",
//             email: "alice.johnson@greenvalley.edu",
//             password: "securepassword1",
//             role: Role.SCHOOL,
//           },
//           {
//             firstname: "Ashley",
//             lastname: "Burlington",
//             email: "ashley.burlington@greenvalley.edu",
//             password: "securepassword2",
//             role: Role.TEACHER,
//           },
//           {
//             firstname: "Bob",
//             lastname: "Smith",
//             email: "bob.smith@greenvalley.edu",
//             password: "securepassword3",
//             role: Role.STUDENT,
//           },
//         ],
//       },
//       classes: {
//         create: [
//           {
//             name: "Class A",
//             users: {
//               // create: [
//               //     {
//               //         firstname: 'Charlie',
//               //         lastname: 'Brown',
//               //         email: 'charlie.brown@classa.greenvalley.edu',
//               //         password: 'securepassword3',
//               //         role: 'STUDENT',
//               //     },
//               // ],
//             },
//           },
//         ],
//       },
//     },
//   });
//
//   const school2 = await prisma.school.create({
//     data: {
//       name: "Blue Mountain Academy",
//       address: "456 Another St",
//       zipcode: "67890",
//       city: "Another City",
//     },
//   });
//
//   // Seed Lessons
//   const lesson1 = await prisma.lesson.create({
//     data: {
//       name: "Math Lesson 1",
//       dateStart: new Date("2025-01-01T10:00:00Z"),
//       dateEnd: new Date("2025-01-01T11:00:00Z"),
//       class: {
//         connect: {
//           id: school1.classes[0]?.id, // Connects to 'Class A' from the first school
//         },
//       },
//     },
//   });
//
//   const lesson2 = await prisma.lesson.create({
//     data: {
//       name: "Science Lesson 1",
//       dateStart: new Date("2025-01-02T10:00:00Z"),
//       dateEnd: new Date("2025-01-02T11:00:00Z"),
//     },
//   });
//
//   // Seed Signs
//   const sign1 = await prisma.sign.create({
//     data: {
//       hashedSign: "hashed-signature-1",
//       date: new Date(),
//       user: {
//         connect: {
//           email: "alice.johnson@greenvalley.edu", // Connect to Alice
//         },
//       },
//       lesson: {
//         connect: {
//           id: lesson1.id,
//         },
//       },
//     },
//   });
//
//   const sign2 = await prisma.sign.create({
//     data: {
//       hashedSign: "hashed-signature-2",
//       date: new Date(),
//       user: {
//         connect: {
//           email: "bob.smith@greenvalley.edu", // Connect to Bob
//         },
//       },
//       lesson: {
//         connect: {
//           id: lesson2.id,
//         },
//       },
//     },
//   });
//
//   console.log("Seeding completed successfully!");
// }
//
// main()
//   .catch((e) => {
//     console.error("Error while seeding:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });