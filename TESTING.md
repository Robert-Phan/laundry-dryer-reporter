# Testing Guide - Dryer Machine Reporter

This guide walks you through testing all features of the Dryer Machine Reporter app.

## Prerequisites

- Development environment set up (see SETUP.md)
- App running locally with `npm run dev`
- Browser open to http://localhost:3000

## Test Scenarios

### Scenario 1: Dashboard Display (No Data)

**Expected Result**: Empty dashboard with 4 machines showing "No reports"

**Steps**:
1. Start the app fresh with an empty database
2. Navigate to `/` (Dashboard)

**Verification**:
- [ ] 4 machine panels are visible
- [ ] Each panel shows "Machine 1", "Machine 2", etc.
- [ ] Each panel displays "No reports"
- [ ] Panels are displayed in a responsive grid (4 on desktop, 1 on mobile)
- [ ] "+ New Report" button is visible at bottom

---

### Scenario 2: Submit First Report

**Expected Result**: Report is saved and redirects to machine details page

**Steps**:
1. Click on "Machine 1" panel or "+ New Report" button
2. Fill in the form:
   - Machine: Machine 1
   - Is Broken: Uncheck (working condition)
   - Temperature: Medium
   - Reran Count: 0
   - Load Weight: 2.5
   - Load Type: Clothes
   - Comments: "Test report"
3. Click "Submit Report"

**Verification**:
- [ ] Success message appears: "✓ Report Submitted Successfully!"
- [ ] Page auto-redirects to `/machine/1` after 2 seconds
- [ ] Report appears on the machine details page with:
  - [ ] Timestamp showing "a few seconds ago"
  - [ ] Status showing "Working"
  - [ ] All entered fields displayed correctly
  - [ ] Temperature setting shown as "med"
  - [ ] Load weight shown as "2.5 kg"
  - [ ] Load type shown as "clothes"
  - [ ] Comments displayed in a gray box

---

### Scenario 3: Dashboard Color Update

**Expected Result**: Machine panel color changes based on broken percentage

**Steps**:
1. From dashboard, verify Machine 1 is green (0% broken)
2. Click on Machine 1 to open its details page
3. Click "+ Submit Report"
4. Submit a BROKEN report with same fields as before but check "Machine is broken"
5. Observe the dashboard

**Verification**:
- [ ] Dashboard shows color changed to yellow or orange (1-99% broken)
- [ ] Panel shows "2 / 2 reports broken" or similar
- [ ] Most recent status shows "Broken"

---

### Scenario 4: Multiple Reports View

**Expected Result**: All reports shown in chronological order

**Steps**:
1. On Machine 1 details page, scroll through all reports
2. Submit 3 more reports with different data:
   - Report 3: Broken, High temp, reran 2 times
   - Report 4: Working, Delicates, no rerun
   - Report 5: Broken, Low temp, blankets

**Verification**:
- [ ] Newest report appears at top
- [ ] Each report shows correct timestamp
- [ ] Each report shows correct status (Broken/Working)
- [ ] Temperature settings match what was entered
- [ ] Reran counts are accurate
- [ ] Load information is displayed only when provided

---

### Scenario 5: Statistics Display

**Expected Result**: Daily and weekly broken percentages calculate correctly

**Steps**:
1. Go back to Dashboard
2. View the stats for Machine 1
3. Note the "broken_reports / total_reports" count

**Verification**:
- [ ] "X / Y reports broken" shows correct totals
- [ ] "Today: Z% broken" is calculated correctly
- [ ] "Last 7 days: Z% broken" is calculated correctly
- [ ] If all working: green (0%)
- [ ] If mostly working: yellow (1-25%)
- [ ] If mixed: orange (26-75%)
- [ ] If mostly broken: red (76-100%)

---

### Scenario 6: Form Validation

**Expected Result**: Form works with optional and required fields

**Steps**:
1. Go to "/report/2"
2. Submit with only required fields:
   - Machine: 2
   - Is Broken: Leave unchecked
   - Temperature: med
   - Reran: 0
3. Skip all optional fields (weight, type, comments)

**Verification**:
- [ ] Form submits successfully with no warnings
- [ ] Report created and displays in Machine 2 details
- [ ] Optional field areas don't appear (no "null" text)

---

### Scenario 7: Different Load Types

**Expected Result**: All load types save and display correctly

**Steps**:
1. Submit reports with different load types:
   - Report A: load_type = clothes
   - Report B: load_type = blankets
   - Report C: load_type = towels
   - Report D: load_type = mixed
2. View each report

**Verification**:
- [ ] Each load type displays correctly in report card
- [ ] Load type is optional (can leave blank)
- [ ] Dropdown shows all 4 options plus "Not specified"

---

### Scenario 8: Temperature Settings

**Expected Result**: All temperature settings save and display correctly

**Steps**:
1. Submit reports with each temperature:
   - delicates
   - no (no heat)
   - low
   - med
   - high

**Verification**:
- [ ] Each setting saves and displays correctly
- [ ] All 5 options available in dropdown
- [ ] Settings display properly in report cards

---

### Scenario 9: Reran Count Edge Cases

**Expected Result**: Reran count handles various inputs

**Steps**:
1. Submit reports with reran counts:
   - 0 (default)
   - 1 (single rerun)
   - 5 (multiple reruns)

**Verification**:
- [ ] A reran count of 1 shows "1 time"
- [ ] A reran count of 2+ shows "X times" (plural)
- [ ] Display shows "Reran Machine: 0 times" for zero

---

### Scenario 10: Navigation

**Expected Result**: All navigation routes work correctly

**Steps**:
1. From Dashboard, click Machine 1 panel → should go to `/machine/1`
2. Click "+ New Report" → should go to `/report`
3. Submit report → should go to `/report/:machineId`
4. Click "+ Submit Report" → should go to `/report/1` (if on machine 1)
5. Click "Back to Dashboard" → should return to `/`
6. Click existing machine panel twice → should update details page

**Verification**:
- [ ] All navigation works
- [ ] Machine ID pre-fills when navigating via machine panel
- [ ] Back buttons work
- [ ] No console errors
- [ ] URL changes match expected routes

---

### Scenario 11: Mobile Responsiveness

**Expected Result**: App works well on mobile devices

**Steps**:
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Test at 375x667 (iPhone SE)
4. Test at 414x896 (iPhone 11)
5. Test at 540x720 (Android)

**Verification**:
- [ ] Dashboard shows 1 machine per row
- [ ] Machine panels are full width
- [ ] Form inputs are large enough to tap
- [ ] Back button and form buttons are accessible
- [ ] Text is readable (no overflow)
- [ ] Report cards stack properly
- [ ] No horizontal scrolling on main content

---

### Scenario 12: Data Persistence

**Expected Result**: Data persists across page refreshes

**Steps**:
1. Submit a report on Machine 3
2. Refresh the page (F5 or Ctrl+R)
3. Navigate back to Machine 3

**Verification**:
- [ ] Report is still visible
- [ ] Data is not lost
- [ ] Dashboard stats reflect the report
- [ ] Multiple refreshes don't affect data

---

### Scenario 13: Comments with Special Characters

**Expected Result**: Comments save with special characters

**Steps**:
1. Submit a report with comments containing:
   - Quotes: "This is a test"
   - Special chars: !@#$%^&*()\
   - Emoji: 🔥 ❌ ✓
   - Line breaks (multiline)

**Verification**:
- [ ] All characters save correctly
- [ ] Comments display properly without breaking UI
- [ ] Line breaks are preserved in display

---

### Scenario 14: All Machines Have Different Data

**Expected Result**: Each machine tracks independent data

**Steps**:
1. Submit different reports to each machine (1, 2, 3, 4)
2. Machine 1: 2 working, 0 broken
3. Machine 2: 1 working, 1 broken
4. Machine 3: 0 working, 3 broken
5. Machine 4: 5 working, 0 broken
6. View dashboard and each machine's details

**Verification**:
- [ ] Each machine shows different colors (1=green, 2=yellow, 3=red, 4=green)
- [ ] Each machine has its own report list
- [ ] Statistics are independent per machine
- [ ] No data leaks between machines

---

### Scenario 15: Long Comments

**Expected Result**: Long comments display correctly without breaking layout

**Steps**:
1. Submit a report with a very long comment (500+ characters)

**Verification**:
- [ ] Comment text wraps properly
- [ ] Comment box doesn't overflow page width
- [ ] All text is readable

---

### Scenario 16: Empty Dashboard to Populated

**Expected Result**: Dashboard updates smoothly as reports are added

**Steps**:
1. Start with empty database (all machines showing "No reports")
2. Submit reports to each machine one by one
3. Observe dashboard updates

**Verification**:
- [ ] Each machine changes from "No reports" to show stats
- [ ] Colors update appropriately
- [ ] No loading states that hang

---

### Scenario 17: Form Disable State During Submit

**Expected Result**: Form button disables while submitting

**Steps**:
1. On report form, submit a report
2. Quickly click submit button multiple times during submission

**Verification**:
- [ ] Submit button disables (text shows "Submitting...")
- [ ] Only one report is created
- [ ] Button re-enables after success/error

---

### Scenario 18: Error Handling (Network)

**Expected Result**: App handles errors gracefully

**Steps**:
1. Disable network in DevTools (offline mode)
2. Try to submit a form
3. Re-enable network

**Note**: App will fail gracefully; in production, implement error toast notifications.

---

## Performance Testing

### Load Testing

Load the app and check:
- [ ] Dashboard loads in < 2 seconds
- [ ] No console errors
- [ ] Smooth animations on hover
- [ ] No lag when typing in form
- [ ] Responsive to user input immediately

### Storage Testing

Submit 100+ reports and check:
- [ ] Dashboard still loads quickly
- [ ] Machine details page handles large data
- [ ] No performance degradation

---

## Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Testing Checklist Summary

- [ ] Empty dashboard displays correctly
- [ ] Reports can be submitted
- [ ] Reports display with all fields
- [ ] Optional fields work
- [ ] Statistics calculate correctly
- [ ] Colors change based on broken percentage
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Data persists across refreshes
- [ ] Multiple machines independent
- [ ] All temperature settings work
- [ ] All load types work
- [ ] All machines work (1-4)
- [ ] Comments with special characters work
- [ ] Long content doesn't break layout
- [ ] Form validation works
- [ ] Back buttons work
- [ ] Submit button disables while loading

---

## After Testing

If all tests pass, the app is ready for:
1. Deployment to Vercel
2. Production use
3. Additional feature development

If issues are found, see SETUP.md Troubleshooting section.
