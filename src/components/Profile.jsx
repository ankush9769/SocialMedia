import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts/profile', { withCredentials: true });
                setProfile(res.data)
            }
            catch (err) {
                console.log("err", err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])
    if (loading) return <div className="text-center mt-5">Loading...</div>;

    if (!profile || !profile.user) {
        return <div className="text-center text-danger mt-5">No profile data available.</div>;
    }
    return (
        <div className="container mt-5 ">
            <div className="card p-4 shadow-sm bg-dark">
                <h2 className="mb-4 bg-dark" style={{color:"white"}}>My Profile</h2>
                <p className='bg-dark'><strong className='bg-dark'>Username:</strong> {profile.user.username}</p>
                <p className='bg-dark'><strong className='bg-dark'>Email:</strong> {profile.user.email}</p>

                <h4 className="mt-5 bg-dark " style={{color:"white"}}>My Posts</h4>
                {profile.posts.length > 0 ? (
                    profile.posts.map((post, idx) => (
                        <div key={idx} className="card mb-3">
                            <div className="card-body">
                                <p className="card-text">{post.content}</p>
                                <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info mt-3">No posts yet.</div>
                )}
            </div>
        </div>

    )
}

export default Profile
