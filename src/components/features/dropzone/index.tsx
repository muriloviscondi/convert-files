import { type FormEvent } from 'react'

import { Box, FileUpload, Icon, OutlineCloudUploadIcon } from '@components'

type Props = {
  acceptedFileTypes?: string[]
  description: string
  filesDescription: string
  hasFiles?: boolean
  isError?: boolean
  maxFiles?: number
  onFilesChange?: (files: FileList | null) => void
}

export const Dropzone = ({
  acceptedFileTypes,
  description,
  filesDescription,
  hasFiles = false,
  isError = false,
  maxFiles = 1,
  onFilesChange,
}: Props) => {
  const handleFileInputChange = (e: FormEvent<HTMLInputElement>) => {
    onFilesChange?.(e.currentTarget.files)
  }

  const errorBorderColor = isError ? 'red.500' : 'border.muted'
  const errorColor = isError ? 'red.500' : 'fg.muted'

  return (
    <FileUpload.Root
      alignItems="stretch"
      maxFiles={maxFiles}
      accept={acceptedFileTypes}
      borderColor="border.muted"
    >
      <FileUpload.HiddenInput type="file" onChange={handleFileInputChange} />
      <FileUpload.Dropzone borderColor={errorBorderColor}>
        <Icon size="2xl" color={errorColor}>
          <OutlineCloudUploadIcon />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box color={errorColor}>{description}</Box>
          <Box color={errorColor}>{filesDescription}</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      {hasFiles && <FileUpload.List />}
    </FileUpload.Root>
  )
}
