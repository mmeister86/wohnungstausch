import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const wohnungen = [
    {
      titel: "Moderne 2-Zimmer-Wohnung mit Balkon",
      beschreibung: "Helle und moderne Wohnung in ruhiger Lage mit großem Balkon und neuer Einbauküche.",
      strasse: "Musterstraße",
      hausnummer: "12",
      plz: "12345",
      stadt: "Berlin",
      flaeche: 65.5,
      zimmer: 2,
      miete: 850.00,
      bilder: ["/wohnungen/wohnung1.jpg"],
      userId: "user1"
    },
    {
      titel: "Geräumige 3-Zimmer-Altbauwohnung",
      beschreibung: "Charmante Altbauwohnung mit hohen Decken und Parkettboden im beliebten Kiez.",
      strasse: "Beispielweg",
      hausnummer: "45",
      plz: "12347",
      stadt: "Berlin",
      flaeche: 85.0,
      zimmer: 3,
      miete: 1200.00,
      bilder: ["/wohnungen/wohnung2.jpg"],
      userId: "user2"
    },
    {
      titel: "Moderne 1-Zimmer-Wohnung",
      beschreibung: "Perfekt geschnittene Einzimmerwohnung mit moderner Ausstattung und guter Anbindung.",
      strasse: "Teststraße",
      hausnummer: "78",
      plz: "12349",
      stadt: "Berlin",
      flaeche: 40.0,
      zimmer: 1,
      miete: 650.00,
      bilder: ["/wohnungen/wohnung3.jpg"],
      userId: "user3"
    }
  ]

  for (const wohnung of wohnungen) {
    await prisma.wohnung.create({
      data: wohnung
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })