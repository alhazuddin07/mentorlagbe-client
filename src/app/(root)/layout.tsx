import { Suspense } from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Suspense fallback={<div className="h-16" />}>
                <Navbar />
            </Suspense>

            {children}

            <Footer />

        </>
    );
}