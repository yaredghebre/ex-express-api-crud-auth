-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `userId` INTEGER NULL,
    MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
