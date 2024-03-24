/*
  Warnings:

  - Added the required column `nameRegistered` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameUsing` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `nameRegistered` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameUsing` VARCHAR(191) NOT NULL;
