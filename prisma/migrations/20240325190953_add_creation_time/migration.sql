/*
  Warnings:

  - Added the required column `creationTime` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Order_clientPhone_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `creationTime` VARCHAR(191) NOT NULL;
