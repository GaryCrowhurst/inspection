# Post-Race Inspection Checklist App

A web-based application that allows motorsport students to complete structured post-race vehicle inspections with photo documentation, automatic saving, and formatted report generation.


## Features

- **Comprehensive Motorsport Inspection Checklist**
  - 12 detailed inspection categories
  - 60+ specific checkpoints with technical guidance
  - Based on motorsport scrutineering standards

- **Photo Documentation**
  - Take photos directly with device camera
  - Upload existing images
  - Multiple photos per checkpoint

- **Auto-Save Functionality**
  - Work automatically saved to local storage
  - Resume inspections later without data loss
  - No internet connection required after initial load

- **Professional Report Generation**
  - Download a formatted HTML report
  - All photos embedded in the report
  - Signature areas for certification
  - Complete documentation of findings

- **User-Friendly Interface**
  - Responsive design works on any device
  - Progress tracking
  - Clear visual completion indicators

## Installation

### Option 1: GitHub Pages Deployment

1. **Fork or clone this repository**

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll down to the GitHub Pages section
   - Select your main branch as the source
   - Click Save

3. **Your app will be available at**:
   `https://[your-username].github.io/[repository-name]/`

### Option 2: Local or Custom Web Server

1. **Clone the repository**
   ```
   git clone https://github.com/your-username/post-race-inspection-app.git
   cd post-race-inspection-app
   ```

2. **Set up the files**
   - Ensure you have the following files:
     - `index.html`
     - `app.js`

3. **Serve the files**
   - You can use any web server to serve these files
   - For a simple local test, you can use Python's built-in server:
     ```
     python -m http.server 8000
     ```
   - Or use a simple Node.js server like `serve`:
     ```
     npx serve
     ```

## Usage Guide

### For Instructors

1. **Customize the checklist** (optional)
   - Edit the `defaultChecklist` array in `app.js` to match your specific inspection requirements
   - Add, remove, or modify inspection categories and checkpoints as needed

2. **Share the app URL with your students**
   - The app requires no logins or accounts
   - All data is stored locally on the student's device

3. **Review completed reports**
   - Students will download and submit HTML reports
   - Reports include all photos, notes, and checklist items
   - Print reports for official documentation if needed

### For Students

1. **Open the app on your device**
   - Works on smartphones, tablets, and computers
   - Chrome, Firefox, Safari, and Edge are all supported

2. **Fill in your information**
   - Complete all student and vehicle information fields
   - This information will appear on your final report

3. **Complete the inspection checklist**
   - Work through each category systematically
   - Check off items as you inspect them
   - Add detailed notes for any issues found
   - Take photos directly or upload images as evidence

4. **Save your work**
   - The app automatically saves your progress
   - You can close the browser and return later to continue

5. **Generate and submit your report**
   - When finished, click "Download Report"
   - Submit the HTML file to your instructor as required
   - The report contains all your inspection data, notes, and photos

## Technical Details

- **Technologies Used**
  - React for the user interface
  - Tailwind CSS for styling
  - Local Storage API for data persistence
  - MediaDevices API for camera access
  - File API for image handling

- **Browser Requirements**
  - Modern browsers (Chrome, Firefox, Safari, Edge)
  - JavaScript enabled
  - Camera and local storage permissions

- **Data Privacy**
  - All data remains on the user's device
  - No server-side processing or storage
  - No external API calls except for CSS/JS libraries

## Customization

### Modifying Inspection Categories

The inspection checklist can be easily customized by modifying the `defaultChecklist` array in `app.js`. Each section has the following structure:

```javascript
{
  id: 1, 
  title: 'Category Name',
  tasks: [
    { 
      id: 'task1-1', 
      text: 'Inspection item description (details to check)',
      completed: false, 
      notes: '', 
      photos: [] 
    },
    // More tasks...
  ]
}
```

### Styling Changes

The app uses Tailwind CSS classes for styling. You can modify the appearance by:

1. Editing the class names in the JSX
2. Creating a custom CSS file and linking it in `index.html`
3. Using a different version of Tailwind or another CSS framework

## License

[MIT License](LICENSE)

## Credits

Developed by Gary Crowhurst

---

For any questions or support, please open an issue in the GitHub repository.