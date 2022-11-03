import type { TreeViewProps } from '../TreeView'
import { ChipProps } from '../Chip'
import { InputProps } from '../Input'
import { TreeSelecClasses } from './treeSelectClasses'
import { Theme, PopperProps } from '@mui/material'
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';

type TreeSelectPropsSizeOverrides = {}

interface TreeSelectPropsBase {
  multiple?: boolean;
  /**
  * Props applied to the [`Chip`](/api/chip/) element.
  */
  ChipProps?: ChipProps;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TreeSelecClasses>;
  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="small" />
   */
  clearIcon?: React.ReactNode;
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Clear'
   */
  clearText?: string;
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon?: true | false | 'auto';
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText?: (more: number) => React.ReactNode;
  /**
   * If `true`, the component is in a loading state.
   * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, e.g. `options` are empty).
   * @default false
   */
  loading?: boolean;
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Loading…'
   */
  loadingText?: React.ReactNode;
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags?: number;
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'No options'
   */
  noOptionsText?: React.ReactNode;
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Open'
   */
  openText?: string;
  /**
   * The component used to render the body of the popup.
   * @default Paper
   */
  PaperComponent?: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>>;
  /**
   * The component used to position the popup.
   * @default Popper
   */
  PopperComponent?: React.JSXElementConstructor<PopperProps>;
  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon?: React.ReactNode;
  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: (params: InputProps) => React.ReactNode;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', TreeSelectPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;

  label: string;
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly?: boolean;
  /**
   * 当未选择任何值时，把 placeholder 当做一个值来显示。
   * @default false
   */
  placeholderIsValue?: boolean;

  getOptionLabel?: any,
}

export type TreeSelectProps = TreeSelectPropsBase & TreeViewProps