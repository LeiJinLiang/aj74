import React, { useCallback, useRef, useState } from 'react';
import { Emoji, emojiMap } from './components/Emoji';
import type { IEmoji } from './components/Emoji';
import './App.css';

function App() {

  const inputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState<string>('');

  const handleKeyDown = useCallback((event: React.KeyboardEvent)=>{
    if(event.keyCode === 8 && inputRef.current?.selectionStart && inputRef.current?.selectionStart === inputRef.current?.selectionEnd){
      let indexEnd = inputRef.current?.selectionStart  - 1;
      let charToDelete = inputRef.current?.value.charAt(indexEnd); 
      if (charToDelete === "]") {
        event.preventDefault();
        let indexStart = inputRef.current.value.lastIndexOf("[", indexEnd);
        inputRef.current?.setRangeText("", indexStart, indexEnd + 1, "end")
      }
    }
  },[inputRef]);

  const handleSelect = useCallback((emoji: IEmoji) => {
    if(inputRef.current){
      const emojiText = `[${emoji.name}]`;
      inputRef.current.focus();
      inputRef.current.setRangeText(
        emojiText,
        inputRef.current.selectionStart ?? 0,
        inputRef.current.selectionEnd ?? 0,
        'end'
      )
      inputRef.current.blur();
    }
  },[inputRef]);

  const handleSend = useCallback(()=>{
    if(inputRef.current){
      let content = inputRef.current.value;
      if(content !== ''){
        const emotionReg =  /\[[^\[\]]+?\]/g;
        const matchResult = content.match(emotionReg);
        if(matchResult){
          matchResult.forEach((emotionKey) => {
            if (emotionKey in emojiMap) {
              content = content.replace(
                emotionKey,
                `<img src="${emojiMap[emotionKey]}">`
              );
            }
          });
        }
        setContent(text => text+content);
        inputRef.current.value = ''; 
      } 
    
    }
  },[inputRef]);

  return (
    <div className="App"> 
      <section className="message" dangerouslySetInnerHTML={{__html: content}} />
      <section className="container">
        <div className='content'>
           <input ref={inputRef} onKeyDown={handleKeyDown} type="text" className="text" />
           <button className="btn" onClick={handleSend}>send</button>
        </div>      
        <Emoji 
          onSelect={handleSelect}
        />
      </section>
    </div>
  );
}

export default App;
