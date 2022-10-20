import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OptionType } from './MobileArea'
import { MobileTextFieldHanle, MobileTextFieldProps } from './MobileTextField';

type UseMobileTextFieldProps = {
  rules?: any[];
  options: OptionType[];
  defaultMobile: {
    mobile: string;
    mobileAreaCode: string;
  };
};

export default function useMobileTextField({ rules, options, defaultMobile}: UseMobileTextFieldProps) {
  const mobileRef = useRef<MobileTextFieldHanle>(null);
  const [mobile, setMobile] = useState('');
  const [area, setArea] = useState<OptionType | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e?.target?.value);
  }, []);

  const handleAreaChange = useCallback((val: OptionType) => {
    setArea(val);
  }, []);

  const mobileTextFieldProps: MobileTextFieldProps = useMemo(
    () => ({
      rules,
      options: options || [],
      mobile,
      area,
      onAreaChange: handleAreaChange,
      onChange: handleChange,
      ref: mobileRef,
    }),
    [rules, options, mobile, area],
  );

  useEffect(() => {
    setMobile(defaultMobile.mobile);
    const mobileArea =
      options?.find((n) => n.key === defaultMobile.mobileAreaCode);
    setArea(mobileArea);
  }, [defaultMobile, options]);

  const mobileState = useMemo(() => ({ mobile, mobileAreaCode: area?.key || '' }), [area, mobile]);

  return {
    mobileTextFieldProps,
    mobileRef,
    mobile: mobileState,
  };
}
