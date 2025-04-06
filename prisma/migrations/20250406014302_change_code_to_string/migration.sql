-- DropIndex
DROP INDEX "Account_code_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "code" DROP DEFAULT,
ALTER COLUMN "code" SET DATA TYPE TEXT;
DROP SEQUENCE "Account_code_seq";
