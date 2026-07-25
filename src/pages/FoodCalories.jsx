import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Search, Plus, Trash2, Activity, Zap, Info } from 'lucide-react';

export const FoodCalories = () => {
  const { foodCalories } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [mealPlan, setMealPlan] = useState([]);

  const categories = ['전체', '주식', '단백질', '과일', '유제품', '지방/과일'];

  const filteredFoods = foodCalories.filter(food => {
    const matchesCategory = selectedCategory === '전체' || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToMealPlan = (food) => {
    setMealPlan(prev => [...prev, { ...food, planId: Date.now() + Math.random() }]);
  };

  const removeFromMealPlan = (planId) => {
    setMealPlan(prev => prev.filter(item => item.planId !== planId));
  };

  const totalCalories = mealPlan.reduce((acc, item) => acc + item.calories, 0);
  const totalProtein = mealPlan.reduce((acc, item) => acc + item.protein, 0);
  const totalCarbs = mealPlan.reduce((acc, item) => acc + item.carbs, 0);
  const totalFat = mealPlan.reduce((acc, item) => acc + item.fat, 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl shadow-sm">
            🥗
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              음식 칼로리 & 영양 가이드
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              올바른 자이언트 뉴트리션 식이요법으로 칼로리와 3대 영양소를 조화롭게 관리하세요.
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="음식 이름 검색 (예: 닭가슴살, 현미밥, 아보카도)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Meal Calculator Panel */}
      <div className="glass-card p-6 rounded-3xl border-2 border-amber-200 dark:border-amber-900/50 bg-amber-50/20 dark:bg-slate-900/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
              오늘의 계산된 식단표 ({mealPlan.length}개 항목)
            </h3>
          </div>
          {mealPlan.length > 0 && (
            <button
              onClick={() => setMealPlan([])}
              className="text-xs text-rose-500 hover:underline font-bold"
            >
              식단 초기화
            </button>
          )}
        </div>

        {mealPlan.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">
            아래 음식 카드의 <Plus className="inline w-3.5 h-3.5" /> 버튼을 눌러 나의 오늘 식단에 추가해보세요.
          </p>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {mealPlan.map((item) => (
                <div
                  key={item.planId}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs font-bold shadow-sm"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                  <span className="text-amber-600 dark:text-amber-400">({item.calories} kcal)</span>
                  <button
                    onClick={() => removeFromMealPlan(item.planId)}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Total Nutrients Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-amber-100 dark:border-slate-800">
              <div className="bg-amber-500 text-white p-3 rounded-2xl text-center shadow-md">
                <span className="text-[10px] opacity-80 font-bold block">총 칼로리</span>
                <span className="text-lg font-black">{totalCalories.toLocaleString()} kcal</span>
              </div>
              <div className="bg-emerald-500 text-white p-3 rounded-2xl text-center shadow-md">
                <span className="text-[10px] opacity-80 font-bold block">단백질</span>
                <span className="text-lg font-black">{totalProtein.toFixed(1)} g</span>
              </div>
              <div className="bg-teal-500 text-white p-3 rounded-2xl text-center shadow-md">
                <span className="text-[10px] opacity-80 font-bold block">탄수화물</span>
                <span className="text-lg font-black">{totalCarbs.toFixed(1)} g</span>
              </div>
              <div className="bg-purple-500 text-white p-3 rounded-2xl text-center shadow-md">
                <span className="text-[10px] opacity-80 font-bold block">지방</span>
                <span className="text-lg font-black">{totalFat.toFixed(1)} g</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="glass-card p-5 rounded-3xl hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl bg-slate-100 dark:bg-slate-800 p-2.5 rounded-2xl shadow-inner">
                    {food.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                      {food.category}
                    </span>
                    <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-100 mt-0.5">
                      {food.name}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Calories & Macros Grid */}
              <div className="grid grid-cols-4 gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">열량</span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">{food.calories}kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">단백질</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{food.protein}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">탄수화물</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{food.carbs}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">지방</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{food.fat}g</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] font-medium leading-tight">{food.healthTip}</span>
              </div>
            </div>

            <button
              onClick={() => addToMealPlan(food)}
              className="w-full py-2.5 bg-slate-900 dark:bg-slate-100 hover:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-900 font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>식단표에 추가하기</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
