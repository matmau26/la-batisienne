import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Batisienne — Pèlerinage de doubles maléfiques",
  description:
    "Samedi 25 juillet 2026 à La Bâtie-Rolland (26160). On convoque vos pires versions. Ce soir c'est lui qui commande.",
  openGraph: {
    title: "La Batisienne — Pèlerinage de doubles maléfiques",
    description:
      "Samedi 25 juillet 2026 à La Bâtie-Rolland. Ce soir c'est lui qui commande.",
    images: ["/batisienne.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05030a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
