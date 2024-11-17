-- CreateIndex
CREATE INDEX "Wohnung_createdAt_idx" ON "Wohnung"("createdAt");
CREATE INDEX "Wohnung_miete_idx" ON "Wohnung"("miete");
CREATE INDEX "Wohnung_zimmer_idx" ON "Wohnung"("zimmer");
CREATE INDEX "Wohnung_flaeche_idx" ON "Wohnung"("flaeche");
CREATE INDEX "Wohnung_userId_idx" ON "Wohnung"("userId");
CREATE INDEX "Wohnung_stellplatz_idx" ON "Wohnung"("stellplatz");
