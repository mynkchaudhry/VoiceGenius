document.addEventListener('DOMContentLoaded', function() {
  // API Configuration
  const API_BASE_URL = 'https://voicegeniusai.onrender.com'; // Change this to your actual API URL
  
  // DOM Elements
  const dashboardSection = document.getElementById('dashboard-section');
  const createPersonaSection = document.getElementById('create-persona-section');
  const myPersonasSection = document.getElementById('my-personas-section');
  const analyticsSection = document.getElementById('analytics-section');
  const settingsSection = document.getElementById('settings-section');
  
  const dashboardLink = document.getElementById('dashboard-link');
  const createPersonaLink = document.getElementById('create-persona-link');
  const myPersonasLink = document.getElementById('my-personas-link');
  const analyticsLink = document.getElementById('analytics-link');
  const settingsLink = document.getElementById('settings-link');
  
  const pageTitle = document.getElementById('page-title');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  const fileDropArea = document.getElementById('file-drop-area');
  const fileInput = document.getElementById('file-input');
  const browseButton = document.getElementById('browse-button');
  const selectedFileDisplay = document.getElementById('selected-file');
  const fileNameDisplay = document.getElementById('file-name');
  const removeFileButton = document.getElementById('remove-file');
  const uploadForm = document.getElementById('upload-form');
  const generateButton = document.getElementById('generate-button');
  
  const generationResult = document.getElementById('generation-result');
  const resultTrainId = document.getElementById('result-train-id');
  const generatedPrompt = document.getElementById('generated-prompt');
  const customizeForm = document.getElementById('customize-form');
  const customizeTrainId = document.getElementById('customize-train-id');
  
  const totalPersonasElement = document.getElementById('total-personas');
  const monthlyGenerationsElement = document.getElementById('monthly-generations');
  const recentPersonasList = document.getElementById('recent-personas-list');
  
  const personasTableBody = document.getElementById('personas-table-body');
  const paginationStart = document.getElementById('pagination-start');
  const paginationEnd = document.getElementById('pagination-end');
  const paginationTotal = document.getElementById('pagination-total');
  const paginationNumbers = document.getElementById('pagination-numbers');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  const mobilePrevPageButton = document.getElementById('mobile-prev-page');
  const mobileNextPageButton = document.getElementById('mobile-next-page');
  const refreshPersonasButton = document.getElementById('refresh-personas');
  
  const viewPersonaModal = document.getElementById('view-persona-modal');
  const modalPersonaId = document.getElementById('modal-persona-id');
  const modalPersonaName = document.getElementById('modal-persona-name');
  const modalPersonaRole = document.getElementById('modal-persona-role');
  const modalPersonaGender = document.getElementById('modal-persona-gender');
  const modalPersonaLanguage = document.getElementById('modal-persona-language');
  const modalPersonaDate = document.getElementById('modal-persona-date');
  const modalPersonaFile = document.getElementById('modal-persona-file');
  const modalPersonaPrompt = document.getElementById('modal-persona-prompt');
  const modalCloseButton = document.getElementById('modal-close-button');
  
  const notificationToast = document.getElementById('notification-toast');
  const notificationIcon = document.getElementById('notification-icon');
  const notificationTitle = document.getElementById('notification-title');
  const notificationMessage = document.getElementById('notification-message');
  const closeNotificationButton = document.getElementById('close-notification');
  
  const loadingSpinner = document.getElementById('loading-spinner');
  const loadingText = document.getElementById('loading-text');
  
  // State Management
  let currentSection = 'dashboard';
  let currentPage = 1;
  let itemsPerPage = 10;
  let totalPersonas = 0;
  let selectedFile = null;
  
  // Initialize Dashboard
  initializeDashboard();
  
  // Navigation Functions
  function showSection(sectionId) {
      // Hide all sections
      dashboardSection.classList.add('hidden');
      createPersonaSection.classList.add('hidden');
      myPersonasSection.classList.add('hidden');
      analyticsSection.classList.add('hidden');
      settingsSection.classList.add('hidden');
      
      // Reset active state on nav links
      dashboardLink.classList.remove('active');
      createPersonaLink.classList.remove('active');
      myPersonasLink.classList.remove('active');
      analyticsLink.classList.remove('active');
      settingsLink.classList.remove('active');
      
      mobileLinks.forEach(link => link.classList.remove('active', 'bg-blue-600', 'text-white'));
      
      // Show selected section and set active nav link
      switch(sectionId) {
          case 'dashboard':
              dashboardSection.classList.remove('hidden');
              dashboardLink.classList.add('active');
              pageTitle.textContent = 'Dashboard';
              document.querySelector('[data-target="dashboard-section"]').classList.add('active', 'bg-blue-600', 'text-white');
              refreshDashboard();
              break;
          case 'create-persona':
              createPersonaSection.classList.remove('hidden');
              createPersonaLink.classList.add('active');
              pageTitle.textContent = 'Create Persona';
              document.querySelector('[data-target="create-persona-section"]').classList.add('active', 'bg-blue-600', 'text-white');
              break;
          case 'my-personas':
              myPersonasSection.classList.remove('hidden');
              myPersonasLink.classList.add('active');
              pageTitle.textContent = 'My Personas';
              document.querySelector('[data-target="my-personas-section"]').classList.add('active', 'bg-blue-600', 'text-white');
              loadPersonas();
              break;
          case 'analytics':
              analyticsSection.classList.remove('hidden');
              analyticsLink.classList.add('active');
              pageTitle.textContent = 'Analytics';
              document.querySelector('[data-target="analytics-section"]').classList.add('active', 'bg-blue-600', 'text-white');
              initializeAnalytics();
              break;
          case 'settings':
              settingsSection.classList.remove('hidden');
              settingsLink.classList.add('active');
              pageTitle.textContent = 'Settings';
              document.querySelector('[data-target="settings-section"]').classList.add('active', 'bg-blue-600', 'text-white');
              break;
      }
      
      currentSection = sectionId;
      
      // Close mobile menu after navigation
      mobileMenu.classList.add('hidden');
  }
  
  // Navigation Event Listeners
  dashboardLink.addEventListener('click', function(e) {
      e.preventDefault();
      showSection('dashboard');
  });
  
  createPersonaLink.addEventListener('click', function(e) {
      e.preventDefault();
      showSection('create-persona');
  });
  
  myPersonasLink.addEventListener('click', function(e) {
      e.preventDefault();
      showSection('my-personas');
  });
  
  analyticsLink.addEventListener('click', function(e) {
      e.preventDefault();
      showSection('analytics');
  });
  
  settingsLink.addEventListener('click', function(e) {
      e.preventDefault();
      showSection('settings');
  });
  
  // Mobile menu toggle
  mobileMenuButton.addEventListener('click', function() {
      if (mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.remove('hidden');
      } else {
          mobileMenu.classList.add('hidden');
      }
  });
  
  // Mobile navigation links
  mobileLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetSection = this.getAttribute('data-target').replace('-section', '');
          showSection(targetSection);
      });
  });
  
  // "View all personas" links
  document.querySelectorAll('.view-all-personas').forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          showSection('my-personas');
      });
  });
  
  // File Input Handling
  browseButton.addEventListener('click', function() {
      fileInput.click();
  });
  
  fileInput.addEventListener('change', function() {
      handleFileSelection(this.files);
  });
  
  fileDropArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      fileDropArea.classList.add('drag-over');
  });
  
  fileDropArea.addEventListener('dragleave', function() {
      fileDropArea.classList.remove('drag-over');
  });
  
  fileDropArea.addEventListener('drop', function(e) {
      e.preventDefault();
      fileDropArea.classList.remove('drag-over');
      handleFileSelection(e.dataTransfer.files);
  });
  
  removeFileButton.addEventListener('click', function() {
      resetFileInput();
  });
  
  function handleFileSelection(files) {
      if (files.length > 0) {
          selectedFile = files[0];
          fileNameDisplay.textContent = selectedFile.name;
          selectedFileDisplay.classList.remove('hidden');
          fileDropArea.classList.remove('animation-pulse');
          
          // Reset generation result if a new file is selected
          generationResult.classList.add('hidden');
      }
  }
  
  function resetFileInput() {
      fileInput.value = '';
      selectedFile = null;
      selectedFileDisplay.classList.add('hidden');
      fileDropArea.classList.add('animation-pulse');
      generationResult.classList.add('hidden');
  }
  
  // Form Submissions
  uploadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!selectedFile) {
          showNotification('error', 'File Required', 'Please select a file to generate a persona.');
          return;
      }
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      showLoading('Generating persona...');
      
      fetch(`${API_BASE_URL}/generate-persona`, {
          method: 'POST',
          body: formData,
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          hideLoading();
          
          // Display the generated persona
          resultTrainId.textContent = data.train_id;
          generatedPrompt.textContent = data.prompt;
          customizeTrainId.value = data.train_id;
          generationResult.classList.remove('hidden');
          
          showNotification('success', 'Success!', 'Persona generated successfully.');
          
          // Update dashboard counts
          refreshDashboard();
      })
      .catch(error => {
          hideLoading();
          console.error('Error generating persona:', error);
          showNotification('error', 'Generation Failed', 'There was an error generating the persona. Please try again.');
      });
  });
  
  customizeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
          train_id: parseInt(customizeTrainId.value),
          name: document.getElementById('name').value,
          role: document.getElementById('role').value,
          gender: document.getElementById('gender').value,
          language: document.getElementById('language').value
      };
      
      showLoading('Customizing persona...');
      
      fetch(`${API_BASE_URL}/customize-persona`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          hideLoading();
          
          // Update the displayed prompt
          generatedPrompt.textContent = data.prompt;
          
          showNotification('success', 'Success!', 'Persona customized successfully.');
      })
      .catch(error => {
          hideLoading();
          console.error('Error customizing persona:', error);
          showNotification('error', 'Customization Failed', 'There was an error customizing the persona. Please try again.');
      });
  });
  
  // Dashboard Functions
  function initializeDashboard() {
      showSection('dashboard');
      refreshDashboard();
      initializeUsageChart();
  }
  
  function refreshDashboard() {
      // Load total personas count
      fetch(`${API_BASE_URL}/personas?limit=1`)
      .then(response => response.json())
      .then(data => {
          totalPersonas = data.total;
          totalPersonasElement.textContent = totalPersonas;
          
          // For demo, let's set monthly generations to be 25% of total
          const monthlyCount = Math.min(Math.floor(totalPersonas * 0.25), 100);
          monthlyGenerationsElement.textContent = monthlyCount;
      })
      .catch(error => {
          console.error('Error loading dashboard data:', error);
          totalPersonasElement.textContent = '0';
          monthlyGenerationsElement.textContent = '0';
      });
      
      // Load recent personas (latest 5)
      fetch(`${API_BASE_URL}/personas?limit=5`)
      .then(response => response.json())
      .then(data => {
          if (data.personas.length === 0) {
              recentPersonasList.innerHTML = `
                  <li class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-center">
                          <p class="text-gray-500">No personas created yet</p>
                      </div>
                  </li>
              `;
              return;
          }
          
          let personasHtml = '';
          data.personas.forEach(persona => {
              const createdAt = new Date(persona.created_at).toLocaleDateString();
              const hasCustomization = persona.customization !== undefined;
              const name = hasCustomization ? persona.customization.name : 'Unnamed';
              const role = hasCustomization ? persona.customization.role : 'Unspecified role';
              
              personasHtml += `
                  <li class="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div class="flex items-center justify-between">
                          <div class="flex items-center">
                              <div class="flex-shrink-0">
                                  <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                      <span class="text-blue-600 font-medium">${persona.train_id}</span>
                                  </div>
                              </div>
                              <div class="ml-4">
                                  <h4 class="text-sm font-medium text-gray-900">${name}</h4>
                                  <p class="text-sm text-gray-500">${role}</p>
                              </div>
                          </div>
                          <div class="flex">
                              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Created: ${createdAt}
                              </span>
                              <button 
                                  data-persona-id="${persona.train_id}" 
                                  class="ml-2 view-persona-btn text-blue-600 hover:text-blue-800"
                              >
                                  View
                              </button>
                          </div>
                      </div>
                  </li>
              `;
          });
          
          recentPersonasList.innerHTML = personasHtml;
          
          // Add event listeners to view buttons
          document.querySelectorAll('.view-persona-btn').forEach(btn => {
              btn.addEventListener('click', function() {
                  const personaId = parseInt(this.getAttribute('data-persona-id'));
                  openPersonaModal(personaId);
              });
          });
      })
      .catch(error => {
          console.error('Error loading recent personas:', error);
          recentPersonasList.innerHTML = `
              <li class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-center">
                      <p class="text-red-500">Error loading personas</p>
                  </div>
              </li>
          `;
      });
  }
  
  function initializeUsageChart() {
      const ctx = document.getElementById('usageChart').getContext('2d');
      
      // Sample data - in a real app, fetch this from your API
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const generations = [12, 19, 15, 8, 22, 14];
      
      new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Persona Generations',
                  data: generations,
                  backgroundColor: 'rgba(74, 144, 226, 0.2)',
                  borderColor: 'rgba(74, 144, 226, 1)',
                  borderWidth: 2,
                  tension: 0.3,
                  pointBackgroundColor: 'rgba(74, 144, 226, 1)',
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                  y: {
                      beginAtZero: true,
                      grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                      }
                  },
                  x: {
                      grid: {
                          display: false
                      }
                  }
              },
              plugins: {
                  legend: {
                      display: true,
                      position: 'top',
                  }
              }
          }
      });
  }
  
  // My Personas Functions
  function loadPersonas(page = 1, limit = itemsPerPage) {
      showLoading('Loading personas...');
      
      const skip = (page - 1) * limit;
      
      fetch(`${API_BASE_URL}/personas?limit=${limit}&skip=${skip}`)
      .then(response => response.json())
      .then(data => {
          hideLoading();
          totalPersonas = data.total;
          
          if (data.personas.length === 0 && totalPersonas > 0) {
              // If we're on a page with no results but there are personas, go back to page 1
              loadPersonas(1, limit);
              return;
          }
          
          // Calculate pagination info
          const start = skip + 1;
          const end = Math.min(skip + data.personas.length, totalPersonas);
          
          paginationStart.textContent = totalPersonas > 0 ? start : 0;
          paginationEnd.textContent = end;
          paginationTotal.textContent = totalPersonas;
          
          updatePaginationControls(page, limit, totalPersonas);
          
          if (data.personas.length === 0) {
              personasTableBody.innerHTML = `
                  <tr>
                      <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                          No personas found. Create your first persona now!
                      </td>
                  </tr>
              `;
              return;
          }
          
          let tableHtml = '';
          data.personas.forEach(persona => {
              const createdAt = new Date(persona.created_at).toLocaleDateString();
              const hasCustomization = persona.customization !== undefined;
              const name = hasCustomization ? persona.customization.name : '-';
              const role = hasCustomization ? persona.customization.role : '-';
              const fileType = persona.file_type || '-';
              const fileName = persona.filename || 'Unknown file';
              
              tableHtml += `
                  <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${persona.train_id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${createdAt}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span class="inline-flex items-center">
                              <svg class="h-4 w-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              ${fileName}
                              <span class="ml-1 text-xs text-gray-400">${fileType}</span>
                          </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${role}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button data-persona-id="${persona.train_id}" class="view-persona-btn text-blue-600 hover:text-blue-900 mr-3">
                              View
                          </button>
                          <button data-persona-id="${persona.train_id}" class="delete-persona-btn text-red-600 hover:text-red-900">
                              Delete
                          </button>
                      </td>
                  </tr>
              `;
          });
          
          personasTableBody.innerHTML = tableHtml;
          
          // Add event listeners to the view buttons
          document.querySelectorAll('.view-persona-btn').forEach(btn => {
              btn.addEventListener('click', function() {
                  const personaId = parseInt(this.getAttribute('data-persona-id'));
                  openPersonaModal(personaId);
              });
          });
          
          // Add event listeners to the delete buttons
          document.querySelectorAll('.delete-persona-btn').forEach(btn => {
              btn.addEventListener('click', function() {
                  const personaId = parseInt(this.getAttribute('data-persona-id'));
                  
                  // In a real app, you would send a DELETE request to your API
                  // For now, we'll just show a notification
                  showNotification('info', 'Delete Feature', 'The delete functionality would be implemented in a production environment.');
              });
          });
      })
      .catch(error => {
          hideLoading();
          console.error('Error loading personas:', error);
          personasTableBody.innerHTML = `
              <tr>
                  <td colspan="6" class="px-6 py-4 text-center text-red-500">
                      Error loading personas. Please try again.
                  </td>
              </tr>
          `;
      });
  }
  
  function updatePaginationControls(currentPage, limit, total) {
      const totalPages = Math.ceil(total / limit);
      
      // Enable/disable prev/next buttons
      prevPageButton.disabled = currentPage <= 1;
      nextPageButton.disabled = currentPage >= totalPages;
      mobilePrevPageButton.disabled = currentPage <= 1;
      mobileNextPageButton.disabled = currentPage >= totalPages;
      
      prevPageButton.classList.toggle('opacity-50', currentPage <= 1);
      nextPageButton.classList.toggle('opacity-50', currentPage >= totalPages);
      mobilePrevPageButton.classList.toggle('opacity-50', currentPage <= 1);
      mobileNextPageButton.classList.toggle('opacity-50', currentPage >= totalPages);
      
      // Generate page numbers
      let paginationHtml = '';
      
      // Calculate range of pages to show
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);
      
      if (endPage - startPage < 4 && startPage > 1) {
          startPage = Math.max(1, endPage - 4);
      }
      
      // First page
      if (startPage > 1) {
          paginationHtml += `
              <button data-page="1" class="pagination-btn relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
              </button>
          `;
          
          if (startPage > 2) {
              paginationHtml += `
                  <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                  </span>
              `;
          }
      }
      
      // Page numbers
      for (let i = startPage; i <= endPage; i++) {
          const isActive = i === currentPage;
          paginationHtml += `
              <button 
                  data-page="${i}" 
                  class="pagination-btn relative inline-flex items-center px-4 py-2 border border-gray-300 ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-700'} text-sm font-medium hover:bg-gray-50"
              >
                  ${i}
              </button>
          `;
      }
      
      // Last page
      if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
              paginationHtml += `
                  <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                  </span>
              `;
          }
          
          paginationHtml += `
              <button data-page="${totalPages}" class="pagination-btn relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  ${totalPages}
              </button>
          `;
      }
      
      paginationNumbers.innerHTML = paginationHtml;
      
      // Add event listeners to pagination buttons
      document.querySelectorAll('.pagination-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const page = parseInt(this.getAttribute('data-page'));
              currentPage = page;
              loadPersonas(page, limit);
          });
      });
  }
  
  // Pagination button event listeners
  prevPageButton.addEventListener('click', function() {
      if (currentPage > 1) {
          currentPage--;
          loadPersonas(currentPage, itemsPerPage);
      }
  });
  
  nextPageButton.addEventListener('click', function() {
      const totalPages = Math.ceil(totalPersonas / itemsPerPage);
      if (currentPage < totalPages) {
          currentPage++;
          loadPersonas(currentPage, itemsPerPage);
      }
  });
  
  mobilePrevPageButton.addEventListener('click', function() {
      if (currentPage > 1) {
          currentPage--;
          loadPersonas(currentPage, itemsPerPage);
      }
  });
  
  mobileNextPageButton.addEventListener('click', function() {
      const totalPages = Math.ceil(totalPersonas / itemsPerPage);
      if (currentPage < totalPages) {
          currentPage++;
          loadPersonas(currentPage, itemsPerPage);
      }
  });
  
  refreshPersonasButton.addEventListener('click', function() {
      loadPersonas(currentPage, itemsPerPage);
  });
  
  // Modal Functions
  function openPersonaModal(personaId) {
      showLoading('Loading persona details...');
      
      fetch(`${API_BASE_URL}/personas/${personaId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(persona => {
          hideLoading();
          
          // Populate modal data
          modalPersonaId.textContent = persona.train_id;
          
          const hasCustomization = persona.customization !== undefined;
          
          modalPersonaName.textContent = hasCustomization ? persona.customization.name : '-';
          modalPersonaRole.textContent = hasCustomization ? persona.customization.role : '-';
          modalPersonaGender.textContent = hasCustomization ? persona.customization.gender : '-';
          modalPersonaLanguage.textContent = hasCustomization ? persona.customization.language : '-';
          
          const createdAt = new Date(persona.created_at).toLocaleString();
          modalPersonaDate.textContent = createdAt;
          
          modalPersonaFile.textContent = persona.filename || 'Unknown file';
          modalPersonaPrompt.textContent = persona.prompt || 'No prompt available';
          
          // Show the modal
          viewPersonaModal.classList.remove('hidden');
          
          // Add animation class
          setTimeout(() => {
              viewPersonaModal.querySelector('.inline-block').classList.add('modal-enter');
          }, 10);
      })
      .catch(error => {
          hideLoading();
          console.error('Error loading persona details:', error);
          showNotification('error', 'Loading Failed', 'Could not load persona details. Please try again.');
      });
  }
  
  modalCloseButton.addEventListener('click', function() {
      // Add exit animation class
      viewPersonaModal.querySelector('.inline-block').classList.add('modal-exit');
      viewPersonaModal.querySelector('.inline-block').classList.remove('modal-enter');
      
      // Hide the modal after animation completes
      setTimeout(() => {
          viewPersonaModal.classList.add('hidden');
          viewPersonaModal.querySelector('.inline-block').classList.remove('modal-exit');
      }, 300);
  });
  
  // Analytics Functions
  function initializeAnalytics() {
      // Initialize charts for analytics page
      initializePersonaTypeChart();
      initializeLanguageChart();
      initializeTimelineChart();
  }
  
  function initializePersonaTypeChart() {
      const ctx = document.getElementById('personaTypeChart').getContext('2d');
      
      // Sample data - in a real app, fetch this from your API
      const data = {
          labels: ['PDF', 'Text', 'Audio'],
          datasets: [{
              data: [65, 25, 10],
              backgroundColor: [
                  'rgba(74, 144, 226, 0.7)',
                  'rgba(155, 89, 182, 0.7)',
                  'rgba(46, 204, 113, 0.7)'
              ],
              borderColor: [
                  'rgba(74, 144, 226, 1)',
                  'rgba(155, 89, 182, 1)',
                  'rgba(46, 204, 113, 1)'
              ],
              borderWidth: 1
          }]
      };
      
      new Chart(ctx, {
          type: 'pie',
          data: data,
          options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                  legend: {
                      position: 'right',
                  }
              }
          }
      });
  }
  
  function initializeLanguageChart() {
      const ctx = document.getElementById('languageChart').getContext('2d');
      
      // Sample data - in a real app, fetch this from your API
      const data = {
          labels: ['English', 'Spanish', 'French', 'German', 'Other'],
          datasets: [{
              label: 'Personas by Language',
              data: [45, 15, 10, 8, 22],
              backgroundColor: [
                  'rgba(74, 144, 226, 0.7)',
                  'rgba(155, 89, 182, 0.7)',
                  'rgba(46, 204, 113, 0.7)',
                  'rgba(230, 126, 34, 0.7)',
                  'rgba(149, 165, 166, 0.7)'
              ],
              borderColor: [
                  'rgba(74, 144, 226, 1)',
                  'rgba(155, 89, 182, 1)',
                  'rgba(46, 204, 113, 1)',
                  'rgba(230, 126, 34, 1)',
                  'rgba(149, 165, 166, 1)'
              ],
              borderWidth: 1
          }]
      };
      
      new Chart(ctx, {
          type: 'doughnut',
          data: data,
          options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                  legend: {
                      position: 'right',
                  }
              }
          }
      });
  }
  
  function initializeTimelineChart() {
      const ctx = document.getElementById('timelineChart').getContext('2d');
      
      // Sample data - in a real app, fetch this from your API
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
      const data = {
          labels: labels,
          datasets: [{
              label: 'Personas Created',
              data: [5, 8, 12, 7, 15, 10, 13, 18, 9],
              backgroundColor: 'rgba(74, 144, 226, 0.2)',
              borderColor: 'rgba(74, 144, 226, 1)',
              borderWidth: 2,
              tension: 0.3,
              fill: true
          }]
      };
      
      new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                  y: {
                      beginAtZero: true,
                      title: {
                          display: true,
                          text: 'Number of Personas'
                      }
                  },
                  x: {
                      title: {
                          display: true,
                          text: 'Month'
                      }
                  }
              }
          }
      });
  }
  
  // Utility Functions
  function showNotification(type, title, message) {
      // Set icon based on type
      let iconSvg = '';
      switch(type) {
          case 'success':
              iconSvg = `<svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>`;
              break;
          case 'error':
              iconSvg = `<svg class="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>`;
              break;
          case 'info':
              iconSvg = `<svg class="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>`;
              break;
          default:
              iconSvg = `<svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>`;
      }
      
      notificationIcon.innerHTML = iconSvg;
      notificationTitle.textContent = title;
      notificationMessage.textContent = message;
      
      // Show the toast
      notificationToast.classList.add('show');
      
      // Hide after 5 seconds
      const toastTimeout = setTimeout(() => {
          notificationToast.classList.remove('show');
      }, 5000);
      
      // Close button event listener
      closeNotificationButton.addEventListener('click', () => {
          clearTimeout(toastTimeout);
          notificationToast.classList.remove('show');
      });
  }
  
  function showLoading(message = 'Loading...') {
      loadingText.textContent = message;
      loadingSpinner.classList.remove('hidden');
  }
  
  function hideLoading() {
      loadingSpinner.classList.add('hidden');
  }
});
