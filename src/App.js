import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ContactList from './components/ContactList';
import Conversation from './components/Conversation';
import './App.css';
import { data as initialData } from './initialData';
import axios from 'axios';

const API_KEY = 'vvkcJZ58PHRN2KJLyeBG8GZ3S8ZFX69i3A3hCRXS9aWoM5rScxELnoCQ';

const App = () => {
  const [contactsData, setContactsData] = useState(initialData);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [contactImageUrls, setContactImageUrls] = useState({});

  useEffect(() => {
    // Function to fetch image URLs for each contact
    const imageGeneration = (data) => {
      let urls = {};
      const promises = data.map((contact) => {
        const photoId = extractPhotoId(contact.profilePictureURL);
        return axios.get(`https://api.pexels.com/v1/search?query=${photoId}`, {
          headers: {
            Authorization: API_KEY,
          },
        })
          .then(response => {
            if (response.data && response.data.photos && response.data.photos.length > 0) {
              urls[contact.userId] = response.data.photos[4].src.original; // Storing URL in object with userId as key
            }
          })
          .catch(error => {
            console.error(`Error fetching data from Pexels for ${contact.name}:`, error);
          });
      });

      Promise.all(promises).then(() => {
        setContactImageUrls(urls); // Set state with image URLs after all promises resolve
      });
    };

    imageGeneration(contactsData); // Call imageGeneration with current contactsData
  }, [contactsData]); // Run effect whenever contactsData changes

  // Helper function to extract photoId from profilePictureURL
  const extractPhotoId = (url) => {
    const segments = url.split('/');
    return segments[segments.length - 2]; // Assuming the photoId is the second last segment
  };

  const handleContactClick = (userId) => {
    setSelectedConversation(contactsData.find(contact => contact.userId === userId));
    // Mark as read by updating unreadCount in the state
    const newData = contactsData.map(contact =>
      contact.userId === userId ? { ...contact, unreadCount: 0 } : contact
    );
    setContactsData(newData);
  };

  const handleDeleteConversation = (userId) => {
    const newData = contactsData.filter(contact => contact.userId !== userId);
    setContactsData(newData);
    if (selectedConversation && selectedConversation.userId === userId) {
      setSelectedConversation(null);
    }
  };

  return (
    <Router>
      <div className="app">
        <ContactList
          data={contactsData}
          imageUrls={contactImageUrls}
          setData={setContactsData}
          onContactClick={handleContactClick}
          onDeleteConversation={handleDeleteConversation}
        />
        {selectedConversation && (
          <Conversation
            data={selectedConversation}
            imageUrls={contactImageUrls}
            setData={setContactsData}
            onContactClick={handleContactClick}
            onDeleteConversation={handleDeleteConversation} />
        )}
      </div>
    </Router>
  );
};

export default App;
