const fs = require('fs');
const path = require('path');

const files = [
  'src/components/home/Hero.tsx',
  'src/components/home/Features.tsx',
  'src/components/home/HowItWorks.tsx',
  'src/components/home/FaqAndCTA.tsx',
  'src/pages/DashboardPage.tsx',
  'src/pages/ChatPage.tsx',
  'src/pages/MockInterviewPage.tsx',
  'src/pages/OnboardingPage.tsx',
  'src/components/DashboardLayout.tsx',
  'src/components/Navbar.tsx',
  'src/components/Sidebar.tsx'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    content = content
      .replace(/#FAF6F1/g, '#FFFFFF')
      .replace(/#1E4D4D/g, '#2A6666')
      .replace(/#FED583/g, '#FEF0AF')
      .replace(/#163D3D/g, '#3A706A')
      .replace(/#F0E4D4/g, '#F8F9FA')
      .replace(/#E8F0EE/g, '#F1F3F5')
      .replace(/#E5DDD4/g, '#E9ECEF')
      .replace(/#E8DDD4/g, '#E9ECEF')
      .replace(/#EEE6DC/g, '#E9ECEF')
      .replace(/#F0EAE3/g, '#F1F3F5')
      .replace(/#F5EFE8/g, '#FFFFFF')
      // To prevent #FFFFFF from replacing text-white where it was bg-[#FAF6F1], the above is fine since we just target the hex code
      .replace(/bg-\[#FFFFFF\]/g, 'bg-white'); // Clean up tailwind classes
      
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`Skipped ${file} (not found)`);
  }
});
