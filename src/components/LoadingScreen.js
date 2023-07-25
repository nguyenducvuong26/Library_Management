import { Spin } from 'antd'

export default function LoadingScreen() {
  return (
    <div className='w-full h-screen relative'>
      <Spin size='large' className='absolute top-80 right-0 left-0' />
    </div>
  )
}
