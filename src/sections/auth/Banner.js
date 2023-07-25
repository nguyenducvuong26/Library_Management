import { Card, Image } from 'antd'
import PropTypes from 'prop-types'

AuthBanner.propTypes = {
  tab: PropTypes.string,
}

export default function AuthBanner({ tab }) {
  return (
    <div className='p-4 h-full w-full max-w-xl xs:hidden sm:hidden md:block'>
      <Card className='w-full h-full shadow-md flex items-center justify-center'>
        <Image preview={false} src={`/assets/${tab}.png`} />
      </Card>
    </div>
  )
}
