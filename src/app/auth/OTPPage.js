import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false); // Loading state for redirect
  const location = useLocation();
  const navigate = useNavigate();
  const { supabase } = useAuth();

  const email = location.state?.email;
  const message = location.state?.message;

  useEffect(() => {
    // Redirect if no email in state
    if (!email) {
      setIsRedirecting(true);
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError('OTP should be 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup',
      });

      if (error) throw error;

      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      setOtp(''); // Clear OTP field after error
    } finally {
      setLoading(false);
    }
  };

  // Render nothing if redirecting
  if (isRedirecting) return null;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Verify your email</h2>
          <p className="mt-2 text-gray-500">{message}</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleVerification} className="space-y-6">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full bg-transparent border border-gray-800 rounded-lg p-4 text-white placeholder-gray-500"
            autoFocus // Automatically focus the input field
            aria-label="OTP Verification Code" // For better accessibility
          />

          <Button
            type="submit"
            disabled={!otp || loading}
            className="w-full rounded-lg py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
