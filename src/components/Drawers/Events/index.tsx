import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Flex,
  Image,
  Text,
} from '@mantine/core';

interface Props {
  opened: boolean;
  close: () => void;
}

export const EventDetails: React.FC<Props> = ({ opened, close }) => {
  return (
    <Drawer.Root opened={opened} onClose={close} position='right'>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title fw={700} fz='20px'>
            Location Details
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction='column' justify='space-between' mih='90vh'>
            <Flex direction='column'>
              <Flex w='100%' h='200px' mt='10px' direction='column'>
                <Image
                  src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F807669549%2F589616645133%2F1%2Foriginal.20240715-043754?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C150%2C1178%2C589&s=6171fb2491b35461244b41e515be2faf'
                  w='100%'
                  height={200}
                  alt='location image'
                />
              </Flex>
              <Flex w='100%' mt='20px' direction='column'>
                <Text fz='16px' fw={600}>
                  Name:
                </Text>
                <Text c='dimmed' fz='14px'>
                  October Fest
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Event Planner:
                </Text>
                <Text c='dimmed' fz='14px'>
                  October Fest
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Category:
                </Text>
                <Text c='dimmed' fz='14px'>
                  FESTIVAL
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Location:
                </Text>
                <Text c='dimmed' fz='14px'>
                  Carolina
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Cost:
                </Text>
                <Text c='dimmed' fz='14px'>
                  $20
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Attendees:
                </Text>
                <Text c='dimmed' fz='14px'>
                  200
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Assigned Food Truck
                </Text>
                <Text c='dimmed' fz='14px'>
                  Yes
                </Text>
              </Flex>
            </Flex>
            <Flex w='100%' justify='flex-end'>
              <Button>Edit</Button>
              <Button c='color.3' bg='color.5' ml='10px'>
                Cancel
              </Button>
            </Flex>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
