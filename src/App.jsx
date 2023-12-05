import React, { useState } from 'react';
import './App.css'

const GithubInfoCard = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      // Handle error gracefully, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchUserData();
        }}
      >
        <label>
          Enter GitHub Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Get Info</button>
      </form>

      {userData && (
        <div>
          <img src={userData.avatar_url} alt="Avatar" />
          <p>Username: {userData.login}</p>
          <p>Name: {userData.name}</p>
          <p>Public Repositories: {userData.public_repos}</p>
          <p>Public Gists: {userData.public_gists}</p>
          <p>Profile Created At: {new Date(userData.created_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default GithubInfoCard;
