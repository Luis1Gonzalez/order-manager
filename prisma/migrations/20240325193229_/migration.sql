/*
  Warnings:

  - You are about to alter the column `closedTime` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `creationTime` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `closedTime` INTEGER NULL,
    MODIFY `creationTime` INTEGER NOT NULL;
