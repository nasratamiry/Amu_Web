# راهنمای API برای تیم فرانت‌اند (React + TypeScript + Tailwind CSS)

این سند قرارداد پاسخ‌دهی بک‌اند **Django REST Framework** را برای مصرف در کلاینت React با TypeScript توصیف می‌کند. آدرس پایه زیر فرض می‌شود؛ در محیط واقعی دامنه یا پورت را عوض کنید.

| محیط | مثال `BASE_URL` |
|------|------------------|
| توسعه لوکال | `http://192.168.0.125 ` |
| پروداکشن | آدرس سرور HTTPS شما |

**پیشوند همهٔ اندپاینت‌های JSON:** `{BASE_URL}/api/`

---

## ۱. قالب کلی پاسخ (Envelope)

همهٔ پاسخ‌های موفق از سمت این API (به‌جز موارد خاص مثل ریدایرکت) معمولاً این شکل را دارند:

```json
{
  "success": true,
  "message": "",
  "data": { }
}
```

- **`message`**: رشته؛ ممکن است خالی باشد.
- **`data`**: محتوای واقعی (آبجکت، آرایه، `null`، یا در لیست‌های صفحه‌بندی‌شده ساختار مخصوص زیر).

### خطا

برای اکثر خطاهای DRF (۴۰۰، ۴۰۱، ۴۰۳، ۴۰۴، …) پاسخ به این شکل **یکپارچه** برمی‌گردد:

```json
{
  "success": false,
  "message": "توضیح متنی خطا (ممکن است چند فیلد در یک رشته ادغام شده باشد)"
}
```

**نکته مهم برای فرانت:** در حالت خطای اعتبارسنجی (۴۲۲)، جزئیات به‌صورت آبجکت تفکیک‌شدهٔ فیلدبه‌فیلد ممکن است **برنگردد**؛ فقط `message` جمع‌بندی‌شده وجود دارد. برای UX بهتر، فرم را با اعتبارسنجی سمت کلاینت هم پوشش دهید.

---

## ۲. احراز هویت (JWT)

- **نوع:** Bearer Token (کتابخانه `djangorestframework-simplejwt`).
- **هدر درخواست‌های محافظت‌شده:**

```http
Authorization: Bearer <ACCESS_TOKEN>
```

- **دریافت توکن:** فقط مسیر سفارشی زیر در پروژه ثبت شده است:

`POST /api/admin/login/`

بادی (JSON):

```json
{
  "username": "نام_کاربری_یا_ایمیل_طبق_تنظیم_بک‌اند",
  "password": "رمز_عبور"
}
```

**شرط:** کاربر باید **`is_staff`** باشد؛ در غیر این صورت خطای احراز هویت برمی‌گردد.

**پاسخ موفق (۲۰۰)** — داخل `data`:

```json
{
  "success": true,
  "message": "",
  "data": {
    "refresh": "<refresh_token_jwt>",
    "access": "<access_token_jwt>",
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "is_staff": true
    }
  }
}
```

- **`access`**: برای هدر `Authorization` در درخواست‌های بعدی.
- **`refresh`**: برای تمدید اکسس توکن؛ **در حال حاضر** مسیر استاندارد مثل `/api/token/refresh/` در `urls` پروژه ثبت نشده است. اگر نیاز به رفرش دارید، با بک‌اند هماهنگ کنید تا همان مسیر اضافه شود، یا تا آن زمان با انقضای `access` مدیریت خطای ۴۰۱ را در فرانت پیاده کنید.

---

## ۳. دسترسی (Permissions) به‌صورت خلاصه

| اندپاینت | GET (خواندن) | POST / PUT / PATCH / DELETE |
|----------|----------------|-----------------------------|
| پروژه‌ها، تیم، بلاگ (لیست/جزییات) | عمومی (**AllowAny**) | نیاز به **احراز هویت** (کاربر لاگین + JWT) برای ایجاد/ویرایش/حذف |
| تماس عمومی `POST /api/contact/` | — | عمومی |
| لیست پیام‌های تماس `GET /api/messages/` و حذف | نیاز به JWT | نیاز به JWT |
| آپلود تصویر `POST /api/upload/` | — | نیاز به JWT |
| آمار ادمین `GET /api/admin/stats/` | نیاز به JWT | — |
| سلامت `GET /api/health/` | عمومی | — |

کلاس پیش‌فرض DRF برای این ویوها: **`IsAuthenticatedOrReadOnly`** (خواندن بدون لاگین، نوشتن با لاگین).

---

## ۴. CORS و کوکی‌ها

طبق تنظیمات پروژه:

- **`CORS_ALLOW_CREDENTIALS = true`** (در `base`): اگر از کوکی/`credentials` استفاده می‌کنید، در فرانت برای `fetch` گزینه `credentials: "include"` و در axios `withCredentials: true` را با **`Access-Control-Allow-Origin`** دقیق (نه `*`) هماهنگ کنید.
- در **محیط dev** معمولاً `CORS_ALLOW_ALL_ORIGINS` روشن است؛ در **production** لیست **`CORS_ALLOWED_ORIGINS`** از متغیر محیط تنظیم می‌شود — دامنهٔ فرانت را باید روی سرور اضافه کنند.

---

## ۵. صفحه‌بندی (Pagination)

اندپاینت‌هایی که صفحه‌بندی دارند از **`StandardPagination`** استفاده می‌کنند:

| پارامتر Query | معنی |
|---------------|------|
| `page` | شماره صفحه (پیش‌فرض اندازه صفحه **۱۰**) |
| `limit` | اندازه صفحه (حداکثر **۱۰۰**) |

محتوای `data` در پاسخ موفق:

```json
{
  "success": true,
  "message": "",
  "data": {
    "count": 42,
    "next": "http://host/api/projects/?page=2",
    "previous": null,
    "results": [ ]
  }
}
```

---

## ۶. اندپاینت‌ها — متد، بادی، پاسخ

قرارداد: همهٔ مسیرها نسبت به `/api/` هستند. شناسه‌ها از نوع **`UUID`** هستند مگر **`slug`** بلاگ.

### ۶.۱ سلامت

**`GET /api/health/`**

- بدون بدن.
- **۲۰۰:**

```json
{
  "success": true,
  "message": "",
  "data": { "status": "ok" }
}
```

---

### ۶.۲ لاگین ادمین (JWT)

**`POST /api/admin/login/`**

- **Content-Type:** `application/json`
- **بادی:**

```json
{
  "username": "string",
  "password": "string"
}
```

- **۲۰۰:** همان ساختار بخش ۲ (شامل `refresh`, `access`, `user`).
- **۴۰۱ / خطا:** `{ "success": false, "message": "..." }`

---

### ۶.۳ آمار داشبورد (نیاز به JWT)

**`GET /api/admin/stats/`**

- **هدر:** `Authorization: Bearer <access>`
- **۲۰۰:**

```json
{
  "success": true,
  "message": "",
  "data": {
    "projects": 0,
    "team": 0,
    "blog": 0,
    "messages": 0
  }
}
```

عددها: تعداد رکورد در هر موجودیت.

---

### ۶.۴ پروژه‌ها (`Project`)

مدل شامل تصویر **آپلود فایلی** است؛ فیلدهای لینک فروشگاه/وب **اختیاری** هستند و در JSON پاسخ اگر خالی باشند **کلیدشان را اصلاً نمی‌بینید**.

**لیست (+ ایجاد)**  
**`GET|POST /api/projects/`**

- **GET:** صفحه‌بندی شده (`page`, `limit`). عمومی.
- **POST:** نیاز JWT. بدن را به‌صورت **`multipart/form-data`** بفرستید اگر تصویر دارید؛ در غیر این صورت برای فقط متن می‌توانید `application/json` امتحان کنید (فیلدهای فایلی فقط با multipart قابل‌ارسال‌اند).

**فیلدهای قابل‌ارسال (ایجاد/ویرایش کامل):**

| نام فیلد | نوع | اجبار | توضیح |
|-----------|-----|-------|--------|
| `title` | string | بله | عنوان |
| `description` | string | خیر | |
| `image` | file | خیر | فایل تصویر |
| `technologies` | JSON آرایه | خیر، پیش‌فرض `[]` | مثال: `["React","Django"]` — در multipart به‌صورت رشته JSON |
| `play_store_url` | string URL | خیر | |
| `app_store_url` | string URL | خیر | |
| `website_url` | string URL | خیر | |
| `featured` | boolean | خیر، پیش‌فرض `false` | |
| `order` | number | خیر، پیش‌فرض `0` | |

**نمونه شیء یک پروژه در `results` یا پاسخ تکی** (کلیدهای خالی در لینک/تصویر **حذف** شده‌اند):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "My App",
  "description": "...",
  "image": "http://127.0.0.1:8000/media/projects/2026/05/photo.jpg",
  "technologies": ["TypeScript", "React"],
  "play_store_url": "https://play.google.com/store/apps/details?id=...",
  "website_url": "https://example.com",
  "featured": true,
  "order": 0,
  "created_at": "2026-05-03T12:00:00.000000Z",
  "updated_at": "2026-05-03T12:00:00.000000Z"
}
```

اگر مثلاً `app_store_url` پر نباشد، فیلد `app_store_url` در JSON **وجود ندارد**. اگر تصویری آپلود نشده باشد، **`image`** در پاسخ **نیست**.

**جزییات / ویرایش / حذف**  
**`GET|PUT|PATCH|DELETE /api/projects/<uuid:pk>/`**

- **GET:** عمومی.
- **PUT / PATCH / DELETE:** نیاز JWT (`PATCH` برای به‌روزرسانی جزئی؛ با فایل معمولاً `multipart/form-data`).

---

### ۶.۵ اعضای تیم (`TeamMember`)

**`GET|POST /api/team/`**

- GET: آرایه سادهٔ همهٔ اعضا (بدون صفحه‌بندی در پیاده‌سازی فعلی).
- POST: JWT.

**بدن ایجاد/ویرایش (مثال JSON؛ برای `image` از multipart استفاده کنید):**

| نام | نوع | اجبار |
|-----|-----|--------|
| `name` | string | بله |
| `role` | string | خیر |
| `bio` | string | خیر |
| `image` | file | خیر |
| `social_links` | object JSON | خیر، پیش‌فرض `{}` |
| `order` | number | خیر |

**نسخه نمایشی در GET** — اگر عکسی نباشد، کلید **`image`** در پاسخ نیست:

```json
{
  "id": "uuid",
  "name": "string",
  "role": "string",
  "bio": "string",
  "social_links": {},
  "order": 0,
  "created_at": "...",
  "updated_at": "..."
}
```

**`GET|PUT|PATCH|DELETE /api/team/<uuid:pk>/`**

---

### ۶.۶ بلاگ (`BlogPost`)

رفتار **لیست/جزییات عمومی برای کار مهمان:** فقط پست‌های **`published: true`** دیده می‌شوند.

اگر کاربر **لاگین باشد و `is_staff`**، در **لیست GET** همهٔ پست‌ها (شامل پیش‌نویس) برگردانده می‌شوند.

**`GET|POST /api/blog/`**

- GET: صفحه‌بندی (`page`, `limit`).
- POST: JWT.

**فیلدها:**

| نام | نوع | اجبار / یادداشت |
|-----|-----|------------------|
| `title` | string | بله |
| `slug` | string | بله، یکتا |
| `excerpt` | string | خیر |
| `content` | string | خیر |
| `cover_image` | file | خیر |
| `published` | boolean | خیر |
| `published_at` | ISO datetime یا `null` | خیر |

اگر `cover_image` خالی باشد، در پاسخ GET این کلید **حذف** می‌شود.

**`GET|PUT|PATCH|DELETE /api/blog/<uuid:pk>/`**

**`GET /api/blog/slug/<slug>/`**

- همان قوانین فیلتر `published` برای کاربر غیر-staff.

---

### ۶.۷ تماس (عمومی) و پیام‌ها (ادمین)

**`POST /api/contact/`** — **بدون JWT**

- **Content-Type:** `application/json`
- **بادی:**

```json
{
  "name": "string",
  "email": "user@example.com",
  "subject": "string",
  "message": "string"
}
```

- **۲۰۱:**

```json
{
  "success": true,
  "message": "",
  "data": {
    "id": "uuid",
    "name": "...",
    "email": "...",
    "subject": "...",
    "message": "...",
    "read": false,
    "created_at": "...",
    "updated_at": "..."
  }
}
```

**`GET /api/messages/`** — **با JWT**، صفحه‌بندی شده؛ هر آیتم شبیه همان شیء بالا.

**`DELETE /api/messages/<uuid:pk>/`** — **با JWT**

- **۲۰۰:**

```json
{
  "success": true,
  "message": "Deleted",
  "data": null
}
```

---

### ۶.۸ آپلود تصویر عمومی (نیاز به JWT)

**`POST /api/upload/`**

- **Content-Type:** `multipart/form-data`
- فیلد فایل باید یکی از این نام‌ها باشد: **`image`** یا **`file`**
- **۲۰۱ — `data`:**

```json
{
  "id": "uuid",
  "image": "/media/uploads/2026/05/xyz.jpg",
  "url": "http://127.0.0.1:8000/media/uploads/2026/05/xyz.jpg",
  "created_at": "...",
  "updated_at": "..."
}
```

اگر فایل ارسال نشود: **۴۰۰** با `success: false` و پیام مناسب.

---

## ۷. آدرس فایل‌های مدیا (تصاویر)

- در **توسعه** با `DEBUG=True`، جنگو معمولاً زیر مسیر **`/media/...`** فایل را سرو می‌کند.
- در **پروداکشن** باید وب‌سرور (مثلاً Nginx) یا استوریج ابری، مسیر **`MEDIA_URL` / `MEDIA_ROOT`** را سرو کند؛ فرانت فقط از URL کامل یا نسبی برگشتی از API استفاده کند.

---

## ۸. نمونه TypeScript (قرارداد داده‌ها)

می‌توانید در پروژه React انواع زیر را نزدیک لایه API نگه دارید:

```typescript
/** پاسخ موفق یکپارچه */
export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  image?: string;
  play_store_url?: string;
  app_store_url?: string;
  website_url?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  social_links: Record<string, unknown>;
  order: number;
  created_at: string;
  updated_at: string;
  image?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  cover_image?: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
  updated_at: string;
};

export type LoginResponseData = {
  refresh: string;
  access: string;
  user: {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
  };
};
```

---

## ۹. چک‌لیست سریع برای فرانت‌اند

1. همهٔ درخواست‌های محافظت‌شده: هدر **`Authorization: Bearer ...`**.
2. لیست‌های پروژه و بلاگ و پیام‌ها: query **`page`** و در صورت نیاز **`limit`**.
3. ایجاد/ویرایش با تصویر: **`FormData`** + **`multipart/form-data`**؛ فیلدهای JSON مثل `technologies` را در FormData به‌صورت رشته JSON قرار دهید.
4. رندر لینک‌های پروژه: فقط اگر کلید در آبجکت پاسخ **وجود داشت** دکمه/لینک نشان دهید.
5. مدیریت **`success === false`** و نمایش **`message`** به کاربر.

---

اگر مسیر جدیدی (مثلاً `/api/token/refresh/`) به بک‌اند اضافه شود، این سند را به‌روز کنید یا همان نسخهٔ به‌روز را از تیم بک‌اند بگیرید.
