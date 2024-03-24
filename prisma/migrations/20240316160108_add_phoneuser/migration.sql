/*
  Warnings:

  - Added the required column `clientPhone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `clientPhone` VARCHAR(191) NOT NULL;
