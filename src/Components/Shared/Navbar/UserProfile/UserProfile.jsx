import React from 'react';
import useAuth from '../../../Controller/useAuth/useAuth';

const UserProfile = () => {
    const {user} = useAuth();
    console.log("i am from UserProfile",user)
    return (
        <div>
            <p className='text-center font-bold text-4xl m-5'>Welcome, {user?.displayName}!</p>
            <p className='text-center font-bold text-4xl m-5'>Your Email: <span className=' text-blue-600'>{user?.email}</span></p>
        </div>
    );
};

export default UserProfile;