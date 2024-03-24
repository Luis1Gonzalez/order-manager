/*
  Warnings:

  - You are about to drop the column `clientPhone` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `colletDay` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `colletHour` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `creationDay` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `creationHour` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `kind` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `order` table. All the data in the column will be lost.
  - Added the required column `createdOrder` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_clientPhone_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `clientPhone`,
    DROP COLUMN `colletDay`,
    DROP COLUMN `colletHour`,
    DROP COLUMN `comment`,
    DROP COLUMN `creationDay`,
    DROP COLUMN `creationHour`,
    DROP COLUMN `kind`,
    DROP COLUMN `name`,
    DROP COLUMN `product`,
    DROP COLUMN `quantity`,
    DROP COLUMN `unit`,
    ADD COLUMN `createdOrder` JSON NOT NULL;
