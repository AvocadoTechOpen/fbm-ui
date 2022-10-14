import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface DialogClasses {
  /** DialogRoot className */
  root: string;
  /** Header className */
  header: string;
  /** DialogContent  className */
  content: string;
  /** Footer className */
  footer: string;
}

export type DialogClassesKey = keyof DialogClasses;

export function getDividerUtilityClass(slot: string): string {
  return generateUtilityClass('FuiDialog', slot);
}

const dialogClasses: DialogClasses = generateUtilityClasses('FuiDialog', [
  'root',
  'header',
  'content',
  'footer',
]);

export default dialogClasses;
