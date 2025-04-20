/*
  Warnings:

  - Changed the type of `status` on the `Saving` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SavingStatus" AS ENUM ('ACTIVE', 'CLOSED', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Saving" DROP COLUMN "status",
ADD COLUMN     "status" "SavingStatus" NOT NULL;
