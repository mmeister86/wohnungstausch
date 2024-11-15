-- AlterTable
ALTER TABLE "Wohnung" ADD COLUMN     "stellplatz" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Location" (
    "coordinates" JSONB NOT NULL,
    "wohnungId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_wohnungId_key" ON "Location"("wohnungId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_wohnungId_fkey" FOREIGN KEY ("wohnungId") REFERENCES "Wohnung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
