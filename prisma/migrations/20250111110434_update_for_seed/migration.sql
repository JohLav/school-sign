/*
  Warnings:

  - You are about to drop the `school` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `classId` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_classId_fkey`;

-- DropForeignKey
ALTER TABLE `Sign` DROP FOREIGN KEY `Sign_userId_fkey`;

-- DropForeignKey
ALTER TABLE User DROP FOREIGN KEY `User_schoolId_fkey`;

-- DropForeignKey
ALTER TABLE Classsection DROP FOREIGN KEY `Classsection_schoolId_fkey`;

-- AlterTable
ALTER TABLE `Lesson` MODIFY `classId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `firstname` VARCHAR(255) NOT NULL,
    MODIFY `lastname` VARCHAR(255) NOT NULL,
    MODIFY `role` ENUM('SCHOOL', 'STUDENT', 'TEACHER') NOT NULL;

-- DropTable
DROP TABLE `school`;

-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `zipcode` CHAR(5) NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    INDEX `School_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classsection` ADD CONSTRAINT `Classsection_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sign` ADD CONSTRAINT `Sign_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Classsection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Classsection` RENAME INDEX `Classsection_schoolId_fkey` TO `Classsection_schoolId_idx`;

-- RenameIndex
ALTER TABLE `Lesson` RENAME INDEX `Lesson_classId_fkey` TO `Lesson_classId_idx`;

-- RenameIndex
ALTER TABLE `Sign` RENAME INDEX `Sign_lessonId_fkey` TO `Sign_lessonId_idx`;

-- RenameIndex
ALTER TABLE `Sign` RENAME INDEX `Sign_userId_fkey` TO `Sign_userId_idx`;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User_classId_fkey` TO `User_classId_idx`;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User_schoolId_fkey` TO `User_schoolId_idx`;
