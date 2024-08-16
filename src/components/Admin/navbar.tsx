'use client';
import { Avatar, Flex, Menu, Text } from '@mantine/core';
import NotificationIcon from '@/assets/icons/notifications.svg';
import RedDot from '@/assets/icons/dot-red.svg';
import { useMe } from '@/hooks/data/useMe';

interface Props {
  title: string;
}

export const AdminNavbar: React.FC<Props> = ({ title }) => {
  const { data } = useMe();
  return (
    <Flex
      h='70px'
      bg='color.3'
      style={{
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}>
      <Flex align='center' justify='space-between' w='100%' px='40px'>
        <Text c='color.27' fz='24px' fw={800}>
          {title}
        </Text>
        <Flex align='center'>
          <Menu shadow='md' width={400}>
            <Menu.Target>
              <Flex
                ml='20px'
                h='50px'
                w='50px'
                style={{
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: 'None',
                }}
                align='center'
                justify='center'>
                <Flex
                  style={{
                    position: 'relative',
                  }}>
                  <RedDot
                    style={{
                      position: 'absolute',
                      top: '0px',
                      right: '2px',
                      zIndex: 1,
                    }}
                  />
                  <NotificationIcon />
                </Flex>
              </Flex>
            </Menu.Target>
            <Menu.Dropdown pt='20px'>
              <Flex direction='column' mx='20px'>
                <Text c='color.9' fw={600} fz='20px' mb='11px'>
                  Notification
                </Text>
                <Menu.Item
                  style={{
                    borderRadius: '16px',
                  }}
                  h='80px'
                  w='100%'
                  px='15px'
                  py={20}
                  mb={20}
                  bg='color.26'></Menu.Item>
              </Flex>
            </Menu.Dropdown>
          </Menu>
          <Flex h='35px' w='2px' mx='15px' bg='color.6'></Flex>
          <Flex align='center'>
            <Avatar name={data?.fullName} mr='10px' />
            <Text c='color.9' fw={400} fz='16px'>
              {data?.fullName}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
