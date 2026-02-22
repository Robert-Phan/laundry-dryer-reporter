# Dryer Machine Reporter App

A React + TypeScript application for reporting the status of dryer machines in real-time. The app is designed to be mobile-first and is deployed on Vercel with Supabase as the backend.

## Features

- **Dashboard**: View the status of all 4 dryer machines at a glance
- **Machine Details**: See the history of reports for a specific machine
- **Reporting Form**: Submit new reports with detailed information about the machine's condition
- **Status Indicators**: Color-coded panels based on recent broken report percentage
- **Real-time Stats**: Track broken percentage for today and the last 7 days

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: CSS Modules for styling
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL database)
- **Deployment**: Vercel
- **Build Tool**: Vite

## Project Structure

```
.
├── src/
│   ├── components/           # Reusable React components
│   │   ├── MachinePanel.tsx
│   │   ├── ReportCard.tsx
│   │   └── ReportForm.tsx
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx
│   │   ├── MachineDetails.tsx
│   │   └── ReportingPage.tsx
│   ├── lib/                 # Utility functions
│   │   ├── supabase.ts     # Supabase client setup
│   │   └── api.ts          # API functions
│   ├── types.ts            # TypeScript interfaces
│   ├── App.tsx             # Main app component
│   ├── App.css             # Global styles
│   └── main.tsx            # React entry point
├── index.html              # HTML entry point
├── supabase/
│   └── migrations/         # Database migrations
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

## Setup Instructions

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- A Supabase account (free tier available at https://supabase.com)
- A Vercel account (free tier available at https://vercel.com)

### Step 1: Set Up Supabase

1. **Create a Supabase Project**:
   - Go to https://supabase.com and sign up/log in
   - Click "New Project"
   - Choose a project name (e.g., "laundry-dryer-reporter")
   - Set a strong password
   - Choose a region closest to your location
   - Click "Create new project"

2. **Wait for Project Initialization** (takes ~2 minutes)

3. **Get Your Credentials**:
   - Click on "Project Settings" (gear icon at bottom left)
   - Go to "API" tab
   - Copy your "Project URL" (this is `VITE_SUPABASE_URL`)
   - Copy your "anon" key (this is `VITE_SUPABASE_ANON_KEY`)

4. **Create the Database Schema**:
   - In Supabase, go to the "SQL Editor" tab
   - Click "New Query"
   - Copy the contents of `supabase/migrations/001_create_reports_table.sql`
   - Paste it into the SQL editor
   - Click "Run"

5. **Verify Table Creation**:
   - Go to the "Table Editor" tab
   - You should see a "reports" table listed

### Step 2: Set Up Local Development

1. **Clone or Create the Project**:
   ```bash
   cd c:\Users\fannk\Programming\Laundry
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create Environment Variables**:
   - Copy `.env.example` to `.env.local`
   - Update it with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=https://your-project-ref.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - The app will open at http://localhost:3000
   - The dev server supports hot module reloading

### Step 3: Test Locally

The app should automatically open in your browser. Test the following workflows:

1. **Dashboard**:
   - You should see 4 machine panels
   - Each panel should initially show "No reports"

2. **Submit a Report**:
   - Click "+ New Report" button or click on any machine panel
   - Fill out the form:
     - Select a machine (1-4)
     - Choose if the machine is broken
     - Select temperature setting
     - Enter number of times reran
     - (Optional) Enter load weight and type
     - (Optional) Add comments
   - Click "Submit Report"
   - You should see a success message

3. **View Machine Details**:
   - Click on a machine panel on the dashboard
   - You should see the report you just submitted
   - Reports should be sorted by most recent first
   - Stats should update to show the recent report counts

4. **Test Multiple Reports**:
   - Submit several reports for the same machine
   - Add some broken reports and some working reports
   - Watch the color of the machine panel change based on broken percentage:
     - Green (0% broken)
     - Yellow (1-25% broken)
     - Orange (26-75% broken)
     - Red (76-100% broken)

5. **Mobile Responsiveness**:
   - Open DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test on mobile dimensions (375x667)
   - All components should be responsive and readable

### Step 4: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 5: Deploy to Vercel

1. **Push to GitHub** (Vercel works best with GitHub):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/laundry-dryer-reporter
   git push -u origin main
   ```

2. **Connect Vercel**:
   - Go to https://vercel.com
   - Click "New Project"
   - Select "Import Git Repository"
   - Select your GitHub repository
   - Leave default settings as-is
   - Click "Deploy"

3. **Add Environment Variables in Vercel**:
   - In the Vercel dashboard, go to your project
   - Click "Settings"
   - Go to "Environment Variables"
   - Add:
     - `VITE_SUPABASE_URL`: Your Supabase URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
   - Click "Save"

4. **Redeploy**:
   - Go to "Deployments"
   - Click the three dots on the latest deployment
   - Click "Redeploy"

5. **Access Your App**:
   - Your deployed app will be available at a URL like `https://laundry-dryer-reporter.vercel.app`
   - Share this URL to use the app!

## Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview

# Type check
npm run type-check

# Run linter
npm run lint
```

## Application Routes

- `/` - Dashboard with all machine status
- `/machine/:machineId` - Details page for a specific machine
- `/report` - Report form (select machine)
- `/report/:machineId` - Pre-filled report form for specific machine

## Data Structure

### Reports Table

Each report in the database contains:
- `id` (UUID): Unique identifier
- `machine_id` (1-4): Which machine this report is about
- `created_at`: When the report was submitted
- `is_broken`: Boolean indicating if machine was broken
- `temperature_setting`: Setting used (delicates, no, low, med, high)
- `reran_count`: How many times the machine was reran
- `load_weight_kg` (optional): Weight of laundry in kg
- `load_type` (optional): Type of load (clothes, blankets, towels, mixed)
- `comments` (optional): User notes

## Load Types Reference

The app supports different load types to help diagnose issues:
- **Clothes**: Regular mixed clothing loads
- **Blankets**: Larger items requiring more drying time
- **Towels**: Terry cloth items that absorb water
- **Mixed**: Combination of different types

## Color Coding System

Machine panels use color to indicate recent reliability:
- 🟢 **Green**: 0% broken (all working)
- 🟡 **Yellow**: 1-25% broken
- 🟠 **Orange**: 26-75% broken
- 🔴 **Red**: 76-100% broken

## Troubleshooting

### "Missing Supabase environment variables" error
- Check that `.env.local` exists in the project root
- Verify the environment variables match exactly

### Reports not appearing
- Check that the Supabase table was created successfully
- Go to Supabase Dashboard → Table Editor and verify the "reports" table exists
- Verify Row Level Security policies are enabled

### Build fails with TypeScript errors
- Run `npm run type-check` to see specific errors
- Ensure all imports are correct

### Vercel deployment fails
- Check that environment variables are set in Vercel settings
- Go to Vercel Dashboard → Deployments and click "View Logs" for detailed errors

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

Potential features to add:
- Search and filter reports
- Export data to CSV
- Machine maintenance scheduling
- User authentication
- Push notifications for broken machines
- Analytics dashboard
- Image uploads with reports
