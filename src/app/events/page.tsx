'use client';
import { Badge, Checkbox, Flex, Select, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useEvents } from '@/hooks/data/events';

export default function Page() {
  const [status, setStatus] = useState<
    'all' | 'unassigned' | 'current' | 'past'
  >('all');
  const { data, isLoading } = useEvents({ status });

  return (
    <Flex direction='column' flex={1}>
      <Flex bg='color.3' mb='20px' direction='column' pt='20px' flex={1}>
        <Flex align='center' justify='end' w='100%' mb={20} px={20}>
          <Select
            label='Filter By'
            defaultValue='all'
            data={['all', 'unassigned', 'current', 'past']}
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
                  Name
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Event Planner
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Category
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Date
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Location
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Cost
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Attendees
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Assigned Food Truck
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
                      {user?.name}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {user?.business?.name}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {user?.type?.replace('_', ' ')}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {dayjs(user?.date).format('DD MMM, YYYY')}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {user?.location}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {user?.isFree
                        ? 'Free'
                        : `$${user?.ticketPrice?.toLocaleString()}`}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {user?.attendees?.length || 0}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {user?.needFoodTruck
                        ? user?.foodTruckId
                          ? 'Yes'
                          : 'No'
                        : 'No need'}
                    </Text>
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
