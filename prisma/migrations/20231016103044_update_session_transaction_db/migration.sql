/*
  Warnings:

  - You are about to alter the column `amountTotal` on the `package` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `transactionId` on the `session` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `amount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `status` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_transactionId_fkey`;

-- AlterTable
ALTER TABLE `package` MODIFY `amountTotal` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `transactionId`,
    MODIFY `amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `amount` INTEGER NOT NULL,
    MODIFY `status` ENUM('PENDING', 'APPROVED') NOT NULL DEFAULT 'PENDING';
