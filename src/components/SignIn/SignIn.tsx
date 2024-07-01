import React, { useState } from "react";
import { useAuth } from "../../utilities/AuthContext";
import styles from "./SignIn.module.css";
import { toast } from "react-toastify";

interface SignInData {
  email: string;
  password: string;
}

interface SignInProps {
  onClose: () => void;
}

const SignIn = ({ onClose }: SignInProps) => {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    password: "",
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { email, password } = signInData;
      await login(email, password);
      toast(`Welcome, ${email}!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError("An unknown error occurred.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            value={signInData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            value={signInData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
