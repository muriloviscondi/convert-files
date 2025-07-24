import { useState } from 'react'

import { Button, createListCollection } from '@chakra-ui/react'
import {
  ArrowRightLongIcon,
  Container,
  Dropzone,
  Field,
  Flex,
  Heading,
  Portal,
  RefreshIcon,
  Select,
  Stack,
} from '@components'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { convertFile, type KeyRequest } from '@lib'

type FormValues = z.infer<typeof formSchema>

const acceptedFileTypes: string[] = ['.csv', '.json', '.xlsx'] as const

const FileType = {
  CSV: '.csv',
  JSON: '.json',
  XLSX: '.xlsx',
} as const

const fileTypes = createListCollection({
  items: [
    { label: FileType.CSV, value: 'CSV' },
    { label: FileType.JSON, value: 'JSON' },
    { label: FileType.XLSX, value: 'XLSX' },
  ],
})

const formSchema = z.object({
  fromConvert: z.string({ error: 'The type is required!' }).min(1, 'The type is required!'),
  toConvert: z.string({ error: 'The type is required!' }).min(1, 'The type is required!'),
})

export const Home = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const [file, setFile] = useState<FileList | null>(null)
  const [fileError, setFileError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleFormSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (!file || file.length === 0) {
      console.error('No file selected')
      setFileError(true)
      return
    }

    setIsLoading(true)
    setMessage(null)
    setFileError(false)

    const { fromConvert, toConvert } = formData

    const conversionKey = `${fromConvert}_to_${toConvert}` as KeyRequest
    const selectedFile = file[0]

    const fileName = selectedFile.name
    const fileType = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()

    const isValid =
      acceptedFileTypes.includes(fileType) && fileName.endsWith(`.${fromConvert.toLowerCase()}`)

    if (!isValid) {
      setMessage({
        type: 'error',
        text: `Invalid file type. Expected ${fromConvert} file.`,
      })
      setIsLoading(false)
      return
    }

    try {
      const result = await convertFile({ keyRequest: conversionKey, file: selectedFile })

      if (result.success) {
        setMessage({
          type: 'success',
          text: `File converted successfully! Downloaded as: ${result.filename}`,
        })

        setFile(null)
        setValue('fromConvert', '')
        setValue('toConvert', '')

        return
      }

      setMessage({
        type: 'error',
        text: result.error || 'Conversion failed',
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Unexpected error: ${error}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      console.log('Files changed:', files)
      setFile(files)
      setFileError(false)
      setMessage(null)
    }
  }

  return (
    <Stack padding={8}>
      <Container fluid>
        <Heading size="xl">Convert Files</Heading>
        <Container maxW={'5xl'}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Flex direction="column" gap={8} marginTop={4}>
              <Container>
                <Flex direction={'column'} gap={4}>
                  <Heading size="md">Select Conversion Format</Heading>
                  <Flex direction={'row'} alignItems={'center'} gap={8}>
                    <Field.Root invalid={!!errors.fromConvert} width="100%">
                      <Field.Label>Select a type</Field.Label>
                      <Controller
                        control={control}
                        name="fromConvert"
                        render={({ field }) => (
                          <Select.Root
                            collection={fileTypes}
                            value={field.value ? [field.value] : []}
                            onValueChange={(details) => {
                              field.onChange(details.value[0] || '')
                            }}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="File type" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content>
                                  {fileTypes.items.map((framework) => (
                                    <Select.Item item={framework} key={framework.value}>
                                      {framework.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        )}
                      />
                      <Field.ErrorText>{errors.fromConvert?.message}</Field.ErrorText>
                    </Field.Root>

                    <div style={{ position: 'relative', top: '12px' }}>
                      <ArrowRightLongIcon />
                    </div>

                    <Field.Root invalid={!!errors.toConvert} width="100%">
                      <Field.Label>Select a type</Field.Label>
                      <Controller
                        control={control}
                        name="toConvert"
                        render={({ field }) => (
                          <Select.Root
                            collection={fileTypes}
                            value={field.value ? [field.value] : []}
                            onValueChange={(details) => {
                              field.onChange(details.value[0] || '')
                            }}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="File type" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content>
                                  {fileTypes.items.map((framework) => (
                                    <Select.Item item={framework} key={framework.value}>
                                      {framework.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        )}
                      />
                      <Field.ErrorText>{errors.toConvert?.message}</Field.ErrorText>
                    </Field.Root>
                  </Flex>
                </Flex>
              </Container>
              <Container>
                <Flex direction={'column'} gap={4}>
                  <Heading size="md">Destination File</Heading>
                  <Dropzone
                    acceptedFileTypes={acceptedFileTypes}
                    description="Drag and drop files here"
                    filesDescription={acceptedFileTypes.join(', ')}
                    isError={fileError}
                    hasFiles={!!file}
                    onFilesChange={handleFileChange}
                  />
                </Flex>
              </Container>
              <Container>
                <Button size="md" type="submit" width="100%" disabled={isLoading}>
                  <Flex direction={'row'} alignItems={'center'} gap={4}>
                    <RefreshIcon />
                    {isLoading ? 'Converting...' : 'Submit'}
                  </Flex>
                </Button>
              </Container>

              {message && (
                <Container>
                  <Flex
                    padding={4}
                    borderRadius="md"
                    backgroundColor={message.type === 'success' ? 'green.100' : 'red.100'}
                    color={message.type === 'success' ? 'green.800' : 'red.800'}
                    border="1px solid"
                    borderColor={message.type === 'success' ? 'green.300' : 'red.300'}
                  >
                    {message.text}
                  </Flex>
                </Container>
              )}
            </Flex>
          </form>
        </Container>
      </Container>
    </Stack>
  )
}
