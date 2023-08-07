import { Image, Space, Typography } from 'antd'

export const GET_LIST_COLUMN = () => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (_, { image, title }) => (
      <Space>
        <Image
          className='rounded-lg'
          height={64}
          width={64}
          src={image}
          alt={title}
        />
        <Typography className='text-base font-bold'>{title}</Typography>
      </Space>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (_, record) => <strong>{record.quantity}</strong>,
  },
]
