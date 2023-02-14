import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OptionType } from "./MobileArea";
import {
  MobileTextFieldHandler,
  MobileTextFieldProps,
} from "./MobileTextField";

const DEFAULT_MOBILE = {
  mobile: "",
  mobileAreaCode: "CN_243",
};

interface UseMobileTextFieldProps {
  rules?: any[];
  options: OptionType[];
  defaultMobile: {
    mobile: string;
    mobileAreaCode: string;
  };
  onAreaChange?: (val: any) => void;
  onChange?: (val: any) => void;
}

export default function useMobileTextField({
  rules,
  options,
  defaultMobile = DEFAULT_MOBILE,
  onAreaChange,
  onChange,
}: UseMobileTextFieldProps) {
  const mobileRef = useRef<MobileTextFieldHandler>(null);
  const [mobile, setMobile] = useState("");
  const [area, setArea] = useState(null);

  const handleChange = useCallback(
    (e) => {
      setMobile(e?.target?.value);
      onChange?.({ mobile: e?.target?.value, mobileAreaCode: area?.key });
    },
    [area?.key]
  );

  const handleAreaChange = useCallback(
    (val) => {
      setArea(val);
      onAreaChange?.(val?.key);
      onChange?.({ mobile, mobileAreaCode: val?.key });
    },
    [mobile]
  );

  const reset = useCallback(() => {
    setMobile(defaultMobile.mobile);
    const mobileArea = options?.find(
      (n) => n.key === (defaultMobile?.mobileAreaCode || "CN_243")
    );
    setArea(mobileArea);
    onAreaChange?.(mobileArea?.key);
  }, [defaultMobile, options]);

  const mobileTextFieldProps: MobileTextFieldProps = useMemo(
    () => ({
      rules,
      options,
      mobile,
      area,
      onAreaChange: handleAreaChange,
      onChange: handleChange,
      ref: mobileRef,
      defaultMobile,
    }),
    [rules, options, area, mobile, defaultMobile]
  );

  useEffect(() => {
    if (defaultMobile?.mobile) {
      setMobile(defaultMobile?.mobile || "");
    }
    const mobileArea = options?.find(
      (n) => n.key === (defaultMobile?.mobileAreaCode || "CN_243")
    );
    setArea(mobileArea);
  }, [options, defaultMobile]);

  const mobileState = useMemo(
    () => ({ mobile, mobileAreaCode: area?.key || "CN_243" }),
    [area, mobile]
  );

  return {
    mobileTextFieldProps,
    mobile: mobileState,
    mobileRef,
    reset,
  };
}
