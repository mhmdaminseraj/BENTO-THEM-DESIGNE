
import React, { useState, useMemo } from 'react';
import { getThemeRecommendations } from './services/geminiService';
import { ThemeCategory, AIRecommendation } from './types';

interface ExtendedCategory extends ThemeCategory {
  price?: string;
  rating?: string;
  count?: string;
  badge?: string;
}

interface FeaturedTheme {
  id: string;
  name: string;
  tagline: string;
  image: string;
  price: string;
  points: string[];
  badge: string;
  color: string;
}

const CATEGORIES: ExtendedCategory[] = [
  {
    id: 'ecommerce',
    title: 'فروشگاه هوشمند',
    description: 'نسل جدید قالب‌های ووکامرس با تمرکز بر تجربه کاربری موبایل و فروش انفجاری.',
    icon: 'shopping_bag',
    color: 'primary',
    tags: ['ووکامرس', 'React', 'PWA'],
    size: 'wide',
    link: '#',
    price: 'از ۲.۴ م',
    rating: '۴.۹',
    count: '+۱۲۰ قالب',
    badge: 'پیشنهاد ۲۰۲۵'
  },
  {
    id: 'corporate',
    title: 'کسب‌و‌کار مدرن',
    description: 'طراحی مینیمال برای برندهای پیشرو.',
    icon: 'account_balance',
    color: 'emerald-500',
    tags: ['المانتور', 'شرکتی'],
    size: 'small',
    link: '#',
    count: '+۸۵ قالب'
  },
  {
    id: 'portfolio',
    title: 'استودیو خلاق',
    description: 'نمایش نمونه‌کار با انیمیشن‌های سینمایی.',
    icon: 'auto_awesome_motion',
    color: 'accent-purple',
    tags: ['فری‌لنسری', 'هنری'],
    size: 'small',
    link: '#',
    count: '+۴۰ قالب',
    badge: 'جدید'
  },
  {
    id: 'blog',
    title: 'مجله دیجیتال',
    description: 'بهینه‌ترین ساختار برای سئو و خوانایی.',
    icon: 'menu_book',
    color: 'orange-500',
    tags: ['خبری', 'بلاگ'],
    size: 'small',
    link: '#',
    count: '+۶۰ قالب'
  },
  {
    id: 'landing',
    title: 'لندینگ پیج',
    description: 'ساخته شده برای بالاترین نرخ تبدیل.',
    icon: 'ads_click',
    color: 'rose-500',
    tags: ['تبلیغاتی', 'استارتاپ'],
    size: 'small',
    link: '#',
    count: '+۹۵ قالب'
  }
];

const FEATURED_THEMES: FeaturedTheme[] = [
  {
    id: 'f1',
    name: 'Astra Pro 2025',
    tagline: 'سریع‌ترین تم وردپرس برای حرفه‌ای‌ها',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    price: '۱,۴۸۰,۰۰۰ تومان',
    points: ['سئو عالی', 'سازگار با المنتور', 'دموهای آماده'],
    badge: 'پرفروش',
    color: 'primary'
  },
  {
    id: 'f2',
    name: 'WoodMart Ultra',
    tagline: 'پادشاه بی‌رقیب فروشگاه‌های ووکامرس',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    price: '۲,۲۰۰,۰۰۰ تومان',
    points: ['پنل تنظیمات پیشرفته', 'اپلیکیشن موبایل رایگان', 'هدر ساز جادویی'],
    badge: 'VIP',
    color: 'accent-purple'
  },
  {
    id: 'f3',
    name: 'Avada Creative',
    tagline: 'پک کامل طراحی برای آژانس‌های خلاق',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800',
    price: '۱,۹۵۰,۰۰۰ تومان',
    points: ['طراحی چندمنظوره', 'لایبرری اختصاصی', 'پشتیبانی ۶ ماهه'],
    badge: 'پیشنهادی',
    color: 'emerald-500'
  }
];

const QUICK_FILTERS = ['همه', 'ووکامرس', 'المانتور', 'React', 'جدید', 'مدرن'];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('همه');
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const result = await getThemeRecommendations(searchQuery);
      setRecommendation(result);
      setSelectedTag('همه');
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  const filteredCategories = useMemo(() => {
    if (selectedTag === 'همه') return CATEGORIES;
    return CATEGORIES.filter(cat => 
      cat.tags?.some(tag => tag.includes(selectedTag)) || cat.badge?.includes(selectedTag)
    );
  }, [selectedTag]);

  let cardIndex = 0;

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary shadow-lg border border-primary/20">
                <span className="material-symbols-outlined font-bold text-lg">rocket_launch</span>
              </div>
              <h1 className="text-lg font-black tracking-tight text-white hidden sm:block">THEME<span className="text-primary">MARKET</span></h1>
            </div>

            <nav className="hidden lg:flex items-center gap-0.5 h-16">
              <div className="nav-item relative h-full flex items-center px-1">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all">
                  قالب‌های وردپرس
                  <span className="material-symbols-outlined text-[10px] opacity-50 group-hover:rotate-180 transition-transform">keyboard_arrow_down</span>
                </button>
                <div className="nav-link-indicator"></div>
                <div className="mega-menu-panel invisible opacity-0 absolute top-[100%] right-0 w-[700px] mt-1 p-6 rounded-[2rem] shadow-2xl scale-[0.98]">
                  <div className="grid grid-cols-3 gap-6 relative z-50">
                    <div className="col-span-2">
                      <h4 className="text-[9px] font-black text-primary uppercase tracking-widest mb-4 border-b border-white/5 pb-1.5">دسته‌بندی‌های پیشنهادی</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { title: 'فروشگاهی و ووکامرس', icon: 'shopping_cart', desc: 'تجارت آنلاین مدرن' },
                          { title: 'شرکتی و پورتفولیو', icon: 'business_center', desc: 'نمایش بیزینس حرفه‌ای' },
                          { title: 'آموزشی و LMS', icon: 'school', desc: 'مدیریت دوره‌های آموزشی' },
                          { title: 'خبری و مجله', icon: 'auto_stories', desc: 'بهینه‌شده برای محتوا' }
                        ].map((item, i) => (
                          <a key={i} href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group/item border border-transparent hover:border-white/5">
                            <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-900 text-slate-400 group-hover/item:bg-primary/20 group-hover/item:text-primary transition-colors">
                              <span className="material-symbols-outlined text-xl">{item.icon}</span>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white mb-0.5">{item.title}</div>
                              <div className="text-[10px] text-slate-500 leading-tight">{item.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-1 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl p-5 border border-primary/10 flex flex-col justify-between">
                      <div>
                        <span className="bg-primary/30 text-primary text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase mb-2 inline-block">HOT DEAL</span>
                        <h5 className="text-sm font-black text-white mb-1.5">پکیج ۲۰۲۵</h5>
                        <p className="text-[10px] text-slate-400 leading-relaxed">تخفیف ۶۰٪ ویژه سال نو میلادی.</p>
                      </div>
                      <button className="w-full h-9 rounded-lg bg-primary text-white text-[10px] font-black hover:bg-blue-600 transition-all shadow-lg">
                        مشاهده جشنواره
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className="relative px-3 h-8 flex items-center rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all group">خدمات VIP<div className="nav-link-indicator"></div></a>
              <a href="#" className="relative px-3 h-8 flex items-center rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all group">آکادمی<div className="nav-link-indicator"></div></a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="search-container relative hidden xl:flex items-center h-10 w-72 rounded-full px-4 gap-2.5">
               <span className="material-symbols-outlined text-slate-500 text-base">search_spark</span>
               <input className="flex-1 bg-transparent border-none focus:ring-0 text-xs text-white placeholder:text-slate-600 text-right font-medium" placeholder="جستجو..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
               <div className="h-5 w-8 rounded bg-white/5 flex items-center justify-center text-slate-500 text-[9px] font-bold">⌘K</div>
            </div>
            <button className="h-10 rounded-full bg-white px-6 text-xs font-black text-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-lg">ورود</button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-12 w-full max-w-[1300px] px-6">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full glass-tag px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span></span>
              اکوسیستم وردپرس فارسی
            </div>
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              خلاقیت در<br/>
              <span className="bg-gradient-to-l from-primary via-blue-400 to-accent-purple bg-clip-text text-transparent italic drop-shadow-xl">وردپرس ۲۰۲۵</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl font-medium">
              ما ابزارهای موفقیت شما را فراهم می‌کنیم. طراحی‌های آوانگارد، لایسنس‌های اورجینال و پشتیبانی فوق‌سریع.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map(tag => (
              <button key={tag} onClick={() => setSelectedTag(tag)} className={`rounded-xl px-5 py-2.5 text-[11px] font-black transition-all border ${selectedTag === tag ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'glass-tag text-slate-400 hover:text-white hover:border-white/20'}`}>{tag}</button>
            ))}
          </div>
        </div>

        {/* AI Result Box */}
        {recommendation && (
          <div className="mb-12 rounded-[2rem] border border-primary/20 bg-primary/5 p-8 backdrop-blur-3xl animate-fade-in-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-xl">
                <span className="material-symbols-outlined text-xl">psychology_alt</span>
              </div>
              <div>
                <h4 className="text-lg font-black text-white">تحلیل هوشمند AI</h4>
                <p className="text-xs text-primary/80">پیشنهاد اختصاصی بر اساس درخواست شما</p>
              </div>
            </div>
            <p className="text-slate-300 text-base leading-relaxed border-r-4 border-primary/20 pr-6">{recommendation.reasoning}</p>
          </div>
        )}

        {/* NEW SECTION: Featured Themes */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-2xl font-black text-white">ویژگی‌های برجسته</h3>
            <div className="h-px flex-1 bg-white/5"></div>
            <a href="#" className="text-xs font-bold text-primary hover:underline">مشاهده همه</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_THEMES.map((theme) => (
              <div key={theme.id} className="bento-card group flex flex-col rounded-[2rem] overflow-hidden animate-fade-in-up shadow-lg">
                <div className="relative h-44 w-full overflow-hidden">
                  <img src={theme.image} alt={theme.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black text-white uppercase shadow-lg ${
                      theme.color === 'primary' ? 'bg-primary' : 
                      theme.color === 'accent-purple' ? 'bg-accent-purple' : 'bg-emerald-500'
                    }`}>
                      {theme.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-lg font-black text-white mb-1">{theme.name}</h4>
                  <p className="text-[11px] text-slate-400 mb-4 font-medium">{theme.tagline}</p>
                  
                  <ul className="space-y-2 mb-6 flex-1">
                    {theme.points.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[10px] text-slate-300 font-bold">
                        <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="text-[11px] font-black text-white bg-white/5 px-3 py-1.5 rounded-lg">{theme.price}</div>
                    <button className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-lg">shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Bento Grid 2025 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          
          {/* Main Hero Bento Card */}
          {(selectedTag === 'همه' || selectedTag === 'مدرن') && (
            <div 
              className="bento-card group col-span-1 md:col-span-2 row-span-2 rounded-[2.5rem] p-8 flex flex-col justify-between animate-fade-in-up"
              style={{ animationDelay: `${(cardIndex++) * 0.1}s` }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black shadow-xl">
                    <span className="material-symbols-outlined text-2xl font-black">all_inclusive</span>
                  </div>
                  <div className="glass-tag px-4 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-wider">Unlimited Access</div>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">اشتراک<br/><span className="bg-gradient-to-l from-primary to-blue-300 bg-clip-text text-transparent">الماس تم‌مارکت</span></h3>
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed">دنیایی بدون محدودیت. دانلود نامحدود لایسنس‌های اورجینال برای تمام محصولات سایت.</p>
              </div>
              <div className="relative z-10 mt-auto">
                <button className="h-12 rounded-xl bg-primary px-8 text-xs font-black text-white shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95">شروع اشتراک الماس</button>
              </div>
            </div>
          )}

          {/* Dynamic Category Cards */}
          {filteredCategories.map((cat) => {
            const delay = (cardIndex++) * 0.1;
            
            if (cat.size === 'wide') {
              return (
                <div key={cat.id} className="bento-card group col-span-1 md:col-span-2 row-span-1 rounded-[2.5rem] p-8 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: `${delay}s` }}>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex flex-col gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                        <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                      </div>
                      <h3 className="text-xl font-black text-white">{cat.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-end justify-between relative z-10 mt-6">
                    <p className="text-slate-400 text-xs max-w-[200px] leading-relaxed">{cat.description}</p>
                    <div className="text-left bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                      <div className="text-[9px] font-black text-slate-500 uppercase">شروع قیمت</div>
                      <div className="text-base font-black text-white">{cat.price}</div>
                    </div>
                  </div>
                  <a href={cat.link} className="absolute inset-0 z-20"></a>
                </div>
              );
            }

            return (
              <div key={cat.id} className="bento-card group col-span-1 row-span-1 rounded-[2rem] p-6 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: `${delay}s` }}>
                <div className="relative z-10">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300`}>
                    <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                  </div>
                </div>
                <div className="relative z-10 mt-6">
                  <h3 className="text-lg font-black text-white mb-1">{cat.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{cat.description}</p>
                </div>
                <a href={cat.link} className="absolute inset-0 z-20"></a>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="mt-32 border-t border-white/5 pt-16 pb-12 bg-black/20">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="text-slate-600 font-bold text-xs tracking-widest uppercase">© ۲۰۲۴-۲۰۲۵ THEMEMARKET. کلیه حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
