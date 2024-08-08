'use client';
import { AdminNavbar } from '@/components/Admin';
import {
  Badge,
  Checkbox,
  Flex,
  Menu,
  Popover,
  Table,
  Text,
} from '@mantine/core';
import Ellipsis from '@/assets/icons/ellipse.svg';
import { useUsers } from '@/hooks/data/users';
import dayjs from 'dayjs';

export default function Page() {
  const { data, isLoading } = useUsers();

  return (
    <Flex direction='column' flex={1}>
      <Flex bg='color.3' mb='20px' direction='column' pt='20px' flex={1}>
        {isLoading ? (
          <Flex align='center' justify='center' flex={1}>
            <Text>Loading ...</Text>
          </Flex>
        ) : (
          <Table mx='40px' w='95%'>
            <Table.Thead>
              <Table.Tr bg='color.3' c='color.23' h='44px'>
                <Table.Th>
                  <Checkbox aria-label='Select all' />
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  ID
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Email
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Full Name
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Location
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Joined
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Type
                </Table.Th>

                <Table.Th fw='500' fz='12px'>
                  Action
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {(data as any)?.data?.map((user: any) => (
                <Table.Tr key={user?.id} h='72px'>
                  <Table.Td>
                    <Checkbox aria-label='Select row' />
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {user?.id}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {user?.email}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {user?.fullName}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      New York
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {dayjs(user?.createdAt).format('DD MMM, YYYY')}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      bg='color.1'
                      c='color.3'
                      px={8}
                      h={27}
                      py={2}
                      fz={8}
                      fw={500}>
                      {user?.type}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Popover withinPortal>
                      <Popover.Target>
                        <Ellipsis
                          style={{
                            cursor: 'pointer',
                          }}
                        />
                      </Popover.Target>
                      <Popover.Dropdown>test</Popover.Dropdown>
                    </Popover>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Flex>
    </Flex>
  );
}
