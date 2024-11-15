'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"

export default function WohnungstauschFormular() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photos, setPhotos] = useState<File[]>([])
  const [formData, setFormData] = useState({
    titel: '',
    beschreibung: '',
    strasse: '',
    hausnummer: '',
    plz: '',
    stadt: '',
    flaeche: '',
    zimmer: '',
    kaltmiete: 0,
    nebenkosten: 0,
    stromkosten: 0,
    heizkosten: 0,
    name: '',
    telefon: '',
    email: '',
    dienstgrad: '',
    stellplatz: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Bilder in Base64 konvertieren
      const imagePromises = photos.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result as string)
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      const base64Images = await Promise.all(imagePromises)

      const response = await fetch('/api/wohnungen/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          bilder: base64Images,
          flaeche: parseFloat(formData.flaeche),
          zimmer: parseInt(formData.zimmer),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`Fehler beim Speichern der Wohnung: ${JSON.stringify(errorData)}`);
      }

      // Erfolgreich gespeichert
      toast({
        variant: "success",
        title: "Wohnung erfolgreich erstellt",
        description: "Ihre Wohnung wurde erfolgreich in unserer Datenbank gespeichert.",
      })
      router.refresh() // Aktualisiere die Wohnungsliste
    } catch (error) {
      console.error('Error:', error)
      // Hier könnte man einen Fehler-State setzen und dem Benutzer anzeigen
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos(prevPhotos => [...prevPhotos, ...Array.from(event.target.files || [])])
    }
  }

  const handlePhotoDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files) {
      setPhotos(prevPhotos => [...prevPhotos, ...Array.from(event.dataTransfer.files)])
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index))
  }

  const handleMieteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(e.target.value)) {
      // Hier könnte man einen Fehler-State setzen und dem Benutzer anzeigen
    } else {
      // Hier könnte man den Fehler-State zurücksetzen
    }
  }

  const handleStellplatzChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      stellplatz: value === 'yes'
    }))
  }

  return (
    <Card className="w-full max-w-6xl mx-auto overflow-hidden  relative">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-gray-100">Wohnungstausch Anzeige erstellen</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-0 md:grid md:grid-cols-[1fr,1fr] md:gap-6 md:divide-x md:divide-gray-200">
          <div className="space-y-6 pr-6">
            <div className="space-y-2">
              <Label
                htmlFor="titel"
                className="text-gray-700 dark:text-gray-200"
              >
                Titel der Anzeige
              </Label>
              <Input
                id="titel"
                name="titel"
                value={formData.titel}
                onChange={handleInputChange}
                placeholder="z.B. Gemütliche 2-Zimmer-Wohnung in Kreuzberg"
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="beschreibung"
                className="text-gray-700 dark:text-gray-200"
              >
                Beschreibung
              </Label>
              <Textarea
                id="beschreibung"
                name="beschreibung"
                value={formData.beschreibung}
                onChange={handleInputChange}
                placeholder="Beschreiben Sie Ihre Wohnung..."
                className="min-h-[100px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label
                className="text-gray-700 dark:text-gray-200"
              >
                Adresse der Wohnung
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="strasse"
                    name="strasse"
                    value={formData.strasse}
                    onChange={handleAddressChange}
                    placeholder="Straße"
                    className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="hausnummer"
                    name="hausnummer"
                    value={formData.hausnummer}
                    onChange={handleAddressChange}
                    placeholder="Hausnummer"
                    className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Input
                    id="plz"
                    name="plz"
                    value={formData.plz}
                    onChange={handleAddressChange}
                    placeholder="PLZ"
                    className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="stadt"
                    name="stadt"
                    value={formData.stadt}
                    onChange={handleAddressChange}
                    placeholder="Stadt"
                    className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="flaeche"
                  className="text-gray-700 dark:text-gray-200"
                >
                  Größe der Wohnung (m²)
                </Label>
                <Input
                  id="flaeche"
                  name="flaeche"
                  type="number"
                  value={formData.flaeche}
                  onChange={handleInputChange}
                  placeholder="z.B. 70"
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="zimmer"
                  className="text-gray-700 dark:text-gray-200"
                >
                  Anzahl Zimmer
                </Label>
                <Input
                  id="zimmer"
                  name="zimmer"
                  type="number"
                  value={formData.zimmer}
                  onChange={handleInputChange}
                  placeholder="z.B. 2"
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-200">
                Stellplatz
              </Label>
              <RadioGroup defaultValue="no" onValueChange={handleStellplatzChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="stellplatz-yes" />
                  <Label
                    htmlFor="stellplatz-yes"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Ja
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="stellplatz-no" />
                  <Label
                    htmlFor="stellplatz-no"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Nein
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-gray-700 dark:text-gray-200">
                Mietkosten
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="kaltmiete"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Kaltmiete (€)
                  </Label>
                  <Input
                    id="kaltmiete"
                    name="kaltmiete"
                    type="number"
                    value={formData.kaltmiete}
                    onChange={handleMieteChange}
                    placeholder="z.B. 500"
                    className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="nebenkosten"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Nebenkosten (€)
                  </Label>
                  <Input
                    id="nebenkosten"
                    name="nebenkosten"
                    type="number"
                    value={formData.nebenkosten}
                    onChange={handleMieteChange}
                    placeholder="z.B. 150"
                    className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="stromkosten"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Stromkosten (€)
                  </Label>
                  <Input
                    id="stromkosten"
                    name="stromkosten"
                    type="number"
                    value={formData.stromkosten}
                    onChange={handleMieteChange}
                    placeholder="z.B. 50"
                    className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="heizkosten"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Heizkosten (€)
                  </Label>
                  <Input
                    id="heizkosten"
                    name="heizkosten"
                    type="number"
                    value={formData.heizkosten}
                    onChange={handleMieteChange}
                    placeholder="z.B. 80"
                    className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="pt-2">
                <Label className="text-gray-700 dark:text-gray-200 font-extrabold">
                  Gesamtmiete: {(formData.kaltmiete + formData.nebenkosten + formData.stromkosten + formData.heizkosten).toFixed(2)} €
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-6 pl-6">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-200">
                Fotos hochladen
              </Label>
              <div
                className="border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-12 text-center cursor-pointer hover:border-green-400 dark:hover:border-green-600 transition-colors bg-white dark:bg-gray-800"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handlePhotoDrop}
              >
                <Input
                  id="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Label htmlFor="photos" className="cursor-pointer">
                  <Upload className="mx-auto h-24 w-24 text-gray-400" />
                  <p className="mt-4 text-lg text-gray-500">
                    Ziehen Sie Fotos hierher oder klicken Sie zum Auswählen
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Unterstützte Formate: JPG, PNG, GIF
                  </p>
                </Label>
              </div>
              {photos.length > 0 && (
                <div className="mt-4 space-y-2">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-green-100 dark:bg-green-900 p-2 rounded"
                    >
                      <span className="text-sm truncate">{photo.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePhoto(index)}
                        aria-label={`Entferne Foto ${photo.name}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-gray-700 dark:text-gray-200 font-extrabold">
                Kontaktdaten
              </Label>
              <div className="space-y-2">
                <Label
                  htmlFor="dienstgrad"
                  className="text-gray-700 dark:text-gray-200"
                >
                  Dienstgrad
                </Label>
                <Select
                  name="dienstgrad"
                  value={formData.dienstgrad}
                  onValueChange={(value) => handleSelectChange(value, 'dienstgrad')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie Ihren Dienstgrad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gefreiter">Gefreiter</SelectItem>
                    <SelectItem value="obergefreiter">Obergefreiter</SelectItem>
                    <SelectItem value="hauptgefreiter">
                      Hauptgefreiter
                    </SelectItem>
                    <SelectItem value="stabsgefreiter">
                      Stabsgefreiter
                    </SelectItem>
                    <SelectItem value="oberstabsgefreiter">
                      Oberstabsgefreiter
                    </SelectItem>
                    <SelectItem value="korporal">Korporal</SelectItem>
                    <SelectItem value="stabskorporal">Stabskorporal</SelectItem>
                    <SelectItem value="unteroffizier">Unteroffizier</SelectItem>
                    <SelectItem value="stabsunteroffizier">
                      Stabsunteroffizier
                    </SelectItem>
                    <SelectItem value="feldwebel">Feldwebel</SelectItem>
                    <SelectItem value="oberfeldwebel">Oberfeldwebel</SelectItem>
                    <SelectItem value="hauptfeldwebel">
                      Hauptfeldwebel
                    </SelectItem>
                    <SelectItem value="stabsfeldwebel">
                      Stabsfeldwebel
                    </SelectItem>
                    <SelectItem value="oberstabsfeldwebel">
                      Oberstabsfeldwebel
                    </SelectItem>
                    <SelectItem value="leutnant">Leutnant</SelectItem>
                    <SelectItem value="oberleutnant">Oberleutnant</SelectItem>
                    <SelectItem value="hauptmann">Hauptmann</SelectItem>
                    <SelectItem value="major">Major</SelectItem>
                    <SelectItem value="oberstleutnant">
                      Oberstleutnant
                    </SelectItem>
                    <SelectItem value="oberst">Oberst</SelectItem>
                    <SelectItem value="brigadegeneral">
                      Brigadegeneral
                    </SelectItem>
                    <SelectItem value="generalmajor">Generalmajor</SelectItem>
                    <SelectItem value="generalleutnant">
                      Generalleutnant
                    </SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-gray-700 dark:text-gray-200"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Vor- und Nachname"
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="telefon"
                  className="text-gray-700 dark:text-gray-200"
                >
                  Telefonnummer
                </Label>
                <Input
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="z.B. 0123 45678900"
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-200"
                >
                  E-Mail-Adresse
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="ihre.email@example.com"
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="space-y-4"></div>

            <Button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wird gespeichert...' : 'Anzeige erstellen'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
