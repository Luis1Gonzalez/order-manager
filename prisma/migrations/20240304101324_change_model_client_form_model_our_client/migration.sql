/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_clientPhone_fkey`;

-- DropTable
DROP TABLE `client`;

-- CreateTable
CREATE TABLE `OurClient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` INTEGER NOT NULL,

    UNIQUE INDEX `OurClient_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_clientPhone_fkey` FOREIGN KEY (`clientPhone`) REFERENCES `OurClient`(`phone`) ON DELETE RESTRICT ON UPDATE CASCADE;
