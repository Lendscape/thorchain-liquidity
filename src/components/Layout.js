import React, { useEffect, useState } from "react";
import Header from "./Header";

const Layout = ({ children }) => {
    const [phrase, setPhrase] = useState();
    useEffect(() => {
        console.log(phrase, "phrase")
    },[phrase])
    return (
        <div>
            <Header setPhrase ={setPhrase}/>
            {children}
        </div>
    )
}

export default Layout;