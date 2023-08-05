// import { useMemo } from 'react'
import { useContext, useMemo } from 'react'

import { message } from 'antd'
import { AuthContext } from 'context/auth'
import {
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import useFirestore from 'hooks/useFirestore'
import useRole from 'hooks/useRole'

import { db } from 'utils/firebase'

import LoanTableList from './list'

LoansSection.propTypes = {}

export function LoansSection() {
  const { user = {} } = useContext(AuthContext)
  const { isAdminRole } = useRole()
  const { id: userId } = user || {}

  const handleChangeLoanStatus = async (value, option) => {
    try {
      await updateDoc(doc(db, 'loans', option.loanId), {
        status: value,
        updatedAt: serverTimestamp(),
      })
      message.success(
        `Successfully changed loan status #${option.loanId} into ${value}`
      )
    } catch (error) {
      console.log(error)
      message.error(error?.message || 'Something went wrong!')
    }
  }

  const q = useMemo(() => {
    if (isAdminRole)
      return query(collection(db, 'loans'), orderBy('createdAt', 'desc'))

    return query(
      collection(db, 'loans'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    )
  }, [isAdminRole, userId])

  const loans = useFirestore(q)

  return (
    <div className='pt-6'>
      <LoanTableList
        loans={loans}
        handleChangeOrderStatus={handleChangeLoanStatus}
      />
    </div>
  )
}
