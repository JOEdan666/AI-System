// // @ts-nocheck
// import type { Metadata } from 'next'
// import './globals.css'
// import { Inter } from 'next/font/google'
// import { Toaster } from 'react-hot-toast'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: '自学系统',
//   description: '以自学为基础，以生产为导向',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="zh-CN">
//       <body className={`${inter.className} min-h-screen bg-astronaut`}>
//         {children}
//         <Toaster 
//           position="top-right"
//           toastOptions={{
//             duration: 3000,
//             style: {
//               background: '#fff',
//               color: '#333',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//               borderRadius: '8px',
//               padding: '12px 16px',
//             },
//             success: {
//               iconTheme: {
//                 primary: '#10B981',
//                 secondary: '#fff',
//               },
//             },
//             error: {
//               iconTheme: {
//                 primary: '#EF4444',
//                 secondary: '#fff',
//               },
//             },
//           }}
//         />
//       </body>
//     </html>
//   )
// }

// @ts-nocheck
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: '自学系统',
  description: '以自学为基础，以生产为导向',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      {/* 使用系统字体，避免构建时联网下载 Google Fonts 导致 ECONNRESET */}
      <body className="min-h-screen bg-astronaut font-sans">
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: 'rgb(var(--foreground-rgb))',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              padding: '12px 16px',
              border: '1px solid var(--color-primary-light)',
            },
            success: { iconTheme: { primary: 'var(--color-primary)', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
