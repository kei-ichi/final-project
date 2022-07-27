-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `strength_1` VARCHAR(191) NOT NULL,
    `strength_2` VARCHAR(191) NOT NULL,
    `strength_3` VARCHAR(191) NOT NULL,
    `strength_4` VARCHAR(191) NOT NULL,
    `strength_5` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
