---
nav:
  title: 组件
  path: /components
group:
  title: 通用
---
# Menu 菜单
## 代码演示

```tsx
/**
 * title: MenuItem
 * desc: 基本使用
 */
import * as React from 'react';
import {Demo, MenuItem, Paper, Box, TimeIcon, Checkbox, MenuList, MenuItemText } from 'fbm-ui'


export default function NestedList() {
  const [checked, setChecked] = React.useState(true);
  const [selected, setSelected] = React.useState(true);
  const handleClick = () => {
    setChecked(!checked)
  };

  return (
    <Demo white >
      <Box sx={{ display: 'flex'}}>
        <Box>
          <MenuList sx={{ width: '270px' }} elevation={2}>
            <MenuItem text={'选项1'}/>
          </MenuList>
        </Box>

        <Box>
          <MenuList sx={{ width: '270px', ml: 2 }} elevation={2}>
            <MenuItem text={'选项1'} secondaryText={'复文本'}/>
          </MenuList>
        </Box>
      </Box> 

      <Box sx={{ display: 'flex', mt: 2}}>
        <Box>
          <MenuList sx={{ width: '270px' }} elevation={2}>
            <MenuItem
              disabled
              checkbox={<Checkbox checked  />}
              text={'选项1'}
            />
          </MenuList>
        </Box>

        <Box>
          <MenuList sx={{ width: '270px', ml: 2 }} elevation={2}>
            <MenuItem
              onClick={handleClick}
              checkbox={<Checkbox checked={checked} />}
              text={'多选'}
            />
          </MenuList>
        </Box>
        
      </Box> 
      <Box sx={{ display: 'flex', mt: 2}}>
        <Box>
            <MenuList sx={{ width: '270px',  }} elevation={2}>
              <MenuItem
                onClick={() => setSelected(!selected)}
                selected={selected}
                text={'单选'}
              />
            </MenuList>
          </Box>

          <Box>
            <MenuList sx={{ width: '270px', ml: 2 }} elevation={2}>
              <MenuItem
                disabled
                selected={selected}
                text={'单选'}
              />
            </MenuList>
          </Box>
      </Box> 
    </Demo>
  );
}

``` 
```tsx
/**
 * title: 副标题
 * desc: 基本使用
 */
import * as React from 'react';
import {Demo, MenuItem, Paper, Box, TimeIcon, Checkbox, MenuList, MenuItemText } from 'fbm-ui'

export default function NestedList() {
  const [checked, setChecked] = React.useState(false);
  const handleClick = () => {
    setChecked(!checked)
  };

  return (
    <Demo white >
      <Box sx={{ display: 'flex'}}>
        <MenuList sx={{ width: '270px', ml: 2 }} elevation={2}>
            <MenuItem
              secondaryText={'选项1'}
            />
          </MenuList>
      </Box> 
    </Demo>
  );
}

```


```tsx
/**
 * title: MenuList
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, MenuItem, Paper, MenuList, Box, TimeIcon, } from 'fbm-ui'

export default function NestedList() {
  const [value, setValue] = React.useState(2);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (newValue) => {    
    setValue(newValue)
  }

  return (
    <Demo white sx={{ display: 'flex' }} >
      <Box >
        <MenuList  sx={{ width: '270px' }} value={value} onChange={handleChange}>
          <MenuItem value={1} disabled text={'选项1'}/>
          <MenuItem value={2} text={'禁用'} />
          <MenuItem value={3} text={'选项3'}/>
        </MenuList>
      </Box>

    </Demo>
  );
}
```


```tsx
/**
 * title: subMenuList
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, MenuItem, Paper, MenuList, Box } from 'fbm-ui'

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

    const subMenuList2 = (
      <MenuList sx={{ width: '300px' }}>
        <MenuItem 
          text={'选项1'}
          secondaryText={'复文本'}
        />
        <MenuItem text={'选项2'} secondaryText={'复文本'} subMenuList={subMenuList} />
        <MenuItem text={'选项3'} secondaryText={'复文本'} />
    </MenuList>
  )


  const subMenuList = (
      <MenuList sx={{ width: '300px' }}>
        <MenuItem 
          text={'选项1'}
        />
        <MenuItem text={'选项2'} subMenuList={subMenuList2} />
        <MenuItem text={'选项3'} />
      </MenuList>
  )

  return (
    <Demo white>
      <Box sx={{ width: '300px' }}>
        <MenuList>
          <MenuItem 
            text={'选项1'}
            subMenuList={subMenuList}
          />
          <MenuItem text={'选项2'} />
          <MenuItem text={'选项3'} />
        </MenuList>
      </Box>
    </Demo>
  );
}
```

<API></API> 