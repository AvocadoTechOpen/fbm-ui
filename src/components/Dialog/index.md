---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
---
# Dialog 对话框
## 代码演示

```tsx
/**
 * title: 几种固定大小
 * desc: xs(360px默认) sm(588px) md(800px) lg(960px) xl(1280px)
 */
import * as React from 'react';
import { Demo, Dialog, Button, Form, Input, Typography} from 'fbm-ui'
import { useFormik } from 'formik'

const defaultSizes = {
  'xs': '360px',
  'sm': '588px',
  'md': '800px',
  'lg': '960px',
  'xl': '1280px'
}

export default () =>{
  const [open, setOpen] = React.useState(false)
  const [size, setSize] = React.useState('xs')

  const handleOk = async (props) => {
    return new Promise((r) => {
      setTimeout(() => {
        r()
        setOpen(false)
      }, 500)
    })
  }

  const handleOpen = (size) => {
    setSize(size)
    setOpen(true)
  }

  return (
    <Demo>
      {
        Object.keys(defaultSizes).map(size => (
          <Button 
            key={size}
            onClick={() => handleOpen(size)}
            sx={{mr:2}}
          > 
          {size}
          </Button>
        ))
      }

      <Dialog 
        open={open}
        title="你好鳄梨"
        isCloseButton={false}
        size={size}
        onClose={() => setOpen(false)}
        onOk={handleOk}
        okProps={{
          color: 'error'
        }}
      >
        <Typography>
          依托“AI+视频”面试，助力企业打造独有AI岗位
          模型，精准筛选候选人，提高批量人才质量，从  而提高企业价值。
        </Typography >
      </Dialog>
    </Demo>
  )
}
```


```tsx
/**
 * title: 自定义Header 和 自定义Footer
 * desc: 基本使用
 */
import * as React from 'react';
import { Dialog, Layout, Button, Form, Input, Typography} from 'fbm-ui'
import { useFormik } from 'formik'

const CustomHeader =  ({ onClose }) => (
  <div style={{
    display:'flex',
    alignItems: 'center',
  }}>
    <p style={{ flex:1}}>CustomHeader</p>
    <Button onClick={onClose}> 关闭</Button>
  </div>
 )

const CustomFooter = ({onOK, onClose}) =>(
 <div style={{
    display:'flex',
    alignItems: 'center',
  }}>
    <Typography style={{ flex:1}}>CustomFooter</Typography>
    <Button onClick={onClose}> 关闭</Button>
  </div>
 )


export default () =>{
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)

  const handleOk = async (props) => {
    return new Promise((r) => {
      setTimeout(() => {
        r(false)
        props.onClose()
      }, 1000)
    })
  }
  return (
    <Layout>
      <Button onClick={() => setOpen1(true)}  sx={{mr:2}}> 自定义Header </Button>
      <Dialog 
        open={open1}
        header={CustomHeader}
        onClose={() => setOpen1(false)}
        onOk={() => setOpen1(false)}
      >
        <Typography>content</Typography>
      </Dialog>

      <Button onClick={() => setOpen2(true)}  sx={{mr:2}}> 自定义Footer </Button>
      <Dialog 
        open={open2}
        footer={CustomFooter}
        onClose={() => setOpen2(false)}
        onOk={() => setOpen2(false)}
      >
         <Typography>content</Typography>
      </Dialog>
    </Layout>
  )
}
```


```tsx
/**
 * title: 不需要Header 和 不需要Footer
 * desc: 基本使用
 */
import * as React from 'react';
import { Dialog, Layout, Button, Form, Input, Typography} from 'fbm-ui'
import { useFormik } from 'formik'

export default () =>{
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)

  const handleOk = async (props) => {
    return new Promise((r) => {
      setTimeout(() => {
        r(false)
        props.onClose()
      }, 1000)
    })
  }
  return (
    <Layout>
      <Button onClick={() => setOpen1(true)}  sx={{mr:2}}> 不需要Header </Button>
      <Dialog 
        open={open1}
        header={null}
        onClose={() => setOpen1(false)}
        onOk={() => setOpen1(false)}
      >
        <Typography>content</Typography >
      </Dialog>

      <Button onClick={() => setOpen2(true)}  sx={{mr:2}}> 不需要Footer </Button>
      <Dialog 
        isShowClose
        title={'鳄梨科技'}
        open={open2}
        onClose={() => setOpen2(false)}
        onOk={() => setOpen2(false)}
      >
         <Typography>content</Typography >
      </Dialog>
    </Layout>
  )
}
```


```tsx
/**
 * title: 配合form使用
 * desc: 基本使用
 */
import * as React from 'react';
import { Dialog, Button, Demo, Form, FormItem, useForm} from 'fbm-ui'

export default () =>{
  const [open, setOpen] = React.useState(false)

 const form = useForm({
    initialValues: {
      password:'',
      rePassword: '',
    },
    onSubmit: (values) => {
    }
  })

  return (
    <Demo>
      <Button onClick={() => setOpen(true)}  sx={{mr:2}}> 修改密码 </Button>

      <Dialog 
        title="修改密码"
        open={open}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        <Form {...form}>
          <FormItem
            required
            name="password"
            label="密码"
          />
          <FormItem
            required
            name="rePassword"
            label="确认密码"
          />
        </Form>
      </Dialog>
    </Demo>
  )
}
```


<API></API>