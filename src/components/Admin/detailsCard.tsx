import { Flex, Text } from '@mantine/core';

interface Props {
  title: string;
  nums: number;
  Icon: any;
}

export const DetailsCard: React.FC<Props> = ({ title, nums, Icon }) => {
  return (
    <Flex
      h='120px'
      w='100%'
      bg='color.3'
      style={{
        borderRadius: '16px',
        border: '1px solid var(--mantine-color-color-16)',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
      maw={{
        base: '100%',
        md: '280px',
      }}
      align='center'
      px='20px'>
      <Flex justify='space-between' w='100%'>
        <Flex direction='column'>
          <Text c='color.9' fw={700} fz='24px' mb='4px'>
            {nums}
          </Text>
          <Text>{title}</Text>
        </Flex>
        <Flex
          h='35px'
          w='35px'
          style={{
            borderRadius: '20%',
          }}
          mt='8px'
          bg='color.0'
          justify='center'
          align='center'>
          <Icon stroke='color.27' fill='color.27' size='1.5rem' />
        </Flex>
      </Flex>
    </Flex>
  );
};
