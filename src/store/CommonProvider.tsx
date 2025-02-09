import { createContext } from 'react'

const CommonContext = createContext<{
    BE_URL: string
}>({
    BE_URL: "",
})

const CommonProvider = ({ children }: { children: React.ReactNode }) => {

  // const BE_URL = "https://4cfw3zvk-5000.inc1.devtunnels.ms"
  const BE_URL = "https://askitengine.vercel.app"

  return (
    <CommonContext.Provider value={{BE_URL}}>
      {children}
    </CommonContext.Provider>
  )
}

export default CommonProvider;


export {CommonContext}