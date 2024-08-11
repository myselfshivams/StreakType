// utils/streak.ts
const STREAK_KEY = 'user_streak';
const LAST_VISIT_KEY = 'last_visit_date';

const getDateString = (): string => new Date().toISOString().split('T')[0]; // YYYY-MM-DD

export const updateStreak = (): void => {
  const currentDate = getDateString();
  const lastVisitDate = localStorage.getItem(LAST_VISIT_KEY);
  const streak = parseInt(localStorage.getItem(STREAK_KEY) ?? '0', 10);

  if (lastVisitDate === currentDate) {
    return; // User has already visited today
  }

  if (lastVisitDate && new Date(lastVisitDate).getTime() + 86400000 === new Date(currentDate).getTime()) {
    // If the last visit was yesterday
    localStorage.setItem(STREAK_KEY, (streak + 1).toString());
  } else {
    // Streak is broken
    localStorage.setItem(STREAK_KEY, '1');
  }

  localStorage.setItem(LAST_VISIT_KEY, currentDate);
};

export const getStreak = (): number => {
  return parseInt(localStorage.getItem(STREAK_KEY) ?? '0', 10);
};
