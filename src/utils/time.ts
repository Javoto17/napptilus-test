export enum TimeKind {
  DAY = "day",
  WEEK = "week",
}
export const getTime = () => {
  return new Date().getTime();
};

export const getTimeByKind = (kind: TimeKind) => {
  const timesByKind: Record<TimeKind, number> = {
    day: 60 * 60 * 24 * 1000,
    week: 60 * 60 * 24 * 7 * 1000,
  };

  return timesByKind?.[kind] ?? 0;
};
