import Image from "next/image";
import { coverageAreas, site } from "@/lib/site";

const points = [
  "ثبت رسمی شرکت با شماره ۲۰۹۹۵۴ و فعالیت قانونی",
  "گزینش، آموزش و احراز هویت کامل تمامی نیروها",
  "قرارداد رسمی برای ساختمان‌ها، شرکت‌ها و ادارات",
  "پذیرش مسئولیت کیفیت کار و خسارات احتمالی",
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="container-nj grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/15">
            <Image
              src="https://images.pexels.com/photos/9462326/pexels-photo-9462326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="نیروهای خدماتی نگین جم در حال نظافت"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-2 w-48 rounded-3xl bg-navy-800 p-5 text-center text-white shadow-2xl md:-left-8 md:w-56">
            <p className="text-4xl font-black text-mint-300">۲۰+</p>
            <p className="mt-1 text-sm">سال تجربه در خدمات نظافتی تهران</p>
          </div>
          <div className="absolute -top-6 right-4 rounded-2xl border border-navy-100 bg-white px-4 py-3 shadow-xl">
            <p className="text-xs text-navy-500">شماره ثبت شرکت</p>
            <p className="text-lg font-black text-navy-800">{site.registrationNumber}</p>
          </div>
        </div>

        <div>
          <span className="inline-block rounded-full bg-mint-100 px-4 py-1.5 text-xs font-bold text-mint-700">
            درباره ما
          </span>
          <h2 className="mt-4 text-3xl font-black leading-relaxed text-navy-900 md:text-4xl">
            نگین جم؛ نامی آشنا در خدمات نظافتی تهران
          </h2>
          <p className="mt-5 leading-9 text-navy-600">
            شرکت خدماتی نگین جم با شماره ثبت <b className="text-navy-800">{site.registrationNumber}</b>،
            با بهره‌گیری از نیروهای آموزش‌دیده و متعهد، آماده ارائه خدمات نظافتی در سراسر تهران است.
            ما در طول بیش از دو دهه فعالیت، با هزاران خانواده، ساختمان و مجموعه اداری همکاری کرده‌ایم و
            سرمایه اصلی ما اعتماد مشتریانمان است.
          </p>
          <p className="mt-4 leading-9 text-navy-600">
            هدف ما ساده است: فضایی تمیز، تیمی قابل اعتماد و آرامش خیال برای شما.
          </p>

          <ul className="mt-7 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm font-medium text-navy-700">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-navy-800 text-xs text-mint-300">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-navy-100 bg-sand-100 p-5">
            <p className="text-sm font-bold text-navy-800">محدوده خدمات‌دهی در تهران:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {coverageAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-navy-600 ring-1 ring-navy-100"
                >
                  {area}
                </span>
              ))}
              <span className="rounded-lg bg-mint-500 px-3 py-1.5 text-xs font-bold text-white">
                و سایر مناطق تهران
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
