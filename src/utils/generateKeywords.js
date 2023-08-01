export const generateKeywords = (title) => {
  // liet ke tat cac hoan vi. vd: title = ["Mot", "Cuon", "Sach"]
  // => ["Mot", "Cuon", "Sach"], ["Cuon", "Mot", "Sach"], ["Sach", "Mot", "Cuon"],...
  const name = title.split(' ').filter((word) => word)

  const length = name?.length
  const flagArray = []
  const result = []
  const stringArray = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    flagArray[i] = false
  }

  const createKeywords = (name) => {
    const arrName = []
    let curName = ''
    name.split('').forEach((letter) => {
      curName += letter
      arrName.push(curName)
    })
    return arrName
  }

  function findPermutation(k) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true
        result[k] = name[i]

        if (k === length - 1) {
          stringArray.push(result.join(' '))
        }

        findPermutation(k + 1)
        flagArray[i] = false
      }
    }
  }

  findPermutation(0)

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur)
    return [...acc, ...words]
  }, [])

  return keywords
}
