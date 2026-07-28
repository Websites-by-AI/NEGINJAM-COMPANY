import RequestForm from "@/components/RequestForm";
import TrackWidget from "@/components/TrackWidget";
import { site } from "@/lib/site";

type ServiceOption = { slug: string; title: string; division: string };

const contactItems = [
  { icon: "📍", title: "آدرس دفتر مرکزی", value: site.address, href: site.mapUrl },
  { icon: "☎", title: "تلفن ثابت", value: site.phoneFa, href: site.phoneHref },
  { icon: "🕘", title: "ساعات کاری", value: site.hours },
  { icon: "🧾", title: "شماره ثبت شرکت", value: site.registrationNumber },
];

export default function ContactSection({ services }: { services: ServiceOption[] }) {
  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="container-nj">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy-100 px-4 py-1.5 text-xs font-bold text-navy-700">
            تماس با ما
          </span>
          <h2 className="mt-4 text-3xl font-black text-navy-900 md:text-4xl">
            درخواست خدمات و مشاوره رایگان
          </h2>
          <p className="mt-4 leading-8 text-navy-600">
            نظافت، طراحی سایت یا تولید ویدیو — فرم را تکمیل کنید یا با {site.phoneFa} تماس بگیرید.
          </p>
        </div>

        <div id="request" className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl bg-navy-900 p-7 text-white">
              <h3 className="text-lg font-black">اطلاعات تماس</h3>
              <ul className="mt-6 space-y-5">
                {contactItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-lg">
                      {item.icon}
                    </span>
                    <span>
                      <span className="block text-xs text-navy-200">{item.title}</span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="block text-sm font-bold hover:text-emerald-300"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="block text-sm font-bold">{item.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: "🧹", label: "نظافت" },
                  { icon: "💻", label: "طراحی سایت" },
                  { icon: "🎬", label: "تولید ویدیو" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/5 py-2 text-xs font-semibold">
                    {item.icon} {item.label}
                  </div>
                ))}
              </div>

              <a
                href={site.phoneHref}
                className="mt-5 block rounded-2xl bg-emerald-500 py-3.5 text-center text-sm font-extrabold text-white transition hover:bg-emerald-600"
              >
                تماس فوری با کارشناس
              </a>
            </div>

            <TrackWidget />
          </div>

          <RequestForm services={services} />
        </div>
      </div>
    </section>
  );
}
