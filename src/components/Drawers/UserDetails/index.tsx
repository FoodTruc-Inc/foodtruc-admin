import { Avatar, Button, Drawer, Flex, Text } from '@mantine/core';

interface Props {
  opened: boolean;
  close: () => void;
}

export const UserDetails: React.FC<Props> = ({ opened, close }) => {
  return (
    <Drawer.Root opened={opened} onClose={close} position='right'>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title fw={700} fz='20px'>
            User Details
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction='column' justify='space-between' mih='90vh'>
            <Flex direction='column'>
              <Flex
                w='100%'
                direction='column'
                align='center'
                mt='40px'
                flex='1'
                h='100%'
              >
                <Avatar
                  src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                  radius='120px'
                  size='120px'
                />
                <Text fz='24px' fw={700} mt='10px'>
                  Randy Yhap
                </Text>
                <Text fz='18px' fw={500} c='dimmed'>
                  Admin
                </Text>
              </Flex>
              <Flex w='100%' align='center' mt='40px' justify='space-between'>
                <Text fz='14px' fw={600}>
                  Location:
                </Text>
                <Text c='dimmed' fz='14px'>
                  New York
                </Text>
              </Flex>
              <Flex w='100%' align='center' mt='15px' justify='space-between'>
                <Text fz='14px' fw={600}>
                  Email:
                </Text>
                <Text c='dimmed' fz='14px'>
                  randy.yhap@gmail.com
                </Text>
              </Flex>
              <Flex w='100%' align='center' mt='15px' justify='space-between'>
                <Text fz='14px' fw={600}>
                  Phone:
                </Text>
                <Text c='dimmed' fz='14px'>
                  +1 (123) 456-7890
                </Text>
              </Flex>
              <Flex w='100%' align='center' mt='15px' justify='space-between'>
                <Text fz='14px' fw={600}>
                  Date Joined:
                </Text>
                <Text c='dimmed' fz='14px'>
                  17 August, 2024
                </Text>
              </Flex>
              <Flex w='100%' align='center' mt='15px' justify='space-between'>
                <Text fz='14px' fw={600}>
                  Last Active:
                </Text>
                <Text c='dimmed' fz='14px'>
                  21 August, 2024
                </Text>
              </Flex>
            </Flex>
            <Flex w='100%' justify='flex-end'>
              <Button c='color.3' bg='color.5'>
                Deactivate
              </Button>
            </Flex>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
