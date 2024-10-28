# ViciNext - AI-Powered Call Center Platform

ViciNext is a next-generation predictive dialer and call center solution powered by AI, designed for modern sales and support teams.

## Features

### AI-Powered Intelligence
- 🧠 Real-time sentiment analysis during calls
- 📊 Predictive analytics for lead scoring
- 🎯 Smart call routing based on agent-lead matching
- 💡 Automated call quality assessment
- 🔄 Continuous learning system adaptation
- 📈 AI-driven performance optimization

### Agent Interface
- 🎯 Smart Call Distribution with AI-powered routing
- 📞 Real-time call controls (mute, volume, recording, hold)
- 🔄 Call transfer capabilities to departments or specific agents
- 📝 Dynamic script display with variable substitution
- ⚡ One-click disposition system
- 📅 Integrated callback scheduling
- ⏲️ Automatic pause/break management
- 📊 Real-time performance metrics

### Admin Dashboard
- 📈 Comprehensive analytics and reporting
- 🤖 AI-powered insights and recommendations
- 👥 Team management and performance tracking
- 🎯 Campaign creation and management
- 📋 Script management with AI optimization
- ⚙️ System configuration and settings
- 🔐 Role-based access control

### Project Management
- 📋 Task tracking and management
- 👥 Team collaboration tools
- 📅 Timeline and milestone tracking
- 🔄 Automated progress reporting
- ⚡ AI-powered project insights
- 🎯 Risk prediction and mitigation

### Core Technology
- ⚛️ Built with React and TypeScript
- 🎨 Styled with Tailwind CSS
- 🔄 Real-time updates using WebSocket
- 🎯 Lucide React icons for consistent UI
- 📱 Fully responsive design
- 🔒 Built-in security features

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── agent/         # Agent-specific components
│   ├── admin/         # Admin components
│   ├── layouts/       # Layout components
│   └── shared/        # Shared components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API and service integrations
├── store/             # Redux store and slices
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Default Credentials

### Agent Portal
- Username: agent
- Password: demo123

### Admin Portal
- Username: admin
- Password: demo123

## Development Mode

The application runs in development mode with simulated functionality:
- Automatic call distribution
- Mock lead generation
- Simulated performance metrics
- Demo agent state management
- Sample AI insights

## Changelog

### Version 1.1.0 (Latest)
- Added WebSocket integration for real-time updates
- Implemented Redux store with TypeScript
- Enhanced error handling with ErrorBoundary
- Added proper routing with protected routes
- Improved form validation and error messages
- Added comprehensive API services
- Enhanced TypeScript type definitions
- Added proper code documentation
- Implemented proper state management
- Added real-time metrics updates

### Version 1.0.0
- Initial release with core functionality
- Basic AI integration
- Agent and Admin dashboards
- Campaign management
- Call control system
- Performance analytics

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@vicinext.com or join our Slack community.