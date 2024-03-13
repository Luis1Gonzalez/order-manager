-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_clientPhone_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `clientPhone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ourclient` MODIFY `phone` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_clientPhone_fkey` FOREIGN KEY (`clientPhone`) REFERENCES `OurClient`(`phone`) ON DELETE RESTRICT ON UPDATE CASCADE;
