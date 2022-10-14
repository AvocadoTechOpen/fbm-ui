---
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
---

#  Tree 树组件 (TODO)
## 代码演示

```tsx
/**
 * title: 基本
 * desc: 基本使用
 */
import * as React from 'react';
import { Demo, TreeView, TreeItem, Box, Checkbox} from 'fbm-ui'
 const treeData = [
    {
      label: 'Node1',
      id: '0-0',
      disabled: true,
      children: [
        {
          label: 'Child Node1',
          id: '0-0-1',
        },
        {
          label: 'Child Node2',
          id: '0-0-2',
        },
      ],
    },
    {
      label: 'Node2',
      id: '0-1',
    },
  ];

export default () => {
  const [multiSelect, setMultiSelect] = React.useState(false)
  const [selected, setSelected] = React.useState([])
  const [disabled, setDisabled] = React.useState(false)

  const hadnleNodeSelect = (e, nodeIds) => {
    setSelected(nodeIds)
  }

  return (
      <Demo>
        <Box sx={{mb: 2}}>
          <Checkbox 
            label="多选"
            checked={multiSelect}
            onChange={(e) => setMultiSelect(!multiSelect)} 
          />
          <Checkbox 
            label="disabled"
            checked={disabled}
            onChange={(e) => setDisabled(!disabled)} 
          />
        </Box>

        <Box sx={{pt:2, pb: 2}}>
          Current: {Array.isArray(selected) ?  selected.join(',') : selected }
        </Box>
      
        <Box sx={{ width: '500px' }}>
          <TreeView 
            data={treeData}
            multiSelect={multiSelect}
            selected={selected}
            disabled={disabled}
            onNodeSelect={hadnleNodeSelect}
          />
        </Box>
      </Demo>
    )
}
```

```tsx
/**
 * title: 定制额外节点
 * desc: 为 TreeViwe 设置 renderExtra 可以自定义树节点的展示。
 */
import * as React from 'react';
import { Demo, TreeView, TreeItem, Box, Checkbox} from 'fbm-ui'
 const treeData = [
    {
      label: 'Node1',
      id: '0-0',
      disabled: true,
      children: [
        {
          label: 'Child Node1',
          id: '0-0-1',
        },
        {
          label: 'Child Node2',
          id: '0-0-2',
        },
      ],
    },
    {
      label: 'Node2',
      id: '0-1',
    },
  ];

export default () => {
  const [multiSelect, setMultiSelect] = React.useState(false)
  const [selected, setSelected] = React.useState([])
  const [disabled, setDisabled] = React.useState(false)

  const hadnleNodeSelect = (e, nodeIds) => {
    setSelected(nodeIds)
  }

  return (
      <Demo>

      
        <Box sx={{ width: '500px' }}>
          <TreeView 
            data={treeData}
            selected={selected}
            disabled={disabled}
            onNodeSelect={hadnleNodeSelect}
            renderExtra={() => {
              return (
                <span>
                  <AddIcon />
                </span>
              )
            }}
          />
        </Box>
      </Demo>
    )
}
```



<!-- 
```tsx
/**
 * title: 定制节点
 * desc: 
 */
import * as React from 'react';
import { Demo, TreeView, TreeItem, Box, AddIcon, MinusIcon } from 'fbm-ui'

export default () => {
 const [selected, setSelected ] = React.useState([])
 const treeData = [
    {
      label: 'Node1',
      id: '0-0',
      children: [
        {
          label: 'Child Node1',
          id: '0-0-1',
        },
        {
          label: 'Child Node2',
          id: '0-0-2',
        },
      ],
    },
    {
      label: 'Node2',
      id: '0-1',
    },
  ];

  const hadnleNodeSelect = (e, nodeIds, ...arg) => {
    setSelected(nodeIds)
  }


  const renderTreeItemContent = ({ icon, nodeId, selected, expanded, handleSelection, handleExpansion }) => {
    return (
      <Box 
        sx={{ 
          color: selected ?  '#4caf50' :  'rgba(0, 0, 0, 0.86)',
          display: 'flex', 
          alignItems: 'center',
          pt: 1,
          pb: 1
        }}
      >
        <span onClick={handleExpansion}>{icon}</span>
        <span onClick={handleSelection}>{nodeId}</span>
      </Box>
    )
  }

  return (
    <Demo>
      Current: {selected.join(',')}
      <Box sx={{ width: '500px' }}>
        <TreeView 
          multiSelect
          defaultCollapseIcon={<MinusIcon /> }
          defaultExpandIcon={ <AddIcon />}
          selected={selected}
          data={treeData}
          onNodeSelect={hadnleNodeSelect}
          renderTreeItemContent={renderTreeItemContent}
        />
      </Box>
    </Demo>
  )
}
```

```tsx
/**
 * title: 搜索树
 * desc: 
 */
import * as React from 'react';
import { Demo, TreeView, Input, Box } from 'fbm-ui'

const TreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-1',
        key: '0-0-1',
        children: [
          {
            title: 'Leaf 0-0-1-1',
            key: '0-0-1-1',
          },
          {
            title: 'Leaf 0-0-1-2',
            key: '0-0-1-2',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
        key: '0-1-1',
        children: [
          {
            title: 'Leaf 0-1-1-0',
            key: '0-1-1-0',
          },
        ],
      },
      {
        title: 'Branch 0-1-2',
        key: '0-1-2',
        children: [
          {
            title: 'Leaf 0-1-2-0',
            key: '0-1-2-0',
          },
        ],
      },
    ],
  },
];

function searchData(inputValue) {
  const loop = (data) => {
    const result = [];
    data.forEach((item) => {
      if (item.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
        result.push({ ...item });
      } else if (item.children) {
        const filterData = loop(item.children);

        if (filterData.length) {
          result.push({ ...item, children: filterData });
        }
      }
    });
    return result;
  };

  return loop(TreeData);
}


export default () => {
  const [selected, setSelected ] = React.useState([])
  const [treeData, setTreeData] = React.useState(TreeData);
  const [inputValue, setInputValue] = React.useState('');

   React.useEffect(() => {
    if (!inputValue) {
      setTreeData(TreeData);
    } else {
      const result = searchData(inputValue);
      console.log(result)
      setTreeData(result);
    }
  }, [inputValue]);

  return (
    <Demo>
      <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>

      <Box sx={{ width: '500px' }}>
        <TreeView 
          getNodeLabel={(nd) => nd.title}
          getNodeId={(nd) => nd.key}
          data={treeData}
        />
      </Box>
    </Demo>
  )
}
``` -->
