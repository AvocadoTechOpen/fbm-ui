import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface UploadClasses {
  /** UploadRoot className */
  root: string;
  /** UploadChildrenButton className */
  button: string;
  /** UploadChildrenDragger  className */
  drop: string;
  /** UploadChildrenCube className */
  cube: string;
  /** UploadChildrenCube className */
  uploadList: string;
  /** UploadChildrenCube className */
  uploadListItem: string;
  /** UploadChildrenCube className */
  uploadListItemSelected: string;
}

export type DialogClassesKey = keyof UploadClasses;

export function getUploadUtilityClass(slot: string): string {
  return generateUtilityClass('FuiUpload', slot);
}

const uploadClasses: UploadClasses = generateUtilityClasses('FuiUpload', [
  'root',
  'button',
  'drop',
  'cube',
  'uploadList',
  'uploadListItem',
  'uploadListItemSelected'
]);

export default uploadClasses;
