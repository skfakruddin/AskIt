#  AskIt
AskIt is a simple question and answer platform where users can ask questions and get answers from other users. Users can also upvote or downvote questions and answers.

## Ask
```ts
type ask = {
  askId: number;
  question: string;
  answered:boolean;
  upvotes:number;
  upvoted:boolean;
  emoji: string;
}

type Ask = Record<number, ask>;



```

