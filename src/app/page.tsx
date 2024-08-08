'use client';

import {
  Badge,
  Checkbox,
  Flex,
  Paper,
  SegmentedControl,
  Table,
  Text,
} from '@mantine/core';
import React from 'react';
import Orders from '@/assets/icons/receipt-outline.svg';
import Events from '@/assets/icons/men.svg';
import Menu from '@/assets/icons/menu-new.svg';
import Users from '@/assets/icons/customers.svg';
import { BarChart, LineChart } from '@mantine/charts';
import { useState } from 'react';
import Ellipsis from '@/assets/icons/ellipse.svg';
import { AdminNavbar, DetailsCard } from '@/components';

const data = [
  {
    title: 'Total Orders',
    nums: 120,
    image: Orders,
  },
  {
    title: 'Total Menus',
    nums: 55,
    image: Menu,
  },
  {
    title: 'Total Active Events',
    nums: 30,
    image: Events,
  },
  {
    title: 'No of Users',
    nums: 1120,
    image: Users,
  },
];

const data2 = [
  { month: 'Jan', value1: 2500 },
  { month: 'Feb', value1: 2600 },
  { month: 'Mar', value1: 2700 },
  { month: 'Apr', value1: 3000 },
  { month: 'May', value1: 3200 },
  { month: 'Jun', value1: 3400 },
  { month: 'Jul', value1: 3600 },
  { month: 'Aug', value1: 3700 },
  { month: 'Sep', value1: 3500 },
  { month: 'Oct', value1: 3300 },
  { month: 'Nov', value1: 3100 },
  { month: 'Dec', value1: 4000 },
];

const data3 = [
  {
    month: 'January',
    ActiveOrders: 150,
    CompletedOrders: 1200,
    CancelledOrders: 100,
  },
  {
    month: 'February',
    ActiveOrders: 200,
    CompletedOrders: 1900,
    CancelledOrders: 150,
  },
  {
    month: 'March',
    ActiveOrders: 100,
    CompletedOrders: 1400,
    CancelledOrders: 80,
  },
  {
    month: 'April',
    ActiveOrders: 250,
    CompletedOrders: 1600,
    CancelledOrders: 200,
  },
  {
    month: 'May',
    ActiveOrders: 300,
    CompletedOrders: 2000,
    CancelledOrders: 50,
  },
  {
    month: 'June',
    ActiveOrders: 180,
    CompletedOrders: 1700,
    CancelledOrders: 90,
  },
  {
    month: 'July',
    ActiveOrders: 200,
    CompletedOrders: 1800,
    CancelledOrders: 100,
  },
  {
    month: 'August',
    ActiveOrders: 150,
    CompletedOrders: 1900,
    CancelledOrders: 100,
  },
  {
    month: 'September',
    ActiveOrders: 100,
    CompletedOrders: 1400,
    CancelledOrders: 80,
  },
];

export default function Page() {
  const [value, setValue] = useState('today');
  const [ordersValue, setOrdersValue] = useState('today');
  return (
    <Flex direction='column' h='100%' bg='color.0'>
      <Flex mt='40px' mb='10px' direction='column'>
        <Text c='color.9' fw={600} fz='20px' ml='40px'>
          Overview
        </Text>
      </Flex>
      <Flex mx='40px' gap={20} wrap='wrap'>
        {data.map((item, index) => (
          <DetailsCard
            key={index}
            nums={item.nums}
            title={item.title}
            Icon={item.image}
          />
        ))}
      </Flex>
      <Flex my='40px' mx='40px' align='center' justify='space-between'>
        <Paper
          h='365px'
          p={24}
          style={{
            borderRadius: '16px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}>
          <Flex mb='32px' align='center' justify='space-between'>
            <Text fz='20px' fw='900'>
              Revenue
            </Text>
            <Flex align='center'>
              <SegmentedControl
                value={value}
                onChange={setValue}
                data={[
                  { label: 'Today', value: 'today' },
                  { label: 'Monthly', value: 'monthly' },
                  { label: 'Yearly', value: 'yearly' },
                ]}
              />
            </Flex>
          </Flex>
          <LineChart
            h='240px'
            w='531px'
            data={data2}
            dataKey='month'
            series={[{ name: 'value1', color: 'color.1' }]}
          />
        </Paper>
        <Paper
          h='365px'
          p={24}
          style={{
            borderRadius: '16px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
          w='100%'
          ml='20px'>
          <Flex mb='32px' align='center' justify='space-between'>
            <Text fz='20px' fw='900'>
              Order Summary
            </Text>
            <Flex align='center'>
              <SegmentedControl
                value={ordersValue}
                onChange={setOrdersValue}
                data={[
                  { label: 'Today', value: 'today' },
                  { label: 'Monthly', value: 'monthly' },
                  { label: 'Yearly', value: 'yearly' },
                ]}
              />
            </Flex>
          </Flex>
          <BarChart
            w='100%'
            h={240}
            data={data3}
            dataKey='month'
            series={[
              { name: 'ActiveOrders', color: 'color.9' },
              { name: 'CompletedOrders', color: 'color.4' },
              { name: 'CancelledOrders', color: 'color.5' },
            ]}
            tickLine='y'
          />
        </Paper>
      </Flex>
      <Flex bg='color.3' mb='20px' direction='column' pt='20px' mx='40px'>
        <Flex align='center' justify='space-between' mb='20px' mx='40px'>
          <Text c='color.9' fw={600} fz='20px'>
            Orders
          </Text>
          <Text
            component='a'
            href='/admin/orders'
            c='color.1'
            fw={500}
            fz='12px'>
            View All
          </Text>
        </Flex>
        <Table w='95%' mx='auto'>
          <Table.Thead>
            <Table.Tr bg='color.3' c='color.23' h='44px'>
              <Table.Th>
                <Checkbox aria-label='Select all' />
              </Table.Th>
              <Table.Th fw='500' fz='12px'>
                ID
              </Table.Th>
              <Table.Th fw='500' fz='12px'>
                Date
              </Table.Th>
              <Table.Th fw='500' fz='12px'>
                Customer Name
              </Table.Th>
              <Table.Th fw='500' fz='12px'>
                Location
              </Table.Th>
              <Table.Th fw='500' fz='12px'>
                Amount
              </Table.Th>
              <Table.Th fw='500' fz='12px'>
                Order Status
              </Table.Th>
              <Table.Th fw='500' fz='12px'>
                Action
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <Table.Tr key={index} h='72px'>
                <Table.Td>
                  <Checkbox aria-label='Select row' />
                </Table.Td>
                <Table.Td>
                  <Text fz={14} fw={400}>
                    859490
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fz={14} fw={400}>
                    09-03-23
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fz={14} fw={400}>
                    Jerry Martin
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fz={14} fw={400}>
                    New York
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fz={14} fw={400}>
                    $44,000
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
                    Completed
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Ellipsis
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Flex>
    </Flex>
  );
}
