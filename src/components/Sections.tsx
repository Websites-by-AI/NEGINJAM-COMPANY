import Image from "next/image";
import { advantages, galleryImages, processSteps, site, testimonials } from "@/lib/site";

export function WhySection() {
  return (
    <section id="why" className="relative overflow-hidden bg-navy-900 py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="container-nj relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300">
            چرا نگین جم؟
          </span>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">دلایلی که ما را انتخاب می‌کنید</h2>
          <p className="mt-4 leading-8 text-navy-200">
            کیفیت، خوش‌قولی و مسئولیت‌پذیری؛ سه اصلی که در همه حوزه‌های خدماتی ما یافت می‌شود.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/10"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/15 text-2xl">
                {item.icon}
              </span>
              <h3 className="mt-5 text-lg font-extrabold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-navy-200">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="bg-white py-20 md:py-28">
      <div className="container-nj">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy-100 px-4 py-1.5 text-xs font-bold text-navy-700">
            مراحل کار
          </span>
          <h2 className="mt-4 text-3xl font-black text-navy-900 md:text-4xl">
            ۴ قدم ساده برای شروع همکاری
          </h2>
        </div>
        <div className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute inset-x-12 top-14 hidden border-t-2 border-dashed border-navy-100 lg:block" />
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-3xl border border-navy-100 bg-sand-100 p-6 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-navy-900/10"
            >
              <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-2xl shadow-md ring-1 ring-navy-100">
                {step.icon}
                <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-xs font-black text-white">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-navy-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-navy-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section className="bg-sand-100 py-20 md:py-24">
      <div className="container-nj">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-navy-100 px-4 py-1.5 text-xs font-bold text-navy-700">
            نمونه کارها
          </span>
          <h2 className="text-3xl font-black text-navy-900 md:text-4xl">
            گوشه‌ای از فعالیت تیم نگین جم
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`group relative overflow-hidden rounded-3xl shadow-md ${
                index === 0 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative h-56 w-full sm:h-64">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent opacity-80 transition group-hover:opacity-95" />
                <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between">
                  <p className="text-sm font-bold text-white">{image.alt}</p>
                  <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                    {image.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-nj">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-700">
            نظر مشتریان و شرکا
          </span>
          <h2 className="mt-4 text-3xl font-black text-navy-900 md:text-4xl">
            اعتماد شما، سرمایه ماست
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-3xl border border-navy-100 bg-sand-100 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="text-lg text-amber-400">{"★".repeat(item.rating)}</div>
                <span className="rounded-full bg-navy-100 px-2 py-1 text-[10px] font-bold text-navy-600">
                  {item.tag}
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-8 text-navy-700">
                «{item.text}»
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-800 text-sm font-black text-emerald-300">
                  {item.name.slice(0, 1)}
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-navy-900">{item.name}</span>
                  <span className="block text-xs text-navy-500">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="bg-white pb-4">
      <div className="container-nj">
        <div className="hero-gradient relative overflow-hidden rounded-[2.5rem] px-8 py-12 text-center text-white md:px-14 md:py-16">
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
          <h2 className="relative text-2xl font-black md:text-4xl">
            همین حالا شروع کنید
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl leading-8 text-navy-100">
            چه به دنبال خدمات نظافتی باشید، چه سایت یا ویدیو بخواهید، چه به فکر همکاری دوجانبه باشید؛
            کارشناسان ما آماده مشاوره رایگان هستند.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={site.phoneHref}
              className="rounded-2xl bg-white px-7 py-4 text-base font-extrabold text-navy-900 transition hover:-translate-y-0.5"
            >
              ☎ {site.phoneFa}
            </a>
            <a
              href="#request"
              className="rounded-2xl bg-emerald-500 px-7 py-4 text-base font-extrabold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              ثبت درخواست خدمات
            </a>
            <a
              href="#partnership"
              className="rounded-2xl border border-amber-400/50 bg-amber-400/15 px-7 py-4 text-base font-extrabold text-amber-200 transition hover:-translate-y-0.5 hover:bg-amber-400/25"
            >
              🤝 درخواست همکاری
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
