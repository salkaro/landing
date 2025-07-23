import Link from "next/link";

export const Footer = () => {
    const navigationItems = [
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
                    title: "Code Examples",
                    href: "/#code-example",
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
                    title: "Releases",
                    href: "/releases",
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
            title: "Legal",
            description: "Policies & terms governing use of our platform",
            items: [
                {
                    title: "Terms of Service",
                    href: "/terms",
                },
                {
                    title: "Privacy Policy",
                    href: "/privacy",
                },
                {
                    title: "Security",
                    href: "/security",
                },
                {
                    title: "SLA",
                    href: "/sla",
                },
            ],
        },
    ];

    return (
        <div className="py-20 lg:py-40 bg-foreground text-background px-20 2xl:px-0">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div className="flex gap-8 flex-col items-start">
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                                Salkaro
                            </h2>
                            <p className="text-lg max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
                                Powering modern trade and device infrastructure.
                            </p>
                        </div>
                        <div className="flex gap-20 flex-row">
                            <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
                                <Link href="/terms">Terms of service</Link>
                                <Link href="/privacy">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-10 items-start">
                        {navigationItems.map((item) => (
                            <div
                                key={item.title}
                                className="flex text-base gap-1 flex-col items-start"
                            >
                                <div className="flex flex-col gap-2">
                                    <p className="text-xl">{item.title}</p>
                                    {item.items &&
                                        item.items.map((subItem) => (
                                            <Link
                                                key={subItem.title}
                                                href={subItem.href}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-background/75">
                                                    {subItem.title}
                                                </span>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};