export let state, calls, effects, values;
let index, refs, refIndex;
export const configure = (nextState = {}, failure = false) => {
  state = nextState; calls = []; effects = []; values = [];
  index = 0; refs = []; refIndex = 0; fail = failure;
};
let fail;
export const useLocation = () => ({ state });
export const useNavigate = () => (path, options) => calls.push({ path, ...options });
export const useState = (initial) => {
  const position = index++;
  values[position] = initial;
  return [initial, (value) => { values[position] = value; }];
};
export const useRef = (initial) => refs[refIndex++] ??= { current: initial };
export const useEffect = (effect) => effects.push(effect);
const request = (method) => async (data) => {
  calls.push({ method, data });
  if (fail) throw new Error("Test failure");
  return { data: { ...data, riskScore: 42 } };
};
export const getForecast = request("GET");
export const createForecast = request("POST");
export const updateForecast = request("PUT");
