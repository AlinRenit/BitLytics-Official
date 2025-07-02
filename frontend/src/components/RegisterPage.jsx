import React, { use, useState } from 'react'
import { useForm } from 'react-hook-form';
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/register", 
                data
            );
            reset();
            navigate("/login");
            toast.success("Registration Successful!")
        } catch (error) {
            console.log(error);
            toast.error("Registration Failed!")
        } finally {
            setLoader(false);
        }
    };

  return (
    <div
        className="min-h-[calc(100vh-64px)] flex justify-center items-center">
        <form onSubmit={handleSubmit(registerHandler)}
            className="sm:w-[450px] w-[360px] shadow-[var(--shadow-custom)] py-8 sm:px-8 px-4 rounded-md">
            <h1 className="text-center font-serif font-bold lg:text-3xl text-2xl"
                style={{ color: 'var(--color-btnColor)' }}>
                Register Here
            </h1>

            <hr className='mt-2 mb-5 text-black' />

            <div className="flex flex-col gap-3">
                <TextField
                    label="Username"
                    required
                    id="username"
                    type="text"
                    message="Username is required"
                    placeholder="Enter your username"
                    register={register}
                    errors={errors}
                />

                <TextField
                    label="Email"
                    required
                    id="email"
                    type="email"
                    message="Email is required"
                    placeholder="Enter your email"
                    register={register}
                    errors={errors}
                />

                <TextField
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="Password is required"
                    placeholder="Enter your password"
                    register={register}
                    min={6}
                    errors={errors}
                />

            <button
                disabled={loader}
                type="submit"
                className="font-semibold text-white bg-[var(--color-btnColor)] w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3 cursor-pointer">
                {loader ? "Loading..." : "Register"}
            </button>

            <p className='text-center text-sm text-slate-700 mt-6'>
                Already have an account? 
                <Link
                    className='font-semibold underline hover:text-black'
                    to="/login">
                        <span className='text-btnColor'> Login</span>
                </Link>
            </p>

            </div>
        </form>
    </div>
  )
}

export default RegisterPage