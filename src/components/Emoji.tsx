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

const prefixPath: string = process.env.NODE_ENV === 'development'? 'http://localhost:3000/aj74/images': `${process.env.PUBLIC_URL}/images`;

console.log('process.env.PUBLIC_URL',process.env)

interface IEmojiProps {
   onSelect : (emoji: IEmoji) => void;
}



export let emojiMap : any= {};
const origin = Array.from({length: 4}, (v, i) => ++i);
const emojiList: IEmoji[] = origin.map((emoji)=> {
    const name = `andy${emoji}`
    const url = `${prefixPath}/${emoji}.png`;
    emojiMap[`[andy${emoji}]`] = url;
    return { name, url }
}) 

export const Emoji:FC<IEmojiProps> = ({ onSelect }) => {
 
    return (
        <Wrapper>
            <List>
                {emojiList.map((emoji, index)=>(
                    <Item key={index}>
                        <img src={emoji.url} onClick={()=> { onSelect(emoji)}} title="" alt="" />
                    </Item>
                ))}
                
            </List>    
        </Wrapper>
    )
}

