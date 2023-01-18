import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
} from "react";
import TextField, { useTextField } from "../TextField";
import { isNaN } from "lodash";
import MobileArea, { OptionType } from "./MobileArea";
import { BoxProps } from "../../mui";

export const DEFAULT_MOBILE_RULES = [{ required: true }, { type: "mobile" }];

export interface MobileTextFieldProps {
  options: OptionType[];
  mobile: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  area: OptionType | null;
  onAreaChange: (area: OptionType) => void;
  size?: "small";
  rules?: any[];
  sx?: BoxProps["sx"];
  disabled?: boolean;
  areaProps?: any;
  defaultMobile?: { mobile: string; mobileAreaCode: string };
}

export interface MobileTextFieldHandler {
  setError: (error: string) => void;
  validate: () => Promise<any>;
  error: string;
}

const MobileTextField = forwardRef<
  MobileTextFieldHandler,
  MobileTextFieldProps
>(
  (
    {
      rules,
      options,
      mobile,
      onChange,
      area,
      onAreaChange,
      size,
      sx,
      disabled,
      areaProps,
      defaultMobile,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const handleOpenChange = (o) => {
      setOpen(o);
    };

    const memoRules = useMemo(() => {
      if (areaProps?.value?.key) {
        if (areaProps?.value?.key === "CN_243") {
          return rules || DEFAULT_MOBILE_RULES;
        }
      } else if (area?.key === "CN_243") {
        return rules || DEFAULT_MOBILE_RULES;
      }
      return (
        rules || [
          { required: true },
          (s) => (isNaN(Number(s?.value)) ? "请输入正确的手机号" : ""),
        ]
      );
    }, [rules, area?.key, areaProps?.value?.key]);

    const mobileFieldProps = useTextField({
      value: mobile,
      label: "手机号*",
      onChange,
      size,
      disabled,
      rules: memoRules,
      InputProps: {
        placeholder: "请输入手机号",
        endAdornment: (
          <MobileArea
            size={size}
            disabled={disabled}
            area={areaProps?.value || area}
            open={open}
            options={areaProps?.options || options}
            onChange={areaProps?.onAreaChange || onAreaChange}
            onOpenChange={handleOpenChange}
            defaultMobile={defaultMobile}
          />
        ),
      },
      ...rest,
      sx: {
        ...(sx || {}),
        '& .MuiInputLabel-root[data-shrink="false"]': {
          left: size === "small" ? "75px" : "100px",
        },
        '& .MuiInputLabel-root[data-shrink="true"]': {
          "&+.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline legend": {
            minWidth: "fit-content",
          },
        },
        "& .MuiInputLabel-root.Mui-focused:not(.Mui-error)": {
          "&+.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4caf50",
          },
        },
        "&>.MuiOutlinedInput-root>.MuiOutlinedInput-input": {
          paddingLeft: size === "small" ? "90px" : "112px",
        },
        // Autocomplete获取焦点  textfield也需要
        ...(open && {
          "&>.MuiOutlinedInput-root:not(.Mui-error):hover>.MuiOutlinedInput-notchedOutline": {
            borderColor: "#4caf50",
          },
          "&>.MuiOutlinedInput-notchedOutline": {
            borderColor: "#4caf50",
            borderWidth: 1,
          },
          "& .MuiInputLabel-root": {
            color: "#4caf50",
          },
          "& .Mui-error": {
            color: "#ff6c6c",
            "&+.MuiOutlinedInput-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff6c6c",
              },
            },
          },
        }),
      },
    });

    useImperativeHandle(ref, () => ({
      setError: mobileFieldProps.setError,
      validate: () => mobileFieldProps.handleValidate(),
      error: mobileFieldProps.error,
    }));

    useEffect(() => {
      if (mobile) {
        mobileFieldProps?.handleValidate?.();
      }
    }, []);

    return <TextField id="mobile-text" {...mobileFieldProps} />;
  }
);

export default MobileTextField;
