import React from 'react';
import './Conversation.css';

const Conversation = ({ data, imageUrls }) => {
  return (
    <div className="conversation-container">
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", backgroundColor: "#F6F6F6", borderRadius:"10px" }}>
        <div style={{ paddingLeft: "20px" }}>
          <img src={imageUrls[data.userId]} alt={data.name} style={{ height: "50px", width: "48px", borderRadius: "45px" }} />
        </div>
        <h4 style={{ padding: "10px" }}>{data.name}</h4>
      </div>
      <div className="conversation">
        <div className="messages">
          {data.chat.map((msg, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "inherit" }}>
              {Object.keys(msg).map((key, innerIndex) => (
                <div key={innerIndex} className={`message ${key === 'you' ? 'your-message' : 'their-message'}`}>
                  <p className={`message-text ${key === 'you' ? 'your-message' : 'their-message'}`}>{msg[key].message}</p>
                  <span>{msg[key].timeStamp}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input type="text" placeholder="Type your message..." />
          <button className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
