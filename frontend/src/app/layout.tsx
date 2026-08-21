import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SkipLink } from "@/components/layout/skip-link";
import { getMessagesForRequest } from "@/lib/i18n";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Single metadataBase shared by the dev portfolio (/) and the soporte site (/support)
export const metadata: Metadata = {
  metadataBase: new URL("https://diegosilva.dev"),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, messages, route } = await getMessagesForRequest();
  // Enable next-intl Server Component APIs (getTranslations, etc.)
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-portfolio={route}
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-[family-name:var(--font-inter)] antialiased flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SkipLink />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
