import React, { useEffect, useState } from "react";
import Header from "./Header";
import Content from "./Content";

const Layout = ({ children }) => {
    const [phrase, setPhrase] = useState();
    useEffect(() => {
        console.log(phrase, "phrase")
    },[phrase])
    return (
        <div>
            <Header setPhrase ={setPhrase}/>
            <Content phrase={phrase}/>
            {children}
        </div>
    )
}

export default Layout;