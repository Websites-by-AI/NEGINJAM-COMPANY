const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** تبدیل ارقام انگلیسی به فارسی */
export function toFa(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
}

/** تبدیل ارقام فارسی/عربی به انگلیسی برای ذخیره در دیتابیس */
export function toEnDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/** قیمت به تومان با جداکننده هزارگان و ارقام فارسی */
export function formatToman(amount: number): string {
  return toFa(amount.toLocaleString("en-US"));
}

/** تاریخ شمسی خوانا */
export function formatDateFa(date: Date | string): string {
  const value = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(value.getTime())) return "-";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Tehran",
    }).format(value);
  } catch {
    return value.toISOString().slice(0, 16).replace("T", " ");
  }
}
