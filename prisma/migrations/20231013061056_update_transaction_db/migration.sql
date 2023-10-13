/*
  Warnings:

  - You are about to drop the column `transactionId` on the `package` table. All the data in the column will be lost.
  - Added the required column `packageId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `package` DROP FOREIGN KEY `Package_transactionId_fkey`;

-- AlterTable
ALTER TABLE `package` DROP COLUMN `transactionId`;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `packageId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
