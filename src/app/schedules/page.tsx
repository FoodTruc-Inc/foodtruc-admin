'use client';
import { useLocations, useSchedules } from '@/hooks/data/locations';
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  Flex,
  Image,
  MultiSelect,
  NumberInput,
  rem,
  SimpleGrid,
  Switch,
  Table,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useMemo, useRef, useState } from 'react';
// import { AddressAutofill } from '@mapbox/search-js-react';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { approveLocation, createLocation } from '@/api/locations';
import { z } from 'zod';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { TimeInput, TimeInputProps } from '@mantine/dates';
import { IconClock, IconCheck, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';

export default function Page() {
  const [opened, { close, open }] = useDisclosure(false);
  const { data, isLoading, refetch } = useSchedules();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: approveLocation,
    onSuccess: (data) => {
      notifications.show({
        message: 'Location Approved successfully',
        color: 'green',
      });
      refetch();
      close();
      setSelectedApplication(null);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message;
      notifications.show({
        title: 'Error',
        message,
        color: 'red',
      });
    },
  });

  const openModal = (id: string) =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size='sm'>
          Are you sure you want to approve this location for this business?
          Doing so will deny every other applicant for the same time slot and
          day/month.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => mutation.mutate(id),
    });

  return (
    <Flex direction='column' flex={1}>
      <Flex
        bg='color.3'
        mih='calc(100vh - 90px)'
        mb='20px'
        direction='column'
        pt='20px'
        flex={1}>
        {isLoading ? (
          <Flex align='center' justify='center' flex={1}>
            <Text>Loading ...</Text>
          </Flex>
        ) : (
          <Table mx='40px' w='95%'>
            <Table.Thead>
              <Table.Tr bg='color.3' c='color.23' h='44px'>
                <Table.Th fw='500' fz='12px'>
                  Name
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Address
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Date
                </Table.Th>
                <Table.Th fw='500' fz='12px'></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {(data as any)?.map((data: any) => (
                <Table.Tr
                  key={data?.id}
                  h='72px'
                  onClick={() => {
                    setSelectedApplication(data);
                    open();
                  }}
                  style={{
                    cursor: 'pointer',
                  }}>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {data.business?.name}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {data.location?.name}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {dayjs(data?.date).format('ddd, DD MMM YYYY')}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Flex>
      <Drawer.Root
        opened={opened}
        onClose={mutation.isPending ? () => {} : close}
        position='right'>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title fw={700} fz='20px'>
              Application Details
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <Flex direction='column' justify='space-between' mih='90vh'>
              <Flex direction='column'>
                <Flex w='100%' h='200px' mt='10px' direction='column'>
                  <Image
                    src={selectedApplication?.business?.imageUrl}
                    w='100%'
                    height={200}
                    alt='location image'
                  />
                </Flex>
                <Flex w='100%' mt='20px' direction='column'>
                  <Text fz='16px' fw={600}>
                    Business Name:
                  </Text>
                  <Text c='dimmed' fz='14px'>
                    {selectedApplication?.business?.name}
                  </Text>
                </Flex>
                <Flex w='100%' mt='20px' direction='column'>
                  <Text fz='16px' fw={600}>
                    Business Type:
                  </Text>
                  <Text c='dimmed' fz='14px'>
                    {selectedApplication?.business?.type?.replaceAll('_', ' ')}
                  </Text>
                </Flex>
                <Flex w='100%' mt='15px' direction='column'>
                  <Text fw='bold' fz='18px'>
                    Intended Location
                  </Text>
                  <Text fz='14px' fw={600}>
                    Name:
                  </Text>
                  <Text c='dimmed' fz='14px'>
                    {selectedApplication?.location?.name}
                  </Text>
                </Flex>
                <Flex w='100%' mt='15px' direction='column'>
                  <Text fz='14px' fw={600}>
                    Address:
                  </Text>
                  <Text c='dimmed' fz='14px'>
                    {selectedApplication?.location?.address}
                  </Text>
                </Flex>
                <Flex w='100%' mt='15px' direction='column'>
                  <Text fz='14px' fw={600}>
                    Chosen Period:
                  </Text>
                  <Text c='dimmed' fz='14px'>
                    {selectedApplication?.location?.canBeUsedForEvent
                      ? dayjs(selectedApplication?.date).format(
                          'dddd, DD MMMM YYYY'
                        )
                      : selectedApplication?.month}
                  </Text>
                </Flex>
                {selectedApplication?.location?.canBeUsedForEvent && (
                  <Flex w='100%' mt='15px' direction='column'>
                    <Text fz='14px' fw={600}>
                      Time Slot:
                    </Text>
                    <Text c='dimmed' fz='14px'>
                      {selectedApplication?.timeSlot?.replaceAll('_', ' ')}
                    </Text>
                  </Flex>
                )}
              </Flex>
              <Flex direction='column'>
                <Button
                  disabled={!selectedApplication?.id}
                  variant='light'
                  loading={mutation.isPending}
                  onClick={() => openModal(selectedApplication?.id)}>
                  Approve location for this business
                </Button>
                <Text fz='12px' fw={400} mt='10px' c='dimmed'>
                  {selectedApplication?.location?.canBeUsedForEvent
                    ? 'Approving this location will deny every other applicant for the same time slot and day'
                    : 'Approving this location will deny every other applicant for the same month'}
                </Text>
              </Flex>
            </Flex>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </Flex>
  );
}
