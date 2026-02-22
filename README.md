# Dryer Machine Reporter

A modern, mobile-first React application for reporting and tracking the status of dryer machines in real-time. Built with TypeScript, Supabase, and Vercel.

## 🎯 Features

- **📊 Dashboard**: Real-time status overview of all 4 dryer machines
- **📝 Detailed Reporting**: Comprehensive report form with optional fields for load information
- **📈 Statistics**: Track broken machine percentages for today and the last 7 days
- **🎨 Smart Coloring**: Automatic color coding based on machine reliability:
  - 🟢 Green: 0% broken
  - 🟡 Yellow: 1-25% broken
  - 🟠 Orange: 26-75% broken
  - 🔴 Red: 76-100% broken
- **📱 Mobile-First Design**: Fully responsive UI optimized for mobile devices
- **⚡ Real-Time Updates**: Dashboard refreshes every 30 seconds
- **🔍 Report History**: View complete history of all reports per machine

## 🚀 Quick Start

### 1. Clone/Create the Project

```bash
cd c:\Users\fannk\Programming\Laundry
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Set Up Supabase Database

See [SETUP.md](SETUP.md) for detailed instructions on creating your Supabase project and running migrations.

### 5. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup guide for local development, testing, and Vercel deployment
- **[TESTING.md](TESTING.md)** - Comprehensive testing guide with 18+ test scenarios
- **[API Documentation](#api-functions)** - Available API functions and database schema

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MachinePanel.tsx
│   ├── ReportCard.tsx
│   └── ReportForm.tsx
├── pages/              # Page components (routes)
│   ├── Dashboard.tsx
│   ├── MachineDetails.tsx
│   └── ReportingPage.tsx
├── lib/                # Utility functions
│   ├── supabase.ts    # Supabase client
│   └── api.ts         # API calls
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main app router
└── main.tsx            # Entry point
```

## 🔌 API Functions

### `submitReport(data: FormData): Promise<Report>`
Submit a new report to the database.

### `getReportsForMachine(machineId: number): Promise<Report[]>`
Fetch all reports for a specific machine.

### `getMachineStats(machineId: number): Promise<MachineStats>`
Get statistics for a specific machine.

### `getAllMachinesStats(): Promise<MachineStats[]>`
Get statistics for all 4 machines.

## 📊 Data Model

### Report
```typescript
interface Report {
  id: string;                    // UUID
  machine_id: number;            // 1-4
  created_at: string;            // ISO timestamp
  is_broken: boolean;            // Machine status
  temperature_setting: string;   // delicates, no, low, med, high
  reran_count: number;           // Times machine was reran
  load_weight_kg?: number;       // Optional: kg
  load_type?: string;            // Optional: clothes, blankets, towels, mixed
  comments?: string;             // Optional: user notes
}
```

### MachineStats
```typescript
interface MachineStats {
  machine_id: number;
  total_reports: number;
  broken_reports: number;
  broken_today: number;
  total_today: number;
  broken_last_7_days: number;
  total_last_7_days: number;
  latest_report?: Report;
}
```

## 🛣️ Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Dashboard | View all machines status |
| `/machine/:machineId` | MachineDetails | View reports for specific machine |
| `/report` | ReportingPage | Submit new report (select machine) |
| `/report/:machineId` | ReportingPage | Submit report for specific machine |

## 🎨 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| React Router v6 | Client-side routing |
| Vite | Build tool & dev server |
| Supabase | Backend & PostgreSQL DB |
| CSS Modules | Scoped styling |
| date-fns | Date utilities |
| Vercel | Hosting & deployment |

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## 🚀 Deployment

The app is optimized for Vercel deployment. See [SETUP.md](SETUP.md#step-5-deploy-to-vercel) for complete deployment instructions.

**Key benefits of Vercel:**
- Automatic deployments from Git
- Built-in performance optimizations
- Edge functions support
- Serverless functions ready
- Free tier available

## 🧪 Testing

Comprehensive test scenarios available in [TESTING.md](TESTING.md). Includes:
- Dashboard functionality
- Report submission
- Mobile responsiveness
- Data persistence
- Navigation
- Edge cases

Run tests locally:
```bash
npm run dev
# Then manually test using scenarios in TESTING.md
```

## 🔒 Security

- Supabase Row-Level Security (RLS) enabled
- Anonymous insert/read policies configured
- Environment variables for sensitive data
- TypeScript for type safety
- Input validation on forms

## 🎯 Future Enhancements

Potential features:
- [ ] User authentication
- [ ] Search and filtering
- [ ] Data export (CSV)
- [ ] Advanced analytics
- [ ] Maintenance scheduling
- [ ] Push notifications
- [ ] Image uploads
- [ ] Dark mode
- [ ] Multiple locations/buildings

## 🐛 Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**
- Ensure `.env.local` exists in project root
- Verify credentials match exactly from Supabase

**Reports not appearing**
- Check Supabase table was created (SETUP.md Step 1.4)
- Verify RLS policies are enabled

**Build errors**
- Run `npm run type-check` to see TypeScript errors
- Clear `node_modules` and reinstall: `npm install`

See [SETUP.md](SETUP.md#troubleshooting) for more troubleshooting.

## 📄 License

This project is created as a demo/prototype. Feel free to use and modify as needed.

## 📞 Support

For setup help, see:
- [SETUP.md](SETUP.md) - Detailed setup and deployment guide
- [TESTING.md](TESTING.md) - Complete testing guide

For code examples and API documentation, see source files with TypeScript JSDoc comments.

---

**Built with ❤️ using React, TypeScript, and Supabase**
