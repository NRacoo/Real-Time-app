# Real-Time Chat Application

A modern, real-time chat application built with Next.js, Socket.IO, and Express.js. This application provides a seamless chat experience with real-time messaging, user presence, and a beautiful UI.

## 🚀 Features

### Core Features
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Presence**: See who's online and when users join/leave
- **System Messages**: Automatic notifications for user join/leave events
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Connection Status**: Visual indicator showing connection status
- **Message Timestamps**: Each message shows when it was sent
- **User Avatars**: Visual representation with user initials
- **Message History**: View all messages in the current session

### UI/UX Features
- **Modern Design**: Clean, gradient-based design with Tailwind CSS
- **User List**: Sidebar showing all online users with "You" indicator
- **Message Bubbles**: Different styling for own messages vs others
- **Auto-scroll**: Automatically scrolls to latest messages
- **Input Validation**: Prevents empty messages and enforces character limits
- **Loading States**: Visual feedback for connection status

## 📁 Project Structure

```
Real-Time/
├── Backend/                 # Express.js + Socket.IO Server
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   └── package-lock.json   # Dependency lock file
│
└── real-time/              # Next.js Frontend
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx      # Root layout component
    │   │   ├── page.tsx        # Main chat page
    │   │   ├── globals.css     # Global styles
    │   │   └── favicon.ico     # App icon
    │   ├── components/
    │   │   └── ui/             # Reusable UI components
    │   │       ├── avatar.tsx      # User avatar component
    │   │       ├── button.tsx      # Button component
    │   │       ├── card.tsx        # Card container component
    │   │       ├── input.tsx       # Input field component
    │   │       └── scroll-area.tsx # Scrollable area component
    │   └── lib/
    │       └── utils.ts       # Utility functions
    ├── public/               # Static assets
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── package.json          # Frontend dependencies
    ├── package-lock.json     # Dependency lock file
    ├── next.config.ts        # Next.js configuration
    ├── tailwind.config.js    # Tailwind CSS configuration
    ├── tsconfig.json         # TypeScript configuration
    ├── postcss.config.js     # PostCSS configuration
    └── components.json       # UI components configuration
```

## 🛠️ Technology Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Socket.IO**: Real-time bidirectional communication
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Socket.IO Client**: Real-time client library
- **Lucide React**: Icon library
- **Radix UI**: Accessible UI primitives

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Real-Time
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../real-time
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```
   The server will start on `http://localhost:3001`

2. **Start the Frontend Application**
   ```bash
   cd real-time
   npm run dev
   ```
   The application will start on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to access the chat application

## 📋 API Endpoints

### Backend API Routes
- `GET /api/lobby` - Get server status and connected users count
- `GET /api/users` - Get list of all connected users

### Socket.IO Events

#### Client to Server
- `join` - Join the chat room with username
- `message` - Send a message to all users
- `disconnect` - User disconnection (handled automatically)

#### Server to Client
- `connect` - Socket connection established
- `disconnect` - Socket disconnected
- `message` - New message received
- `userJoined` - New user joined the chat
- `userLeft` - User left the chat
- `users` - Updated list of online users

## 🎨 UI Components

### Core Components
- **Avatar**: User profile picture with fallback initials
- **Button**: Reusable button component with variants
- **Card**: Container component for content sections
- **Input**: Form input field with validation
- **ScrollArea**: Custom scrollable container

### Layout Components
- **Join Form**: Username entry screen
- **Chat Interface**: Main chat area with message list
- **User Sidebar**: Online users list
- **Message Bubbles**: Individual message display
- **Connection Status**: Real-time connection indicator

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the Backend directory:
```env
PORT=3001
```

### Socket.IO Configuration
- **CORS**: Configured for `http://localhost:3000`
- **Transports**: WebSocket and polling fallback
- **Room**: All users join the "general" room

## 🎯 Key Features Implementation

### Real-time Messaging
- Messages are instantly delivered to all connected users
- Each message includes username, content, and timestamp
- System messages for user join/leave events

### User Management
- Unique user identification by socket ID
- Username validation and uniqueness
- Real-time user list updates

### Connection Handling
- Automatic reconnection attempts
- Visual connection status indicator
- Graceful disconnection handling

### Message Display
- Different styling for own vs others' messages
- System messages with distinct styling
- Timestamp formatting for readability
- Auto-scroll to latest messages

## 🚀 Deployment

### Backend Deployment
1. Set environment variables
2. Run `npm install --production`
3. Start with `node index.js`

### Frontend Deployment
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Deploy to Vercel, Netlify, or your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using Next.js, Socket.IO, and Express.js** 
