/*
  Warnings:

  - Added the required column `creationDay` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creationHour` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `creationDay` VARCHAR(191) NOT NULL,
    ADD COLUMN `creationHour` VARCHAR(191) NOT NULL;
