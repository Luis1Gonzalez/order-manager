-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_clientPhone_fkey` FOREIGN KEY (`clientPhone`) REFERENCES `OurClient`(`phone`) ON DELETE RESTRICT ON UPDATE CASCADE;
