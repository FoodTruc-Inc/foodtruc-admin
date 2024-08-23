'use client';
import { Badge, Checkbox, Flex, Select, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useOrders } from '@/hooks/data/useOrders';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { OrderDetails } from '@/components/Drawers';

export default function Page() {
  const [status, setStatus] = useState<
    'all' | 'active' | 'completed' | 'cancelled'
  >('all');
  const { data, isLoading } = useOrders(status);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Flex direction='column' flex={1}>
      <Flex bg='color.3' mb='20px' direction='column' pt='20px' flex={1}>
        <Flex align='center' justify='end' w='100%' mb={20} px={20}>
          <Select
            label='Filter By'
            defaultValue='all'
            data={['all', 'active', 'completed', 'cancelled']}
            value={status}
            onChange={(e) => setStatus(e as any)}
          />
        </Flex>
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
                  Food truck
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Customer
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Location
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Total price
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Date
                </Table.Th>

                <Table.Th fw='500' fz='12px'>
                  Status
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {(data as any)?.data?.map((user: any) => (
                <Table.Tr
                  key={user?.id}
                  h='72px'
                  onClick={() => open()}
                  style={{ cursor: 'pointer' }}
                >
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
                      fw={500}
                    >
                      {user?.type}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Flex>
      <OrderDetails opened={opened} close={close} />
    </Flex>
  );
}
