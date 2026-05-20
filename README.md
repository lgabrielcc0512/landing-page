# 🚗 Driver Registration Landing Page

A modern, responsive driver recruitment platform landing page for Digix Dealer. The form guides drivers through a two-step registration and permit/license verification process based on their operating city (Charlotte, NYC, or Long Island).

## 🎯 Features

### ✨ **Step-by-Step Workflow**
- **Step 1**: Collect driver information (first name, last name, city of operation)
- **Step 2**: City-specific permit/license verification
  - **Charlotte**: PVH Permit status check
  - **NYC**: TLC Driver License verification
  - **Long Island**: Information about NY State DMV requirements only

### 🎨 **Design System**
- **Modern UI** with Digix brand colors (Blue #0073b7 & Orange #f39200)
- **Smooth animations** for better user experience
- **Split background** design featuring NYC and Charlotte imagery
- **Responsive design** optimized for desktop, tablet, and mobile
- **Dark mode support** with automatic system preference detection
- **Accessibility-first** approach with WCAG compliance

### 📱 **Responsive Breakpoints**
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (480px - 767px)
- Small Mobile (< 480px)

### ♿ **Accessibility Features**
- Semantic HTML structure
- ARIA labels and form validation
- Keyboard navigation support (Enter key submission)
- Reduced motion support for animations
- High contrast colors compliant with WCAG AA standards
- Screen reader friendly

### 📊 **Analytics & Tracking**
- Built-in event tracking system
- Form submission tracking
- Permit selection tracking
- Form abandonment tracking
- Ready for Google Analytics integration

## 📁 File Structure

```
landing-page/
├── index.html          # Main HTML structure
├── styles.css          # External stylesheet with animations
├── script.js           # Form logic and event handling
├── logoDigixDealer.png # Brand logo
└── README.md          # This file
```

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lgabrielcc0512/landing-page.git
   cd landing-page
   ```

2. **Add your logo**
   - Place your `logoDigixDealer.png` in the root directory
   - Update the image path in `index.html` if needed

3. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required

### Local Development Server (Optional)

For better development experience with live reload:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Then visit: http://localhost:8000
```

## 🎮 Usage

### Form Flow

1. **Enter driver information**
   - First Name
   - Last Name
   - Select City of Operation

2. **Click "Continue"** to proceed to Step 2

3. **Answer city-specific permit questions**
   - Charlotte: Do you have an active PVH Permit?
   - NYC: Do you have an active TLC Driver's License?
   - Long Island: Informational screen about DMV requirements

4. **View guidance & next steps** based on permit status

### Available Cities

| City | Requirement | Authority |
|------|------------|-----------|
| **Charlotte, NC** | City of Charlotte PVH Permit | Charlotte-Mecklenburg Police Dept. |
| **New York City, NY** | NYC TLC Driver's License | NYC Taxi & Limousine Commission |
| **Long Island, NY** | NY State DMV License (no local permit) | New York DMV |

## 🎨 Design System

### Colors

```css
--digix-blue: #0073b7;
--digix-orange: #f39200;
--color-text-primary: #0f1c2e;
--color-text-secondary: #5a6a7e;
--color-success: #1a7a40;
--color-warning: #7a4200;
--color-error: #b94040;
```

### Typography

- **Font Family**: DM Sans (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Base Size**: 14px

### Spacing System

- **Small**: 0.5rem (8px)
- **Medium**: 1rem (16px)
- **Large**: 1.5rem (24px)
- **XL**: 2rem (32px)

### Border Radius

- **Large**: 14px (cards)
- **Medium**: 10px (buttons, inputs)

## 🔧 JavaScript Architecture

### Core Modules

#### **Form Data Management**
```javascript
const formData = {
  firstName: '',
  lastName: '',
  city: '',
  pvhChoice: null,
  tlcChoice: null,
  liVisited: false
}
```

#### **Main Functions**

| Function | Purpose |
|----------|---------|
| `handleContinue()` | Validate form and move to Step 2 |
| `validateForm()` | Check all required fields are filled |
| `selectPVH(choice)` | Handle Charlotte PVH selection |
| `selectTLC(choice)` | Handle NYC TLC selection |
| `goBack()` | Return to Step 1 |
| `trackEvent(name, data)` | Log analytics events |
| `exportFormData()` | Get current form state |
| `restoreFormData(data)` | Load previously saved form data |

### Event Tracking

```javascript
// Form submission
trackEvent('form_submitted', { city: 'Charlotte' });

// Permit selection
trackEvent('permit_selected', { 
  city: 'Charlotte', 
  permit: 'pvh', 
  status: 'has' 
});

// Form abandonment
trackEvent('form_abandoned', { city: 'Charlotte' });
```

## 📱 Responsive Design Features

### Mobile-First Approach
- Single column layout on mobile
- Optimized touch targets (44px minimum)
- Adjusted font sizes and spacing
- Stack buttons and form elements vertically

### Tablet Optimization
- Two-column grid for options
- Increased padding and margins
- Enhanced tap area for buttons

### Desktop Enhancement
- Full two-column layouts
- Hover effects and transitions
- Split background design fully visible

## 🌙 Dark Mode

The page automatically detects system dark mode preference using:
```css
@media (prefers-color-scheme: dark) { ... }
```

Automatically applies:
- Inverted text colors
- Dark backgrounds
- Adjusted contrasts for readability

## ♿ Accessibility

### Features Implemented

✅ **Semantic HTML** - Proper heading hierarchy, form labels  
✅ **Keyboard Navigation** - Tab through form, Enter to submit  
✅ **Form Validation** - Real-time feedback and error messages  
✅ **Color Contrast** - WCAG AA compliant ratios  
✅ **Reduced Motion** - Respects `prefers-reduced-motion`  
✅ **Focus Indicators** - Visible focus states on interactive elements  
✅ **ARIA Labels** - Implicit and explicit labels for screen readers

### Testing Recommendations

- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard-only navigation
- Check color contrast with accessibility tools
- Validate HTML with W3C Validator

## 🔐 Security Considerations

- **No sensitive data storage** in localStorage by default
- **Input validation** on all form fields
- **HTTPS recommended** for production
- **Content Security Policy** can be added
- **CORS** considerations for API endpoints

## 📊 Analytics Integration

### Google Analytics

```javascript
// Already configured for gtag
gtag('event', 'form_submitted', { city: 'Charlotte' });
```

### Custom Analytics

Modify the `trackEvent()` function in `script.js` to send data to your analytics service:

```javascript
fetch('/api/analytics', { 
  method: 'POST', 
  body: JSON.stringify(eventPayload) 
});
```

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Full Support |
| Firefox | Latest | ✅ Full Support |
| Safari | Latest | ✅ Full Support |
| Edge | Latest | ✅ Full Support |
| IE 11 | - | ❌ Not Supported |

## 📝 Code Quality

### Conventions Used
- **JSDoc comments** for all functions
- **CSS custom properties** for theming
- **BEM methodology** for CSS class naming (partial)
- **Clear separation of concerns** (HTML, CSS, JS)

### Best Practices
- No inline styles (all in external CSS)
- Modular JavaScript with clear functions
- Semantic HTML structure
- Performance optimized animations
- Mobile-first responsive design

## 🚀 Performance

### Optimization Techniques

- **CSS animations** using `transform` and `opacity`
- **Minimal DOM manipulation**
- **Event delegation** for better memory usage
- **Lazy loading ready** for images
- **No third-party dependencies** (external CDN only)

### Load Time Estimates
- **HTML**: < 50KB
- **CSS**: < 30KB
- **JS**: < 15KB
- **Total**: ~95KB (uncompressed)

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly on all breakpoints
4. Submit a pull request

## 📄 License

This project is part of Digix Dealer. For license information, contact your repository administrator.

## 📞 Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Contact: [support email]
- Documentation: [link to docs]

## 🎯 Future Enhancements

### Planned Features
- [ ] Backend API integration for permit verification
- [ ] Email confirmation after registration
- [ ] Multi-language support (Spanish, etc.)
- [ ] Real-time appointment booking
- [ ] SMS notifications
- [ ] User profile dashboard
- [ ] Admin management panel

### Potential Improvements
- [ ] Add more cities/regions
- [ ] Progressive Web App (PWA)
- [ ] Mobile app version
- [ ] Video tutorials
- [ ] Live chat support

## 📚 Additional Resources

- [Digix Dealer Brand Guidelines](#)
- [Charlotte PVH Portal](https://www.charlottenc.gov/cmpd/Our-Organization/PVH)
- [NYC TLC Official Site](https://www.nyc.gov/site/tlc/drivers/tlc-driver-license.page)
- [Google Fonts - DM Sans](https://fonts.google.com/specimen/DM+Sans)
- [Tabler Icons](https://tabler.io/icons)

---

**Last Updated**: May 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
