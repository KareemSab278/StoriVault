import React, { useEffect, useState } from 'react';
import { getUser } from '../app';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser('685c5539c5cf817cd3d809b4');
        setUser(data);
      } catch (err) {
        setError('Failed to load user info.', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Profile Page</h2>
      <img src={user.profile_picture} alt="Profile" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
      <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  );
}

export default ProfilePage;