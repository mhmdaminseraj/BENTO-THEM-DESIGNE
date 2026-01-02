
import { ThemeCategory } from './types';

export interface ExtendedCategory extends ThemeCategory {
  price?: string;
  rating?: string;
  count?: string;
  badge?: string;
}

export interface FeaturedTheme {
  id: string;
  name: string;
  tagline: string;
  image: string;
  price: string;
  points: string[];
  badge: string;
  color: string;
}

export const CATEGORIES: ExtendedCategory[] = [
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
    badge: 'پیشنهاد ۲۰۲۵'
  },
  {
    id: 'corporate',
    title: 'کسب‌و‌کار مدرن',
    description: 'طراحی مینیمال برای برندهای پیشرو و استارتاپ‌ها.',
    icon: 'account_balance',
    color: 'emerald-500',
    tags: ['المانتور', 'شرکتی'],
    size: 'small',
    link: '#',
  },
  {
    id: 'portfolio',
    title: 'استودیو خلاق',
    description: 'نمایش نمونه‌کار با انیمیشن‌های سینمایی و تعاملی.',
    icon: 'auto_awesome_motion',
    color: 'accent-purple',
    tags: ['فری‌لنسری', 'هنری'],
    size: 'small',
    link: '#',
    badge: 'جدید'
  },
  {
    id: 'blog',
    title: 'مجله دیجیتال',
    description: 'بهینه‌ترین ساختار برای سئو، خوانایی و نرخ تعامل بالا.',
    icon: 'menu_book',
    color: 'orange-500',
    tags: ['خبری', 'بلاگ'],
    size: 'small',
    link: '#',
  },
  {
    id: 'landing',
    title: 'لندینگ پیج',
    description: 'ساخته شده برای بالاترین نرخ تبدیل و کمپین‌های تبلیغاتی.',
    icon: 'ads_click',
    color: 'rose-500',
    tags: ['تبلیغاتی', 'استارتاپ'],
    size: 'small',
    link: '#',
  }
];

export const FEATURED_THEMES: FeaturedTheme[] = [
  {
    id: 'f1',
    name: 'Astra Pro 2025',
    tagline: 'سریع‌ترین تم وردپرس برای حرفه‌ای‌ها',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    price: '۱,۴۸۰,۰۰۰ تومان',
    points: ['سئو عالی', 'سازگار با تمام صفحه‌سازها', 'بیش از ۲۰۰ دموی آماده'],
    badge: 'پرفروش',
    color: 'primary'
  },
  {
    id: 'f2',
    name: 'WoodMart Ultra',
    tagline: 'پادشاه بی‌رقیب فروشگاه‌های ووکامرس فارسی',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    price: '۲,۲۰۰,۰۰۰ تومان',
    points: ['پنل تنظیمات فارسی', 'اپلیکیشن اختصاصی موبایل', 'هدر ساز جادویی'],
    badge: 'VIP',
    color: 'accent-purple'
  },
  {
    id: 'f3',
    name: 'Avada Creative',
    tagline: 'پک کامل طراحی برای آژانس‌های خلاق',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800',
    price: '۱,۹۵۰,۰۰۰ تومان',
    points: ['طراحی چندمنظوره', 'لایبرری اختصاصی فیوژن', 'آپدیت مادام‌العمر'],
    badge: 'پیشنهادی',
    color: 'emerald-500'
  }
];

export const QUICK_FILTERS = ['همه', 'ووکامرس', 'المانتور', 'React', 'جدید', 'مدرن'];
