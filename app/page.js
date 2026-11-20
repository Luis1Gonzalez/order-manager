import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Newspaper, Phone } from "lucide-react";
import { prisma } from "@/lib/db";
import { site } from "@/lib/site";
import { getClientSession } from "@/lib/session";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { OrderCta } from "@/components/site/OrderCta";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/site/BrandIcons";
import { buttonClass, EmptyState } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [posts, session] = await Promise.all([
    prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
    getClientSession(),
  ]);

  const cta = session ? (
    <Link href="/pedido" className={buttonClass({ size: "lg" })}>
      Continuar mi pedido <ArrowRight className="size-5" aria-hidden />
    </Link>
  ) : (
    <Suspense>
      <OrderCta />
    </Suspense>
  );

  return (
    <>
      <SiteHeader>
        {session ? (
          <Link href="/pedido" className={buttonClass({ size: "sm", variant: "secondary" })}>
            Hola, {String(session.contactName).split(" ")[0]}
          </Link>
        ) : null}
      </SiteHeader>

      <main>
        {/* Portada */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_80%_-10%,var(--color-brand-100),transparent),radial-gradient(40rem_20rem_at_0%_100%,var(--color-cream-200),transparent)]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-20">
            <div>
              {site.city && (
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-800 ring-1 ring-brand-200">
                  <MapPin className="size-3.5" aria-hidden /> {site.city}
                </p>
              )}
              <h1 className="text-4xl font-semibold leading-[1.05] text-ink-900 sm:text-5xl lg:text-6xl">
                Encarga tu carne <span className="text-brand-700 italic">sin hacer cola</span>.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-ink-700">
                {site.tagline}. Arma tu pedido en un minuto y pásalo a recoger cuando esté listo.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {cta}
                <a href="#novedades" className={buttonClass({ size: "lg", variant: "ghost" })}>
                  Ver novedades
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[13rem] md:max-w-sm">
              <div className="absolute inset-6 rounded-full bg-brand-200/60 blur-3xl" aria-hidden />
              <Image
                src="/img/logo.png"
                alt={`Logo de ${site.name}`}
                width={400}
                height={400}
                className="relative w-full drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              ["Entra con tu teléfono", "El que tienes registrado como cliente."],
              ["Elige tus cortes", "Por categoría, en kilos, gramos o unidades."],
              ["Recoge tu pedido", "Guarda tu ticket y te lo tenemos preparado."],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-cream-200">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-700 font-display text-lg font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-ink-500">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Publicaciones */}
        <section id="novedades" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">Ofertas y novedades</h2>
              <p className="mt-1 text-ink-500">Lo que tenemos esta semana en el mostrador.</p>
            </div>
          </div>

          {posts.length === 0 ? (
            <EmptyState icon={Newspaper} title="Pronto publicaremos novedades">
              Vuelve en unos días para ver nuestras ofertas.
            </EmptyState>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-cream-200 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] bg-cream-100">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Image src="/img/logo.png" alt="" fill className="object-contain p-10 opacity-30" />
                    )}
                    {post.price && (
                      <span className="absolute right-3 top-3 rounded-full bg-brand-700 px-3 py-1 font-display text-lg font-semibold text-white shadow-md">
                        {post.price}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-ink-700">{post.description}</p>
                    {post.details && <p className="text-sm text-ink-500">{post.details}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Visítanos */}
        <section className="bg-brand-900 text-cream-100">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-semibold text-white">Visítanos</h2>
              <ul className="mt-6 space-y-4">
                {site.address && (
                  <InfoItem icon={MapPin}>
                    {site.mapsUrl ? (
                      <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                        {site.address}
                      </a>
                    ) : (
                      site.address
                    )}
                  </InfoItem>
                )}
                {site.hours && <InfoItem icon={Clock}>{site.hours}</InfoItem>}
                {site.phone && (
                  <InfoItem icon={Phone}>
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:underline">
                      {site.phone}
                    </a>
                  </InfoItem>
                )}
                {site.email && (
                  <InfoItem icon={Mail}>
                    <a href={`mailto:${site.email}`} className="hover:underline">
                      {site.email}
                    </a>
                  </InfoItem>
                )}
              </ul>
              <div className="mt-8 flex gap-3">
                {site.whatsapp && <Social href={`https://wa.me/${site.whatsapp}`} label="WhatsApp" icon={WhatsAppIcon} />}
                {site.instagram && <Social href={site.instagram} label="Instagram" icon={InstagramIcon} />}
                {site.facebook && <Social href={site.facebook} label="Facebook" icon={FacebookIcon} />}
              </div>
            </div>
            <figure className="flex flex-col items-center gap-3 self-center rounded-3xl bg-white p-5 text-ink-700">
              <Image src="/img/qr.jpeg" alt="Código QR para abrir esta web en el móvil" width={160} height={160} />
              <figcaption className="text-sm">Escanéalo para pedir desde el móvil</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function InfoItem({ icon: Icon, children }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
        <Icon className="size-4" aria-hidden />
      </span>
      {children}
    </li>
  );
}

function Social({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-brand-800"
    >
      <Icon />
    </a>
  );
}
