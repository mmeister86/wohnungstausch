-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wohnung" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "titel" TEXT NOT NULL,
    "beschreibung" TEXT,
    "strasse" TEXT NOT NULL,
    "hausnummer" TEXT NOT NULL,
    "plz" TEXT NOT NULL,
    "stadt" TEXT NOT NULL,
    "flaeche" DOUBLE PRECISION NOT NULL,
    "zimmer" INTEGER NOT NULL,
    "miete" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "bilder" TEXT[],

    CONSTRAINT "Wohnung_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wohnung" ADD CONSTRAINT "Wohnung_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
