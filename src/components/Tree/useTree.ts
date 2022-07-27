
import { DataNode, TreeProps} from './interface'

const useTree = ({
  data: dataProp = [],
}: TreeProps) => {

  return {
    data: dataProp
  }
}

export default useTree;