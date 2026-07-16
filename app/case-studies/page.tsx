import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { StructuredData } from "@/components/structured-data";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Road Safety Equipment Case Studies South Africa",
  description:
    "See how Roadsafe supported long-term road projects for WBHO, Tau Pele, Roadspan and Jodan Construction with VMS boards, speed radars and traffic equipment.",
  path: "/case-studies",
  image: "/images/hero-roadworks.jpg",
  imageAlt: "Road construction crew working on newly laid asphalt at sunset"
});

const caseStudies = [
  {
    id: "n3-wbho",
    corridor: "N3",
    route: "Pietermaritzburg to Durban",
    contractor: "WBHO",
    duration: "13 months",
    equipment: ["Variable message signs", "Vehicle-activated speed radars"],
    image: "/images/vms-field.jpg",
    imageAlt: "Trailer-mounted variable message sign deployed beside a roadway",
    challenge:
      "A long-running project on one of KwaZulu-Natal’s busiest strategic corridors needed communication that could remain clear as work fronts, lane arrangements and daily site conditions changed. The requirement was not simply visibility; motorists needed useful information early enough to approach temporary works with greater awareness.",
    deployment:
      "Roadsafe supplied VMS boards for adaptable advance messaging and vehicle-activated speed radars for immediate driver feedback. Together, the systems created a practical sequence: communicate the changing road condition, reinforce the expected behaviour and keep the equipment available across the 13-month programme.",
    outcome:
      "The project team had a flexible roadside communication layer that could move with the works instead of relying only on fixed messaging. VMS content could respond to changing project needs, while speed displays gave approaching motorists a direct, visible reminder to moderate speed through controlled areas.",
    quoteHref: "/request-a-quote?product=variable-message-signs"
  },
  {
    id: "n4-tau-pele",
    corridor: "N4",
    route: "Nelspruit to Komatipoort",
    contractor: "Tau Pele",
    duration: "9 months",
    equipment: ["Variable message signs", "FlashGuard dummy speed cameras"],
    image: "/images/flashguard-camera.png",
    imageAlt: "Roadside FlashGuard dummy speed camera used as a visible speed deterrent",
    challenge:
      "Roadworks across an extended Mpumalanga corridor called for conspicuous communication and a visible speed-management presence. With conditions changing over a nine-month programme, the contractor needed equipment that could support different work zones without losing the consistency of the safety message.",
    deployment:
      "VMS boards provided prominent, changeable information for approaching traffic. FlashGuard dummy speed cameras added a recognisable enforcement cue at selected approaches, helping the project team reinforce speed discipline without introducing a complex powered installation at every point.",
    outcome:
      "The combined deployment gave Tau Pele two complementary tools: detailed messages where drivers needed instruction and a simple visual deterrent where speed awareness was the priority. Both could be repositioned as the active work areas progressed along the route.",
    quoteHref: "/request-a-quote?product=variable-message-signs"
  },
  {
    id: "n17-roadspan",
    corridor: "N17",
    route: "Ermelo toward the Eswatini border",
    contractor: "Roadspan",
    duration: "12 months",
    equipment: ["Variable message signs", "FlashGuard dummy speed cameras"],
    image: "/images/vms-hire.png",
    imageAlt: "Mobile variable message sign ready for a long-term road project",
    challenge:
      "A year-long road programme on the N17 required a durable communication approach across changing work areas and long stretches of open road. Drivers needed advance notice of temporary conditions, while the project team needed a credible visual reminder that lower speeds mattered near active works.",
    deployment:
      "Roadsafe paired mobile VMS boards with FlashGuard dummy speed cameras. The VMS units carried project-specific warnings and directions; the camera units provided an immediate roadside deterrent that could be placed where additional speed awareness was required.",
    outcome:
      "Roadspan could maintain a consistent communication strategy over the full 12 months while adapting individual placements to the programme. The equipment mix supported both information and deterrence, helping make temporary road conditions easier for approaching motorists to interpret.",
    quoteHref: "/request-a-quote?product=variable-message-signs"
  },
  {
    id: "r556-jodan",
    corridor: "R556",
    route: "Bela-Bela to Tweespruit",
    contractor: "Jodan Construction",
    duration: "24 months",
    equipment: ["Variable message signs", "Traffic huts"],
    image: "/images/roadsafe-fleet.jpg",
    imageAlt: "Roadsafe mobile equipment prepared for deployment to a road project",
    challenge:
      "The longest deployment in this group extended across two years. That duration demanded more than a short-term equipment drop: the project needed roadside messaging that could change with the programme and practical operating points for traffic personnel working across the route.",
    deployment:
      "Roadsafe supplied VMS boards for changing warnings, directions and project notices, together with traffic huts that gave traffic teams defined roadside operating points. The combination supported both the motorist-facing message and the people responsible for day-to-day traffic activity.",
    outcome:
      "Jodan Construction had a project-ready equipment arrangement that could remain useful as the work evolved. Mobile messaging reduced dependence on static information, while the huts supported a more established traffic-management presence throughout the 24-month deployment.",
    quoteHref: "/request-a-quote?product=variable-message-signs"
  }
];

export default function CaseStudiesPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Roadsafe Traffic case studies",
          url: absoluteUrl("/case-studies"),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: caseStudies.map((study, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${study.corridor}: ${study.route} — ${study.contractor}`
            }))
          }
        }}
      />
      <PageHero
        title="Equipment proven across the long road."
        description="Selected contractor deployments across strategic routes, showing how roadside communication and speed-management equipment stayed relevant as works moved and conditions changed."
        image="/images/hero-roadworks.jpg"
        imageAlt="Road construction crew working on newly laid asphalt at sunset"
        eyebrow="Case studies"
        currentHref="/case-studies"
      />

      <section className="section section--white case-proof">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Project experience"
              title="Built for programmes measured in months, not moments."
              copy="These selected projects show how Roadsafe equipment has supported contractors through changing traffic conditions and moving work fronts."
            />
          </Reveal>
          <nav className="case-index" aria-label="Case studies on this page">
            {caseStudies.map((study, index) => (
              <a href={`#${study.id}`} key={study.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{study.corridor}</strong><small>{study.contractor}</small></div>
                <ArrowDown aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="case-studies" aria-label="Roadsafe project case studies">
        {caseStudies.map((study, index) => (
          <article
            className={`case-study ${index % 2 ? "case-study--reverse" : ""}`}
            id={study.id}
            key={study.id}
          >
            <div className="case-study__visual">
              <Image
                src={study.image}
                alt={study.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <span>{study.corridor} / {study.contractor}</span>
            </div>
            <div className="case-study__content">
              <Eyebrow index={String(index + 1).padStart(2, "0")}>{study.contractor}</Eyebrow>
              <h2>{study.corridor}: {study.route}</h2>
              <div className="case-study__facts">
                <div><MapPin aria-hidden="true" /><span>Corridor<strong>{study.route}</strong></span></div>
                <div><CalendarDays aria-hidden="true" /><span>Deployment<strong>{study.duration}</strong></span></div>
                <div><ShieldCheck aria-hidden="true" /><span>Equipment<strong>{study.equipment.join(" + ")}</strong></span></div>
              </div>
              <div className="case-study__story">
                <section><h3>The situation</h3><p>{study.challenge}</p></section>
                <section><h3>The deployment</h3><p>{study.deployment}</p></section>
                <section><h3>The operational outcome</h3><p>{study.outcome}</p></section>
              </div>
              <div className="case-study__action">
                <Link className="button" href={study.quoteHref}>
                  Plan a similar deployment
                  <ArrowUpRight aria-hidden="true" size={18} />
                </Link>
                <Link className="text-link" href="/products">
                  Explore the equipment
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="section section--dark case-assurance">
        <div className="container">
          <p>
            Project corridors, contractors, durations and equipment are based on Roadsafe project
            information. Operational narratives describe the intended role of the equipment; no
            quantified accident-reduction claim is made.
          </p>
        </div>
      </section>
      <CtaBand title="Give the next road project a clearer safety message." />
    </>
  );
}
