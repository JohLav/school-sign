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

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('SCHOOL', 'STUDENT', 'TEACHER') NOT NULL,
    `schoolId` INTEGER NOT NULL,
    `classId` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_schoolId_idx`(`schoolId`),
    INDEX `User_classId_idx`(`classId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classsection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `schoolId` INTEGER NOT NULL,

    INDEX `Classsection_schoolId_idx`(`schoolId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hashedSign` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `lessonId` INTEGER NULL,

    INDEX `Sign_userId_idx`(`userId`),
    INDEX `Sign_lessonId_idx`(`lessonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lesson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `dateStart` DATETIME(3) NOT NULL,
    `dateEnd` DATETIME(3) NOT NULL,
    `classId` INTEGER NOT NULL,

    INDEX `Lesson_classId_idx`(`classId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Classsection`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classsection` ADD CONSTRAINT `Classsection_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sign` ADD CONSTRAINT `Sign_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sign` ADD CONSTRAINT `Sign_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Classsection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

