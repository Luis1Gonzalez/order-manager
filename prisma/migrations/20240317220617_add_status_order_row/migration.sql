/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - Added the required column `statusOrder` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `status`,
    ADD COLUMN `statusOrder` BOOLEAN NOT NULL;
