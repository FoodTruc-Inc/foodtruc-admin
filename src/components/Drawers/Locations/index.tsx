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

export const LocationDetails: React.FC<Props> = ({ opened, close }) => {
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
                  src='https://todocodigo.net/img/626.jpg'
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
                  100 Main St.
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Address:
                </Text>
                <Text c='dimmed' fz='14px'>
                  100 Main Street, Linden, New Jersey 07036, United States
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Price:
                </Text>
                <Text c='dimmed' fz='14px'>
                  $1200
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Description:
                </Text>
                <Text c='dimmed' fz='14px'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                </Text>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600}>
                  Status:
                </Text>
                <Badge color='green' fz='12px'>
                  Available
                </Badge>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600} mb={5}>
                  Time Slots:
                </Text>
                <Flex wrap='wrap'>
                  {[
                    '11:00 AM',
                    '12:00 PM',
                    '1:00 PM',
                    '2:00 PM',
                    '3:00 PM',
                    '4:00 PM',
                  ].map((time, index) => (
                    <Flex
                      key={index}
                      bg='color.4'
                      p='5px 10px'
                      mr='10px'
                      style={{
                        borderRadius: '5px',
                      }}
                      mb='10px'
                    >
                      <Text key={index} fz='14px' fw={600}>
                        {time}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              <Flex w='100%' mt='15px' direction='column'>
                <Text fz='14px' fw={600} mb={5}>
                  Photos:
                </Text>
                <Flex wrap='wrap'>
                  {[
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/cc/d7/75/indoor-seating.jpg?w=600&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/cc/d7/75/indoor-seating.jpg?w=600&h=-1&s=1',
                    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/cc/d7/75/indoor-seating.jpg?w=600&h=-1&s=1',
                  ].map((photo, index) => (
                    <Flex
                      key={index}
                      bg='color.4'
                      style={{
                        borderRadius: '5px',
                      }}
                      mr={10}
                      mb='10px'
                    >
                      <Image
                        key={index}
                        src={photo}
                        w='100px'
                        height={100}
                        alt='location image'
                      />
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
