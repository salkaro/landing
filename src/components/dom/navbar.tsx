"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const router = useRouter();
    const navigationItems = [
        {
            title: "Home",
            href: "/",
            description: "Overview of our real‑time IoT monitoring & control platform",
        },
        {
            title: "Platform",
            description: "Features for connecting, monitoring & managing devices",
            items: [
                {
                    title: "Sensor Info",
                    href: "/#sensor-info",
                },
                {
                    title: "Organisation",
                    href: "/#organisation-management",
                },
                {
                    title: "API Docs",
                    href: "https://docs.salkaro.com",
                },
                {
                    title: "Post",
                    href: "/#post",
                },
            ],
        },
        {
            title: "Company",
            description: "Learn more about our mission & team",
            items: [
                {
                    title: "About Us",
                    href: "/about",
                },
                {
                    title: "Blog",
                    href: "/blog",
                },
                {
                    title: "Careers",
                    href: "/careers",
                },
                {
                    title: "Contact",
                    href: "/contact",
                },
            ],
        },
        {
            title: "Pricing",
            href: "/#pricing",
            description: "Compare plans & find the right tier for your needs",
        },
    ];

    const [isOpen, setOpen] = useState(false);
    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center px-10 2xl:px-0">
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        <>
                                            <NavigationMenuLink>
                                                <Button variant="ghost" onClick={() => router.push(item.href)}>{item.title}</Button>
                                            </NavigationMenuLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="font-medium text-sm">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[450px] p-4">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-base">{item.title}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Button size="sm" className="mt-10" onClick={() => router.push("https://app.salkaro.com/sign-up")}>
                                                            Get started
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink
                                                                href={subItem.href}
                                                                key={subItem.title}
                                                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                                            >
                                                                <span>{subItem.title}</span>
                                                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex lg:justify-center">
                    <p className="font-semibold">Salkaro</p>
                </div>
                <div className="flex justify-end w-full gap-4">
                    <Button variant="ghost" className="hidden md:inline" onClick={() => router.push("https://docs.salkaro.com")}>
                        Documentation
                    </Button>
                    <div className="border-r hidden md:inline"></div>
                    <Button variant="outline" onClick={() => router.push("https://app.salkaro.com/login")}>Sign in</Button>
                    <Button onClick={() => router.push("https://app.salkaro.com/sign-up")}>Get started</Button>
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 px-12 container gap-8">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-lg">{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                            </Link>
                                        ) : (
                                            <p className="text-lg">{item.title}</p>
                                        )}
                                        {item.items &&
                                            item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex justify-between items-center"
                                                >
                                                    <span className="text-muted-foreground">
                                                        {subItem.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1" />
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};