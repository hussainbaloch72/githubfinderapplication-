document.getElementById('search-button').addEventListener('click', function() {
    const username = document.getElementById('username-input').value.trim();
    if (username) {
      getProfile(username);
    }
  });
  
  async function getProfile(username) {
    const apiUrl = `https://api.github.com/users/${username}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`User not found: ${response.statusText}`);
      }
      const data = await response.json();
      displayProfile(data);
    } catch (error) {
      showError(error.message);
    }
  }
  
  function displayProfile(profileData) {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = `
      <div class="profile-item">
        <img src="${profileData.avatar_url}" alt="${profileData.login}" class="profile-pic">
      </div>
      <div class="profile-item"><strong>Username:</strong> ${profileData.login}</div>
      <div class="profile-item"><strong>Name:</strong> ${profileData.name || 'N/A'}</div>
      <div class="profile-item"><strong>Bio:</strong> ${profileData.bio || 'N/A'}</div>
      <div class="profile-item"><strong>Location:</strong> ${profileData.location || 'N/A'}</div>
      <div class="profile-item"><strong>Public Repos:</strong> ${profileData.public_repos}</div>
      <div class="profile-item"><strong>Followers:</strong> ${profileData.followers}</div>
      <div class="profile-item"><strong>Following:</strong> ${profileData.following}</div>
      <div class="profile-item"><strong>GitHub Profile:</strong> <a href="${profileData.html_url}" target="_blank">View Profile</a></div>
    `;
  }
  
  function showError(message) {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = `
      <div class="error-message">${message}</div>
    `;
  }
  