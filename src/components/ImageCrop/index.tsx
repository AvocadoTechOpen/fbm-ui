import React, { useState, useMemo, useRef, useImperativeHandle } from 'react'
import FbmImageCrop, { Crop, centerCrop, PixelCrop, PercentCrop, getCropBlob } from 'fbm-image-crop'
import { Box } from '@mui/material'
import { ImageCropProps, IFile } from './types'
import 'fbm-image-crop/dist/ReactCrop.css'

export { ImageCropProps } from './types'
 
const isFile = (file: File) => Object.prototype.toString.call(file) === '[object File]'

const ImageCrop: React.FC<ImageCropProps> = React.forwardRef(({
  img,
  locked,
  disabled,
  isCropCenter,
  imgProps,
  crop: cropProp,
  children: childrenProp,
  onChange,
}, ref) => {
  
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [crop, setCrop] = useState<Crop>(cropProp)
  const { src, name: fileName, type: fileType } = useMemo<IFile>(() => {
    if (isFile(img as File)) {
      const imgFile = img as File
      return {
        name: imgFile.name,
        type: imgFile.type,
        src: URL.createObjectURL(imgFile),
      }
    }
    return {
      src: img as string,
    }
  }, [img])

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!e.currentTarget) {
      imgRef.current = null
      return
    }

    imgRef.current = e.currentTarget
    const { width, height } = e.currentTarget
    const crop = isCropCenter
      ? centerCrop(
        cropProp,
        width,
        height
      )
      : cropProp
    setCrop(crop)
  }

  const handelCropChange = (crop: PixelCrop, percentageCrop: PercentCrop) => {
    onChange?.(crop, percentageCrop)
    setCrop(percentageCrop)
  }

  const getCropImgBlob = async () => {
    if (imgRef.current) {
      const blob = await getCropBlob(imgRef.current, crop)
      return blob
    }
    return null
  }

  useImperativeHandle(ref, () => ({
    getCropBlob: getCropImgBlob,
    getCropFile: async (name: string = fileName, type: string = fileType) => {
      try {
        const blob = await getCropImgBlob()
        return new File([blob], name, {
          type
        });
      } catch (err) {
        throw err
      }
    }
  }))

  let children = childrenProp
  if (!children) {
    children = (
      <Box
        component="img"
        src={src}
        onLoad={handleImageLoad}
        {...imgProps}
      />
    )
  }

  return (
    <FbmImageCrop
      crop={crop}
      locked={locked}
      disabled={disabled}
      onChange={handelCropChange}
    >
      {children}
    </FbmImageCrop>
  )
})

ImageCrop.defaultProps = {
  isCropCenter: true,
  locked: false,
}

export default ImageCrop
