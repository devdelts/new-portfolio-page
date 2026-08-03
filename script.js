const themeToggleBtn = document.getElementById('theme-toggle');

// Check for saved theme preference, or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateButtonUI(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateButtonUI(newTheme);
});

function updateButtonUI(theme) {
  if (theme === 'light') {
    themeToggleBtn.innerHTML = '☀️ <span>Light</span>';
  } else {
    themeToggleBtn.innerHTML = '🌙 <span>Dark</span>';
  }
}

// File switching logic
const fileItems = document.querySelectorAll('.file-item');
const views = document.querySelectorAll('.view-content');
const tabTitle = document.getElementById('tab-title');
const terminalFilename = document.getElementById('terminal-filename');

const fileNames = {
  about: '<> about.html',
  projects: '{} projects.json',
  skills: '# skills.css',
  contact: 'JS contact.js'
};

const fileTerminalNames = {
  about: 'about.html',
  projects: 'projects.json',
  skills: 'skills.css',
  contact: 'contact.js'
};

fileItems.forEach(item => {
  item.addEventListener('click', () => {
    const selectedFile = item.getAttribute('data-file');

    // Update active state in sidebar
    fileItems.forEach(file => file.classList.remove('active'));
    item.classList.add('active');

    // Update active tab & terminal footer names
    if (tabTitle) tabTitle.textContent = fileNames[selectedFile];
    if (terminalFilename) terminalFilename.textContent = fileTerminalNames[selectedFile];

    // Show selected view, hide others
    views.forEach(view => {
      if (view.id === `view-${selectedFile}`) {
        view.classList.remove('hidden');
      } else {
        view.classList.add('hidden');
      }
    });
  });
});

// ==========================================
// INTERACTIVE TERMINAL LOGIC
// ==========================================
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

if (terminalInput && terminalOutput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim().toLowerCase();
      if (inputVal === '') return;

      // Echo user command in terminal
      printTerminalLine(`visitor@jc-portfolio:~$ ${inputVal}`);

      // Process input
      handleTerminalCommand(inputVal);

      // Reset input & scroll to bottom
      terminalInput.value = '';
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}

function printTerminalLine(text, className = '') {
  const line = document.createElement('div');
  line.className = `terminal-line ${className}`;
  line.innerHTML = text;
  terminalOutput.appendChild(line);
}

function handleTerminalCommand(cmd) {
  switch (cmd) {
    case 'help':
      printTerminalLine('Available commands:');
      printTerminalLine(' &nbsp;&nbsp;<span class="code-keyword">about</span> - Open about page');
      printTerminalLine(' &nbsp;&nbsp;<span class="code-keyword">projects</span> - View project portfolio');
      printTerminalLine(' &nbsp;&nbsp;<span class="code-keyword">skills</span> - View tech stack');
      printTerminalLine(' &nbsp;&nbsp;<span class="code-keyword">contact</span> - Get in touch');
      printTerminalLine(' &nbsp;&nbsp;<span class="code-keyword">clear</span> - Clear terminal logs');
      break;

    case 'about':
    case 'about.html':
      triggerFileClick('about');
      printTerminalLine('Navigated to about.html', 'success');
      break;

    case 'projects':
    case 'projects.json':
      triggerFileClick('projects');
      printTerminalLine('Navigated to projects.json', 'success');
      break;

    case 'skills':
    case 'skills.css':
      triggerFileClick('skills');
      printTerminalLine('Navigated to skills.css', 'success');
      break;

    case 'contact':
    case 'contact.js':
      triggerFileClick('contact');
      printTerminalLine('Navigated to contact.js', 'success');
      break;

    case 'clear':
      terminalOutput.innerHTML = '';
      break;

    default:
      printTerminalLine(`Command not found: '${cmd}'. Type <span class="code-keyword">'help'</span> for list of commands.`, 'error');
      break;
  }
}

// Helper function to programmatically trigger a file selection
function triggerFileClick(fileKey) {
  const targetFile = document.querySelector(`.file-item[data-file="${fileKey}"]`);
  if (targetFile) {
    targetFile.click();
  }
}