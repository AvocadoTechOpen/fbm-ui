import React from 'react';
import styled from '@mui/material/styles/styled';
import { SxProps, Theme } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Chip, chipClasses, ChipClasses } from '@mui/material';

export interface ChipPropsVariantOverrides { }

export interface ChipPropsSizeOverrides { }

export interface ChipPropsColorOverrides { }

interface ChipProps {
  /**
   * The Avatar element to display.
   */
  avatar?: React.ReactElement;
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children?: null;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ChipClasses>;
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable?: boolean;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color?: OverridableStringUnion<
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    ChipPropsColorOverrides
  >;
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon?: React.ReactElement;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon element.
   */
  icon?: React.ReactElement;
  /**
   * The content of the component.
   */
  label?: React.ReactNode;
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete?: React.EventHandler<any>;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant?: OverridableStringUnion<'filled' | 'outlined', ChipPropsVariantOverrides>;
}

const ChipRoot: React.FC<ChipProps> = styled(Chip)(({ size, theme, variant, color, clickable }: { theme: Theme } & ChipProps) => {
  return {
    [`& .${chipClasses.label}`]: {
      paddingLeft: 11,
      paddingRight: 13,
      fontSize: 14,
    },
    ...(clickable === false && ({
      '&:hover': {
        cursor: 'pointer',
        ...(variant === 'outlined'
          ? {
            backgroundColor: theme.palette.action.hover,
          }
          : {
            backgroundColor: theme.palette[color] && theme.palette[color]?.main,
          }),
      },
    })),
    ...(size === 'small' && {
      height: '18px',
      [`& .${chipClasses.labelSmall}`]: {
        paddingLeft: 7,
        paddingRight: 7,
        fontSize: 12,
      },
    }),
    ...(size === 'medium' && {
      height: '24px',
      [`& .${chipClasses.labelMedium}`]: {
        paddingLeft: 7,
        paddingRight: 7,
        fontSize: 12,
      },
      [`& .${chipClasses.avatar}`]: {
        width: 18,
        height: 18
      },
      [`& .${chipClasses.deleteIconMedium}`]: {
        fontSize: 14,
      },
    }),
    ...(size === 'large' && {
      height: '32px',
      [`& .${chipClasses.labelMedium}`]: {
        fontSize: 14,
      },
      [`& .${chipClasses.deleteIcon}`]: {
        fontSize: 18,
      },
    }),
  };
});

ChipRoot.defaultProps = {
  variant: 'outlined',
  size: 'medium',
};

export default ChipRoot;
