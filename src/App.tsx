import React, { useCallback, useRef, useState } from 'react';
import { Emoji } from './components/Emoji';
import type { IEmoji } from './components/Emoji';
import './App.css';

function App() {
  const [value, setValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);


  const handleKeyDown = useCallback((event: React.KeyboardEvent)=>{
    if(event.keyCode === 8 && inputRef.current?.selectionStart === inputRef.current?.selectionEnd){
      let indexEnd = inputRef.current?.selectionStart ?? 1 - 1;
      let charToDelete = inputRef.current?.value.charAt(indexEnd); 
      if (charToDelete === "]") {
        event.preventDefault();
        let indexStart = value.lastIndexOf("[", indexEnd);
        inputRef.current?.setRangeText("", indexStart, indexEnd + 1, "end")
      }
    }
  },[inputRef,value]);

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

  return (
    <div className="App"> 
      <section className="container">
        <div className='content'>
           <input ref={inputRef} onKeyDown={handleKeyDown} type="text" className="text" value={value} onChange={(e)=> { setValue(e.target.value)}} />
           <button className="btn">send</button>
        </div>      
        <Emoji 
          onSelect={handleSelect}
        />
      </section>
    </div>
  );
}

export default App;
