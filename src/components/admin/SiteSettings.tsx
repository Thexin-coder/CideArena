import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Settings, Globe, Mail, Github as GitHub, Bell, Shield, CheckCircle, AlertTriangle, Info, Save } from 'lucide-react';

const SiteSettings: React.FC = () => {
  const { user } = useAuth();
  
  // Only owners can access this page
  if (user?.role !== 'owner') {
    return (
      <div className="bg-warning-50 border border-warning-200 rounded-md p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h2>
        <p className="text-gray-600">
          Only site owners can access the site settings page.
        </p>
      </div>
    );
  }
  
  const [siteName, setSiteName] = useState('CodeArena');
  const [siteDescription, setSiteDescription] = useState('A competitive programming platform for coding enthusiasts');
  const [contactEmail, setContactEmail] = useState('contact@codearena.com');
  const [githubRepo, setGithubRepo] = useState('github.com/codearena/platform');
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Site settings updated successfully!');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600">
          Configure global settings for your coding platform.
        </p>
      </div>
      
      {successMessage && (
        <div className="mb-6 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded relative flex items-center" role="alert">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{successMessage}</span>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="siteName"
                  type="text"
                  className="form-input pl-10"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contactEmail"
                  type="email"
                  className="form-input pl-10"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Site Description
            </label>
            <textarea
              id="siteDescription"
              rows={3}
              className="form-input w-full"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="githubRepo" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Repository
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GitHub className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="githubRepo"
                type="text"
                className="form-input pl-10"
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
              />
            </div>
          </div>
          
          {/* Authentication Settings */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="allowRegistration"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={allowRegistration}
                  onChange={(e) => setAllowRegistration(e.target.checked)}
                />
                <label htmlFor="allowRegistration" className="ml-3 block text-sm font-medium text-gray-700">
                  Allow new user registrations
                </label>
              </div>
              
              <div className="ml-7 text-sm text-gray-500 flex items-start">
                <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                <p>
                  When disabled, only existing users can log in, and new registrations will be disabled.
                </p>
              </div>
            </div>
          </div>
          
          {/* Site Status */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Site Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="maintenanceMode"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={isMaintenanceMode}
                  onChange={(e) => setIsMaintenanceMode(e.target.checked)}
                />
                <label htmlFor="maintenanceMode" className="ml-3 block text-sm font-medium text-gray-700">
                  Enable maintenance mode
                </label>
              </div>
              
              {isMaintenanceMode && (
                <div className="ml-7 p-4 bg-warning-50 border border-warning-200 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-warning-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-warning-800">
                      Warning: Site will be inaccessible to regular users
                    </p>
                    <p className="text-sm text-warning-700 mt-1">
                      When maintenance mode is enabled, only administrators and owners can access the site.
                      All other users will see a maintenance page.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Security Settings */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="forcePasswordReset"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="forcePasswordReset" className="ml-3 block text-sm font-medium text-gray-700">
                  Force all users to reset their password
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="twoFactorAuth"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="twoFactorAuth" className="ml-3 block text-sm font-medium text-gray-700">
                  Enable two-factor authentication for admins
                </label>
              </div>
              
              <div className="ml-7 text-sm text-gray-500 flex items-start">
                <Shield className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                <p>
                  Adds an extra layer of security for administrative accounts.
                </p>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="pt-6 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              className="btn-primary flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiteSettings;