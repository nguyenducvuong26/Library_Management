import { Breadcrumb } from 'antd'
import PropTypes from 'prop-types'

HeaderBreadcrumb.propTypes = {
  heading: PropTypes.string,
  items: PropTypes.array,
  className: PropTypes.string,
  actions: PropTypes.node,
}

export function HeaderBreadcrumb({ className, heading, items, actions }) {
  return (
    <div className={className}>
      <h3 className='text-2xl'>{heading}</h3>
      <div className='flex justify-between'>
        <Breadcrumb className='text-lg' items={items} />
        {actions}
      </div>
    </div>
  )
}
