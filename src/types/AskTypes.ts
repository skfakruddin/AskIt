export type ask = {
  askId: number
  question: string
  answered: boolean
  upvotes: number
  upvoted: boolean
  emoji: string
}

export type Asks = Record<number, ask>
