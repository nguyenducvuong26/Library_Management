import { useEffect, useState } from 'react'

import { onSnapshot } from 'firebase/firestore'

const useFirestore = (query) => {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    if (!query) return null

    // Listen to collection to get realtime updates
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setDocuments(documents)
    })

    return () => {
      unsubscribe()
    }
  }, [query])
  return documents
}

export default useFirestore
