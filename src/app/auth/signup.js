import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { supabase } from './supabaseClient';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  useEffect(() => {
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = passwordRegex.test(formData.password);
    setIsValid(isEmailValid && isPasswordValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isValid) return;

    setLoading(true);
    setError('');

    try {
      const { user, session } = await signup(formData.email, formData.password);
      if (user && !session) {
        navigate('/otp', {
          state: {
            email: formData.email,
            message: 'Please check your email for the verification code.',
          },
        });
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookAuth = async () => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (user) {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (user) {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="mb-8">
          <img src="/logo.svg" alt="Film Trends" className="h-12" />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-800 rounded-lg p-4 text-white placeholder-gray-500"
            />
            {formData.email && !emailRegex.test(formData.email) && (
              <p className="text-sm text-red-500">Please enter a valid email address</p>
            )}

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-800 rounded-lg p-4 text-white placeholder-gray-500"
            />
            {formData.password && !passwordRegex.test(formData.password) && (
              <p className="text-sm text-red-500">
                Password must be at least 8 characters long and contain at least one letter and one number
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full rounded-lg py-4 ${
              isValid && !loading
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                : 'bg-gray-800 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'GET STARTED'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">or continue with</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-transparent border border-gray-800"
              onClick={handleGoogleAuth}
            >
              <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
              <span>Google</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-transparent border border-gray-800"
              onClick={handleFacebookAuth}
            >
              <img src="/facebook-icon.svg" alt="Facebook" className="h-5 w-5" />
              <span>Facebook</span>
            </Button>
          </div>
        </div>

        <div className="text-center text-gray-500">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </a>
          </p>
        </div>

        <div className="text-center text-sm text-gray-500">
          <a href="/terms" className="hover:text-gray-400">Terms & Conditions</a>
          {' • '}
          <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
