import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, Building, AlertCircle, CheckCircle, TrendingUp, Zap, BarChart3, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import bizHealthLogo from '@/assets/bizhealth-logo-horizontal.jpg';

const Register = () => {
  const { user, signUp, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToMarketing, setAgreedToMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/portal" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (passwordStrength < 3) {
      setError('Password must be stronger (at least 8 characters with uppercase, lowercase, and numbers)');
      return false;
    }
    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        company_name: formData.company
      });
      
      if (error) {
        setError(error.message);
      } else {
        setError('Please check your email to confirm your account.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Google signup failed. Please try again.');
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-yellow-500';
    if (passwordStrength <= 3) return 'bg-orange-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Very Weak';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F4F8] to-white flex flex-col">
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Header Section */}
      <header className="pt-40 pb-8 px-4">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <img 
            src={bizHealthLogo} 
            alt="BizHealth.ai Logo" 
            className="h-12 mx-auto object-contain"
          />
          <h1 className="text-2xl font-bold text-biz-navy" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Stop Guessing, Start Growing
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-border/30">
            <div className="w-2 h-2 rounded-full bg-growth"></div>
            <span className="text-sm font-medium text-biz-grey">Step 1: Get Started</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-start justify-center px-4 pb-12">
        <div className="w-full max-w-6xl flex items-center justify-center gap-8 lg:gap-12">
          {/* Left Decorative Icon */}
          <div className="hidden lg:flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2 text-center max-w-[120px]">
              <div className="w-16 h-16 rounded-full bg-growth/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-growth" aria-hidden="true" />
              </div>
              <p className="text-xs text-biz-grey">Growth Analytics</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center max-w-[120px]">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <p className="text-xs text-biz-grey">AI-Powered Insights</p>
            </div>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-lg p-6 sm:p-8">
            <Card className="shadow-elegant border-border/50 bg-white">
              <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-montserrat font-bold text-biz-navy">
                  Create Your Account
                </CardTitle>
                <CardDescription className="font-open-sans text-biz-grey" style={{ lineHeight: '1.6' }}>
                  Unlock actionable business insights in under 90 minutes
                </CardDescription>
              </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-open-sans font-medium">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-biz-grey" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="pl-10 font-open-sans"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-open-sans font-medium">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-biz-grey" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="pl-10 font-open-sans"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-open-sans font-medium">
                    Business Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-biz-grey" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="pl-10 font-open-sans"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company" className="font-open-sans font-medium">
                    Company Name
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-biz-grey" />
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company LLC"
                      className="pl-10 font-open-sans"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-open-sans font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-biz-grey" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="pl-10 pr-10 font-open-sans"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-biz-grey hover:text-biz-navy"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-open-sans text-biz-grey">
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-open-sans font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-biz-grey" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 font-open-sans"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-biz-grey hover:text-biz-navy"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  {formData.confirmPassword && (
                    <div className="flex items-center space-x-2 text-sm">
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 font-open-sans">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-red-600 font-open-sans">Passwords do not match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm font-open-sans text-biz-grey cursor-pointer">
                      I agree to the{' '}
                      <Link to="/terms" className="text-biz-navy hover:text-biz-green transition-colors">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-biz-navy hover:text-biz-green transition-colors">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={agreedToMarketing}
                      onCheckedChange={(checked) => setAgreedToMarketing(checked === true)}
                    />
                    <Label htmlFor="marketing" className="text-sm font-open-sans text-biz-grey cursor-pointer">
                      I'd like to receive business insights and product updates via email
                    </Label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={loading || !agreedToTerms || passwordStrength < 3}
                  className="w-full bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-biz-grey font-open-sans">
                    Or sign up with
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={handleGoogleSignup}
                className="w-full font-open-sans"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </CardContent>
            
            <CardFooter className="text-center">
              <div className="text-sm font-open-sans text-biz-grey">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-biz-navy hover:text-biz-green font-semibold transition-colors"
                >
                  Sign in here
                </Link>
              </div>
            </CardFooter>
          </Card>
          </div>

          {/* Right Decorative Icon */}
          <div className="hidden lg:flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2 text-center max-w-[120px]">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <p className="text-xs text-biz-grey">Business Dashboard</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center max-w-[120px]">
              <div className="w-16 h-16 rounded-full bg-growth/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-growth" aria-hidden="true" />
              </div>
              <p className="text-xs text-biz-grey">Secure & Private</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Custom Footer */}
      <footer className="border-t border-border/30 bg-white/50 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: '#6B7280' }}>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-biz-navy transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-biz-navy transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4" aria-label="SSL Secured" />
              <span>© 2024 BizHealth.ai. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;