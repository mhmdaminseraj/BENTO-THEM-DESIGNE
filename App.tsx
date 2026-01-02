
import React, { useState, useMemo } from 'react';
import { getThemeRecommendations } from './services/geminiService';
import { ThemeCategory, AIRecommendation } from './types';

// داده‌های نمونه فارسی شده با برچسب‌های اضافه شده
const CATEGORIES: ThemeCategory[] = [
  {
    id: 'ecommerce',
    title: 'قالب‌های فروشگاهی',
    description: 'طراحی‌های با نرخ تبدیل بالا برای فروشگاه‌های مدرن.',
    icon: 'shopping_cart',
    color: 'primary',
    tags: ['ووکامرس', 'شاپیفای', 'فروشگاهی'],
    size: 'wide',
    link: '#'
  },
  {
    id: 'blog',
    title: 'وبلاگ و مجله',
    description: 'چیدمان‌های تحریریه برای تولیدکنندگان محتوا.',
    icon: 'article',
    color: 'purple-600',
    tags: ['وردپرس', 'خبری', 'شخصی'],
    size: 'small',
    link: '#'
  },
  {
    id: 'portfolio',
    title: 'نمونه‌کار',
    description: 'کارهای خود را با استایل خاص به نمایش بگذارید.',
    icon: 'gallery_thumbnail',
    color: 'pink-600',
    tags: ['مینیمال', 'هنری', 'رزومه'],
    size: 'small',
    link: '#'
  },
  {
    id: 'corporate',
    title: 'شرکتی',
    description: 'قالب‌های بیزینسی حرفه‌ای.',
    icon: 'business_center',
    color: 'emerald-600',
    tags: ['المانتور', 'بیزینس', 'رسمی'],
    size: 'small',
    link: '#'
  },
  {
    id: 'landing',
    title: 'صفحات فرود',
    description: 'تک‌صفحه‌ای‌های تاثیرگذار.',
    icon: 'rocket_launch',
    color: 'orange-600',
    tags: ['بازاریابی', 'مدرن', 'تبلیغاتی'],
    size: 'small',
    link: '#'
  }
];

// لیست تگ‌های فیلتر سریع
const QUICK_FILTERS = ['همه', 'ووکامرس', 'شاپیفای', 'وردپرس', 'المانتور', 'مینیمال', 'مدرن'];

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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = useMemo(() => {
    if (selectedTag === 'همه') return CATEGORIES;
    return CATEGORIES.filter(cat => 
      cat.tags?.some(tag => tag.includes(selectedTag) || selectedTag.includes(tag))
    );
  }, [selectedTag]);

  // Helper to calculate animation index
  let cardIndex = 0;

  return (
    <div className="flex flex-col min-h-screen">
      {/* هدر سایت */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#232948] px-4 md:px-10 py-3 bg-[#111422] z-50 sticky top-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="size-8 flex items-center justify-center rounded-lg bg-primary/20 text-primary">
              <span className="material-symbols-outlined">layers</span>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">تم‌مارکت</h2>
          </div>
          <nav className="hidden md:flex items-center gap-9">
            <a className="text-white text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">پوسته‌ها</a>
            <a className="text-white text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">قالب‌ها</a>
            <a className="text-white text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">قیمت‌گذاری</a>
            <a className="text-white text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">پشتیبانی</a>
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-4 md:gap-8">
          <form onSubmit={handleAISearch} className="hidden md:flex flex-col min-w-40 !h-10 max-w-64 group">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden bg-[#232948]">
              <div className="text-[#929bc9] flex items-center justify-center pr-4 group-focus-within:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  {isLoading ? 'settings_suggest' : 'search'}
                </span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-white placeholder:text-[#929bc9] px-4 pr-2 text-sm font-normal text-right" 
                placeholder="قالب رویایی خود را توصیف کنید..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal hover:bg-blue-600 transition-colors">
            <span className="truncate">ورود</span>
          </button>
        </div>
      </header>

      <main className="layout-container flex grow flex-col w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-12">
        <div className="flex flex-col py-10">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
                اکوسیستم‌های <span className="text-primary">طراحی برگزیده</span>
              </h1>
              <p className="text-text-secondary text-lg font-normal leading-normal max-w-2xl">
                قالب‌های حرفه‌ای ساخته شده برای عملکرد، مقیاس‌پذیری و فروش بالا.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-text-secondary text-sm font-medium ml-2 whitespace-nowrap">فیلتر سریع:</span>
            {QUICK_FILTERS.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setRecommendation(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                  selectedTag === tag 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-[#232948] border-[#343b5c] text-text-secondary hover:text-white hover:border-[#4a5482]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {recommendation && (
          <div className="mb-10 p-6 rounded-2xl bg-primary/10 border border-primary/20 animate-fade-in text-right">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white">auto_awesome</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-white font-bold mb-1">پیشنهاد هوش مصنوعی برای: "{searchQuery}"</h4>
                  <button onClick={() => { setRecommendation(null); setSearchQuery(''); }} className="text-xs text-text-secondary hover:text-white">بستن</button>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{recommendation.reasoning}</p>
                <div className="flex gap-2 flex-wrap">
                  {recommendation.suggestedCategories.map(cat => (
                    <span key={cat} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* شبکه بنتو با انیمیشن‌های متوالی */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full auto-rows-min min-h-[400px]">
          
          {(selectedTag === 'همه' || selectedTag === 'فروشگاهی') && (
            <div 
              key={`featured-${selectedTag}`}
              className="bento-card animate-fade-in-up col-span-1 md:col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-card-dark group min-h-[360px] md:min-h-full"
              style={{ animationDelay: `${(cardIndex++) * 0.1}s` }}
            >
              <div className="absolute inset-0 z-0">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuASroPn0ZdKDwTef37aRJBvPj9g8yPudMTjrW4OQuBxnOIgaO5nwO5KHOvQkleLJQKU8rIFrAYr92ec27KZBausam6MsrvCAcTipx2P919cP6h0kvmHy3PMNhcYayRqGXjyUfzmjj_DFO81erfh3GIfrmH8sRzHVjlLBJjT10f9C07ajK51CO4DkdGVfhsNFfIiIRFbFS_Exx0zBJwRUxq9PsX6_OqWRA9npLJ5ZFVIAEuIPzWLRv7wUt7h_6zWt5Vs1U56yuFxl8Y')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111422] via-[#111422]/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#111422]/90 to-transparent"></div>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8 text-right">
                <div className="mb-auto">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary border border-primary/20 mb-4 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    محبوب‌ترین
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">اشتراک دسترسی کامل</h3>
                <p className="text-gray-300 text-base mb-6 max-w-md leading-relaxed">
                  به کل کاتالوگ ۵۰۰+ تم و قالب ما دسترسی پیدا کنید. شامل پشتیبانی اولویت‌دار.
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-blue-900/50 hover:bg-blue-600 transition-all">
                    مشاهده پکیج
                  </button>
                  <span className="text-sm font-medium text-white">۱۹۹ هزار تومان / سالانه</span>
                </div>
              </div>
            </div>
          )}

          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => {
              const delay = (cardIndex++) * 0.1;
              
              if (cat.id === 'ecommerce' && cat.size === 'wide' && (selectedTag === 'همه' || selectedTag === 'ووکامرس' || selectedTag === 'شاپیفای')) {
                return (
                  <div 
                    key={`${cat.id}-${selectedTag}`} 
                    className="bento-card animate-fade-in-up col-span-1 md:col-span-2 row-span-1 rounded-2xl bg-card-dark border border-[#232948] p-6 relative overflow-hidden group"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <div className="absolute left-0 top-0 w-64 h-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 h-full relative z-10 text-right">
                      <div className="flex flex-col gap-3">
                        <div className={`size-12 rounded-lg bg-[#232948] flex items-center justify-center text-white mb-1 group-hover:bg-primary transition-colors duration-300`}>
                          <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                          <p className="text-text-secondary text-sm mt-1">{cat.description}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap mt-2">
                          {cat.tags?.map(t => (
                            <span key={t} className={`px-2 py-1 rounded bg-[#111422] border border-[#232948] text-[10px] ${selectedTag === t ? 'text-primary border-primary' : 'text-text-secondary'}`}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0 mt-4 md:mt-0">
                        <div 
                          className="w-32 h-24 rounded-lg bg-cover bg-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300 border border-[#232948]" 
                          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0R6R75WZT057JnvwTb4a7FCSNIlYdeJFy-L_MZrG-xQix6kFBgNKORarjsR4DZFKupVeGHwjOtl0Ik9vPiH920jiiubuMXZaGpxwefMByu8hNAVWE1t510rN6N8RMCX0j2-HvP-y38NgsfIoHqKB_Qv4D4vL3LScBzg3Jvsyldf4mwMPhK-Rdrf2PhHFXWMpzBi5DoZwMfmrWoBlslwgpxarZna9KRgL3pbA3Y7WeFJzkBo21Eyvtx5JUgQ9hRvTGAvfX4PUDbis')` }}
                        />
                      </div>
                    </div>
                    <a aria-label={`Browse ${cat.title}`} className="absolute inset-0 z-20" href={cat.link}></a>
                  </div>
                );
              }

              if (cat.id !== 'ecommerce') {
                return (
                  <div 
                    key={`${cat.id}-${selectedTag}`} 
                    className="bento-card animate-fade-in-up col-span-1 row-span-1 rounded-2xl bg-card-dark border border-[#232948] p-6 flex flex-col justify-between group relative overflow-hidden text-right"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <div className={`absolute -left-4 -top-4 w-24 h-24 bg-${cat.color}/10 rounded-full blur-2xl group-hover:bg-${cat.color}/20 transition-all`}></div>
                    <div className="flex justify-between items-start">
                      <div className={`size-10 rounded-lg bg-[#232948] flex items-center justify-center text-white group-hover:bg-${cat.color === 'primary' ? 'primary' : cat.color} transition-colors duration-300`}>
                        <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                      </div>
                      <span className="material-symbols-outlined text-gray-600 group-hover:text-white transition-colors rotate-180">arrow_outward</span>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-white group-hover:-translate-x-1 transition-transform">{cat.title}</h3>
                      <p className="text-text-secondary text-xs mt-1 mb-3">{cat.description}</p>
                      <div className="flex gap-1 flex-wrap">
                        {cat.tags?.slice(0, 2).map(t => (
                          <span key={t} className={`px-1.5 py-0.5 rounded text-[10px] bg-[#111422] border border-[#232948] ${selectedTag === t ? 'text-primary border-primary' : 'text-gray-500'}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a aria-label={`Browse ${cat.title}`} className="absolute inset-0 z-20" href={cat.link}></a>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <div className="col-span-full py-20 text-center animate-fade-in flex flex-col items-center justify-center bg-card-dark/30 rounded-3xl border border-dashed border-[#232948]">
              <span className="material-symbols-outlined text-gray-600 text-[64px] mb-4">search_off</span>
              <p className="text-text-secondary">متاسفیم، قالبی با برچسب "{selectedTag}" پیدا نشد.</p>
              <button onClick={() => setSelectedTag('همه')} className="mt-4 text-primary font-bold hover:underline">مشاهده همه دسته‌بندی‌ها</button>
            </div>
          )}

          <div 
            key={`custom-${selectedTag}`}
            className="bento-card animate-fade-in-up col-span-1 md:col-span-2 row-span-1 rounded-2xl bg-gradient-to-bl from-[#191e33] to-[#12141f] border border-[#232948] p-6 relative overflow-hidden flex items-center justify-between group text-right"
            style={{ animationDelay: `${(cardIndex++) * 0.1}s` }}
          >
            <div className="flex items-center gap-6 z-10">
              <div className="size-14 rounded-full bg-[#232948] flex flex-shrink-0 items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">support_agent</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">نیاز به شخصی‌سازی دارید؟</h3>
                <p className="text-text-secondary text-sm mt-1 max-w-sm">توسعه‌دهندگان خبره ما می‌توانند به شما در شخصی‌سازی قالب‌ها کمک کنند.</p>
              </div>
            </div>
            <div className="z-10 hidden sm:block">
              <button className="px-5 py-2 rounded-lg bg-[#232948] hover:bg-white hover:text-black text-white text-sm font-medium transition-colors border border-[#343b5c] hover:border-white">
                دریافت پشتیبانی
              </button>
            </div>
            <div className="absolute left-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <svg fill="none" height="200" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0ZM100 17.3913C54.3787 17.3913 17.3913 54.3787 17.3913 100C17.3913 145.621 54.3787 182.609 100 182.609C145.621 182.609 182.609 145.621 182.609 100C182.609 54.3787 145.621 17.3913 100 17.3913Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>

        </div>
      </main>

      <footer className="mt-auto border-t border-[#232948] py-8 text-center bg-[#111422]">
        <p className="text-text-secondary text-sm">© ۲۰۲۴ اکوسیستم‌های تم‌مارکت. تمامی حقوق محفوظ است.</p>
      </footer>
    </div>
  );
};

export default App;
