import { Spin } from 'antd'
import clsx from 'clsx'
import PropTypes from 'prop-types'

LoadingScreen.propTypes = {
  className: PropTypes.string,
}

export default function LoadingScreen({ className }) {
  return (
    <div className={clsx('w-full h-screen relative', className)}>
      <Spin size='large' className='absolute top-80 right-0 left-0' />
    </div>
  )
}
