
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import React, { useState, useEffect, useDisclosure } from "react";
import axios from "axios";

const RepoRows = () => {
  const [reposgit, setReposGit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        setReposGit(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching repositories", error);
      }
    };
    fetchRepos();
  }, []);

  const handleViewDetails = (repoData) => {
    setSelectedRepo(repoData);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRepo(null);
    setIsOpen(false);
  };


  // const repo = [{
  //     id:1, repoName:"TestRepo1", owner:"Mine", repoSub:'Another name for repo1', repoDescription:'This is repo 1',
  // },
  // {
  //    id:2, repoName:"TestRepo2", owner:"Minute", repoSub:'another name for repo 2', repoDescription:"This is Repo 2"
  // },
  // {
  //     id:3, repoName:"TestRepo2", owner:"Minute", repoSub:'another name for repo 2', repoDescription:"This is Repo 3"
  //  },
  // ];
  return (
    <>
      <SimpleGrid columns={[2, null, 2]} gap={10} mt={10}>
        {reposgit.map((repoData) => (
          <Box>
            <Card key={repoData.id}>
              <CardHeader>
                <Heading>{repoData.full_name}</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <CardHeader>
                    <h3>Date Created:{repoData.created_at}</h3>
                  </CardHeader>

                  <CardBody>{repoData.description}</CardBody>
                  <CardFooter>
                  <Button onClick={() => handleViewDetails(repoData)}>View More</Button>
                    {selectedRepo && (
                      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>{selectedRepo.full_name}</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                               <Heading> 
                                  <Center>
                                      {selectedRepo.full_name}
                                    </Center>    
                             </Heading>
                             <Table variant='striped'>
                                   <Thead>
                                       <Tr>
                                           <Th>Info</Th>
                                           <Th>Description</Th>
                                       </Tr>
                                   </Thead>
                                   <Tbody>
                                       <Tr>
                                           <Td>Created at</Td>
                                           <Td> {selectedRepo.created_at} </Td>
                                       </Tr>
                                       <Tr>
                                            <Td>Branch</Td>
                                            <Td> {selectedRepo.default_branch} </Td>
                                       </Tr>
                                   </Tbody>
                             </Table>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme="blue"
                              mr={3}
                              onClick={handleCloseModal}
                            >
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    )}
                  </CardFooter>
                </Stack>
              </CardBody>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default RepoRows;
