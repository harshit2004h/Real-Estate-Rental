/*
  Warnings:

  - You are about to drop the column `PropertyId` on the `PaymentHistory` table. All the data in the column will be lost.
  - Added the required column `propertyId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_PropertyId_fkey";

-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "PropertyId",
ADD COLUMN     "propertyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
