import { useEffect, useState } from 'react'

import { onSnapshot } from 'firebase/firestore'

const useFirestore = (collectionName, query) => {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    if (!collectionName || !query) return null

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
  }, [collectionName, query])
  return documents
}

export default useFirestore
