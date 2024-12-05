import React, { useState } from "react";
import { Chat } from "./Chat";
import { useLocation } from 'react-router-dom';

function ChatPage() {
  const [isInChat, setIsInChat] = useState(false);
  const [room, setRoom] = useState("");
  const location = useLocation();
  const { name, email } = location.state || {};

  // Function to determine the chat participant's identifier
  const getParticipant = () => {
    if (name) {
      return name; // Return name if it exists
    } else if (email) {
      return email; // Return email if name is null
    }
    return "Guest"; // Fallback if both are null
  };

  return (
    <div style={styles.container}>
      {!isInChat ? (
        <div style={styles.card}>
          <h2 style={styles.title}>Chat Room</h2>
          <label style={styles.label}>Select a subject:</label>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={styles.select}
          >
            <option value="">Choose a subject</option>
            <option value="Python">Python</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Data Structures">Data Structures</option>
          </select>
          <button
            onClick={() => {
              if (room) {
                setIsInChat(true);
              } else {
                alert("Please select a subject to join.");
              }
            }}
            style={styles.button}
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <div style={styles.chatContainer}>
          <Chat room={room} name={getParticipant()} />
        </div>
      )}
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa', // Light background for the entire page
  },
  card: {
    backgroundColor: '#ffffff', // White background for the card
    border: '1px solid #dee2e6', // Light border for the card
    borderRadius: '0.5rem', // Rounded corners
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Soft shadow
    padding: '2rem',
    width: '100%',
    maxWidth: '400px', // Set a max width for the card
  },
  title: {
    color: '#007bff', // Blue color for the title
    textAlign: 'center',
    marginBottom: '1rem',
  },
  label: {
    marginBottom: '0.5rem',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #ced4da', // Light border for the select
    marginBottom: '1rem',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff', // Bootstrap primary color
    border: '1px solid #007bff', // Border color for the button
    color: '#ffffff',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  chatContainer: {
    width: '100%',
    maxWidth: '800px', // Set a max width for the chat area
    margin: '0 auto', // Center the chat container
    padding: '1rem', // Add padding around the chat
    backgroundColor: '#ffffff', // Ensure chat area has a white background
    borderRadius: '0.5rem', // Rounded corners for chat area
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Soft shadow for chat area
  },
};

export default ChatPage;
