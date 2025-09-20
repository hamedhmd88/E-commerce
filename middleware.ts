// وارد کردن کتابخانه‌های مورد نیاز Next.js برای مدیریت درخواست‌ها و پاسخ‌ها
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * تابع میدل‌ویر اصلی که قبل از پردازش هر درخواست اجرا می‌شود
 * این تابع مسئول احراز هویت، کنترل دسترسی و اعمال امنیت است
 */
export function middleware(request: NextRequest) {
  // استخراج مسیر فعلی از URL درخواست
  const { pathname } = request.nextUrl

  // دریافت توکن احراز هویت از کوکی‌ها یا هدرهای درخواست
  // ابتدا از کوکی auth_token بررسی می‌کند، در صورت عدم وجود از هدر Authorization استفاده می‌کند
  const token = request.cookies.get("auth_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  // تعریف مسیرهای محافظت شده که نیاز به احراز هویت دارند
  // این مسیرها شامل حساب کاربری، پرداخت و سفارشات هستند
  const protectedRoutes = ["/account", "/checkout", "/orders"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // تعریف مسیرهای احراز هویت که کاربران لاگین شده نباید به آنها دسترسی داشته باشند
  // شامل صفحات ورود و ثبت نام
  const authRoutes = ["/login", "/register"]
  const isAuthRoute = authRoutes.includes(pathname)

  // اگر کاربر بدون توکن سعی در دسترسی به مسیر محافظت شده داشته باشد، به صفحه ورود هدایت می‌شود
  if (isProtectedRoute && !token) {
    // ایجاد URL ورود با پارامتر redirect برای بازگشت به صفحه اصلی پس از ورود
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // اگر کاربر لاگین شده سعی در دسترسی به صفحات ورود/ثبت نام داشته باشد، به حساب کاربری هدایت می‌شود
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/account", request.url))
  }

  // اضافه کردن هدرهای امنیتی به پاسخ برای محافظت از وب‌سایت
  const response = NextResponse.next()

  // جلوگیری از نمایش سایت در iframe (محافظت در برابر clickjacking)
  response.headers.set("X-Frame-Options", "DENY")
  // جلوگیری از تشخیص نادرست نوع محتوا توسط مرورگر
  response.headers.set("X-Content-Type-Options", "nosniff")
  // کنترل اطلاعات ارجاع دهنده برای حفظ حریم خصوصی
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")

  return response
}

/**
 * تنظیمات میدل‌ویر که مشخص می‌کند این میدل‌ویر روی کدام مسیرها اجرا شود
 * از تمام مسیرها به جز موارد زیر:
 * - api: مسیرهای API که نیاز به پردازش جداگانه دارند
 * - _next/static: فایل‌های استاتیک Next.js
 * - _next/image: فایل‌های بهینه‌سازی شده تصاویر
 * - favicon.ico: آیکون سایت
 * - public: پوشه فایل‌های عمومی
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
