import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import Favicon from '../public/images/WanderInn_logo_sm.png';
import ClientOnly from './components/ClientOnly';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WanderInn',
  description: "Discover unique stays, from cozy cabins to urban lofts, and everything in between. With WanderInn, you'll find the ideal place to call home while you explore new destinations.",
  authors: [{name: "Julian Bristol", url: "https://julianbristol.netlify.app" }],
  icons: [{ rel: 'icon', url: Favicon.src }],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
