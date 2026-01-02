
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
      {/* Header - Glass Style */}
      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-lg shadow-primary/10">
                <span className="material-symbols-outlined font-bold">rocket_launch</span>
              </div>
              <h1 className="text-xl font-black tracking-tight text-white">THEME<span className="text-primary">MARKET</span></h1>
            </div>
            <nav className="hidden lg:flex items-center gap-8">
              {['محصولات', 'اکوسیستم', 'پلن‌های ویژه', 'آکادمی'].map(item => (
                <a key={item} href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">{item}</a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleAISearch} className="relative hidden md:block">
              <input 
                className="h-10 w-64 rounded-xl border border-white/10 bg-white/5 px-10 text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-500" 
                placeholder="جستجوی هوشمند..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-500 text-sm">
                {isLoading ? 'autorenew' : 'search'}
              </span>
            </form>
            <button className="h-10 rounded-xl bg-white px-6 text-sm font-bold text-black hover:bg-slate-200 transition-colors">ورود</button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-12 w-full max-w-[1400px] px-6">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-tag px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              ترندهای ۲۰۲۵ هم‌اکنون در دسترس است
            </div>
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              خالق دنیای <span className="bg-gradient-to-l from-primary to-accent-purple bg-clip-text text-transparent">دیجیتال</span> خود باشید
            </h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
              مجموعه‌ای دست‌چین شده از قالب‌های وردپرس با استانداردهای سال ۲۰۲۵. سرعت خیره‌کننده، کدنویسی تمیز و طراحی آوانگارد.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all border ${
                  selectedTag === tag 
                  ? 'bg-primary border-primary text-white' 
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
          <div className="mb-12 rounded-3xl border border-primary/20 bg-primary/5 p-8 backdrop-blur-md animate-fade-in-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div>
                <h4 className="font-bold text-white">پاسخ هوش مصنوعی</h4>
                <p className="text-xs text-primary/80">بر اساس نیاز شما تحلیل شد</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">{recommendation.reasoning}</p>
          </div>
        )}

        {/* The Bento Grid 2025 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          
          {/* Main Hero Bento Card */}
          {(selectedTag === 'همه' || selectedTag === 'مدرن') && (
            <div 
              className="bento-card group col-span-1 md:col-span-2 row-span-2 rounded-[2.5rem] p-10 flex flex-col justify-between animate-fade-in-up"
              style={{ animationDelay: `${(cardIndex++) * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden rounded-[2.5rem]">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 -left-24 w-64 h-64 bg-accent-purple rounded-full blur-[100px]"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
                    <span className="material-symbols-outlined text-3xl font-bold">diamond</span>
                  </div>
                  <div className="glass-tag px-4 py-2 rounded-full text-[11px] font-black text-white uppercase tracking-tighter">
                    Premium Collection
                  </div>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6">
                  دسترسی بی‌پایان به<br/>
                  <span className="text-primary">تمام قالب‌ها</span>
                </h3>
                <p className="text-slate-400 text-lg max-w-sm leading-relaxed mb-8">
                  با اشتراک ویژه تم‌مارکت، محدودیت‌ها را کنار بگذارید و به آرشیو کامل محصولات دسترسی داشته باشید.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-6 mt-12">
                <button className="h-14 rounded-2xl bg-primary px-10 text-sm font-black text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 active:scale-95">
                  شروع کنید
                </button>
                <div className="flex -space-x-4 space-x-reverse">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/40?img=${i+10}`} alt="user" />
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-background-dark bg-primary flex items-center justify-center text-[10px] font-bold text-white">+۵ک</div>
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
                  className="bento-card group col-span-1 md:col-span-2 row-span-1 rounded-[2.5rem] p-8 flex flex-col justify-between animate-fade-in-up"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex flex-col gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                      </div>
                      <h3 className="text-2xl font-black text-white mt-2">{cat.title}</h3>
                    </div>
                    {cat.badge && (
                      <span className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-end justify-between relative z-10 mt-8">
                    <p className="text-slate-400 text-sm max-w-[240px] leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">شروع قیمت</div>
                      <div className="text-xl font-black text-white">{cat.price}</div>
                    </div>
                  </div>
                  <a href={cat.link} className="absolute inset-0 z-20"></a>
                </div>
              );
            }

            // Small Squared Bento Cards
            return (
              <div 
                key={cat.id} 
                className="bento-card group col-span-1 row-span-1 rounded-[2.5rem] p-8 flex flex-col justify-between animate-fade-in-up"
                style={{ animationDelay: `${delay}s` }}
              >
                <div className="relative z-10">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-300 group-hover:scale-110 group-hover:text-white transition-all duration-500`}>
                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                  </div>
                </div>

                <div className="relative z-10 mt-12">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black text-white">{cat.title}</h3>
                    <span className="text-[10px] font-bold text-primary">{cat.count}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                
                <div className="mt-4 flex gap-2">
                  {cat.tags?.slice(0, 1).map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-slate-600 bg-white/5 px-2 py-0.5 rounded-md">#{tag}</span>
                  ))}
                </div>
                <a href={cat.link} className="absolute inset-0 z-20"></a>
              </div>
            );
          })}

          {/* Special Support Bento Card */}
          <div 
            className="bento-card group col-span-1 md:col-span-2 row-span-1 rounded-[2.5rem] p-8 bg-gradient-to-bl from-accent-purple/10 to-transparent flex items-center justify-between animate-fade-in-up"
            style={{ animationDelay: `${(cardIndex++) * 0.1}s` }}
          >
            <div className="flex items-center gap-6 relative z-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent-purple/20 text-accent-purple group-hover:rotate-12 transition-all">
                <span className="material-symbols-outlined text-4xl">support_agent</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">پشتیبانی VIP</h3>
                <p className="text-slate-400 text-sm mt-1">مشاوره اختصاصی برای توسعه پروژه‌های شما.</p>
              </div>
            </div>
            <button className="hidden sm:block h-12 rounded-2xl glass-tag px-6 text-xs font-black text-white hover:bg-white hover:text-black transition-all">
              درخواست مشاوره
            </button>
          </div>

        </div>

        {filteredCategories.length === 0 && (
          <div className="mt-20 flex flex-col items-center justify-center py-20 animate-fade-in">
             <div className="text-slate-800 mb-6">
                <span className="material-symbols-outlined text-8xl">search_off</span>
             </div>
             <p className="text-xl font-bold text-slate-400">قالبی در این دسته‌بندی پیدا نشد</p>
             <button onClick={() => setSelectedTag('همه')} className="mt-4 text-primary font-bold hover:underline">بازگشت به همه دسته‌ها</button>
          </div>
        )}
      </main>

      <footer className="mt-32 border-t border-white/5 pt-12 text-center">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 text-right">
             <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-sm">rocket_launch</span>
                  </div>
                  <h5 className="font-black text-white">تم‌مارکت</h5>
                </div>
                <p className="text-slate-500 text-sm max-w-xs">مرجع تخصصی تهیه و بومی‌سازی قالب‌های وردپرس با بالاترین استانداردهای جهانی.</p>
             </div>
             <div className="flex gap-12">
                <div className="flex flex-col gap-4">
                   <span className="text-xs font-black text-white uppercase tracking-widest">محصولات</span>
                   <a href="#" className="text-xs text-slate-500 hover:text-white">جدیدترین‌ها</a>
                   <a href="#" className="text-xs text-slate-500 hover:text-white">پر‌فروش‌ها</a>
                </div>
                <div className="flex flex-col gap-4">
                   <span className="text-xs font-black text-white uppercase tracking-widest">شرکت</span>
                   <a href="#" className="text-xs text-slate-500 hover:text-white">درباره ما</a>
                   <a href="#" className="text-xs text-slate-500 hover:text-white">تماس</a>
                </div>
             </div>
          </div>
          <p className="text-slate-600 text-[11px] font-bold pb-12">
            تمامی حقوق مادی و معنوی نزد تم‌مارکت محفوظ است. ۲۰۲۴-۲۰۲۵
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
