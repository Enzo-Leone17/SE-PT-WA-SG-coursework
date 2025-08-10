import React, { useContext } from "react";

const NameContext = React.createContext(); //using context and provider to pass prop to child of provider

const GreetingName = ({ name = "world", children }) => {
  return (
    <NameContext.Provider value={name}>
      <div>
        <h2>Hello {name === "world" ? "world" : `, ${name}`}</h2>
        {children}
      </div>
    </NameContext.Provider>
  );
};

//render extended greeting as child if name prop is not "world"
const GreetingExtended = () => {
  const name = useContext(NameContext);
  if(name !== "world"){
    return (
        <p>Have a nice day, {name}</p>
    );
  }
};

export { GreetingName, NameContext, GreetingExtended };
