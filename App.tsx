
import React, { useState, useMemo, useEffect } from 'react';
import { getThemeRecommendations } from './services/geminiService';
import { AIRecommendation } from './types';
import { CATEGORIES, FEATURED_THEMES, QUICK_FILTERS } from './data';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('theme_search_query') || '');
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(() => {
    const saved = localStorage.getItem('theme_ai_recommendation');
    try { return saved ? JSON.parse(saved) : null; } catch { return null; }
  });
  const [selectedTag, setSelectedTag] = useState('همه');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => { localStorage.setItem('theme_search_query', searchQuery); }, [searchQuery]);
  useEffect(() => {
    if (recommendation) localStorage.setItem('theme_ai_recommendation', JSON.stringify(recommendation));
    else localStorage.removeItem('theme_ai_recommendation');
  }, [recommendation