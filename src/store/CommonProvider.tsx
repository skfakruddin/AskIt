import { useContext, createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const CommonContext = createContext<{
    BE_URL: string
}>({
    BE_URL: "",
})

const CommonProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  const BE_URL = "https://4cfw3zvk-5000.inc1.devtunnels.ms"

  return (
    <CommonContext.Provider value={{BE_URL}}>
      {children}
    </CommonContext.Provider>
  )
}

export default CommonProvider;

export const useCommon = () => {
  return useContext(CommonContext)
}
