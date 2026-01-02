
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
      {/* Header with Professional Mega Menu */}
      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-lg shadow-primary/10">
                <span className="material-symbols-outlined font-bold text-2xl">rocket_launch</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white">THEME<span className="text-primary">MARKET</span></h1>
            </div>

            {/* Navigation Items */}
            <nav className="hidden lg:flex items-center gap-2 h-20">
              
              {/* Mega Menu Item: WordPress Themes */}
              <div className="nav-item relative h-full flex items-center group">
                <button className="flex items-center gap-1.5 px-4 h-10 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                  قالب‌های وردپرس
                  <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform">expand_more</span>
                </button>
                
                {/* Mega Menu Panel */}
                <div className="mega-menu-panel invisible opacity-0 absolute top-[100%] right-0 w-[800px] mt-2 p-8 rounded-[2.5rem] shadow-2xl scale-[0.95]">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Column 1: Categories */}
                    <div className="col-span-2">
                      <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-6 border-b border-white/5 pb-2">دسته‌بندی‌های برتر</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { title: 'فروشگاهی و ووکامرس', icon: 'shopping_cart', desc: 'قالب‌های فوق سریع فروشگاهی' },
                          { title: 'شرکتی و بیزینس', icon: 'business_center', desc: 'برای برندهای معتبر و استارتاپ‌ها' },
                          { title: 'آموزشی و LMS', icon: 'school', desc: 'سیستم‌های مدیریت آموزش آنلاین' },
                          { title: 'خبری و بلاگ', icon: 'auto_stories', desc: 'بهینه‌شده برای سئو و محتوا' },
                          { title: 'پورتفولیو و هنری', icon: 'palette', desc: 'نمایش خلاقانه نمونه‌کارها' },
                          { title: 'املاک و آگهی', icon: 'home_work', desc: 'دایرکتوری و رزرو آنلاین' }
                        ].map((item, i) => (
                          <a key={i} href="#" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group/item">
                            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 group-hover/item:bg-primary/20 group-hover/item:text-primary transition-colors">
                              <span className="material-symbols-outlined text-xl">{item.icon}</span>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
                              <div className="text-[11px] text-slate-500">{item.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    {/* Column 2: Featured Promo */}
                    <div className="col-span-1 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl p-6 border border-primary/10 flex flex-col justify-between">
                      <div>
                        <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase mb-4 inline-block">پیشنهاد هفته</span>
                        <h5 className="text-lg font-black text-white mb-2 leading-tight">پکیج طلایی المنتور ۲۰۲۵</h5>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">بیش از ۵۰ دموی آماده برای صفحه‌ساز المنتور با لایسنس اصلی.</p>
                      </div>
                      <button className="w-full h-11 rounded-xl bg-white text-black text-xs font-black hover:bg-primary hover:text-white transition-all shadow-lg shadow-white/5">
                        مشاهده و دانلود
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mega Menu Item: Plugins */}
              <div className="nav-item relative h-full flex items-center group">
                <button className="flex items-center gap-1.5 px-4 h-10 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                  افزونه‌ها
                  <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform">expand_more</span>
                </button>
                
                <div className="mega-menu-panel invisible opacity-0 absolute top-[100%] right-[-100px] w-[600px] mt-2 p-8 rounded-[2.5rem] shadow-2xl scale-[0.95]">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-accent-purple uppercase tracking-widest mb-4">ابزارهای کاربردی</h4>
                      {['بهینه‌ساز سئو (Yoast)', 'امنیت وردپرس (Wordfence)', 'افزایش سرعت و کش', 'فرم‌سازهای پیشرفته'].map(p => (
                        <a key={p} href="#" className="block p-3 rounded-xl hover:bg-white/5 text-sm text-slate-300 hover:text-primary transition-all">
                          {p}
                        </a>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4">صفحه‌سازها</h4>
                      {['المنتور پرو (Original)', 'ویژوال کامپوزر', 'افزونه‌های جانبی المنتور', 'آسترا پرو'].map(p => (
                        <a key={p} href="#" className="block p-3 rounded-xl hover:bg-white/5 text-sm text-slate-300 hover:text-emerald-500 transition-all">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <a href="#" className="px-4 h-10 flex items-center rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">خدمات VIP</a>
              <a href="#" className="px-4 h-10 flex items-center rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">آکادمی</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleAISearch} className="relative hidden xl:block">
              <input 
                className="h-11 w-72 rounded-xl border border-white/10 bg-white/5 px-10 text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-500 text-right" 
                placeholder="توصیف کنید تا هوش مصنوعی پیدا کند..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-3 top-3 text-slate-500 text-lg">
                {isLoading ? 'autorenew' : 'search_spark'}
              </span>
            </form>
            <div className="h-11 w-px bg-white/10 mx-2 hidden sm:block"></div>
            <button className="h-11 rounded-xl bg-white px-8 text-sm font-black text-black hover:bg-primary hover:text-white transition-all shadow-xl shadow-white/5">ورود / ثبت‌نام</button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-16 w-full max-w-[1400px] px-6">
        {/* Hero Section */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full glass-tag px-5 py-2 text-[11px] font-black uppercase tracking-widest text-primary">
              <span className="material-symbols-outlined text-sm">verified</span>
              آپدیت‌های زمستانه ۲۰۲۵ آماده دانلود است
            </div>
            <h2 className="text-5xl font-extrabold leading-tight text-white md:text-7xl lg:text-8xl">
              انفجار خلاقیت در<br/>
              <span className="bg-gradient-to-l from-primary via-blue-400 to-accent-purple bg-clip-text text-transparent italic">وردپرس مدرن</span>
            </h2>
            <p className="mt-8 text-xl text-slate-400 leading-relaxed max-w-2xl">
              ما فقط قالب نمی‌فروشیم؛ ما ابزارهای موفقیت شما را در دنیای دیجیتال فراهم می‌کنیم. طراحی‌های آوانگارد، پشتیبانی ۲۴ ساعته و لایسنس‌های اورجینال.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {QUICK_FILTERS.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-2xl px-6 py-3 text-xs font-black transition-all border ${
                  selectedTag === tag 
                  ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
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
          <div className="mb-16 rounded-[2.5rem] border border-primary/20 bg-primary/5 p-10 backdrop-blur-3xl animate-fade-in-up">
            <div className="flex items-center gap-5 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-primary text-white shadow-2xl shadow-primary/40">
                <span className="material-symbols-outlined text-2xl">auto_awesome</span>
              </div>
              <div>
                <h4 className="text-xl font-black text-white">تحلیل هوشمند درخواست شما</h4>
                <p className="text-sm text-primary/80">هوش مصنوعی تم‌مارکت در حال راهنمایی شماست</p>
              </div>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed border-r-2 border-primary/30 pr-6">{recommendation.reasoning}</p>
          </div>
        )}

        {/* The Bento Grid 2025 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          
          {/* Main Hero Bento Card */}
          {(selectedTag === 'همه' || selectedTag === 'مدرن') && (
            <div 
              className="bento-card group col-span-1 md:col-span-2 row-span-2 rounded-[3rem] p-12 flex flex-col justify-between animate-fade-in-up"
              style={{ animationDelay: `${(cardIndex++) * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden rounded-[3rem]">
                <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-primary rounded-full blur-[160px] animate-pulse"></div>
                <div className="absolute bottom-0 -left-32 w-80 h-80 bg-accent-purple rounded-full blur-[140px]"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-2xl">
                    <span className="material-symbols-outlined text-3xl font-black">all_inclusive</span>
                  </div>
                  <div className="glass-tag px-5 py-2.5 rounded-full text-[12px] font-black text-white uppercase tracking-tighter">
                    Access Unlimited 2025
                  </div>
                </div>
                <h3 className="text-5xl md:text-6xl font-black text-white leading-[1.05] mb-8">
                  اشتراک<br/>
                  <span className="bg-gradient-to-l from-primary to-blue-300 bg-clip-text text-transparent">الماس تم‌مارکت</span>
                </h3>
                <p className="text-slate-400 text-xl max-w-sm leading-relaxed mb-10">
                  بدون محدودیت دانلود کنید. لایسنس‌های اورجینال و آپدیت خودکار برای تمام محصولات.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-8 mt-auto">
                <button className="h-16 rounded-[1.25rem] bg-primary px-12 text-sm font-black text-white shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:scale-105 active:scale-95">
                  خرید اشتراک سالانه
                </button>
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg">۵,۲۰۰+ کاربر</span>
                  <span className="text-slate-500 text-xs">در حال استفاده از اشتراک الماس</span>
                </div>
              </div>
            </div>
          )}

          {/* Featured Dynamic Card */}
          {filteredCategories.map((cat) => {
            const delay = (cardIndex++) * 0.1;
            
            if (cat.size === 'wide') {
              return (
                <div 
                  key={cat.id} 
                  className="bento-card group col-span-1 md:col-span-2 row-span-1 rounded-[3rem] p-10 flex flex-col justify-between animate-fade-in-up"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex flex-col gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                        <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                      </div>
                      <h3 className="text-3xl font-black text-white mt-2">{cat.title}</h3>
                    </div>
                    {cat.badge && (
                      <span className="bg-primary/20 text-primary text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-sm">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-end justify-between relative z-10 mt-10">
                    <p className="text-slate-400 text-base max-w-[280px] leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">قیمت لایسنس</div>
                      <div className="text-2xl font-black text-white bg-white/5 px-4 py-1 rounded-xl">{cat.price}</div>
                    </div>
                  </div>
                  <a href={cat.link} className="absolute inset-0 z-20"></a>
                </div>
              );
            }

            return (
              <div 
                key={cat.id} 
                className="bento-card group col-span-1 row-span-1 rounded-[2.5rem] p-10 flex flex-col justify-between animate-fade-in-up"
                style={{ animationDelay: `${delay}s` }}
              >
                <div className="relative z-10">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                    <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-black text-white">{cat.title}</h3>
                    <span className="text-[11px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-lg">{cat.count}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                
                <a href={cat.link} className="absolute inset-0 z-20"></a>
              </div>
            );
          })}

          {/* Special Support Bento Card */}
          <div 
            className="bento-card group col-span-1 md:col-span-2 row-span-1 rounded-[3rem] p-10 bg-gradient-to-bl from-accent-purple/10 to-transparent flex items-center justify-between animate-fade-in-up"
            style={{ animationDelay: `${(cardIndex++) * 0.1}s` }}
          >
            <div className="flex items-center gap-8 relative z-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-accent-purple/20 text-accent-purple group-hover:rotate-12 transition-all shadow-2xl shadow-accent-purple/20">
                <span className="material-symbols-outlined text-5xl">support_agent</span>
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">پشتیبانی VIP</h3>
                <p className="text-slate-400 text-base mt-2">کانال اختصاصی تلگرام برای خریداران ویژه.</p>
              </div>
            </div>
            <button className="hidden sm:block h-14 rounded-2xl glass-tag px-8 text-xs font-black text-white hover:bg-white hover:text-black transition-all">
              ارسال تیکت
            </button>
          </div>

        </div>
      </main>

      <footer className="mt-40 border-t border-white/5 pt-20 pb-12 text-center bg-black/20">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-20 text-right">
             <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">rocket_launch</span>
                  </div>
                  <h5 className="text-2xl font-black text-white uppercase tracking-tight">THEME<span className="text-primary">MARKET</span></h5>
                </div>
                <p className="text-slate-500 text-base max-w-sm leading-relaxed">بزرگترین اکوسیستم فارسی محصولات وردپرس. ما به شما کمک می‌کنیم تا سریع‌تر، امن‌تر و زیباتر بسازید.</p>
             </div>
             <div className="grid grid-cols-2 lg:grid-cols-3 gap-20">
                <div className="flex flex-col gap-6">
                   <span className="text-sm font-black text-white uppercase tracking-widest border-r-2 border-primary pr-3">محصولات</span>
                   <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">قالب‌های فروشگاهی</a>
                   <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">قالب‌های شرکتی</a>
                   <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">افزونه‌های المنتور</a>
                </div>
                <div className="flex flex-col gap-6">
                   <span className="text-sm font-black text-white uppercase tracking-widest border-r-2 border-accent-purple pr-3">پشتیبانی</span>
                   <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">ارسال تیکت</a>
                   <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">قوانین و مقررات</a>
                   <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">پرسش‌های متداول</a>
                </div>
             </div>
          </div>
          <p className="text-slate-600 text-xs font-bold border-t border-white/5 pt-12">
            تمامی حقوق مادی و معنوی نزد تم‌مارکت محفوظ است. طراحی و توسعه ۲۰۲۵
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
