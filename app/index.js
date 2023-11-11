/** HOME */
'use client';
import { Container, Box } from '@chakra-ui/react';

export function Index({ children }) {
  return (
    <Container maxW="2xl" h="100%" bg={'silver.100'} centerContent>
      <Box bg={'salmon.100'}>Hello</Box>
      {children}
    </Container>
  );
}
