/*
  Warnings:

  - The `code` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[code]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agency` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_digit` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "agency" TEXT NOT NULL,
ADD COLUMN     "check_digit" TEXT NOT NULL,
DROP COLUMN "code",
ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_code_key" ON "Account"("code");
