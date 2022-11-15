export const timeForToday = (value: string) => {
  const today = new Date();
  const timeValue = new Date(value.replace(/-/g, '/'));

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );

  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 31) {
    return `${betweenTimeDay}일전`;
  }
  if (betweenTimeDay >= 31 && betweenTimeDay < 365) {
    return `${Math.floor(betweenTimeDay / 30)}개월전`;
  }

  return value.replace(/-|:/g, '.').split(' ')[0];
};
