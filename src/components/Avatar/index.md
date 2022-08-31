---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
---
# Avatar 头像
## 代码演示

```tsx

/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
import { Avatar, Demo} from 'fbm-ui'

const imgurl = 'https://joeschmoe.io/api/v1/random'
export default () =>(
  <Demo white>
    <Avatar showNewTip  src={imgurl} />
  </Demo>
)
```

```tsx

/**
 * title: 字母头像
 * desc: 基本使用
 */
import * as React from 'react';
import { Avatar, Demo} from 'fbm-ui'

const imgurl = 'https://joeschmoe.io/api/v1/random'
export default () =>(
  <Demo white>
    <Avatar sx={{ml: 3 }}>H</Avatar>
    <Avatar sx={{ bgcolor: '#4caf50', ml: 3}}>N</Avatar>
    <Avatar sx={{ bgcolor: '#ff6c6c', ml: 3 }}>N</Avatar>
  </Demo>
)
```

```tsx

/**
 * title: 尺寸
 * desc: 内置三种尺寸
 */
import * as React from 'react';
import { Avatar, Demo} from 'fbm-ui'

const imgurl = 'https://joeschmoe.io/api/v1/random'
export default () =>(
  <Demo white>
    <Avatar  sx={{ml: 3 }} src={imgurl} size={'small'} />
    <Avatar  sx={{ml: 3 }} src={imgurl} size={'middle'} />
    <Avatar  sx={{ml: 3 }} src={imgurl} size={'large'} />
  </Demo>
)
```


```tsx

/**
 * title: 自定义尺寸
 * desc: size支持传入数字自定义尺寸
 */
import * as React from 'react';
import { Avatar, Demo} from 'fbm-ui'

const imgurl = 'https://joeschmoe.io/api/v1/random'
export default () =>(
  <Demo white>
    <Avatar sx={{ml: 3 }} src={imgurl} size={100} />
  </Demo>
)
```

```tsx
/**
 * title: 性别
 * desc: 1男 2女
 */
import * as React from 'react';
import { Avatar, Demo} from 'fbm-ui'

const imgurl = 'https://joeschmoe.io/api/v1/random'
export default () =>(
  <Demo white>
    <Avatar  sx={{ml: 3 }} src={imgurl} sex={'1'} />
    <Avatar sx={{ml: 3 }} src={imgurl} sex={'2'} />
  </Demo>
)
```

```tsx
/**
 * title: disabled
 * desc: 头像禁用状态
 */
import * as React from 'react';
import { Avatar, Demo} from 'fbm-ui'

const imgurl = 'https://joeschmoe.io/api/v1/random'
export default () =>(
  <Demo white>
    <Avatar sx={{ml: 3 }} src={imgurl} size='large' disabled/>
  </Demo>
)
```


<API></API>