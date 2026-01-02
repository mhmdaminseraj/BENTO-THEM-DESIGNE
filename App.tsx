
import React, { useState, useMemo } from 'react';
import { getThemeRecommendations } from './services/geminiService';
import { ThemeCategory, AIRecommendation } from './types';

interface ExtendedCategory extends ThemeCategory {
  price?: string;
  rating?: string;
  count?: string;
  badge?: string;
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
      {/* Header with Critical Improvements */}
      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-10">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-lg shadow-primary/10 border border-primary/20">
                <span className="material-symbols-outlined font-bold text-xl">rocket_launch</span>
              </div>
              <h1 className="text-xl font-black tracking-tight text-white hidden sm:block">THEME<span className="text-primary">MARKET</span></h1>
            </div>

            {/* Navigation with Mega Menu */}
            <nav className="hidden lg:flex items-center gap-1 h-20">
              
              {/* Item: Themes */}
              <div className="nav-item relative h-full flex items-center px-1">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all">
                  قالب‌های وردپرس
                  <span className="material-symbols-outlined text-xs opacity-50 group-hover:rotate-180 transition-transform">keyboard_arrow_down</span>
                </button>
                <div className="nav-link-indicator"></div>
                
                {/* Opaque Mega Menu Panel */}
                <div className="mega-menu-panel invisible opacity-0 absolute top-[100%] right-0 w-[800px] mt-2 p-8 rounded-[2.5rem] shadow-2xl scale-[0.98] blur-none">
                  <div className="grid grid-cols-3 gap-8 relative z-50">
                    <div className="col-span-2">
                      <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-6 border-b border-white/5 pb-2">دسته‌بندی‌های پیشنهادی</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { title: 'فروشگاهی و ووکامرس', icon: 'shopping_cart', desc: 'تم‌های اختصاصی تجارت آنلاین' },
                          { title: 'شرکتی و پورتفولیو', icon: 'business_center', desc: 'نمایش حرفه‌ای بیزینس شما' },
                          { title: 'آموزشی و LMS', icon: 'school', desc: 'مدیریت دوره‌های آموزشی' },
                          { title: 'خبری و مجله', icon: 'auto_stories', desc: 'بهینه‌شده برای محتوا' }
                        ].map((item, i) => (
                          <a key={i} href="#" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group/item border border-transparent hover:border-white/5">
                            <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-900 text-slate-400 group-hover/item:bg-primary/20 group-hover/item:text-primary transition-colors">
                              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
                              <div className="text-[11px] text-slate-500 leading-tight">{item.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-1 bg-gradient-to-br from-primary/20 to-transparent rounded-[2rem] p-7 border border-primary/10 flex flex-col justify-between">
                      <div>
                        <span className="bg-primary/30 text-primary text-[9px] font-black px-2 py-0.5 rounded-md uppercase mb-3 inline-block">HOT DEAL</span>
                        <h5 className="text-lg font-black text-white mb-2">پکیج ۲۰۲۵</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">دسترسی به تمام قالب‌های جدید سال با ۶۰٪ تخفیف ویژه.</p>
                      </div>
                      <button className="w-full h-11 rounded-xl bg-primary text-white text-xs font-black hover:bg-blue-600 transition-all shadow-xl shadow-primary/20">
                        مشاهده جشنواره
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item: Plugins */}
              <div className="nav-item relative h-full flex items-center px-1">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all">
                  افزونه‌ها
                  <span className="material-symbols-outlined text-xs opacity-50 group-hover:rotate-180 transition-transform">keyboard_arrow_down</span>
                </button>
                <div className="nav-link-indicator"></div>
                <div className="mega-menu-panel invisible opacity-0 absolute top-[100%] right-[-100px] w-[500px] mt-2 p-8 rounded-[2.5rem] shadow-2xl scale-[0.98]">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black text-accent-purple uppercase tracking-widest mb-4">ضروریات</h4>
                        {['بهینه‌سازی سئو', 'امنیت و فایروال', 'کش و سرعت'].map(p => (
                          <a key={p} href="#" className="block p-3 rounded-xl hover:bg-white/5 text-sm text-slate-300 hover:text-primary transition-all">{p}</a>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">صفحه‌سازها</h4>
                        {['المنتور پرو', 'ویژوال کامپوزر', 'ادآن‌های جانبی'].map(p => (
                          <a key={p} href="#" className="block p-3 rounded-xl hover:bg-white/5 text-sm text-slate-300 hover:text-emerald-500 transition-all">{p}</a>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              <a href="#" className="relative px-4 h-10 flex items-center rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all group">
                خدمات VIP
                <div className="nav-link-indicator"></div>
              </a>
              <a href="#" className="relative px-4 h-10 flex items-center rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all group">
                آکادمی
                <div className="nav-link-indicator"></div>
              </a>
            </nav>
          </div>

          {/* Header Action Bar */}
          <div className="flex items-center gap-4">
            {/* Redesigned Search Bar - Matches user screenshot style */}
            <div className="search-container relative hidden xl:flex items-center h-12 w-[340px] rounded-full px-4 gap-3">
               <span className="material-symbols-outlined text-slate-500 text-lg">search_spark</span>
               <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-slate-600 text-right font-medium" 
                placeholder="توصیف نیاز شما..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAISearch(e)}
              />
              <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                <div className="h-6 w-6 rounded-md bg-white/5 flex items-center justify-center text-slate-500 text-[10px] font-bold">⌘K</div>
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block"></div>
            <button className="h-11 rounded-full bg-white px-7 text-sm font-black text-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-lg shadow-white/5">
              ورود / ثبت‌نام
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-20 w-full max-w-[1400px] px-6">
        {/* Hero Section */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full glass-tag px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-primary border border-primary/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
              </span>
              پرمیوم‌ترین اکوسیستم وردپرس فارسی
            </div>
            <h2 className="text-6xl font-extrabold leading-[1.15] text-white md:text-8xl lg:text-9xl">
              انفجار خلاقیت در<br/>
              <span className="bg-gradient-to-l from-primary via-blue-400 to-accent-purple bg-clip-text text-transparent italic drop-shadow-2xl">وردپرس ۲۰۲۵</span>
            </h2>
            <p className="mt-10 text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl font-medium">
              ما ابزارهای موفقیت شما را فراهم می‌کنیم. طراحی‌های آوانگارد، پشتیبانی اولویت‌دار و لایسنس‌های ۱۰۰٪ اورجینال.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-4">
            {QUICK_FILTERS.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-2xl px-7 py-3.5 text-xs font-black transition-all border ${
                  selectedTag === tag 
                  ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/30' 
                  : 'glass-tag text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* AI Result Box */}
        {recommendation && (
          <div className="mb-20 rounded-[3rem] border border-primary/20 bg-primary/5 p-12 backdrop-blur-3xl animate-fade-in-up shadow-2xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-white shadow-2xl shadow-primary/40">
                <span className="material-symbols-outlined text-3xl">psychology_alt</span>
              </div>
              <div>
                <h4 className="text-2xl font-black text-white">تحلیل هوشمند AI</h4>
                <p className="text-sm text-primary/80">راهنمای هوشمند خرید بر اساس نیاز شما</p>
              </div>
            </div>
            <p className="text-slate-300 text-xl leading-relaxed border-r-4 border-primary/30 pr-8">{recommendation.reasoning}</p>
          </div>
        )}

        {/* The Bento Grid 2025 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          
          {/* Main Hero Bento Card */}
          {(selectedTag === 'همه' || selectedTag === 'مدرن') && (
            <div 
              className="bento-card group col-span-1 md:col-span-2 row-span-2 rounded-[3.5rem] p-12 flex flex-col justify-between animate-fade-in-up"
              style={{ animationDelay: `${(cardIndex++) * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden rounded-[3.5rem]">
                <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-primary rounded-full blur-[160px] animate-pulse"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-2xl">
                    <span className="material-symbols-outlined text-3xl font-black">all_inclusive</span>
                  </div>
                  <div className="glass-tag px-6 py-3 rounded-full text-xs font-black text-white uppercase tracking-wider">
                    Unlimited Access
                  </div>
                </div>
                <h3 className="text-5xl md:text-6xl font-black text-white leading-[1.05] mb-8">
                  اشتراک<br/>
                  <span className="bg-gradient-to-l from-primary to-blue-300 bg-clip-text text-transparent">الماس تم‌مارکت</span>
                </h3>
                <p className="text-slate-400 text-xl max-w-sm leading-relaxed mb-12">
                  دنیایی بدون محدودیت. دانلود نامحدود لایسنس‌های اورجینال برای تمام محصولات.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-8 mt-auto">
                <button className="h-16 rounded-[1.5rem] bg-primary px-12 text-sm font-black text-white shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:scale-105 active:scale-95">
                  شروع اشتراک الماس
                </button>
              </div>
            </div>
          )}

          {/* Dynamic Category Cards */}
          {filteredCategories.map((cat) => {
            const delay = (cardIndex++) * 0.1;
            
            if (cat.size === 'wide') {
              return (
                <div 
                  key={cat.id} 
                  className="bento-card group col-span-1 md:col-span-2 row-span-1 rounded-[3.5rem] p-12 flex flex-col justify-between animate-fade-in-up"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex flex-col gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                        <span className="material-symbols-outlined text-4xl">{cat.icon}</span>
                      </div>
                      <h3 className="text-3xl font-black text-white mt-2">{cat.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-end justify-between relative z-10 mt-12">
                    <p className="text-slate-400 text-lg max-w-[300px] leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="text-left bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-black text-slate-500 uppercase mb-1">شروع قیمت</div>
                      <div className="text-2xl font-black text-white">{cat.price}</div>
                    </div>
                  </div>
                  <a href={cat.link} className="absolute inset-0 z-20"></a>
                </div>
              );
            }

            return (
              <div 
                key={cat.id} 
                className="bento-card group col-span-1 row-span-1 rounded-[3rem] p-10 flex flex-col justify-between animate-fade-in-up"
                style={{ animationDelay: `${delay}s` }}
              >
                <div className="relative z-10">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-slate-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                    <span className="material-symbols-outlined text-4xl">{cat.icon}</span>
                  </div>
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl font-black text-white mb-2">{cat.title}</h3>
                  <p className="text-slate-500 text-base leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <a href={cat.link} className="absolute inset-0 z-20"></a>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="mt-48 border-t border-white/5 pt-24 pb-16 bg-black/40">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <p className="text-slate-600 font-bold text-sm tracking-widest uppercase">
            © ۲۰۲۴-۲۰۲۵ THEMEMARKET. کلیه حقوق محفوظ است.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
