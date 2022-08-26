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
import { Demo, MenuItem, Paper, Box, TimeIcon, Checkbox } from 'fbm-ui'

export default function NestedList() {
  const [checked, setChecked] = React.useState(false);
  

  const handleClick = () => {
    setChecked(!checked)
  };

  return (
    <Demo white >
      <Box sx={{ display: 'flex'}}>
        <Box>
          <Paper sx={{ width: '270px' }} elevation={2}>
            <MenuItem text={'选项1'}/>
          </Paper>
        </Box>

        <Box>
          <Paper sx={{ width: '270px', ml: 2 }} elevation={2}>
            <MenuItem text={'选项1'} secondaryText={'复文本'}/>
          </Paper>
        </Box>

        <Box>
          <Paper sx={{ width: '270px', ml: 2 }} elevation={2}>
            <MenuItem text={'选项1'} secondaryText={'复文本'}/>
          </Paper>
        </Box>
      </Box> 

      <Box sx={{ display: 'flex', mt: 2}}>
        <Box>
          <Paper sx={{ width: '270px' }} elevation={2}>
            <MenuItem
              disabled
              checkbox={<Checkbox checked  />}
              text={'选项1'}
            />
          </Paper>
        </Box>

        <Box>
          <Paper sx={{ width: '270px', ml: 2 }} elevation={2}>
            <MenuItem
              onClick={handleClick}
              checkbox={<Checkbox checked={checked} />}
              text={'选项1'}
            />
          </Paper>
        </Box>
        
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
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Demo white sx={{ display: 'flex' }} >
      <Box>
        <Paper sx={{ width: '270px' }} elevation={2}>
          <MenuList>
            <MenuItem disabled text={'选项1'}/>
            <MenuItem text={'禁用'} />
            <MenuItem text={'选项3'}/>
          </MenuList>
        </Paper>
      </Box>

      <Box>
        <Paper sx={{ width: '270px', ml: 2 }} elevation={2}>
          <MenuList>
            <MenuItem disabled text={'选项1'} secondaryText={'复文本'}/>
            <MenuItem text={'禁用'} secondaryText={'复文本'} />
            <MenuItem text={'选项3'} secondaryText={'复文本'}/>
          </MenuList>
        </Paper>
       </Box>

        <Box>
        <Paper sx={{ width: '270px', ml: 2 }} elevation={2}>
          <MenuList>
            <MenuItem disabled startIcon={<TimeIcon />} text={'选项1'} secondaryText={'复文本'}/>
            <MenuItem startIcon={<TimeIcon />} text={'禁用'} secondaryText={'复文本'} />
            <MenuItem startIcon={<TimeIcon />} text={'选项1'} secondaryText={'复文本'}/>
          </MenuList>
        </Paper>
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
import { Demo, MenuItem, Paper, MenuList } from 'fbm-ui'

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

    const subMenuList2 = (
     <Paper sx={{ width: '150px' }} elevation={2}>
      <MenuList>
        <MenuItem 
          text={'选项1'}
          secondaryText={'复文本'}
        />
        <MenuItem text={'选项2'} secondaryText={'复文本'} subMenuList={subMenuList} />
        <MenuItem text={'选项3'} secondaryText={'复文本'} />
      </MenuList>
    </Paper>
  )


  const subMenuList = (
     <Paper sx={{ width: '150px' }} elevation={2}>
      <MenuList>
        <MenuItem 
          text={'选项1'}
        />
        <MenuItem text={'选项2'} subMenuList={subMenuList2} />
        <MenuItem text={'选项3'} />
      </MenuList>
    </Paper>
  )

  return (
    <Demo white>
      <Paper sx={{ width: '150px' }} elevation={2}>
        <MenuList>
          <MenuItem 
            text={'选项1'}
            subMenuList={subMenuList}
          />
          <MenuItem text={'选项2'} />
          <MenuItem text={'选项3'} />
        </MenuList>
      </Paper>
    </Demo>
  );
}
```


<API></API>