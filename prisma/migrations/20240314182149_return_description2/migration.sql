/*
  Warnings:

  - You are about to drop the column `descriptionTwo` on the `entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `entry` DROP COLUMN `descriptionTwo`,
    ADD COLUMN `description2` VARCHAR(191) NULL;
