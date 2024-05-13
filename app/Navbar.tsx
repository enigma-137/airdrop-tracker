'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { WiRaindrops } from "react-icons/wi";

const Navbar = () => {
    const links = [
        {label: "Dashboard",
            path: "/"
        },
        {
            label: "My Airdrops",
            path: "/airdrops"
        }
    ]

  const currentPath = usePathname()
  return (
    <nav className='flex space-x-7 border-b  mb-6 px-5 h-14 items-center'>
        <Link href="/"> <WiRaindrops className='size-14' /></Link>
        <ul className='flex space-x-6'>
            {/* <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/airdrops">My Airdrops</Link></li> */}
            {links.map((link) => (
                <li key={link.path} className= {`${link.path === currentPath ? "text-zinc-500" : "text-zinc-900"} hover:text-zinc-500 transition-colors`}><Link href={link.path}>{link.label}</Link></li>
            ))}
        </ul>
    </nav>
  )
}

export default Navbar