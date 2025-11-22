import { CheckCircle } from 'lucide-react';

const checklistItems = [
  {
    title: 'Use Strong, Unique Passwords',
    description: 'Create passwords that are at least 12 characters long with a mix of letters, numbers, and symbols. Never reuse passwords across different services.'
  },
  {
    title: 'Enable Multi-Factor Authentication (MFA)',
    description: 'Add an extra layer of security to your account. Even if someone gets your password, they won\'t be able to access your account without the second factor.'
  },
  {
    title: 'Be Cautious with Shared Access',
    description: 'Only share account access with team members who truly need it. Regularly review who has access and remove users who no longer need it.'
  },
  {
    title: 'Watch for Phishing Attempts',
    description: 'Be suspicious of emails asking you to click links or provide login credentials. BizHealth.ai will never ask for your password via email.'
  },
  {
    title: 'Keep Your Devices Secure',
    description: 'Use up-to-date antivirus software, enable firewalls, and keep your operating system and browser updated with the latest security patches.'
  },
  {
    title: 'Log Out When Using Shared Computers',
    description: 'Always log out of BizHealth.ai when using public or shared computers. Don\'t save passwords in browsers on shared devices.'
  },
  {
    title: 'Report Suspicious Activity',
    description: 'If you notice anything unusual with your account—unexpected logins, changes you didn\'t make—contact us immediately.'
  }
];

const SecurityChecklist = () => {
  return (
    <div className="space-y-4 mt-6">
      {checklistItems.map((item, index) => (
        <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border hover:border-biz-green/50 transition-colors">
          <CheckCircle className="w-6 h-6 text-biz-green flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-biz-navy mb-1">{item.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecurityChecklist;
