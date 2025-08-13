import React, { useContext } from "react";
import { EmojiContext } from "../../components/Lab_Ex_3/EmojiProvider";


export function useEmojiContext() {
    return useContext(EmojiContext);
}


