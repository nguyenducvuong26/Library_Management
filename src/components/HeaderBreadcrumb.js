import { Breadcrumb } from 'antd'
import useRole from 'hooks/useRole'
import PropTypes from 'prop-types'

HeaderBreadcrumb.propTypes = {
  heading: PropTypes.string,
  items: PropTypes.array,
  className: PropTypes.string,
  actions: PropTypes.node,
}

export function HeaderBreadcrumb({ className, heading, items, actions }) {
  const { isAdminRole = false } = useRole()

  return (
    <div className={className}>
      <div className='flex justify-between items-end'>
        <div>
          <h3 className='text-2xl'>{heading}</h3>
          {isAdminRole && <Breadcrumb className='text-lg' items={items} />}
        </div>
        {actions}
      </div>
    </div>
  )
}
