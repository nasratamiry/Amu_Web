import type { Locale } from '@/i18n/translations'

export interface TechnologyDetail {
  title: string
  summary: string
  whatIsTitle: string
  whatIsText: string
  useCasesTitle: string
  useCases: string[]
  whyWeUseTitle: string
  whyWeUseText: string
}

type TechnologyDetailMap = Record<string, Record<Locale, TechnologyDetail>>

export const technologyDetails: TechnologyDetailMap = {
  react: {
    en: {
      title: 'React.js',
      summary: 'A modern UI library for building fast, interactive, and scalable web interfaces.',
      whatIsTitle: 'What Is React.js?',
      whatIsText: 'React is a component-based JavaScript library focused on building reusable UI blocks. It enables efficient rendering and a smooth user experience in complex applications.',
      useCasesTitle: 'Common Use Cases',
      useCases: ['Business dashboards', 'SaaS frontends', 'Interactive portals'],
      whyWeUseTitle: 'Why We Use It',
      whyWeUseText: 'We use React to deliver maintainable codebases, fast interfaces, and flexible architectures that grow with client needs.',
    },
    fa: {
      title: 'React.js',
      summary: 'یک کتابخانه مدرن رابط کاربری برای ساخت صفحات سریع، تعاملی و مقیاس‌پذیر.',
      whatIsTitle: 'React چیست؟',
      whatIsText: 'ری‌اکت یک کتابخانه جاوااسکریپت مبتنی بر کامپوننت است که برای ساخت رابط‌های قابل استفاده مجدد طراحی شده و تجربه کاربری روانی ارائه می‌دهد.',
      useCasesTitle: 'موارد استفاده رایج',
      useCases: ['داشبوردهای تجاری', 'فرانت‌اند SaaS', 'پورتال‌های تعاملی'],
      whyWeUseTitle: 'چرا از آن استفاده می‌کنیم',
      whyWeUseText: 'برای ساخت کد قابل نگهداری، رابط سریع و معماری منعطف که همراه رشد کسب‌وکار توسعه پیدا کند.',
    },
    ps: {
      title: 'React.js',
      summary: 'د چټکو، تعاملي او مقدار وړ وېب انترفېسونو لپاره عصري UI کتابتون.',
      whatIsTitle: 'React څه شی دی؟',
      whatIsText: 'ری‌اکټ د JavaScript یو component-based کتابتون دی چې د بیا کارېدونکي UI برخو جوړولو لپاره کارول کېږي او نرم کارن تجربه برابروي.',
      useCasesTitle: 'عام استعمالونه',
      useCases: ['د سوداګرۍ ډشبورډونه', 'SaaS فرنټ‌اېنډ', 'تعاملي پورټلونه'],
      whyWeUseTitle: 'ولې یې کاروو',
      whyWeUseText: 'د ساتل کېدونکي کوډ، چټک انترفېس او منعطف معمارۍ لپاره چې د مشتری اړتیاوو سره وده کوي.',
    },
  },
  ai: {
    en: {
      title: 'Artificial Intelligence',
      summary: 'AI technologies that help businesses automate workflows, improve decisions, and unlock new digital products.',
      whatIsTitle: 'What Is Artificial Intelligence?',
      whatIsText: 'Artificial Intelligence is a set of technologies that enables software to learn patterns, understand language, and make intelligent predictions from data.',
      useCasesTitle: 'Common Use Cases',
      useCases: ['Smart assistants and chatbots', 'Document and data automation', 'Forecasting and decision support'],
      whyWeUseTitle: 'Why We Use It',
      whyWeUseText: 'We apply AI where it creates measurable value: reducing manual effort, improving accuracy, and accelerating business operations.',
    },
    fa: {
      title: 'هوش مصنوعی',
      summary: 'تکنالوژی‌های AI که به کسب‌وکارها کمک می‌کند کارها را خودکار سازند، تصمیم‌گیری را بهتر کنند و محصولات دیجیتال جدید بسازند.',
      whatIsTitle: 'هوش مصنوعی چیست؟',
      whatIsText: 'هوش مصنوعی مجموعه‌ای از تکنالوژی‌ها است که به نرم‌افزار امکان می‌دهد الگوها را یاد بگیرد، زبان را درک کند و بر اساس داده‌ها پیش‌بینی هوشمند انجام دهد.',
      useCasesTitle: 'موارد استفاده رایج',
      useCases: ['دستیارهای هوشمند و چت‌بات', 'اتوماسیون اسناد و داده', 'پیش‌بینی و پشتیبانی تصمیم'],
      whyWeUseTitle: 'چرا از آن استفاده می‌کنیم',
      whyWeUseText: 'ما از AI در جاهایی استفاده می‌کنیم که ارزش واقعی ایجاد کند: کاهش کار دستی، افزایش دقت و سرعت‌بخشیدن به عملیات تجاری.',
    },
    ps: {
      title: 'مصنوعي ځیرکتیا',
      summary: 'د AI تکنالوژۍ چې سوداګرۍ سره مرسته کوي پروسې اتومات کړي، تصمیم‌نیونه ښه کړي او نوي ډیجیټل محصولات رامنځته کړي.',
      whatIsTitle: 'مصنوعي ځیرکتیا څه ده؟',
      whatIsText: 'مصنوعي ځیرکتیا د هغو تکنالوژیو مجموعه ده چې سافټویر ته اجازه ورکوي له ډاټا څخه نمونې زده کړي، ژبه درک کړي او هوښیارې وړاندوینې وکړي.',
      useCasesTitle: 'عام استعمالونه',
      useCases: ['هوښیار مرستیالان او چټ‌باټونه', 'د اسنادو او ډاټا اتومات', 'وړاندوینه او د تصمیم ملاتړ'],
      whyWeUseTitle: 'ولې یې کاروو',
      whyWeUseText: 'موږ AI هلته کاروو چې حقیقي ارزښت جوړ کړي: لاسي کار کمول، دقت لوړول او د سوداګرۍ عملیات ګړندي کول.',
    },
  },
}
