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

export const OrderDetails: React.FC<Props> = ({ opened, close }) => {
  return (
    <Drawer.Root opened={opened} onClose={close} position='right'>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title fw={700} fz='20px'>
            Order Details
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction='column' justify='space-between' mih='90vh'>
            <Flex direction='column'>
              <Flex w='100%' mt='40px' direction='column'>
                <Text fz='16px' fw={600}>
                  Food Truck
                </Text>
                <Text c='dimmed' fz='14px'>
                  Sheffield
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Customer
                </Text>
                <Text c='dimmed' fz='14px'>
                  Appleseed
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Total Price:
                </Text>
                <Text c='dimmed' fz='14px'>
                  $1200
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Location:
                </Text>
                <Text c='dimmed' fz='14px'>
                  New York
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Date:
                </Text>
                <Text c='dimmed' fz='14px'>
                  14th May 2024
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Status
                </Text>
                <Badge color='green' fz='12px'>
                  Available
                </Badge>
              </Flex>
            </Flex>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
