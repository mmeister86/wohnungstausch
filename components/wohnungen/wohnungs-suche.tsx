"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPin, Save } from "lucide-react"

export default function Suche() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="w-full">
          <Select>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 h-10">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <SelectValue placeholder="Dienstort" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="berlin">Berlin</SelectItem>
              <SelectItem value="schwielowsee">Schwielowsee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full flex gap-2">
          <Select>
            <SelectTrigger className="w-[130px] bg-white dark:bg-gray-800 h-10">
              <SelectValue placeholder="Kaltmiete" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kaltmiete">Kaltmiete</SelectItem>
              <SelectItem value="warmmiete">Warmmiete</SelectItem>
            </SelectContent>
          </Select>
          <input
            type="number"
            placeholder="Max. €"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="w-full">
          <Select>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 h-10">
              <SelectValue placeholder="Wohnfläche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">ab 30m²</SelectItem>
              <SelectItem value="50">ab 50m²</SelectItem>
              <SelectItem value="70">ab 70m²</SelectItem>
              <SelectItem value="90">ab 90m²</SelectItem>
              <SelectItem value="120">ab 120m²</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Select>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 h-10">
              <SelectValue placeholder="Zimmer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Zimmer</SelectItem>
              <SelectItem value="2">2 Zimmer</SelectItem>
              <SelectItem value="3">3 Zimmer</SelectItem>
              <SelectItem value="4">4+ Zimmer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Filtern
        </Button>
      </div>
    </div>
  )
}
