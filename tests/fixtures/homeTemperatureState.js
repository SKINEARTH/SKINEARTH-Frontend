let values, index;
export const configure = (temperature) => {
  index = 0;
  values = [{
    user: { nickname: "테스트", ppLevel: 1 },
    date: "2026-09-15",
    nickname: "테스트",
    planetTemperature: temperature,
    todayRecord: { recorded: true },
    forecastProgress: { validRecordCount: 13, targetRecordCount: 10, forecastReady: true },
    tomorrowForecast: null,
    todayMission: null,
    badge: {},
  }, false, "", null];
};
export const useState = () => [values[index++], () => {}];
export const useEffect = () => {};
export const useMemo = (callback) => callback();
