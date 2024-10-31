    import { Inter } from "next/font/google"
import { NextUIProvider } from "@nextui-org/react"
import "./globals.css" // pastikan ini adalah path yang benar ke CSS global kamu

const inter = Inter({
    subsets: ["latin"],
})

export default function RootLayout({ children }) {
    return (
        <html lang="en" className='dark'>
            <body className={`${inter.className} bg-[#090909] text-white`}>
                <NextUIProvider>{children}</NextUIProvider>
            </body>
        </html>
    )
}
