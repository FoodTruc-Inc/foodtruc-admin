'use client';
import { useLocations } from '@/hooks/data/locations';
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
import { createLocation } from '@/api/locations';
import { z } from 'zod';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { TimeInput, TimeInputProps } from '@mantine/dates';
import { IconClock, IconCheck, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

const AddressAutofill = dynamic(
  // @ts-ignore
  () => import('@mapbox/search-js-react').then((mod) => mod.AddressAutofill),
  {
    ssr: false,
  }
);

export default function Page() {
  const schema = z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3, { message: 'Name must be at least 3 characters long' }),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .min(3, { message: 'Address must be at least 3 characters long' }),
    price: z
      .number({
        required_error: 'Price is required',
        message: 'Price is required',
      })
      .min(1, {
        message: 'Price is required',
      }),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(3, {
        message: 'Description must be at least 3 characters long',
      }),
    timeSlots: z.array(z.string()),
  });

  function TimePick(props: TimeInputProps) {
    const ref = useRef<HTMLInputElement>(null);

    return (
      <Box onClick={() => ref.current?.showPicker()}>
        <TimeInput
          leftSection={
            <IconClock
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          ref={ref}
          {...props}
        />
      </Box>
    );
  }

  function isGreaterThan(startTime: string, endTime: string) {
    const ft = dayjs(`2000-01-01 ${startTime}`);
    const tt = dayjs(`2000-01-01 ${endTime}`);
    const mins = tt.diff(ft, 'minutes', true);

    return mins <= 0;
  }

  const { data, isLoading, refetch } = useLocations();
  const [addressData, setAddressData] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const theme = useMantineTheme();

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        alt='location image'
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      description: '',
      lng: '',
      lat: '',
      timeSlots: ['ALL_DAY'],
      slotTimes: {},
      canBeUsedForEvent: false,
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const mutation = useMutation({
    mutationFn: createLocation,
    onSuccess: (data) => {
      notifications.show({
        title: 'Location created successfully',
        message: 'Location created successfully',
        color: 'green',
      });

      refetch();
      setIsDrawerOpen(false);
      form.reset();
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

  const maxSelectValues = useMemo(() => {
    return form.getValues().timeSlots?.includes('ALL_DAY') ? 1 : 3;
  }, [form]);

  const onRetrieveAddress = (result: any) => {
    console.log(result);
    const data = result?.features?.[0];
    setAddressData(JSON.stringify(result));
    form.setFieldValue('address', data?.properties.full_address);
    form.setFieldValue('lng', data?.geometry.coordinates[0]);
    form.setFieldValue('lat', data?.geometry.coordinates[1]);
  };

  const handleSubmit = (values: any) => {
    const valid = form.validate();
    console.log(valid);
    if (!files.length) {
      notifications.show({
        title: 'Error',
        message: 'Please upload at least one image',
        color: 'red',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('lng', values.lng);
    formData.append('lat', values.lat);
    formData.append('data', addressData);
    formData.append('canBeUsedForEvent', values.canBeUsedForEvent);
    if (values.canBeUsedForEvent) {
      formData.append('timeSlots', JSON.stringify(values.timeSlots));
      formData.append('slotTime', JSON.stringify(values.slotTimes));
    }

    files.forEach((file) => {
      formData.append('images', file);
    });

    mutation.mutate(formData);
  };

  const handleTimeSlotsChange = (value: any) => {
    const slotTimes: any = form.getValues().slotTimes;
    if (value.includes('ALL_DAY')) {
      form.setFieldValue('timeSlots', ['ALL_DAY']);
      form.setFieldValue('slotTimes', {
        ['ALL_DAY']: slotTimes['ALL_DAY'] || {},
      });
    } else {
      const newSlotTimes: any = {};
      value.forEach((timeSlot: string) => {
        newSlotTimes[timeSlot] = slotTimes[timeSlot] || {};
      });
      form.setFieldValue('timeSlots', value);
      form.setFieldValue('slotTimes', newSlotTimes);
    }
  };

  const handleTimeSelect = (time: any, type: string) => (e: any) => {
    const value = e.target.value;
    const exists = (form.getValues().slotTimes as any)?.[time];
    if (exists) {
      const startTime = type === 'startTime' ? value : exists.startTime;
      const endTime = type === 'endTime' ? value : exists.endTime;

      if (isGreaterThan(startTime, endTime)) {
        return notifications.show({
          title: 'Error',
          message: 'Start time must be less than end time',
          color: 'red',
        });
      }

      form.setFieldValue(`slotTimes.${time}.${type}`, value);
    } else {
      form.setFieldValue(`slotTimes.${time}`, { [type]: value });
    }
  };

  return (
    <Flex direction='column' flex={1}>
      <Flex bg='color.3' mb='20px' direction='column' pt='20px' flex={1}>
        <Flex justify='end' w='100%' px={40} mb={10}>
          <Button onClick={() => setIsDrawerOpen(true)}>
            Add New Location
          </Button>
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
                  Address
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Price
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Status
                </Table.Th>
                <Table.Th fw='500' fz='12px'>
                  Schedules
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {(data as any)?.data?.map((location: any) => (
                <Table.Tr key={location?.id} h='72px'>
                  <Table.Td>
                    <Checkbox aria-label='Select row' />
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {location?.name}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {location?.address}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      ${location?.price}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text
                      fz={14}
                      fw={400}
                      c={location?.isAvailable ? 'color.1' : 'color.2'}>
                      {location?.isAvailable ? 'Available' : 'Unavailable'}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={14} fw={400}>
                      {location?.schedules?.length || 0}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Flex>
      <Drawer
        position='right'
        opened={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title='New Location'>
        <TextInput
          required
          label='Name'
          my={10}
          key='name'
          {...form.getInputProps('name')}
        />
        <Switch
          required
          label='This location is for events'
          my={20}
          {...form.getInputProps('canBeUsedForEvent')}
          color='teal'
          size='md'
          thumbIcon={
            form.getValues().canBeUsedForEvent ? (
              <IconCheck
                style={{ width: rem(12), height: rem(12) }}
                color={theme.colors.teal[6]}
                stroke={3}
              />
            ) : (
              <IconX
                style={{ width: rem(12), height: rem(12) }}
                color={theme.colors.red[6]}
                stroke={3}
              />
            )
          }
        />

        {process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN && (
          // @ts-ignore
          <AddressAutofill
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            onRetrieve={onRetrieveAddress}>
            <TextInput
              required
              label='Address'
              my={10}
              {...form.getInputProps('address')}
            />
          </AddressAutofill>
        )}
        {form.getValues().lng && form.getValues().lat ? (
          <Flex direction='column' my={10}>
            <Text fz={14} fw={400}>
              Longitude: {form.getValues().lng}, Latitude:{' '}
              {form.getValues().lat}
            </Text>
          </Flex>
        ) : null}

        <NumberInput
          required
          label={
            form.getValues().canBeUsedForEvent
              ? 'Price per hour (USD)'
              : 'Price per month (USD)'
          }
          key='price'
          my={10}
          {...form.getInputProps('price')}
          rightSection={<></>}
          prefix='$'
        />
        <Textarea
          required
          label='Description'
          my={10}
          mb={20}
          {...form.getInputProps('description')}
        />

        {form.getValues().canBeUsedForEvent && (
          <>
            <MultiSelect
              label='Time Slots'
              required
              placeholder='Select time slots'
              my={10}
              data={[
                { value: 'ALL_DAY', label: 'All day' },
                { value: 'MORNING', label: 'Morning' },
                { value: 'AFTERNOON', label: 'Afternoon' },
                { value: 'EVENING', label: 'Evening' },
              ]}
              maxValues={maxSelectValues}
              value={form.getValues().timeSlots}
              onChange={handleTimeSlotsChange}
            />

            <Box mt={20} mb={30}>
              <Text fz={16} fw='bold'>
                Time Slots Allocations
              </Text>
              {form
                .getValues()
                .timeSlots?.map((timeSlot: string, index: number) => (
                  <Box key={index} my={20}>
                    <Text fz={14} fw='bold'>
                      {timeSlot?.replace('_', ' ')}
                    </Text>
                    <Flex align='flex-end' gap={20}>
                      <TimePick
                        required
                        flex={1}
                        label='Start'
                        value={
                          (form.getValues().slotTimes as any)?.[timeSlot]
                            ?.startTime
                        }
                        onChange={handleTimeSelect(timeSlot, 'startTime')}
                      />
                      <TimePick
                        flex={1}
                        required
                        label='End'
                        value={
                          (form.getValues().slotTimes as any)?.[timeSlot]
                            ?.startTimeendTime
                        }
                        onChange={handleTimeSelect(timeSlot, 'endTime')}
                        // {...form.getInputProps(`slotTimes.${timeSlot}.endTime`)}
                      />
                    </Flex>
                  </Box>
                ))}
            </Box>
          </>
        )}
        <Dropzone accept={IMAGE_MIME_TYPE} multiple onDrop={setFiles}>
          <Text ta='center'>Drop or select images here</Text>
        </Dropzone>

        <SimpleGrid
          cols={{ base: 1, sm: 4 }}
          mt={previews.length > 0 ? 'xl' : 0}>
          {previews}
        </SimpleGrid>

        <Button
          fullWidth
          loading={mutation.isPending}
          mt={60}
          onClick={() => form.onSubmit(handleSubmit)()}>
          Create
        </Button>
      </Drawer>
    </Flex>
  );
}
