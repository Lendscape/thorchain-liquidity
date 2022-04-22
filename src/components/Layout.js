import React, { useState } from "react";
import Header from "./Header";
import Content from "./Content";

const Layout = ({ children }) => {
    const [phrase, setPhrase] = useState();
    const [chainNetwork, setChainNetwork] = useState(1);

    return (
        <div>
            <Header
                phrase={phrase}
                setChainNetwork={setChainNetwork}
                setPhrase={setPhrase}
            />
            <Content />
            {children}
        </div>
    );
};

export default Layout;
