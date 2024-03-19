/*
  Warnings:

  - You are about to drop the column `idAccount` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_idAccount_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idAccount";
