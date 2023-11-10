import React, { useState } from "react";

function Home() {
    const [link, setLink] = useState("");

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handlePythonCodeExecution = () => {
        console.log("Home ne")
    };

    return (
        <div className="body">
            <div className="main-content">
                <h2>Đây là trang home</h2>
                <div className="control">
                    <input
                        type="text"
                        placeholder="Your link"
                        value={link}
                        onChange={handleLinkChange}
                        className="input-box"
                    />
                </div>
                <button onClick={handlePythonCodeExecution} className="btn">Download</button>
            </div>
        </div>
    );
}

export default Home;
