'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from 'lucide-react'

interface WohnungstauschFormularProps {
  onClose?: () => void; // Optional, falls wir den Close-Button anzeigen wollen
}

export default function WohnungstauschFormular({ onClose }: WohnungstauschFormularProps) {
  const [photos, setPhotos] = useState<File[]>([])
  const [miete, setMiete] = useState({
    kaltmiete: 0,
    nebenkosten: 0,
    stromkosten: 0,
    heizkosten: 0
  })
  const [gesamtmiete, setGesamtmiete] = useState(0)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [address, setAddress] = useState('')
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  useEffect(() => {
    const summe = Object.values(miete).reduce((acc, curr) => acc + curr, 0)
    setGesamtmiete(summe)
  }, [miete])

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
    setMiete(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(e.target.value)) {
      setEmailError('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
    } else {
      setEmailError('')
    }
  }

  return (
          {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 mt-5 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Schließen"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
      )}
    <Card className="w-full max-w-6xl mx-auto overflow-hidden bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 mt-5 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Schließen"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
      )}
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-gray-100">Wohnungstausch Anzeige erstellen</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6 md:space-y-0 md:grid md:grid-cols-[1fr,1fr] md:gap-6 md:divide-x md:divide-gray-200">
          <div className="space-y-6 pr-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700 dark:text-gray-200">Titel der Anzeige</Label>
              <Input id="title" placeholder="z.B. Gemütliche 2-Zimmer-Wohnung in Kreuzberg" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700 dark:text-gray-200">Adresse der Wohnung</Label>
              <Input 
                id="address" 
                placeholder="Straße, Hausnummer, PLZ, Stadt" 
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" 
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 dark:text-gray-200">Beschreibung</Label>
              <Textarea id="description" placeholder="Beschreiben Sie Ihre Wohnung..." className="min-h-[100px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size" className="text-gray-700 dark:text-gray-200">Größe der Wohnung (m²)</Label>
                <Input id="size" type="number" placeholder="z.B. 70" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="floor" className="text-gray-700 dark:text-gray-200">Etage</Label>
                <Input id="floor" type="number" placeholder="z.B. 3" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-200">Stellplatz</Label>
              <RadioGroup defaultValue="no">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="stellplatz-yes" />
                  <Label htmlFor="stellplatz-yes" className="text-gray-700 dark:text-gray-200">Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="stellplatz-no" />
                  <Label htmlFor="stellplatz-no" className="text-gray-700 dark:text-gray-200">Nein</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <Label className="text-gray-700 dark:text-gray-200">Mietkosten</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kaltmiete" className="text-gray-700 dark:text-gray-200">Kaltmiete (€)</Label>
                  <Input id="kaltmiete" name="kaltmiete" type="number" placeholder="z.B. 500" onChange={handleMieteChange} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nebenkosten" className="text-gray-700 dark:text-gray-200">Nebenkosten (€)</Label>
                  <Input id="nebenkosten" name="nebenkosten" type="number" placeholder="z.B. 150" onChange={handleMieteChange} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stromkosten" className="text-gray-700 dark:text-gray-200">Stromkosten (€)</Label>
                  <Input id="stromkosten" name="stromkosten" type="number" placeholder="z.B. 50" onChange={handleMieteChange} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heizkosten" className="text-gray-700 dark:text-gray-200">Heizkosten (€)</Label>
                  <Input id="heizkosten" name="heizkosten" type="number" placeholder="z.B. 80" onChange={handleMieteChange} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
                </div>
              </div>
              <div className="pt-2">
                <Label className="text-gray-700 dark:text-gray-200 font-extrabold">Gesamtmiete: {gesamtmiete.toFixed(2)} €</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 pl-6">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-200">Fotos hochladen</Label>
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
                  <p className="mt-4 text-lg text-gray-500">Ziehen Sie Fotos hierher oder klicken Sie zum Auswählen</p>
                  <p className="mt-2 text-sm text-gray-400">Unterstützte Formate: JPG, PNG, GIF</p>
                </Label>
              </div>
              {photos.length > 0 && (
                <div className="mt-4 space-y-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="flex items-center justify-between bg-green-100 dark:bg-green-900 p-2 rounded">
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
              <Label className="text-gray-700 dark:text-gray-200 font-extrabold">Kontaktdaten</Label>
              <div className="space-y-2">
                <Label htmlFor="dienstgrad" className="text-gray-700 dark:text-gray-200">Dienstgrad</Label>
                <Select>
                  <SelectTrigger id="dienstgrad" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                    <SelectValue placeholder="Wählen Sie Ihren Dienstgrad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gefreiter">Gefreiter</SelectItem>
                    <SelectItem value="obergefreiter">Obergefreiter</SelectItem>
                    <SelectItem value="hauptgefreiter">Hauptgefreiter</SelectItem>
                    <SelectItem value="stabsgefreiter">Stabsgefreiter</SelectItem>
                    <SelectItem value="oberstabsgefreiter">Oberstabsgefreiter</SelectItem>
                    <SelectItem value="korporal">Korporal</SelectItem>
                    <SelectItem value="stabskorporal">Stabskorporal</SelectItem>
                    <SelectItem value="unteroffizier">Unteroffizier</SelectItem>
                    <SelectItem value="stabsunteroffizier">Stabsunteroffizier</SelectItem>
                    <SelectItem value="feldwebel">Feldwebel</SelectItem>
                    <SelectItem value="oberfeldwebel">Oberfeldwebel</SelectItem>
                    <SelectItem value="hauptfeldwebel">Hauptfeldwebel</SelectItem>
                    <SelectItem value="stabsfeldwebel">Stabsfeldwebel</SelectItem>
                    <SelectItem value="oberstabsfeldwebel">Oberstabsfeldwebel</SelectItem>
                    <SelectItem value="leutnant">Leutnant</SelectItem>
                    <SelectItem value="oberleutnant">Oberleutnant</SelectItem>
                    <SelectItem value="hauptmann">Hauptmann</SelectItem>
                    <SelectItem value="major">Major</SelectItem>
                    <SelectItem value="oberstleutnant">Oberstleutnant</SelectItem>
                    <SelectItem value="oberst">Oberst</SelectItem>
                    <SelectItem value="brigadegeneral">Brigadegeneral</SelectItem>
                    <SelectItem value="generalmajor">Generalmajor</SelectItem>
                    <SelectItem value="generalleutnant">Generalleutnant</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">Name</Label>
                <Input id="name" placeholder="Vor- und Nachname" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefon" className="text-gray-700 dark:text-gray-200">Telefonnummer</Label>
                <Input id="telefon" type="tel" placeholder="z.B. 0123 45678900" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">E-Mail-Adresse</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="ihre.email@example.com" 
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
                {emailError && <p className="text-sm text-red-500 dark:text-red-400">{emailError}</p>}
              </div>
            </div>

            <div className="space-y-4">
            </div>

            <Button className="w-full mt-6 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105">
              Anzeige erstellen
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
