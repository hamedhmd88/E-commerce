import type { Locale } from "./locale";
import { pagePhrases } from "./phrases/pages";
import { accountPhrases } from "./phrases/account";
import { cartPhrases } from "./phrases/cart";
import { productPhrases } from "./phrases/product";
import { contentPhrases } from "./phrases/content";
import { editorialPhrases } from "./phrases/editorial";
import { systemPhrases } from "./phrases/system";
import { metadataPhrases } from "./phrases/metadata";

const fa: Record<string, string> = {
  ...pagePhrases,
  ...accountPhrases,
  ...cartPhrases,
  ...productPhrases,
  ...contentPhrases,
  ...editorialPhrases,
  ...systemPhrases,
  ...metadataPhrases,
  Home: "خانه",
  Products: "محصولات",
  Carts: "سبدها",
  Blog: "مجله",
  Journal: "مجله",
  FAQ: "پرسش‌های متداول",
  Cart: "سبد خرید",
  Login: "ورود",
  Register: "ثبت‌نام",
  "Explore carts": "دیدن سبدها",
  "Choose date": "انتخاب تاریخ",
  Featured: "پیشنهادی",
  "Men's clothing": "پوشاک مردانه",
  "Any rating": "هر امتیازی",
  "Morrow demo": "نمایش مورو",
  "API sample": "نمونهٔ API",
  demo: "نمایشی",
  "Don't have an account?": "حساب ندارید؟",
  "Simulated order placed": "سفارش نمایشی ثبت شد",
  Number: "شماره",
  Latitude: "عرض جغرافیایی",
  Longitude: "طول جغرافیایی",
  About: "درباره ما",
  Contact: "تماس با ما",
  Account: "حساب کاربری",
  "Sign in": "ورود",
  "Sign out": "خروج",
  "Open menu": "باز کردن منو",
  "Close menu": "بستن منو",
  "Toggle theme": "تغییر تم",
  "Back to top": "بازگشت به بالا",
  "Skip to main content": "رفتن به محتوای اصلی",
  "Main navigation": "منوی اصلی",
  "Loading page": "در حال بارگذاری صفحه",
  "The wardrobe edit": "انتخابی برای سبک زندگی",
  "Wear what feels like you.": "آنچه به شما می‌آید بپوشید.",
  "Thoughtful everyday pieces, selected for the way real life moves.":
    "انتخاب‌هایی سنجیده برای زندگی روزمره و همراه با ریتم واقعی آن.",
  "Explore the edit": "دیدن مجموعه",
  "Selected for the everyday": "انتخاب‌شده برای هر روز",
  "Curated with care": "با دقت انتخاب شده",
  "Explore by category": "دسته‌بندی‌ها را ببینید",
  "Find your own direction.": "مسیر خودتان را پیدا کنید.",
  "View everything": "دیدن همه",
  Electronics: "کالای دیجیتال",
  Jewelry: "زیورآلات",
  "Men’s clothing": "پوشاک مردانه",
  "Women's clothing": "پوشاک زنانه",
  "Women’s clothing": "پوشاک زنانه",
  "Useful tools, made simple": "ابزارهای کاربردی، ساده و روشن",
  "Details to keep close": "جزئیاتی که همراهتان می‌مانند",
  "Everyday foundations": "پایه‌های پوشش روزمره",
  "A fresh point of view": "نگاهی تازه",
  "The Morrow journal": "مجلهٔ مورو",
  "Ideas for the everyday.": "ایده‌هایی برای هر روز.",
  "Considered notes on style, useful technology, and shopping well.":
    "یادداشت‌هایی دربارهٔ سبک، فناوری کاربردی و خرید آگاهانه.",
  "Search stories, ideas, or topics": "جست‌وجوی مقاله، ایده یا موضوع",
  Search: "جست‌وجو",
  Explore: "کاوش",
  All: "همه",
  Technology: "فناوری",
  Fashion: "پوشاک",
  Shopping: "خرید",
  "The idea behind the edit": "ایدهٔ پشت این مجموعه",
  "A calmer way to find your next favorite.":
    "راهی آرام‌تر برای پیدا کردن انتخاب بعدی شما.",
  "A focused edit": "مجموعه‌ای متمرکز",
  "Clear product details": "جزئیات روشن محصول",
  "A transparent demo": "نمونه‌ای شفاف",
  "A small set of categories, easy to explore.":
    "چند دسته‌بندی روشن و آسان برای کاوش.",
  "Ratings, descriptions, and prices stay close to each item.":
    "امتیاز، توضیح و قیمت کنار هر کالا دیده می‌شوند.",
  "Catalog data is live; checkout and accounts are simulated.":
    "اطلاعات محصول زنده است؛ پرداخت و حساب‌ها نمایشی‌اند.",
  "Read about this project": "دربارهٔ پروژه بخوانید",
  "A note for the curious": "یادداشتی برای کنجکاوها",
  "Your email address": "نشانی ایمیل شما",
  "Try signup": "ثبت‌نام آزمایشی",
  "Frequently asked questions": "پرسش‌های پرتکرار",
  "Explore the collection": "مجموعه را ببینید",
  "All products": "همهٔ محصولات",
  "Explore sample carts": "سبدهای نمونه را ببینید",
  Clothing: "پوشاک",
  "Our story": "داستان ما",
  Questions: "پرسش‌ها",
  "Your space": "حساب شما",
  "My account": "حساب من",
  Wishlist: "علاقه‌مندی‌ها",
  "Order history": "تاریخچهٔ سفارش‌ها",
  Shop: "فروشگاه",
  Browse: "دیدن",
  Save: "ذخیره",
  "Portfolio demo · Products from Fake Store API":
    "نمونه‌کار نمایشی · محصولات از Fake Store API",
  "Account, checkout, and orders are demonstrations.":
    "حساب کاربری، پرداخت و سفارش‌ها نمایشی هستند.",
  "Thoughtful finds for everyday life. Explore the collection, save favorites, and build a demo bag at your own pace.":
    "انتخاب‌هایی سنجیده برای زندگی روزمره. مجموعه را ببینید، علاقه‌مندی‌ها را ذخیره کنید و سبد آزمایشی خود را بسازید.",
  "Finding your next view…": "در حال آماده‌سازی صفحه…",
  "One moment while the page gets ready.": "لطفاً یک لحظه صبر کنید.",
  "This page could not load": "این صفحه بارگذاری نشد",
  "Something interrupted this page. Try again, or return to the home page.":
    "در بارگذاری صفحه مشکلی پیش آمد. دوباره تلاش کنید یا به خانه برگردید.",
  "Try again": "تلاش دوباره",
  "Trying again…": "در حال تلاش دوباره…",
  "Back to home": "بازگشت به خانه",
  "Page not found": "صفحه پیدا نشد",
  "Browse collection": "دیدن محصولات",
  "The storefront could not load": "فروشگاه بارگذاری نشد",
  "A page-level issue interrupted the experience. Try loading the site again.":
    "مشکلی در بارگذاری سایت پیش آمد. دوباره تلاش کنید.",
};

const patterns: Array<[RegExp, (match: RegExpMatchArray) => string]> = [
  [/^Cart for user #(\d+)$/, (match) => `سبد کاربر شمارهٔ ${match[1]}`],
  [
    /^(\d+) items across (\d+) product lines$/,
    (match) => `${match[1]} کالا در ${match[2]} ردیف محصول`,
  ],
  [/^Quantity: (\d+)$/, (match) => `تعداد: ${match[1]}`],
  [/^(\d+) catalog ratings$/, (match) => `${match[1]} امتیاز در فهرست`],
  [/^Item #(\d+)$/, (match) => `کالای شمارهٔ ${match[1]}`],
  [/^Product #(\d+)$/, (match) => `محصول شمارهٔ ${match[1]}`],
  [
    /^View cart (\d+) details$/,
    (match) => `دیدن جزئیات سبد شمارهٔ ${match[1]}`,
  ],
  [/^View details for (.+)$/, (match) => `دیدن جزئیات ${match[1]}`],
  [/^Save (.+)$/, (match) => `ذخیرهٔ ${match[1]}`],
  [
    /^Remove (.+) from saved items$/,
    (match) => `حذف ${match[1]} از علاقه‌مندی‌ها`,
  ],
  [/^Remove (.+) from cart$/, (match) => `حذف ${match[1]} از سبد`],
  [/^Increase quantity of (.+)$/, (match) => `افزایش تعداد ${match[1]}`],
  [/^Decrease quantity of (.+)$/, (match) => `کاهش تعداد ${match[1]}`],
  [/^Quantity of (.+)$/, (match) => `تعداد ${match[1]}`],
  [/^Increase (.+) quantity$/, (match) => `افزایش تعداد ${match[1]}`],
  [/^Decrease (.+) quantity$/, (match) => `کاهش تعداد ${match[1]}`],
  [
    /^Show slide (\d+): (.+)$/,
    (match) => `نمایش اسلاید ${match[1]}: ${translate(match[2], "fa")}`,
  ],
  [/^Step (\d+) of (\d+)$/, (match) => `گام ${match[1]} از ${match[2]}`],
  [
    /^Open cart, (\d+) items?$/,
    (match) => `باز کردن سبد خرید، ${match[1]} کالا`,
  ],
  [/^Page (\d+)$/, (match) => `صفحهٔ ${match[1]}`],
  [/^© (\d{4}) Morrow\.$/, (match) => `© ${match[1]} مورو`],
  [/^(\d+) stories to explore$/, (match) => `${match[1]} مقاله برای خواندن`],
];

export function translate(value: string, locale: Locale): string {
  if (locale === "en") return value;
  const clean = value.trim().replace(/\s+/g, " ");
  if (!clean) return value;
  let result = fa[clean];
  if (!result) {
    for (const [pattern, replacement] of patterns) {
      const match = clean.match(pattern);
      if (match) {
        result = replacement(match);
        break;
      }
    }
  }
  if (!result) return value;
  const start = value.match(/^\s*/)?.[0] ?? "";
  const end = value.match(/\s*$/)?.[0] ?? "";
  return `${start}${result}${end}`;
}
