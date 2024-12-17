import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import classes from './loginPage.module.css';

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user, navigate, returnUrl]); 

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className={classes.container}>
      <div className={classes.description}>
        <h1>Welcome to Click&Drink</h1>
        <p>
          Log in to access our water delivery services. Whether you need fresh water or a refill, we're here to keep you hydrated!
        </p>
      </div>
      <div className={classes.details}>
        <h2>Log in to your account</h2>
        <form onSubmit={handleSubmit(submit)} noValidate>
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
              })}
              className={classes.input}
            />
            {errors.password && <span className={classes.error}>Password is required!</span>}
          </label>
          <button type="submit" className={classes.button}>Login</button>
          <div className={classes.register}>
            Don't have an account? &nbsp;
            <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
