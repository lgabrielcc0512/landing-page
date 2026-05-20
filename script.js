/**
 * Digix Dealer Landing Page - Main JavaScript Module
 * Handles form validation, step navigation, and analytics tracking
 * 
 * @version 1.0.0
 * @author Digix Dealer
 */

// ==================== Global State Management ====================

/**
 * Global form data object to store user input
 * @type {Object}
 */
const formData = {
  firstName: '',
  lastName: '',
  city: '',
  pvhChoice: null,
  tlcChoice: null,
  liVisited: false,
  timestamp: null
};

/**
 * Configuration for different cities
 * @type {Object}
 */
const cityConfig = {
  Charlotte: {
    display: 'Charlotte, NC',
    authority: 'Charlotte-Mecklenburg Police Dept.',
    permitType: 'PVH'
  },
  NewYork: {
    display: 'New York City, NY',
    authority: 'NYC Taxi & Limousine Commission',
    permitType: 'TLC'
  },
  LongIsland: {
    display: 'Long Island, NY',
    authority: 'New York DMV',
    permitType: 'DMV License'
  }
};

// ==================== Form Validation ====================

/**
 * Validates the main form input
 * @returns {Object} Validation result with isValid boolean and message
 */
function validateForm() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const city = document.getElementById('city').value;

  if (!fname) {
    return { isValid: false, message: 'Please enter your first name.' };
  }
  if (!lname) {
    return { isValid: false, message: 'Please enter your last name.' };
  }
  if (!city) {
    return { isValid: false, message: 'Please select your city of operation.' };
  }

  return { isValid: true, message: '' };
}

/**
 * Handles Continue button click - validates and moves to Step 2
 */
function handleContinue() {
  const validation = validateForm();

  if (!validation.isValid) {
    alert(validation.message);
    trackEvent('form_validation_error', {
      error: validation.message
    });
    return;
  }

  // Store form data
  formData.firstName = document.getElementById('fname').value.trim();
  formData.lastName = document.getElementById('lname').value.trim();
  formData.city = document.getElementById('city').value;
  formData.timestamp = new Date().toISOString();

  // Update UI
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').classList.add('visible');
  document.getElementById('dot1').classList.remove('active');
  document.getElementById('dot2').classList.add('active');

  // Set greeting
  document.getElementById('greeting').textContent = `Hello, ${formData.firstName} ${formData.lastName}.`;
  document.getElementById('greeting-sub').textContent = `We recorded your operational city as ${cityConfig[formData.city]?.display || formData.city}.`;

  // Show city-specific content
  showCityContent(formData.city);

  // Track event
  trackEvent('step1_completed', {
    city: formData.city,
    firstName: formData.firstName
  });
}

// ==================== Navigation ====================

/**
 * Shows city-specific content in Step 2
 * @param {string} city - The selected city
 */
function showCityContent(city) {
  // Hide all blocks
  document.getElementById('charlotte-block').style.display = 'none';
  document.getElementById('nyc-block').style.display = 'none';
  document.getElementById('li-block').style.display = 'none';

  // Show relevant block
  if (city === 'Charlotte') {
    document.getElementById('charlotte-block').style.display = 'block';
  } else if (city === 'NewYork') {
    document.getElementById('nyc-block').style.display = 'block';
  } else if (city === 'LongIsland') {
    document.getElementById('li-block').style.display = 'block';
    formData.liVisited = true;
  }
}

/**
 * Handles Charlotte PVH permit selection
 * @param {string} choice - 'yes' or 'no'
 */
function selectPVH(choice) {
  // Reset all states
  document.getElementById('btn-pvh-yes').classList.remove('selected');
  document.getElementById('btn-pvh-no').classList.remove('selected');
  document.getElementById('alert-pvh-yes').classList.remove('visible');
  document.getElementById('alert-pvh-no').classList.remove('visible');
  document.getElementById('appt-pvh-card').style.display = 'none';

  // Update state
  formData.pvhChoice = choice;

  // Show selection and relevant content
  if (choice === 'yes') {
    document.getElementById('btn-pvh-yes').classList.add('selected');
    document.getElementById('alert-pvh-yes').classList.add('visible');
  } else {
    document.getElementById('btn-pvh-no').classList.add('selected');
    document.getElementById('alert-pvh-no').classList.add('visible');
    setTimeout(() => {
      document.getElementById('appt-pvh-card').style.display = 'block';
    }, 200);
  }

  // Track event
  trackEvent('permit_selected', {
    city: 'Charlotte',
    permitType: 'PVH',
    hasPermit: choice === 'yes'
  });
}

/**
 * Handles NYC TLC license selection
 * @param {string} choice - 'yes' or 'no'
 */
function selectTLC(choice) {
  // Reset all states
  document.getElementById('btn-tlc-yes').classList.remove('selected');
  document.getElementById('btn-tlc-no').classList.remove('selected');
  document.getElementById('alert-tlc-yes').classList.remove('visible');
  document.getElementById('alert-tlc-no').classList.remove('visible');
  document.getElementById('tlc-info-card').style.display = 'none';

  // Update state
  formData.tlcChoice = choice;

  // Show selection and relevant content
  if (choice === 'yes') {
    document.getElementById('btn-tlc-yes').classList.add('selected');
    document.getElementById('alert-tlc-yes').classList.add('visible');
  } else {
    document.getElementById('btn-tlc-no').classList.add('selected');
    document.getElementById('alert-tlc-no').classList.add('visible');
    setTimeout(() => {
      document.getElementById('tlc-info-card').style.display = 'block';
    }, 200);
  }

  // Track event
  trackEvent('permit_selected', {
    city: 'NewYork',
    permitType: 'TLC',
    hasLicense: choice === 'yes'
  });
}

/**
 * Handles back button click - returns to Step 1
 */
function goBack() {
  // Hide Step 2
  document.getElementById('step2').classList.remove('visible');
  document.getElementById('step1').style.display = 'block';
  document.getElementById('dot1').classList.add('active');
  document.getElementById('dot2').classList.remove('active');

  // Reset Charlotte selections
  document.getElementById('btn-pvh-yes').classList.remove('selected');
  document.getElementById('btn-pvh-no').classList.remove('selected');
  document.getElementById('alert-pvh-yes').classList.remove('visible');
  document.getElementById('alert-pvh-no').classList.remove('visible');
  document.getElementById('appt-pvh-card').style.display = 'none';

  // Reset NYC selections
  document.getElementById('btn-tlc-yes').classList.remove('selected');
  document.getElementById('btn-tlc-no').classList.remove('selected');
  document.getElementById('alert-tlc-yes').classList.remove('visible');
  document.getElementById('alert-tlc-no').classList.remove('visible');
  document.getElementById('tlc-info-card').style.display = 'none';

  // Reset form data permit choices
  formData.pvhChoice = null;
  formData.tlcChoice = null;

  // Track event
  trackEvent('step_back', {
    fromStep: 2,
    toStep: 1
  });
}

// ==================== Analytics & Event Tracking ====================

/**
 * Tracks custom events for analytics
 * @param {string} eventName - Name of the event
 * @param {Object} eventData - Event data payload
 */
function trackEvent(eventName, eventData = {}) {
  const payload = {
    eventName,
    eventData,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  // Google Analytics (if available)
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }

  // Console logging (development)
  console.log('[Analytics Event]', eventName, eventData);

  // Send to custom endpoint if needed
  sendAnalyticsToServer(payload);
}

/**
 * Sends analytics data to server
 * @param {Object} payload - Analytics payload
 */
function sendAnalyticsToServer(payload) {
  // Uncomment to enable server-side analytics tracking
  /*
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(error => console.warn('Analytics send failed:', error));
  */
}

// ==================== Form Data Utilities ====================

/**
 * Exports current form data
 * @returns {Object} Current form data
 */
function exportFormData() {
  return { ...formData };
}

/**
 * Restores form data from saved state
 * @param {Object} data - Form data to restore
 */
function restoreFormData(data) {
  if (!data || typeof data !== 'object') return;

  Object.keys(data).forEach(key => {
    if (key in formData) {
      formData[key] = data[key];
    }
  });
}

/**
 * Saves form data to localStorage
 */
function saveFormDataLocally() {
  try {
    localStorage.setItem('digixFormData', JSON.stringify(formData));
    console.log('Form data saved to localStorage');
  } catch (error) {
    console.warn('Failed to save form data:', error);
  }
}

/**
 * Loads form data from localStorage
 */
function loadFormDataLocally() {
  try {
    const savedData = localStorage.getItem('digixFormData');
    if (savedData) {
      restoreFormData(JSON.parse(savedData));
      console.log('Form data restored from localStorage');
    }
  } catch (error) {
    console.warn('Failed to load form data:', error);
  }
}

/**
 * Clears saved form data from localStorage
 */
function clearFormDataLocally() {
  try {
    localStorage.removeItem('digixFormData');
    console.log('Form data cleared from localStorage');
  } catch (error) {
    console.warn('Failed to clear form data:', error);
  }
}

// ==================== Keyboard Support ====================

/**
 * Handles keyboard events
 */
function setupKeyboardListeners() {
  document.addEventListener('keydown', function(event) {
    // Enter key in Step 1 form
    if (event.key === 'Enter' && document.getElementById('step1').style.display !== 'none') {
      event.preventDefault();
      handleContinue();
    }

    // Escape key to go back from Step 2
    if (event.key === 'Escape' && document.getElementById('step2').classList.contains('visible')) {
      event.preventDefault();
      goBack();
    }
  });
}

// ==================== Initialization ====================

/**
 * Initializes the application
 */
function initializeApp() {
  console.log('🚀 Initializing Digix Landing Page...');

  // Setup keyboard listeners
  setupKeyboardListeners();

  // Attempt to restore saved form data
  loadFormDataLocally();

  // Track page view
  trackEvent('page_load', {
    title: document.title,
    referrer: document.referrer || 'direct'
  });

  // Track page unload (form abandonment)
  window.addEventListener('beforeunload', function() {
    if (formData.city && !formData.pvhChoice && !formData.tlcChoice && document.getElementById('step2').classList.contains('visible')) {
      trackEvent('form_abandoned', {
        lastStep: 2,
        city: formData.city
      });
    }
  });

  console.log('✅ App initialization complete');
}

// ==================== DOM Ready ====================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
