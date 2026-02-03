/**
 * Processing Page
 * 
 * Shows the progress of report generation after questionnaire submission.
 * Polls the pipeline_queue table for status updates.
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ProcessingState {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  phase?: string;
  progress?: number;
  reportsGenerated?: number;
  error?: string;
}

export default function Processing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { submissionId, pipelineType, companyName } = location.state || {};
  
  const [processingState, setProcessingState] = useState<ProcessingState>({
    status: 'pending'
  });
  const [elapsedTime, setElapsedTime] = useState(0);

  // Estimated times based on pipeline type
  const estimatedTime = pipelineType === 'LIL' ? 8 : 35; // minutes

  // Poll for status updates
  useEffect(() => {
    if (!submissionId || !user) return;

    const pollInterval = setInterval(async () => {
      try {
        // Check pipeline_queue status
        const { data: job, error } = await supabase
          .from('pipeline_queue')
          .select('*')
          .eq('questionnaire_id', submissionId)
          .single();

        if (error) {
          console.error('Error fetching job status:', error);
          return;
        }

        if (job) {
          // Safely access progress and result from payload/status
          const jobStatus = job.status as ProcessingState['status'];
          setProcessingState({
            status: jobStatus,
            phase: undefined, // Progress tracking handled separately
            progress: undefined,
            reportsGenerated: undefined,
            error: job.last_error || undefined
          });

          // If completed, redirect to portal after a short delay
          if (job.status === 'completed') {
            clearInterval(pollInterval);
            setTimeout(() => {
              navigate('/portal', { 
                state: { 
                  newReports: true,
                  companyName 
                }
              });
            }, 3000);
          }

          // If failed, stop polling
          if (job.status === 'failed') {
            clearInterval(pollInterval);
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [submissionId, user, navigate, companyName]);

  // Track elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get status message and icon
  const getStatusDisplay = () => {
    switch (processingState.status) {
      case 'pending':
        return {
          icon: '⏳',
          title: 'Preparing Your Analysis',
          message: 'Your assessment is queued for processing...'
        };
      case 'processing':
        return {
          icon: '🔄',
          title: 'Generating Your Reports',
          message: processingState.phase 
            ? `Currently on ${processingState.phase}...`
            : 'Our AI is analyzing your business data...'
        };
      case 'completed':
        return {
          icon: '✅',
          title: 'Reports Ready!',
          message: `${processingState.reportsGenerated || 8} reports have been generated. Redirecting to your dashboard...`
        };
      case 'failed':
        return {
          icon: '❌',
          title: 'Processing Error',
          message: processingState.error || 'An error occurred. Please contact support.'
        };
      default:
        return {
          icon: '⏳',
          title: 'Processing',
          message: 'Please wait...'
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  // Progress percentage (estimated)
  const progressPercent = processingState.status === 'completed' 
    ? 100 
    : Math.min(95, Math.round((elapsedTime / (estimatedTime * 60)) * 100));

  // If no submission ID, redirect to home
  if (!submissionId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No submission found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#212653] text-white rounded-lg hover:bg-[#2d3570]"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#212653] to-[#2d3570] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="/bizhealth-logo.png" 
            alt="BizHealth" 
            className="h-12 mx-auto"
          />
        </div>

        {/* Status Icon */}
        <div className="text-6xl mb-4 animate-pulse">
          {statusDisplay.icon}
        </div>

        {/* Status Title */}
        <h1 className="text-2xl font-bold text-[#212653] mb-2">
          {statusDisplay.title}
        </h1>

        {/* Company Name */}
        {companyName && (
          <p className="text-[#969423] font-semibold mb-4">
            {companyName}
          </p>
        )}

        {/* Status Message */}
        <p className="text-gray-600 mb-6">
          {statusDisplay.message}
        </p>

        {/* Progress Bar */}
        {processingState.status !== 'failed' && (
          <div className="mb-6">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#212653] to-[#969423] transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{progressPercent}% complete</span>
              <span>~{estimatedTime - Math.floor(elapsedTime / 60)} min remaining</span>
            </div>
          </div>
        )}

        {/* Timer */}
        <div className="text-sm text-gray-500 mb-6">
          Elapsed time: {formatTime(elapsedTime)}
        </div>

        {/* Pipeline Type Badge */}
        <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
          {pipelineType === 'LIL' ? '⚡ Essentials Plan' : '🚀 Growth Plan'}
        </div>

        {/* What's Happening Section */}
        {processingState.status === 'processing' && (
          <div className="mt-8 text-left bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-[#212653] mb-3">What's happening:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Analyzing your questionnaire responses
              </li>
              <li className="flex items-center gap-2">
                <span className={elapsedTime > 60 ? 'text-green-500' : 'text-gray-300'}>
                  {elapsedTime > 60 ? '✓' : '○'}
                </span>
                Calculating business health scores
              </li>
              <li className="flex items-center gap-2">
                <span className={elapsedTime > 120 ? 'text-green-500' : 'text-gray-300'}>
                  {elapsedTime > 120 ? '✓' : '○'}
                </span>
                Generating category insights
              </li>
              <li className="flex items-center gap-2">
                <span className={elapsedTime > 180 ? 'text-green-500' : 'text-gray-300'}>
                  {elapsedTime > 180 ? '✓' : '○'}
                </span>
                Building your 30-60-90 day roadmap
              </li>
              <li className="flex items-center gap-2">
                <span className={elapsedTime > 240 ? 'text-green-500' : 'text-gray-300'}>
                  {elapsedTime > 240 ? '✓' : '○'}
                </span>
                Creating personalized reports
              </li>
            </ul>
          </div>
        )}

        {/* Error State */}
        {processingState.status === 'failed' && (
          <div className="mt-6">
            <button
              onClick={() => navigate('/portal')}
              className="px-6 py-3 bg-[#212653] text-white rounded-lg hover:bg-[#2d3570]"
            >
              Go to Dashboard
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Need help? <a href="/contact" className="text-[#969423] hover:underline">Contact Support</a>
            </p>
          </div>
        )}

        {/* Success State */}
        {processingState.status === 'completed' && (
          <div className="mt-6">
            <div className="animate-bounce">
              <button
                onClick={() => navigate('/portal')}
                className="px-8 py-3 bg-[#969423] text-white rounded-lg hover:bg-[#7a7a1d] font-semibold"
              >
                View Your Reports →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
