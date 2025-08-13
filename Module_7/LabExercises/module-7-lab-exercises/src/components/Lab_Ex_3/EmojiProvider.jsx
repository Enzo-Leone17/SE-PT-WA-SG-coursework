import React, { useState } from "react";

export const EmojiContext = React.createContext();

const EmojiProvider = ({children}) => {
    const [isHappy, setIsHappy] = useState(true);
    return (
        <EmojiContext.Provider value={{isHappy, setIsHappy}}>
            {children}
        </EmojiContext.Provider>
    );
};


export default EmojiProvider;
