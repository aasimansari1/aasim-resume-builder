import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";

export const metadata: Metadata = {
  title: "Aasim Resume Builder | Free ATS Resume Maker",
  description:
    "Create professional resumes instantly with Aasim Resume Builder. ATS-friendly templates and easy PDF download.",
  keywords: [
    "resume builder",
    "ATS resume",
    "free resume maker",
    "professional resume",
    "PDF resume",
  ],
  openGraph: {
    title: "Aasim Resume Builder | Free ATS Resume Maker",
    description:
      "Create professional resumes instantly with Aasim Resume Builder.",
    url: "https://technobites.tech",
    siteName: "Aasim Resume Builder",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
