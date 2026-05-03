# راهنمای Push به GitHub و Deploy روی Render

## ۱. ساخت ریپو در GitHub

1. به [github.com](https://github.com) بروید و لاگین کنید
2. روی **New repository** کلیک کنید
3. نام ریپو را `Amu_Web_backend` بگذارید
4. **Public** را انتخاب کنید
5. تیک «Add a README» را نزنید (کد از قبل وجود دارد)
6. روی **Create repository** کلیک کنید

## ۲. Push به GitHub

در ترمینال، از پوشه `backend` این دستورات را اجرا کنید:

```powershell
cd "D:\New folder\Amu_Web\backend"

# آدرس ریپو را با یوزرنیم خود عوض کنید
git remote add origin https://github.com/YOUR_USERNAME/Amu_Web_backend.git

# Push
git branch -M main
git push -u origin main
```

> **نکته:** `YOUR_USERNAME` را با یوزرنیم GitHub خود جایگزین کنید.

## ۳. Deploy روی Render

1. به [render.com](https://render.com) بروید و ثبت‌نام کنید
2. **New** → **Web Service** را انتخاب کنید
3. ریپوی `Amu_Web_backend` را وصل کنید (از GitHub)
4. تنظیمات:
   - **Name:** `amu-web-backend` (یا هر نامی که دوست دارید)
   - **Root Directory:** خالی بگذارید
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

5. **Environment Variables** را اضافه کنید:
   - `MONGODB_URI` → اتصال MongoDB Atlas
   - `CORS_ORIGINS` → آدرس فرانت (مثلاً `https://euphonious-kheer-5db008.netlify.app`)

6. روی **Create Web Service** کلیک کنید

بعد از deploy، آدرس API مثلاً خواهد بود:  
`https://amu-web-backend.onrender.com/api`

در فرانت (Netlify) متغیر `VITE_API_BASE_URL` را به همین آدرس تنظیم کنید.
