import { useCallback, useState } from 'react'

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
} from '@components'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertFile, type KeyRequest } from '@lib'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

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

export const FormComponent = () => {
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

  const handleFormSubmit: SubmitHandler<FormValues> = useCallback(
    async (formData) => {
      if (!file || file.length === 0) {
        setFileError(true)
        return
      }

      setIsLoading(true)
      setMessage(null)
      setFileError(false)

      const { fromConvert, toConvert } = formData

      const conversionKey = `${fromConvert}_to_${toConvert}` as KeyRequest
      const [selectedFile] = file

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
            text: `File converted successfully! Downloaded as: ${result.filename ?? 'converted file'}`,
          })

          setFile(null)
          setValue('fromConvert', '')
          setValue('toConvert', '')

          return
        }

        setMessage({
          type: 'error',
          text: result.error ?? 'Conversion failed',
        })
      } catch (error) {
        setMessage({
          type: 'error',
          text: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [file, setValue],
  )

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      setFile(files)
      setFileError(false)
      setMessage(null)
    }
  }, [])

  return (
    <Container maxWidth="4xl" py={4}>
      <Flex direction="column" gap={4}>
        {/* Header Section - Enhanced colors */}
        <Flex direction="column" align="center" textAlign="center">
          <Heading size="lg" fontWeight="bold" letterSpacing="tight" color="gray.900">
            File Format Converter
          </Heading>
          <Heading size="sm" color="gray.500" fontWeight="normal" maxWidth="lg">
            Transform your files between different formats quickly and easily.
          </Heading>
        </Flex>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex direction="column" gap={4}>
            {/* Conversion Format Section - Enhanced */}
            <Container
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <Flex direction="column" gap={4}>
                <Flex align="center" gap={2}>
                  <Flex
                    bg="blue.100"
                    p={1.5}
                    borderRadius="md"
                    align="center"
                    justify="center"
                    minWidth="8"
                    height="8"
                  >
                    <span style={{ fontSize: '16px' }}>🔄</span>
                  </Flex>
                  <Heading size="md" color="gray.900">
                    Select Format
                  </Heading>
                </Flex>

                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  alignItems={{ base: 'stretch', md: 'end' }}
                  gap={4}
                >
                  <Field.Root invalid={!!errors.fromConvert} flex={1}>
                    <Field.Label fontSize="sm" fontWeight="semibold" color="gray.700">
                      From
                    </Field.Label>
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
                            <Select.Trigger
                              bg="gray.50"
                              borderColor="gray.200"
                              _hover={{ borderColor: 'gray.300', bg: 'gray.100' }}
                              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                              height="10"
                            >
                              <Select.ValueText placeholder="Select source format" />
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
                    <Field.ErrorText fontSize="sm" />
                  </Field.Root>

                  <Flex
                    align="center"
                    justify="center"
                    height="10"
                    display={{ base: 'none', md: 'flex' }}
                  >
                    <Flex
                      bg="blue.50"
                      p={2}
                      borderRadius="full"
                      color="blue.600"
                      border="1px solid"
                      borderColor="blue.100"
                    >
                      <ArrowRightLongIcon />
                    </Flex>
                  </Flex>

                  <Field.Root invalid={!!errors.toConvert} flex={1}>
                    <Field.Label fontSize="sm" fontWeight="semibold" color="gray.700">
                      To
                    </Field.Label>
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
                            <Select.Trigger
                              bg="gray.50"
                              borderColor="gray.200"
                              _hover={{ borderColor: 'gray.300', bg: 'gray.100' }}
                              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                              height="10"
                            >
                              <Select.ValueText placeholder="Select target format" />
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
                    <Field.ErrorText fontSize="sm" />
                  </Field.Root>
                </Flex>
              </Flex>
            </Container>

            {/* File Upload Section - Enhanced */}
            <Container
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <Flex direction="column" gap={4}>
                <Flex align="center" gap={2}>
                  <Flex
                    bg="emerald.100"
                    p={1.5}
                    borderRadius="md"
                    align="center"
                    justify="center"
                    minWidth="8"
                    height="8"
                  >
                    <span style={{ fontSize: '16px' }}>📁</span>
                  </Flex>
                  <Heading size="md" color="gray.900">
                    Upload File
                  </Heading>
                </Flex>

                <Dropzone
                  acceptedFileTypes={acceptedFileTypes}
                  description="Drag and drop your file here or click to browse"
                  filesDescription={`Supported formats: ${acceptedFileTypes.join(', ')}`}
                  isError={fileError}
                  hasFiles={!!file}
                  onFilesChange={handleFileChange}
                />
              </Flex>
            </Container>

            {/* Submit Button - Enhanced */}
            <Button
              size="lg"
              type="submit"
              width="100%"
              disabled={isLoading}
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600', transform: 'translateY(-1px)' }}
              _active={{ bg: 'blue.700', transform: 'translateY(0)' }}
              _disabled={{ bg: 'gray.400', cursor: 'not-allowed' }}
              height="12"
              borderRadius="lg"
              fontWeight="semibold"
              fontSize="md"
              boxShadow="sm"
              transition="all 0.2s"
            >
              <Flex direction="row" alignItems="center" gap={2}>
                <RefreshIcon />
                {isLoading ? 'Converting...' : 'Convert File'}
              </Flex>
            </Button>

            {/* Message Display - Enhanced */}
            {message && (
              <Flex
                p={4}
                borderRadius="lg"
                bg={message.type === 'success' ? 'emerald.50' : 'red.50'}
                color={message.type === 'success' ? 'emerald.900' : 'red.900'}
                border="1px solid"
                borderColor={message.type === 'success' ? 'emerald.300' : 'red.300'}
                align="center"
                gap={2}
                fontWeight="medium"
                fontSize="sm"
                boxShadow="sm"
              >
                <span style={{ fontSize: '16px' }}>{message.type === 'success' ? '✅' : '❌'}</span>
                {message.text}
              </Flex>
            )}
          </Flex>
        </form>
      </Flex>
    </Container>
  )
}
