/*
  Warnings:

  - You are about to drop the column `description2` on the `entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `entry` DROP COLUMN `description2`,
    ADD COLUMN `descriptionTwo` VARCHAR(191) NULL;
