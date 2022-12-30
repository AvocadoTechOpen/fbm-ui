import React, { forwardRef } from 'react'
import { styled, Box } from '@mui/material'
import RcUpload, { UploadProps as RcUploadProps } from 'rc-upload'
import { unstable_composeClasses as composeClasses } from '@mui/base'
import UploadItems from './UploadList/index'
import {
  UploadProps,
  RcFile,
  UploadFile,
  UploadChangeParam,
  UploadType,
  UploadListPlace,
} from './types'
import { file2Obj, getFileItem, updateFileList, removeFileItem } from './utils'
import { useMergedState } from '../../hooks'
import UploadChildrenButton from './UploadChildren/Button'
import UploadChildrenDragger from './UploadChildren/Dragger'
import UploadChildrenCube from './UploadChildren/Cube'
import { getUploadUtilityClass } from './uploadClasses'

const LIST_IGNORE = `__LIST_IGNORE_${Date.now()}__`

const useUtilityClasses = (ownerState) => {
  const {} = ownerState

  const slots = {
    root: ['root'],
    button: ['button'],
    drop: ['drop'],
    cube: ['cube'],
    uploadList: ['uploadList'],
    uploadListItem: ['uploadListItem'],
    uploadListItemSelected: ['uploadListItemSelected'],
  }

  return composeClasses(slots, getUploadUtilityClass, {})
}

type OwnerState = {
  type: UploadType
  uploadListPlace: UploadListPlace
}

const UploadRoot = styled(Box)(({ ownerState }: { ownerState: OwnerState }) => {
  return {
    ...(ownerState.type === 'cube' && {
      display: 'flex',
    }),
  }
})

const UploadListRoot = styled(Box)(
  ({ ownerState }: { ownerState: OwnerState }) => {
    const { type, uploadListPlace } = ownerState
    return {
      ...(type === 'cube' && { display: 'flex', flex: true }),
      ...(type !== 'cube' && {
        ...(uploadListPlace === 'top' && {
          marginBottom: 10,
        }),
        ...(uploadListPlace === 'bottom' && {
          marginTop: 10,
        }),
      }),
    }
  }
)

const Upload: React.FC<UploadProps> = forwardRef((props, ref) => {
  const {
    type,
    accept,
    capture,
    name,
    multiple,
    children: childrenProp,
    action,
    customRequest,
    fileList,
    defaultFileList,
    maxCount,
    headers,
    showUploadList,
    uploadListPlace = props.type === 'cube' ? 'before' : 'after',
    itemRender,
    onChange,
    onRemove,
    onDrop,
    onSelect,
    selected,
    UploadListProps,
    icon,
    variant,
    color,
    ...restProps
  } = props

  const captureProps = capture != null ? { capture } : {}

  const [mergedFileList, setMergedFileList] = useMergedState(
    defaultFileList || [],
    {
      value: fileList,
      postState: (list) => list ?? [],
    }
  )

  const [dragState, setDragState] = React.useState<string>('drop')
  const [uploadedFile, setUploadedFile] = React.useState<UploadFile>()

  const upload = React.useRef<any>()

  // 自动填入uid
  React.useMemo(() => {
    const timestamp = Date.now()
    ;(fileList || []).forEach((file, index) => {
      if (!file.uid && !Object.isFrozen(file)) {
        file.uid = `__AUTO__${timestamp}_${index}__`
      }
    })
  }, [fileList])

  const mergedBeforeUpload = async (file: RcFile, fileListArgs: RcFile[]) => {
    const { beforeUpload } = props
    let parsedFile: File | Blob | string = file
    if (beforeUpload) {
      const result = await beforeUpload(file, fileListArgs)

      if (result === false) {
        return false
      }

      delete (file as any)[LIST_IGNORE]
      if ((result as any) === LIST_IGNORE) {
        Object.defineProperty(file, LIST_IGNORE, {
          value: true,
          configurable: true,
        })
        return false
      }

      if (typeof result === 'object' && result) {
        parsedFile = result as File
      }
    }

    return parsedFile as RcFile
  }

  const onInternalChange = (
    file: UploadFile,
    changedFileList: UploadFile[],
    event?: { percent: number }
  ) => {
    let cloneList = [...changedFileList]

    if (maxCount === 1) {
      cloneList = cloneList.slice(-1)
    } else if (maxCount) {
      cloneList = cloneList.slice(0, maxCount)
    }
    cloneList = cloneList?.filter((t) => t.status)
    setMergedFileList(cloneList)

    const changeInfo: UploadChangeParam<UploadFile> = {
      file: file as UploadFile,
      fileList: cloneList,
    }

    if (event) {
      changeInfo.event = event
    }

    setUploadedFile(file)

    onChange?.(changeInfo)
  }

  const onBatchStart: RcUploadProps['onBatchStart'] = (batchFileInfoList) => {
    const filteredFileInfoList = batchFileInfoList.filter(
      (info) => !(info.file as any)[LIST_IGNORE]
    )
    if (!filteredFileInfoList.length) {
      return
    }

    const objectFileList = filteredFileInfoList.map((info) =>
      file2Obj(info.file as RcFile)
    )
    let newFileList = [...mergedFileList]
    objectFileList.forEach((fileObj) => {
      newFileList = updateFileList(fileObj, newFileList)
    })

    objectFileList.forEach((fileObj, index) => {
      let triggerFileObj: UploadFile = fileObj

      if (!filteredFileInfoList[index].parsedFile) {
        const { originFileObj } = fileObj
        let clone

        try {
          clone = (new File([originFileObj], originFileObj.name, {
            type: originFileObj.type,
          }) as any) as UploadFile
        } catch (e) {
          clone = (new Blob([originFileObj], {
            type: originFileObj.type,
          }) as any) as UploadFile
          clone.name = originFileObj.name
          clone.lastModifiedDate = new Date()
          clone.lastModified = new Date().getTime()
        }

        clone.uid = fileObj.uid
        triggerFileObj = clone
      } else {
        fileObj.status = 'uploading'
      }

      onInternalChange(triggerFileObj, newFileList)
    })
  }

  const onSuccess = (response: any, file: RcFile, xhr: any) => {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (e) {
      /* do nothing */
    }

    // removed
    if (!getFileItem(file, mergedFileList)) {
      return
    }

    const targetItem = file2Obj(file)
    targetItem.status = 'done'
    targetItem.percent = 100
    targetItem.response = response
    targetItem.xhr = xhr

    const nextFileList = updateFileList(targetItem, mergedFileList)

    onInternalChange(targetItem, nextFileList)
  }

  const onError = (error: Error, response: any, file: RcFile) => {
    // removed
    if (!getFileItem(file, mergedFileList)) {
      return
    }

    const targetItem = file2Obj(file)
    targetItem.error = error
    targetItem.response = response
    targetItem.status = 'error'

    const nextFileList = updateFileList(targetItem, mergedFileList)

    onInternalChange(targetItem, nextFileList)
  }

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDragState(e.type)

    if (e.type === 'drop') {
      onDrop?.(e)
    }
  }

  const onProgress = (e: { percent: number }, file: RcFile) => {
    // removed
    if (!getFileItem(file, mergedFileList)) {
      return
    }

    const targetItem = file2Obj(file)
    targetItem.status = 'uploading'
    targetItem.percent = e.percent

    const nextFileList = updateFileList(targetItem, mergedFileList)

    onInternalChange(targetItem, nextFileList, e)
  }

  const handleRemove = (file: UploadFile) => {
    let currentFile: UploadFile
    Promise.resolve(
      typeof onRemove === 'function' ? onRemove(file) : onRemove
    ).then((ret) => {
      // Prevent removing file
      if (ret === false) {
        return
      }

      const removedFileList = removeFileItem(file, mergedFileList)

      if (removedFileList) {
        currentFile = { ...file, status: 'removed' }
        mergedFileList?.forEach((item) => {
          const matchKey = currentFile.uid !== undefined ? 'uid' : 'name'
          if (
            item[matchKey] === currentFile[matchKey] &&
            !Object.isFrozen(item)
          ) {
            item.status = 'removed'
          }
        })
        upload.current?.abort(currentFile)

        onInternalChange(currentFile, removedFileList)
        setUploadedFile(undefined) // TODO: 加上它之后是否有副作用
      }
    })
  }

  const handleRefresh = (file: UploadFile) => {
    const uploadFiles = upload?.current?.uploader?.uploadFiles
    if (!uploadFiles || typeof uploadFiles !== 'function') {
      return console.warn('uploadFiles方法不存在')
    }

    uploadFiles([file])
  }

  const handleSelect = () => {}

  React.useImperativeHandle(ref, () => ({
    onBatchStart,
    onSuccess,
    onProgress,
    onError,
    fileList: mergedFileList,
    upload: upload.current,
    uploader: upload?.current?.uploader,
  }))

  const classes = useUtilityClasses({})

  let children: React.ReactNode = null
  if (type === 'drop') {
    children = (
      <UploadChildrenDragger
        className={classes.drop}
        status={dragState}
        file={uploadedFile}
        onRemove={handleRemove}
        multiple={multiple}
      >
        {childrenProp}
      </UploadChildrenDragger>
    )
  } else if (type === 'cube') {
    children = (
      <UploadChildrenCube
        className={classes.cube}
        file={uploadedFile}
        onRemove={handleRemove}
      >
        {childrenProp}
      </UploadChildrenCube>
    )
  } else if (type === 'button') {
    children = (
      <UploadChildrenButton
        className={classes.button}
        variant={variant}
        color={color}
        icon={icon}
      >
        {childrenProp}
      </UploadChildrenButton>
    )
  } else if (type === 'custom') {
    if (typeof childrenProp === 'function') {
      children = childrenProp(mergedFileList, {
        handleRemove,
        handleRefresh,
        dragState,
      })
    } else {
      children = childrenProp
    }
  }

  const ownerState = {
    type,
    uploadListPlace,
  }

  const isShowUploadButton =
    maxCount == null ||
    (typeof maxCount === 'number' && mergedFileList.length < maxCount) || !showUploadList
  const uploadButton = isShowUploadButton && (
    <RcUpload
      ref={upload}
      name={name}
      accept={accept}
      action={action}
      multiple={multiple}
      headers={headers}
      customRequest={customRequest}
      beforeUpload={mergedBeforeUpload}
      onBatchStart={onBatchStart}
      onSuccess={onSuccess}
      onError={onError}
      onProgress={onProgress}
      {...captureProps}
    >
      {children}
    </RcUpload>
  )

  const uploadList = showUploadList ? (
    <UploadListRoot
      className={classes.uploadList}
      ownerState={ownerState}
      {...UploadListProps}
    >
      <UploadItems
        type={type}
        selected={selected}
        items={mergedFileList}
        onRemove={handleRemove}
        onRefresh={handleRefresh}
        onSelect={onSelect}
        itemRender={itemRender}
        classes={{
          root: classes.uploadListItem,
          selected: classes.uploadListItemSelected,
        }}
      />
    </UploadListRoot>
  ) : null

  return (
    <UploadRoot
      ownerState={ownerState}
      onDrop={onFileDrop}
      onDragOver={onFileDrop}
      onDragLeave={onFileDrop}
      className={classes.root}
      {...restProps}
    >
      {(uploadListPlace === 'top' || uploadListPlace === 'before') &&
        uploadList}
      {uploadButton}
      {(uploadListPlace === 'bottom' || uploadListPlace === 'after') &&
        uploadList}
    </UploadRoot>
  )
})
Upload.defaultProps = {
  multiple: false,
  action: '',
  data: {},
  accept: '',
  type: 'button',
  showUploadList: true,
}

export default Upload
