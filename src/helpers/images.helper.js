import axios from "axios";

const API_KEY = 'vvkcJZ58PHRN2KJLyeBG8GZ3S8ZFX69i3A3hCRXS9aWoM5rScxELnoCQ';

const imageGeneration = (data) => {
    let urls = [];
    const promises = data.map((contact) => {
      const photoId = extractPhotoId(contact.profilePictureURL);
      return axios.get(`https://api.pexels.com/v1/search?query=${photoId}`, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then(response => {
          if (response.data && response.data.photos && response.data.photos.length > 0) {
            urls.push(response.data.photos[0].src.original); // Assuming you want the original image URL
          }
        })
        .catch(error => {
          console.error(`Error fetching data from Pexels for ${contact.name}:`, error);
        });
    });

    Promise.all(promises).then(() => {
        return urls;
    });
  };

  // Helper function to extract photoId from profilePictureURL
  const extractPhotoId = (url) => {
    const segments = url.split('/');
    return segments[segments.length - 2]; // Assuming the photoId is the second last segment
  };