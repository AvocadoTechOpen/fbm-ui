import { PixelCrop, PercentCrop } from 'fbm-image-crop'

export interface Crop {
  x: number
  y: number
  width: number
  height: number
  unit: 'px' | '%'
}

export interface IFile {
  src: string;
  name?: string;
  type?: string;
} 

export interface ImageCropProps {
  img?: File | string,
  /** 标题 */
  src?: React.ImgHTMLAttributes<HTMLImageElement>['src'];
  /** 禁止操作截取框 */
  disabled?: boolean;
  /** 禁止拖拽 */
  locked?: boolean;
  /** 是否从中间截取 */
  isCropCenter?: boolean;
  /** 截取位置和大小 */
  crop?: Crop;
  /** 原始图片props */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  /** crop 发生变化时触发 */
  onChange: (crop: PixelCrop, percentageCrop: PercentCrop) => void;
}

