import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import StyledComponentsRegistry from '@/lib/registry';
import { AuthProvider } from "@/lib/auth-context";
import { WohnungenProvider } from '@/lib/wohnungen-context';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Wohnungstauschportal",
  description: "Trennungsgeldwohnungen einfach tauschen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <WohnungenProvider>
            <Toaster />
            <Header />
            <StyledComponentsRegistry>
              {children}
            </StyledComponentsRegistry>
            <SpeedInsights />
            <Footer />
          </WohnungenProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
