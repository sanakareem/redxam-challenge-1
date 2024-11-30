import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      
      localStorage.clear(); 
      navigate('/login');
    } catch (error) {
      setLoading(false);
      console.error('Error logging out:', error);
      alert('There was an issue logging you out. Please try again.');
    }
  };

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      {showConfirm ? (
        <div className="flex items-center gap-2">
          <p>Are you sure you want to log out?</p>
          <Button 
            onClick={handleLogout}
            variant="destructive"
            disabled={loading}
          >
            {loading ? 'Logging out...' : 'Yes'}
          </Button>
          <Button 
            onClick={handleCancel}
            variant="outline"
            disabled={loading}
          >
            No
          </Button>
        </div>
      ) : (
        <Button 
          onClick={handleConfirm}
          variant="destructive"
          className="flex items-center gap-2"
          disabled={loading}
        >
          <LogOut className="h-4 w-4" />
          {loading ? 'Logging out...' : 'Logout'}
        </Button>
      )}
    </div>
  );
};

export default LogoutButton;
