import { Container, Heading, Stack } from '@components'
import { FormComponent } from '@convert-files'

export const Home = () => {
  return (
    <Stack padding={8}>
      <Container fluid>
        <Heading size="xl">Convert Files</Heading>
        <Container maxW={'5xl'}>
          <FormComponent />
        </Container>
      </Container>
    </Stack>
  )
}
