import React, { useEffect, FC, useRef } from 'react';
import Box from '../Box';
import TextField from '../TextField';
import { DoneIcon } from '../icons';
import { Autocomplete, Popper, createFilterOptions, styled } from '../../mui';

const AutocompleteContainer = styled(Autocomplete)(({ open, size }) => ({
  position: 'absolute',
  width: size === 'small' ? 80 : 100,
  left: 0,
  top: 0,
  '& .MuiOutlinedInput-notchedOutline': {
    borderLeft: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    borderRadius: 0,
    borderRightColor: open ? '#4caf50' : 'rgba(0, 0, 0, 0.08)',
  },
}));

const PopComponent = styled(Popper)(({ theme }) => ({
  width: '240px !important',
  marginLeft: '70px !important',
  marginTop: '4px !important',
  maxHeight: 380,
  overflow: 'auto',
  '& .MuiAutocomplete-option[aria-selected="true"]': {
    backgroundColor: 'white',
    '&.Mui-focused': {
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: '#F4F4F4',
      },
    },
  },
  '& .MuiAutocomplete-listbox': {
    '& .MuiListSubheader-root': {
      height: 24,
      paddingLeft: theme.spacing(1),
      top: '-6px',
      fontWight: 400,
      color: theme.palette.secondary,
      backgroundColor: '#F4F4F4',
    },
    '& .MuiAutocomplete-option': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontSize: 14,
    },
  },
}));
// @ts-ignore
const TextFieldContainer = styled(TextField)(({ open, inputValue, areaValue }) => ({
  height: 'auto',
  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    backgroundColor: 'transparent',
  },
  '& .MuiOutlinedInput-root.MuiInputBase-root': {
    paddingTop: '4px',
    paddingBottom: '5px',
    position: 'relative',
    '&:before': {
      position: 'absolute',
      left: 15,
      content: '""',
      color: 'rgba(0, 0, 0, 0.86)',
      ...(open &&
        !inputValue && {
          content: `"${areaValue || '+86'}"`,
          color: 'rgba(0, 0, 0, 0.26)',
          whiteSpace: 'nowrap',
        }),
    },
  },
}));

export type OptionType = { value: any; label: string; group: string; key: string }

interface MobileAreaProps {
  area: OptionType | null;
  onOpenChange: (open: boolean) => void;
  onChange: (value: OptionType) => void;
  size?: 'small';
  options: OptionType[];
  open: boolean;
  disabled?: boolean;
}

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option) => `${(option as OptionType)?.value}${(option as OptionType)?.label}`,
});

const MobileArea: FC<MobileAreaProps> = ({ area, onOpenChange, onChange, size, options, open, disabled }) => {
  const mobileRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => {
    onOpenChange(true);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleChange = (_event: React.SyntheticEvent, value: OptionType) => {
    onChange(value);
  };

  useEffect(() => {
    onOpenChange(open);
  }, [open]);

  const handleFocus = () => {
    mobileRef.current?.firstElementChild?.classList.add('Mui-focused');
  };

  const handleBlur = () => {
    mobileRef.current?.firstElementChild?.classList.remove('Mui-focused');
  };

  useEffect(() => {
    mobileRef.current = document.getElementById('mobile-text') as HTMLDivElement;
  }, []);
  
  return (
    <AutocompleteContainer
      disableClearable
      open={open}
      size={size}
      value={area}
      disabled={disabled}
      PopperComponent={PopComponent}
      options={options}
      filterOptions={filterOptions}
      onFocus={handleFocus}
      onBlur={handleBlur}
      groupBy={(option) => (option as OptionType)?.group}
      getOptionLabel={(option) => `${(option as OptionType)?.value}`}
      // @ts-ignore
      onChange={handleChange}
      isOptionEqualToValue={(o, v) => (v as OptionType)?.key === (o as OptionType)?.key}
      openOnFocus
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            {`${(option as OptionType)?.label} ${(option as OptionType)?.value}`}
          </Box>
          <Box
            component={DoneIcon}
            sx={{ width: 24, height: 24 }}
            style={{
              color: '#4CAF50',
              visibility: selected ? 'visible' : 'hidden',
            }}
          />
        </li>
      )}
      onOpen={handleOpen}
      onClose={handleClose}
      renderInput={(params) => {
        return (
          <TextFieldContainer
            {...params}
            size={size}
            open={open}
            inputValue={params?.inputProps?.value}
            areaValue={area?.value}
          />
        );
      }}
    />
  );
};

export default MobileArea;

