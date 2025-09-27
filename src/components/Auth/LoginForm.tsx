import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400">Sign in to your Bloom Watch account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;