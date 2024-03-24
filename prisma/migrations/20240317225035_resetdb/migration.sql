/*
  Warnings:

  - You are about to drop the column `statusOrder` on the `order` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `statusOrder`,
    ADD COLUMN `status` BOOLEAN NOT NULL;
