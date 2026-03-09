'use client'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Menu, SendHorizonal, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Themetoggle from '@/components/theme-toggle'
import getCookie from '@/lib/getcookies'

export default function Navbar() {


    const [token, setToken] = useState<string | null | undefined>(undefined)

    useEffect(() => {
        const cookie = getCookie("token_value")
        setToken(cookie)
    }, [])

    const TokenMenuItems = [
        { name: 'Sale your book', href: 'createbook' },
         { name: 'My books', href: 'mybook' },
        { name: 'Buy a book', href: 'bookstore' },
    ]


     const NoTokenMenuItems = [
        { name: 'Features', href: '#' },
        { name: 'About', href: '#' },
    ]


    const [menuState, setMenuState] = useState(false);


    if (token === undefined) {
        return null;
    }

    return (

        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent">
                <div className="m-auto max-w-5xl px-6">
                    <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:pr-4">
                                <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">

                                    {

                                        token ? (<>
                                            {TokenMenuItems.map((item, index) => (
                                                <li key={index}>
                                                    <Link
                                                        href={item.href}
                                                        className="text-muted-foreground hover:text-accent-foreground block duration-150">


                                                        <span>{item.name}</span>
                                                    </Link>
                                                </li>
                                            ))}</>) : (<>
                                             {NoTokenMenuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                               
                                               
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                            </>)
                                    }


                                </ul>
                            </div>

                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">

                                {
                                    token ? <Button

                                        onClick={() => {
                                            document.cookie =
                                                "token_value=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                                            window.location.reload()
                                        }}

                                        asChild
                                        variant="outline"
                                        size="sm">
                                        <Link href="/signup">
                                            <span>logout</span>
                                        </Link>
                                    </Button> : (
                                        <>
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm">
                                                <Link href="/signup">
                                                    <span>signup</span>
                                                </Link>
                                            </Button>

                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm">
                                                <Link href="/login">
                                                    <span>login</span>
                                                </Link>
                                            </Button>
                                        </>
                                    )
                                }
                                {/* <Button
                                    asChild
                                    variant="outline"
                                    size="sm">
                                    <Link href="/signup">
                                        <span>signup</span>
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    size="sm">
                                    <Link href="/login">
                                        <span>Login</span>
                                    </Link>
                                </Button> */}





                                <Themetoggle />

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}