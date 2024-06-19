import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ContactList.css';
import Modal from './Modal';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ContactList = ({ data, imageUrls, setData, onContactClick, onDeleteConversation }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [highlightedContact, setHighlightedContact] = useState(null);
  const [updatedData, setUpdatedData] = useState([]);
  const [initialData, setInitialData] = useState(data);

  useEffect(() => {
    setUpdatedData(data.map(contact => ({ ...contact })));
  }, [data]);


  const openModal = (userId) => {
    setSelectedContact(userId);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  const markAsUnread = (userId) => {
    const newData = updatedData.map((contact) =>
      contact.userId === userId
        ? { ...contact, unreadCount: initialData.find(c => c.userId === userId).unreadCount } // Restore initial unread count
        : contact
    );
    setUpdatedData(newData);
    setData(newData);
    closeModal();
  };


  const deleteConversation = (userId) => {
    const newData = updatedData.filter((contact) => contact.userId !== userId);
    setUpdatedData(newData);
    setData(newData);
    closeModal();
    onDeleteConversation(userId);
  };

  const handleContactClick = (userId) => {
    const newData = updatedData.map((contact) =>
      contact.userId === userId
        ? { ...contact, unreadCount: 0 }
        : contact
    );
    setUpdatedData(newData);
    setData(newData);
    setHighlightedContact(userId);
    onContactClick(userId);
  };

  return (
    <div className="contact-list col-xs-12 col-sm-12">
      <div className="chatHeader">
        <h2>Chats</h2>
      </div>
      <ul>
        {updatedData.map((contact, index) => (
          <li key={contact.userId} className={highlightedContact === contact.userId ? 'selected' : ''}>
            <Link to={`/chat/${contact.userId}`} className="contact-link" onClick={() => handleContactClick(contact.userId)}>
              <div className="contact-header">
                <div>
                  <img src={imageUrls[contact.userId]} alt={contact.name} />
                </div>

                <div>
                  <h2>{contact.name}</h2>
                  <p style={{ overflow: "hidden" }}>{`${contact.chat[contact.chat.length - 1].you.message.substr(0, 21)}...`}</p>
                  <div style={{padding:"5px"}}>
                    {contact.unreadCount > 0 && <span>{contact.unreadCount}</span>}
                  </div>
                </div>

              </div>

              <div className="contact-info">
              </div>
            </Link>
            <button className="vertical-dots-button" onClick={() => openModal(contact.userId)}>
              <MoreVertIcon />
            </button>
            <div>
              {selectedContact === contact.userId && (
                <Modal
                  isOpen={true}
                  onClose={closeModal}
                  onMarkUnread={() => markAsUnread(contact.userId)}
                  onDelete={() => deleteConversation(contact.userId)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
