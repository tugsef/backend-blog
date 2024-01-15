/*
  Warnings:

  - The primary key for the `profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `bio` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_pkey",
ADD COLUMN     "bio" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");
