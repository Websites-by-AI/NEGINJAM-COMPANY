import { db } from "@/db";
import { services, type Service } from "@/db/schema";
import { asc, eq, sql } from "drizzle-orm";

export const DEFAULT_SERVICES = [
  // ─── CLEANING ────────────────────────────────────────────────────────────
  {
    slug: "home-cleaning",
    division: "cleaning",
    title: "نظافت منزل",
    summary: "نظافت کامل منزل شامل گردگیری، شست‌وشوی کف، آشپزخانه و سرویس بهداشتی توسط نیروی آموزش‌دیده.",
    icon: "🏠",
    imageUrl: "https://images.pexels.com/photos/6195275/pexels-photo-6195275.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 1_450_000,
    priceUnit: "هر نیرو / روز کاری",
    features: ["گردگیری کامل", "شست‌وشوی آشپزخانه", "نظافت سرویس بهداشتی", "مواد شوینده همراه نیرو"],
    sortOrder: 1,
  },
  {
    slug: "stairs-cleaning",
    division: "cleaning",
    title: "نظافت راه‌پله",
    summary: "نظافت دوره‌ای یا موردی راه‌پله ساختمان‌های مسکونی و اداری با قرارداد ماهانه.",
    icon: "🪜",
    imageUrl: "https://images.pexels.com/photos/6345073/pexels-photo-6345073.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 850_000,
    priceUnit: "هر نوبت (تا ۵ طبقه)",
    features: ["شست‌وشوی پله و پاگرد", "نظافت آسانسور", "دستمال‌کشی نرده و درب‌ها", "قرارداد ماهانه"],
    sortOrder: 2,
  },
  {
    slug: "office-cleaning",
    division: "cleaning",
    title: "نظافت شرکت‌ها و ادارات",
    summary: "خدمات نظافت روزانه، هفتگی و قراردادی برای شرکت‌ها، دفاتر اداری و مطب‌ها.",
    icon: "🏢",
    imageUrl: "https://images.pexels.com/photos/6197121/pexels-photo-6197121.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 1_650_000,
    priceUnit: "هر نیرو / روز کاری",
    features: ["نیروی ثابت یا موقت", "قرارداد رسمی", "بیمه و مسئولیت", "پشتیبانی و جایگزینی"],
    sortOrder: 3,
  },
  {
    slug: "carpet-sofa",
    division: "cleaning",
    title: "شست‌وشوی فرش و مبلمان",
    summary: "شست‌وشوی تخصصی مبلمان در محل با دستگاه صنعتی و سرویس رفت و برگشت فرش.",
    icon: "🛋️",
    imageUrl: "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 320_000,
    priceUnit: "هر دست مبل (سه نفره)",
    features: ["شست‌وشو در محل", "خشک‌شویی و لکه‌بری", "ضدعفونی و رفع بو", "رفت و برگشت فرش"],
    sortOrder: 4,
  },
  {
    slug: "after-renovation",
    division: "cleaning",
    title: "نظافت بعد از بازسازی",
    summary: "پاکسازی گرد و غبار ساختمانی، رفع لکه گچ و رنگ و تحویل فضای آماده سکونت.",
    icon: "🧹",
    imageUrl: "https://images.pexels.com/photos/4176610/pexels-photo-4176610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 1_850_000,
    priceUnit: "هر نیرو / روز کاری",
    features: ["رفع گرد و غبار ساختمانی", "پاک‌سازی گچ و رنگ", "شست‌وشوی شیشه و پنجره", "تحویل کلید به کلید"],
    sortOrder: 5,
  },
  // ─── WEB DESIGN ──────────────────────────────────────────────────────────
  {
    slug: "corporate-website",
    division: "web",
    title: "وب‌سایت شرکتی",
    summary: "طراحی و پیاده‌سازی وب‌سایت حرفه‌ای برای شرکت‌ها، کسب‌وکارها و برندهای شخصی.",
    icon: "🌐",
    imageUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 8_000_000,
    priceUnit: "شروع قیمت",
    features: ["طراحی اختصاصی", "واکنش‌گرا و موبایل‌فرندلی", "سئو پایه", "پنل مدیریت محتوا"],
    sortOrder: 10,
  },
  {
    slug: "ecommerce",
    division: "web",
    title: "فروشگاه اینترنتی",
    summary: "طراحی فروشگاه آنلاین با امکانات کامل: درگاه پرداخت، انبارداری و مدیریت سفارش.",
    icon: "🛒",
    imageUrl: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 15_000_000,
    priceUnit: "شروع قیمت",
    features: ["درگاه پرداخت ایرانی", "مدیریت محصولات", "سیستم تخفیف", "اپلیکیشن فروشنده"],
    sortOrder: 11,
  },
  {
    slug: "seo",
    division: "web",
    title: "سئو و دیجیتال مارکتینگ",
    summary: "بهینه‌سازی سایت برای گوگل، تبلیغات کلیکی و مدیریت شبکه‌های اجتماعی.",
    icon: "📈",
    imageUrl: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 3_500_000,
    priceUnit: "ماهانه",
    features: ["تحقیق کلمات کلیدی", "تولید محتوا", "لینک‌سازی", "گزارش ماهانه"],
    sortOrder: 12,
  },
  // ─── VIDEO ───────────────────────────────────────────────────────────────
  {
    slug: "commercial",
    division: "video",
    title: "تیزر تبلیغاتی",
    summary: "ساخت تیزر ۳۰ تا ۹۰ ثانیه‌ای حرفه‌ای برای معرفی محصول، خدمت یا کسب‌وکار.",
    icon: "📹",
    imageUrl: "https://images.pexels.com/photos/3379942/pexels-photo-3379942.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 5_000_000,
    priceUnit: "شروع قیمت",
    features: ["فیلم‌برداری حرفه‌ای", "تدوین و رنگ‌بندی", "موسیقی و افکت صوتی", "تحویل فرمت‌های متعدد"],
    sortOrder: 20,
  },
  {
    slug: "social-content",
    division: "video",
    title: "محتوای شبکه اجتماعی",
    summary: "تولید ریلز، استوری، پادکست و پست‌های ویدیویی برای اینستاگرام، آپارات و یوتیوب.",
    icon: "🎥",
    imageUrl: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 2_500_000,
    priceUnit: "پکیج ماهانه",
    features: ["ریلز و استوری اینستاگرام", "ویدیوی آپارات و یوتیوب", "گرافیک متحرک", "مدیریت محتوا"],
    sortOrder: 21,
  },
  {
    slug: "motion-graphic",
    division: "video",
    title: "موشن گرافیک",
    summary: "طراحی انیمیشن‌های اینفوگرافیک، معرفی محصول و ویدیوهای آموزشی متحرک.",
    icon: "✨",
    imageUrl: "https://images.pexels.com/photos/2693529/pexels-photo-2693529.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    priceFrom: 4_000_000,
    priceUnit: "شروع قیمت",
    features: ["انیمیشن لوگو", "اینفوگرافیک متحرک", "ویدیوی معرفی محصول", "صداگذاری حرفه‌ای"],
    sortOrder: 22,
  },
] as const;

export type SeedService = (typeof DEFAULT_SERVICES)[number];

export async function ensureServicesSeeded(): Promise<void> {
  const [row] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(services);

  if ((row?.count ?? 0) > 0) return;

  await db.insert(services).values(
    DEFAULT_SERVICES.map((service) => ({
      slug: service.slug,
      division: service.division,
      title: service.title,
      summary: service.summary,
      icon: service.icon,
      imageUrl: service.imageUrl,
      priceFrom: service.priceFrom,
      priceUnit: service.priceUnit,
      features: [...service.features],
      sortOrder: service.sortOrder,
    })),
  );
}

const FALLBACK_SERVICES: Service[] = DEFAULT_SERVICES.map((service, index) => ({
  id: index + 1,
  slug: service.slug as string,
  division: (service as { division?: string }).division ?? "cleaning",
  title: service.title as string,
  summary: service.summary as string,
  icon: service.icon as string,
  imageUrl: service.imageUrl as string,
  priceFrom: service.priceFrom,
  priceUnit: service.priceUnit as string,
  features: [...(service.features as unknown as string[])],
  sortOrder: service.sortOrder,
  active: true,
  createdAt: new Date(),
}));

export async function getServices(): Promise<Service[]> {
  try {
    await ensureServicesSeeded();
    const rows = await db
      .select()
      .from(services)
      .where(eq(services.active, true))
      .orderBy(asc(services.sortOrder));
    return rows.length > 0 ? rows : FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}
