/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'SELLER', 'GUEST');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "RoleEnum" NOT NULL;
