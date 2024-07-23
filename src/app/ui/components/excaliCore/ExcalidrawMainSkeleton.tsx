import { Box, Flex, Loader, Skeleton } from "@mantine/core";


const ExcalidrawMainSkeleton = () => {
  return (
    <Box bg="light-dark(#FFFFFF, #121212)" w="100%" h="100%">
      <Flex direction="column" justify="space-between" h={"100%"} p={16}>
        <Flex justify="space-between" mb={8}>
          <Flex w="33%" justify="flex-start"><Skeleton w={36} h={36} radius={8} /></Flex>
          <Flex w="33%" justify="center"><Skeleton p={4} w={506} h={44} radius={8} /></Flex>
          <Flex w="33%" justify="flex-end"><Skeleton p={4} w={82} h={36} radius={8} /></Flex>
        </Flex>
        <Flex justify="center">
          <Loader size={150} color="main" type="dots"/>
        </Flex>
        <Flex justify="space-between">
          <Skeleton w={214} h={36} radius={8} />
          <Skeleton w={36} h={36} radius={8} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ExcalidrawMainSkeleton;