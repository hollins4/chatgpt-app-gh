import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from "react";


const configuration = new Configuration({
  organization: "org-qipbHakccg3m1QLo5oat9YQ6",
  apiKey: import.meta.env.VITE_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

let nextId = 0

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);


  const chat = async (message) => {
      setIsTyping(true);

      return openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        })
        .then((res) => {
          
          let questionAndAnswer = {
            id: nextId++,
            question: message,
            answer: res.data.choices[0].message.content
          }
          setChats([...chats, questionAndAnswer]);
          setMessage('');
          setIsTyping(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }


  return (
    <div>
      <main>
        <h1>Chat AI Tutorial</h1>
        <h3>{isTyping !== false && <i>Typing</i>}</h3>

        {chats && chats.length ? <h1>Chats</h1> : ""}
        {chats.map( chat => 
          <div key={chat.id}>
            <p className="user_msg">User: {chat.question}</p>
            <p className="assistant_msg">Assistant: {chat.answer}</p>
          </div>  
        )}

        <div>
        <input 
          type="text" 
          name="message"
          placeholder="Type a message here and hit Enter..."
          value={message}
          onChange={e => setMessage(e.target.value)} 
        />
        </div>

        <br />
        <div>
          <button type="reset" onClick={() => setMessage('')} className="button">Reset form</button>
          <button type="submit" onClick={() => chat(message)} className="button">Submit form</button>
        </div>
      </main>   
    </div>
  );
}



export default App;
