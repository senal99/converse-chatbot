import Chatbot from "./pages/Chat"
import { Button } from "./components/ui/button"
import { MessagesSquare, X } from 'lucide-react';
import colors from "./app/colors";
import { useState } from "react";



export function App() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <div className={`fixed bottom-16 right-0 m-8 duration-700 ${openChat ? "opacity-100 scale-100" : "opacity-0 scale-95 grayscale"}  `}>
        {openChat ? <Chatbot /> : ""}
      </div>
      <div className="fixed bottom-0 right-0 m-8 ">


        <Button  onClick={() => { setOpenChat(!openChat) }} className={`bg rounded-full py-6 px-3 ${colors.okButton} `}> 
        {openChat ? <X /> : <MessagesSquare />}
        </Button>
      </div>
    </>
  )
}
