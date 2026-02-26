'use client'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Menu, SendHorizonal, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Themetoggle from '@/components/theme-toggle'
import Navbar from '@/app/components/Navbar'

const menuItems = [
    { name: 'Features', href: '#' },
    { name: 'Solution', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'About', href: '#' },
]

export default function HeroSection() {
    const [menuState, setMenuState] = useState(false)
    return (
        <>


            <Navbar />

            <main>
                <section className="overflow-hidden">
                    <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-20">
                        <div className="lg:flex lg:items-center lg:gap-12">
                            <div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">



                                <h1 className="mt-10 text-balance text-4xl font-bold md:text-5xl xl:text-5xl">Production Ready Digital Marketing blocks</h1>
                                <p className="mt-8">Error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>

                                <div>
                                    <form
                                        action=""
                                        className="mx-auto my-10 max-w-sm lg:my-12 lg:ml-0 lg:mr-auto">

                                    </form>

                                    <div className="flex items-center justify-between">
                                        {/* Left Side */}
                                        <ul className="list-disc list-inside space-y-2">
                                            <li>Faster</li>
                                            <li>Modern</li>
                                            <li>100% Customizable</li>
                                        </ul>

                                        {/* Right Side */}
                                        <Button variant="outline">
                                            Explore Book
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 -mx-4 rounded-3xl p-3 lg:col-span-3">
                            <div className="relative">
                                <div className="bg-radial-[at_65%_25%] to-background z-1 -inset-17 absolute from-transparent to-40%"></div>
                                <Image
                                    className="hidden dark:block"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaKl9jzZSTX4PXhOiZ9egS89QD84OetXm4AA&s"
                                    alt="app illustration"
                                    width={2796}
                                    height={2008}
                                />
                                <Image
                                    className="dark:hidden"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaKl9jzZSTX4PXhOiZ9egS89QD84OetXm4AA&s"
                                    alt="app illustration"
                                    width={2796}
                                    height={2008}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
