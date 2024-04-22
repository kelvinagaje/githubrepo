import { Container, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';

import React from 'react';

function SearchBar (){
    return(
        <Container mt={20}>
            <Stack>
                   <InputGroup>
                       <InputRightElement>
                          ?
                       </InputRightElement>
                      <Input type='text' placeholder='Search'  />
                   </InputGroup>
            </Stack>
        </Container>
    );
}

export default SearchBar; 