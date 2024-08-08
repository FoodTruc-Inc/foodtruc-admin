'use client';
import { useLocations } from '@/hooks/data/locations';
import {
  Button,
  Checkbox,
  Drawer,
  Flex,
  Image,
  NumberInput,
  SimpleGrid,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { createLocation } from '@/api/locations';
import { z } from 'zod';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

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
});
export default function Page() {
  const { data, isLoading } = useLocations();
  const [addressData, setAddressData] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
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
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const mutation = useMutation({
    mutationFn: createLocation,
    onSuccess: (data) => {
      console.log(data);
      notifications.show({
        title: 'Location created successfully',
        message: 'Location created successfully',
        color: 'green',
      });
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

    console.log(values);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('lng', values.lng);
    formData.append('lat', values.lat);
    formData.append('data', addressData);
    console.log(files);

    files.forEach((file) => {
      formData.append('images', file);
    });

    mutation.mutate(formData);
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
        <AddressAutofill
          accessToken='pk.eyJ1Ijoiam9qaXRvb24iLCJhIjoiY2xob25yZzdhMGtrMjNlcGVuaTNxNnp0dSJ9.Mp_4_OEGVS7A_bdfuBDtdA'
          onRetrieve={onRetrieveAddress}>
          <TextInput
            required
            label='Address'
            my={10}
            {...form.getInputProps('address')}
          />
        </AddressAutofill>
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
          label='Price per hour (USD)'
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
          {...form.getInputProps('description')}
        />

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
