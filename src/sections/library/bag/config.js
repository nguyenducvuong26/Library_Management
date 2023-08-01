import { Button, Image, Space, Typography } from 'antd'

export const GET_LIST_COLUMN = ({
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  type = BAG_TYPE.BUY,
}) => [
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
    render: (_, record) => (
      <Space className='flex space-x-2'>
        <Button onClick={() => handleDecreaseQuantity(record)}>-</Button>
        <strong>{record.quantity}</strong>
        <Button onClick={() => handleIncreaseQuantity(record)}>+</Button>
      </Space>
    ),
  },
  type === BAG_TYPE.BUY && {
    title: 'Price per item',
    dataIndex: 'price',
    key: 'price',
    render: (_, { price }) => <strong>${price}</strong>,
  },
]

export const BAG_TYPE = {
  BUY: 'Buy',
  BORROW: 'Borrow',
}
