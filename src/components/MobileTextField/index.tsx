import MobileTextField from "./MobileTextField";

export { DEFAULT_MOBILE_RULES } from "./MobileTextField";
export { default as useMobileTextField } from "./useMobileTextField";
export { default as MobileArea } from "./MobileArea";
export type { OptionType } from "./MobileArea";

export default MobileTextField;

// 测试数据
export const OPTIONS = [
  { key: "1", value: "+86", label: "中国", group: "Z" },
  { key: "2", value: "+33", label: "法国", group: "F" },
];
export const DEFAULT_MOBILE = { mobile: "", mobileAreaCode: "1" };
