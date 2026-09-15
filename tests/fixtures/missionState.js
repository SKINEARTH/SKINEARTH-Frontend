let values;
let index;
export let calls;
export const configure = (completed, processing = false, refreshFails = false) => {
  values = [{ id: 1, category: "수면", title: "테스트 미션", isCompleted: completed },
    null, { title: "후보 미션" }, false, null, false, processing, null];
  index = 0;
  calls = [];
  failRefresh = refreshFails;
};
let failRefresh = false;
export const snapshot = () => values;
export const useEffect = () => {};
export const useState = () => {
  const position = index++;
  return [values[position], (value) => {
    values[position] = typeof value === "function" ? value(values[position]) : value;
  }];
};
const request = (name) => async () => {
  calls.push(name);
  return { data: {} };
};
export const completeMission = request("complete");
export const regenerateMission = request("regenerate");
export const adjustMissionIntensity = request("adjust");
export const excludeMissionCategory = request("exclude");
export const confirmMission = request("confirm");
export const getTodayMission = async () => {
  calls.push("refresh");
  if (failRefresh) throw new Error("Test refresh failure");
  return { data: { ...values[0], isCompleted: true } };
};
