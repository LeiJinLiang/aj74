import React, { FC } from 'react';
import styled from 'styled-components';


export interface IEmoji{
   name : string;
   url: string;
}


const Wrapper = styled.div`
    width: 100%;
    height: 80px;
`

const List = styled.ul`
   margin: 0;
   padding: 0;
   width: 100%;
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
`
const Item = styled.li`
   width: 48px;
   list-style: none;
`

const prefixPath: string = 'http://localhost:3000/images';


interface IEmojiProps {
   onSelect : (emoji: IEmoji) => void;
}

export const Emoji:FC<IEmojiProps> = ({ onSelect }) => {
    const origin = Array.from({length: 4}, (v, i) => ++i);
    const emojiList: IEmoji[] = origin.map((emoji)=> ({
        name: `andy${emoji}`,
        url: `${emoji}.png`
    })) 

    return (
        <Wrapper>
            <List>
                {emojiList.map((emoji, index)=>(
                    <Item key={index}>
                        <img src={`${prefixPath}/${emoji.url}`} onClick={()=> { onSelect(emoji)}} title="" alt="" />
                    </Item>
                ))}
                
            </List>    
        </Wrapper>
    )
}
