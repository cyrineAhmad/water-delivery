import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './registerPage.module.css';

export default function RegisterPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { user } = auth;
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user, navigate, returnUrl]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    await auth.register(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.description}>
        <h1>Create an Account</h1>
        <p>
          Click&Drink to schedule water deliveries and refills and stay hydrated effortlessly. 
          Let's get you started!
        </p>
      </div>
      <div className={classes.details}>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <label className={classes.label}>
            Name
            <input
              type="text"
              {...register('name', {
                required: true,
                minLength: 3,
              })}
              className={classes.input}
            />
            {errors.name && <span className={classes.error}>Name must be at least 3 characters!</span>}
          </label>

          <label className={classes.label}>
            Email
            <input
              type="email"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[\w-,]+@([\w-]+\.)+[\w-]{2,63}$/i,
                  message: 'Invalid Email!',
                },
              })}
              className={classes.input}
            />
            {errors.email && <span className={classes.error}>Invalid Email!</span>}
          </label>

          <label className={classes.label}>
            Password
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 5,
              })}
              className={classes.input}
            />
            {errors.password && <span className={classes.error}>Password must be at least 5 characters!</span>}
          </label>

          <label className={classes.label}>
            Confirm Password
            <input
              type="password"
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === getValues('password') || 'Passwords do not match!',
              })}
              className={classes.input}
            />
            {errors.confirmPassword && <span className={classes.error}>{errors.confirmPassword.message}</span>}
          </label>

          <label className={classes.label}>
            Address
            <input
              type="text"
              {...register('address', {
                required: true,
                minLength: 10,
              })}
              className={classes.input}
            />
            {errors.address && <span className={classes.error}>Address must be at least 10 characters!</span>}
          </label>

          <button type="submit" className={classes.button}>Sign up</button>

          <div className={classes.login}>
            You already have an account? &nbsp;
            <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
