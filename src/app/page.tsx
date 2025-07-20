import { Cases } from "@/components/dom/cases";
import { CodeExample } from "@/components/dom/code-example";
import { CTA } from "@/components/dom/cta";
import { FAQ } from "@/components/dom/faqs";
import { Hero } from "@/components/dom/hero";
import { OrganisationManagement } from "@/components/dom/organisation-management";
import { Pricing } from "@/components/dom/pricing";
import { SensorInfo } from "@/components/dom/sensor-info";

export default function Home() {
    return (
        <>
            <Hero />
            <Cases />
            <SensorInfo />
            <OrganisationManagement />
            <CodeExample />
            <Pricing />
            <CTA />
            <FAQ />
        </>
    );
}
