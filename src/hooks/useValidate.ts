import nlp from 'compromise'

export const isValidQuestion = (text: string): any => {
  if (!text.trim()) return false
  let doc = nlp(text)
  let res = doc.sentences().isQuestion().out('json')
  return res
}

export const useValidate = (text: string): boolean => {
  const res = isValidQuestion(text)
  const words = text.split(/\s+/)
  const isValidLength = words.every(
    word => word.length >= 1 && word.length < 16
  )
  if (res.length > 0 && isValidLength) return true
  return false
}
