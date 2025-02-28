import { AnsweredPayload, AskPayload, JoinPayload, LeavePayload, UpvotePayload, WsMessage } from '../types/Messages'


type UserData = {
  id: string
  name: string
  email: string
  photo: string
  accessToken?: string
  token?: string
}
export async function connectionToSocket (user: UserData) {
  const token = user.token
  const wsURL = import.meta.env.VITE_WS_URL;
  const socket = new WebSocket(wsURL, token)
  // const socket = new WebSocket('wss://askitservice.centralindia.cloudapp.azure.com', token)
  // const socket = new WebSocket('wss://zn12df18-8080.inc1.devtunnels.ms/', token)
  // const socket = new WebSocket('wss://4cfw3zvk-8080.inc1.devtunnels.ms', token)
  socket.onopen = () => {
  }
  socket.onmessage = () => {
  }
  socket.onclose = () => {
  }
  return socket
}

export async function joinRoomHandler (socket: WebSocket, joinCode: string) {
    const JoinMessage:WsMessage<JoinPayload>={
        type:'join',
        payload:{
            joinCode:joinCode
        }
    }
  socket.send(
    JSON.stringify(JoinMessage)
  )
}

export async function endRoom (socket: WebSocket, joinCode: string) {
    const EndMessage:WsMessage<LeavePayload>={
        type:'end',
        payload:{
            joinCode:joinCode
        }
    }
  socket.send(
    JSON.stringify(EndMessage)
  )
}
export async function leaveRoom (socket: WebSocket, joinCode: string) {
  const LeaveMessage: WsMessage<LeavePayload> = {
    type: 'leave',
    payload: {
      joinCode: joinCode
    }
  }
  socket.send(JSON.stringify(LeaveMessage))
}

export async function askQuestion (
  socket: WebSocket,
  joinCode: string,
  question: string
) {
    const AskMessage:WsMessage<AskPayload>={
        type:'ask',
        payload:{
            question:question,
            joinCode:joinCode
        }
    }
  socket.send(
    JSON.stringify(AskMessage)
  )
}


export async function upvoteQuestion (
  socket: WebSocket,
  joinCode: string,
  askId: number,
  upvoted: boolean
) {
    const upvote:-1|1= upvoted?-1:1
    const UpvoteMessage:WsMessage<UpvotePayload>={
        type:'upvote',
        payload:{
            askId:askId,
            joinCode:joinCode,
            upvote:upvote
        }
    }
  socket.send(
    JSON.stringify(UpvoteMessage)
  )
}

export async function answeredQuestion (
  socket: WebSocket,
  joinCode: string,
  askId: number
) {
    const AnswerMessage:WsMessage<AnsweredPayload>={
        type:'answered',
        payload:{
            askId:askId,
            joinCode:joinCode
        }
    }
  socket.send(
    JSON.stringify(AnswerMessage)
  )
}




export function generateRandomEmoji() {
  const faces = [
      "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
      "🙂", "🙃", "😉", "😌", "😍", "🥰", "😗", "😙", "😚",
      "😋", "😜", "😝", "😛", "🤑", "🤗", "🤩", "🤔", "🤨", "😐",
      "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", 
      "🤤", "😴", "😷", "🤒", "🤕", 
      "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️",
      "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥",
      "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱",
      "😤"
  ];
  const animals = [
      "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
      "🦁", "🐮", "🐷", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒",
      "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇",
      "🐺", "🐗", "🐴", "🦄", "🐝", "🦋", "🐌", "🐞", "🐜",
      "🪰", "🦂", "🐢", "🦖", "🦕", "🐙", "🦀",
      "🦞", "🦑", "🐠", "🐟", "🐡", "🦈", "🐬", "🐳", "🐋",
      "🦢", "🦩", "🦚", "🦜", "🐓", "🦃", "🦤", "🪶", "🐕", "🐩",
      "🦮", "🐕‍🦺", "🐈", "🐈‍⬛", "🐇", "🐀", "🐁", "🐿️", "🦫", "🦔",
      "🦨", "🦥", "🐾", "🦦", "🦨", "🦧", "🦣", "🦥", "🦦",
  ];
  // const nature = [
  //     "🌵", "🎄", "🌲", "🌳", "🌴", "🪵", "🌱", "🌿", "☘️", "🍀",
  //     "🎍", "🪴", "🎋", "🍃", "🍂", "🍁", "🍄", "🌾", "💐", "🌷",
  //     "🌹", "🥀", "🌺", "🌸", "🌼", "🌻", "🌞", "🌝", "🌛", "🌜",
  //     "🌚", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌙",
  //     "🌎", "🌍", "🌏", "🪐", "💫", "⭐", "🌟", "✨", "⚡", "🔥",
  //     "💥", "☄️", "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "🌧️", "⛈️",
  //     "🌩️", "🌨️", "❄️", "☃️", "⛄", "🌬️", "💨", "💧", "💦", "☔",
  //     "☂️", "🌊", "🌫️"
  // ];
  // const food = [
  //     "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐",
  //     "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑",
  //     "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅",
  //     "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🫓", "🥨", "🥞", "🧇",
  //     "🧀", "🍗", "🍖", "🫛", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭",
  //     "🥪", "🌮", "🌯", "🫔", "🥙", "🧆", "🥗", "🥘", "🫕", "🍝",
  //     "🍜", "🍲", "🍛", "🍣", "🍤", "🍱", "🥟", "🦪", "🍢", "🍡",
  //     "🍧", "🍨", "🍦", "🥧", "🧁", "🍰", "🎂", "🍮", "🍭", "🍬",
  //     "🍫", "🍿", "🧂", "🥤", "🧋", "🧃", "🧉", "🧊", "🍵", "☕",
  //     "🫖", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🧋", "🧊"
  // ];
  // const objects = [
  //     "🎨", "🎭", "🎬", "🎤", "🎧", "🎷", "🎸", "🎹", "🎺", "🎻",
  //     "🥁", "🪘", "🎲", "🎯", "🎳", "🎮", "🕹️", "🎰", "🧩", "🪀",
  //     "🪁", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🔮", "🪄", "🧸",
  //     "🪅", "🪆", "🎎", "🎏", "🎐", "🧧", "🎀", "🎁", "🎊", "🎉",
  //     "🎈", "🪄", "📚", "📖", "📓", "🖋️", "📅", "📌", "📍", "✂️",
  //     "📏", "🔍", "🖥️", "💻", "🖱️", "🖨️", "🕹️", "💡", "🔧", "🔨"
  // ];
  // const allEmojis = [...faces, ...animals, ...nature, ...food, ...objects];

  const allEmojis = [...faces, ...animals];

  return allEmojis[Math.floor(Math.random() * allEmojis.length)];
}