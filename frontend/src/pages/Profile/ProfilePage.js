import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classes from './profilePage.module.css';

const ProfilePage = () => {
    const { user, updateProfile, changePassword, logout } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [passwordMode, setPasswordMode] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleProfileSave = async (data) => {
        try {
            await updateProfile(data);
            setEditMode(false);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const handlePasswordChange = async (data) => {
        try {
            if (data.newPassword !== data.confirmPassword) {
                throw new Error('Passwords do not match!');
            }

            await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });
            setPasswordMode(false);
            reset(); 
            logout();
            navigate('/login');
        } catch (err) {
            console.error('Error changing password:', err);
        }
    };

    return (
        <div className={classes.profilePageWrapper}>
            <h2 className={classes.profilePage__header}>My Profile</h2>
            <p className={classes.profilePage__welcome}>Welcome back, {user?.name}!</p>
            <div className={classes.profilePage__infoSection}>
                <h3 className={classes.profilePage__infoSectionTitle}>Personal Information</h3>
                {editMode ? (
                    <form onSubmit={handleSubmit(handleProfileSave)} className={classes.form}>
                        <input
                            {...register("name", { required: 'Name is required' })}
                            defaultValue={user?.name}
                            placeholder="Name"
                        />
                        {errors.name && <p className="error">{errors.name.message}</p>}
                        
                        <input
                            {...register("email", { required: 'Email is required' })}
                            defaultValue={user?.email}
                            placeholder="Email"
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                        
                        <input
                            {...register("address", { required: 'Address is required' })}
                            defaultValue={user?.address}
                            placeholder="Address"
                        />
                        {errors.address && <p className="error">{errors.address.message}</p>}
                        
                        <button type="submit" className={`${classes.profilePage__button} ${classes.profilePage__saveButton}`}>
                            Save
                        </button>
                        <button type="button" onClick={() => setEditMode(false)} className={`${classes.profilePage__button} ${classes.profilePage__cancelButton}`}>
                            Cancel
                        </button>
                    </form>
                ) : (
                    <>
                        <div className={classes.profilePage__infoItem}>
                            <span className={classes.profilePage__infoLabel}>Name:</span>
                            <span className={classes.profilePage__infoValue}>{user?.name}</span>
                        </div>
                        <div className={classes.profilePage__infoItem}>
                            <span className={classes.profilePage__infoLabel}>Email:</span>
                            <span className={classes.profilePage__infoValue}>{user?.email}</span>
                        </div>
                        <div className={classes.profilePage__infoItem}>
                            <span className={classes.profilePage__infoLabel}>Address:</span>
                            <span className={classes.profilePage__infoValue}>{user?.address}</span>
                        </div>
                        <button onClick={() => setEditMode(true)} className={`${classes.profilePage__button} ${classes.profilePage__editButton}`}>
                            Edit Profile
                        </button>
                    </>
                )}
            </div>

            <div className={classes.profilePage__changePasswordSection}>
                <h3 className={classes.profilePage__changePasswordTitle}>Change Password</h3>
                {passwordMode ? (
                    <form onSubmit={handleSubmit(handlePasswordChange)} className={classes.form}>
                        <input
                            type="password"
                            {...register("currentPassword", { required: 'Current password is required' })}
                            placeholder="Old Password"
                        />
                        {errors.currentPassword && <p className="error">{errors.currentPassword.message}</p>}
                        
                        <input
                            type="password"
                            {...register("newPassword", { required: 'New password is required' })}
                            placeholder="New Password"
                        />
                        {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
                        
                        <input
                            type="password"
                            {...register("confirmPassword", { required: 'Confirm password is required' })}
                            placeholder="Confirm Password"
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                        
                        <button type="submit" className={`${classes.profilePage__button} ${classes.profilePage__saveButton}`}>
                            Change Password
                        </button>
                        <button type="button" onClick={() => setPasswordMode(false)} className={`${classes.profilePage__button} ${classes.profilePage__cancelButton}`}>
                            Cancel
                        </button>
                    </form>
                ) : (
                    <button onClick={() => setPasswordMode(true)} className={`${classes.profilePage__button} ${classes.profilePage__passwordButton}`}>
                        Change Password
                    </button>
                )}
            </div>

            <div className={classes.profilePage__actions}>
                <p className={classes.profilePage__actionText}>
                    You want to make a new order? <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className={classes.profilePage__link}>Go to Homepage</a>
                </p>
                <p className={classes.profilePage__actionText}>
                    You want to check your orders? <a href="/orders" onClick={(e) => { e.preventDefault(); navigate('/orders'); }} className={classes.profilePage__link}>Go to Orders</a>
                </p>
                <a href="/" onClick={(e) => { e.preventDefault(); logout(); }} className={`${classes.profilePage__buttonLink} ${classes.profilePage__logoutButton}`}>Log Out</a>
            </div>
        </div>
    );
};

export default ProfilePage;
