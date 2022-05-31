---
nav:
  title: 组件
  path: /components
group:
  title: 通用
---
# 图片裁剪
## 代码演示

```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
        
import { ImageCrop, Demo, Upload, Button, confirm } from 'fbm-ui'

export default () =>{
  const ref = React.useRef()
  const [img, setImg] = React.useState('')
  
  const cropConfirm = (file) => new Promise((resolve, reject) => {
    console.log(file)
    confirm({
      content: (
        <ImageCrop 
          ref={ref}
          img={file} 
          crop={{
            unit:'%',
            width: 100,
            height: 50
          }}
        />
      ),
      onOk: async ({ onClose  }) => {
        const file =  await ref?.current?.getCropFile()
        resolve(file)
        onClose()
      },
      onClose: () => {
        reject()
      }
    })
  })

  const handleBeforeUpload = async (file) => {
    try {
      const newFile =  await cropConfirm(file)
      setImg(URL.createObjectURL(newFile))
      return newFile
    } catch (err) {
      return false
    }
  }
 
  return (
    <Demo>
      <Upload  beforeUpload={handleBeforeUpload}>
        选择文件
      </Upload>
      {/* 预览 */}
      {
        img && (
           <img src={img} />
        )
      }
    </Demo>
  )
}
```

<!-- <API></API> -->
