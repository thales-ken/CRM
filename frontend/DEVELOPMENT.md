# CRM Frontend - Development Guide

## 🎯 Current Status

Your CRM frontend is **running locally** at `http://localhost:5173/`

---

## 📊 **What You Can See Right Now**

### **Navigation Sidebar**
- ✅ **Collapsible sidebar** with menu items (Dashboard, Contacts, Leads, Tasks, Companies)
- ✅ **User profile** showing current user info
- ✅ **Gradient design** with smooth transitions
- ✅ **Responsive layout** that collapses on smaller screens

### **Dashboard Page** (Currently Active)
- ✅ **4 Stat Cards** showing:
  - Total Contacts (5)
  - Active Opportunities (4)
  - Pipeline Value ($975,000)
  - Closing This Month (1)

- ✅ **2 Metric Cards** showing:
  - Conversion Rate (20%)
  - Average Deal Size ($385,000)

- ✅ **Recent Activity Section** (placeholder)

### **Mock Data Loaded**
- ✅ All mock data loaded in memory
- ✅ User authentication simulated (John Doe - Admin)
- ✅ Ready for CRUD operations

---

## 🛠️ **How to Use the Dev Environment**

### **Testing Navigation**
Click the sidebar toggle (☰) to collapse/expand the menu. Navigate between pages by clicking menu items.

### **Testing with Mock Data**
All data is available through the services:
```typescript
import { contactService, leadService } from './services/api';

// Get all contacts
const contacts = await contactService.getAll();

// Get specific lead
const lead = await leadService.getById('lead1');

// Create new contact
const newContact = await contactService.create({...});
```

### **Using Custom Hooks**
```typescript
import { useFetch, useSearch, usePagination } from './hooks';

// Fetch data
const { data, loading } = useFetch(() => contactService.getAll());

// Search
const { searchQuery, setSearchQuery, filteredItems } = useSearch(items, (item, q) => 
  item.name.toLowerCase().includes(q)
);

// Paginate
const { paginatedItems, nextPage, prevPage } = usePagination(items, 10);
```

### **Managing Global State**
```typescript
import { useCRM } from './context/CRMContext';

const { 
  currentUser,        // Current logged-in user
  selectedContact,    // Currently selected contact
  isContactModalOpen, // Modal state
  showNotification    // Show notifications
} = useCRM();
```

---

## 📝 **Implementing Features**

### **Example: Create a Contacts List Page**

1. **Create component** at `src/components/Contacts/ContactsList.tsx`:
```typescript
import { useFetch } from '../../hooks';
import { contactService } from '../../services/api';

export const ContactsList = () => {
  const { data: contacts } = useFetch(() => contactService.getAll());
  
  return (
    <div>
      {contacts?.map(contact => (
        <div key={contact.id}>{contact.firstName} {contact.lastName}</div>
      ))}
    </div>
  );
};
```

2. **Add to routing** in `App.tsx`:
```typescript
case 'contacts':
  return <ContactsList />;
```

3. **Use the Button component**:
```typescript
import { Button } from './components/Common/Button';

<Button variant="primary" onClick={handleCreate}>
  Add Contact
</Button>
```

---

## 🔄 **Hot Module Replacement (HMR)**

Vite provides instant updates:
- Edit any `.tsx` or `.css` file
- Changes appear immediately in the browser
- Component state is preserved during updates

Example: Try editing `src/components/Dashboard/Dashboard.tsx` and save!

---

## 🧪 **Testing with Mock Data**

### **View All Data**
Open browser console and run:
```javascript
// Import and check mock data
import { mockContacts, mockLeads } from './mocks/data.js'
console.table(mockContacts);
console.table(mockLeads);
```

### **Test Services**
```javascript
import { contactService } from './services/api.js'

// Get all
contactService.getAll().then(console.log);

// Get one
contactService.getById('contact1').then(console.log);

// Create
contactService.create({
  firstName: 'New',
  lastName: 'Contact',
  email: 'test@example.com',
  // ... other fields
}).then(console.log);

// Update
contactService.update('contact1', { email: 'newemail@example.com' }).then(console.log);

// Delete
contactService.delete('contact1').then(console.log);
```

---

## 📚 **Project Files to Edit**

### **To Add a New Component**
1. Create folder: `src/components/YourComponent/`
2. Create file: `YourComponent.tsx`
3. Create style: `YourComponent.css`
4. Export from `src/components/index.ts`

### **To Add a Service**
1. Add service object in `src/services/api.ts`
2. Export from `src/services/index.ts`
3. Use with `useFetch()` hook

### **To Add a Custom Hook**
1. Add function in `src/hooks/index.ts`
2. Import and use in components

### **To Add Utilities**
1. Add functions in `src/utils/helpers.ts`
2. Import where needed

---

## 🎨 **Styling Guide**

### **Color Palette**
- Primary: `#667eea` (purple)
- Secondary: `#764ba2` (violet)
- Success: `#00AA00` (green)
- Warning: `#FFA500` (orange)
- Danger: `#FF0000` (red)

### **Using Status Colors**
```typescript
import { getStatusColor, getPriorityColor } from './utils/helpers';

const color = getStatusColor('closed-won');  // Returns color code
const urgentColor = getPriorityColor('urgent'); // Returns color code
```

### **Creating a Card**
```typescript
import { Card } from './components/Common/Button';

<Card className="custom-class">
  <h3>Title</h3>
  <p>Content here</p>
</Card>
```

---

## ⚡ **Performance Tips**

1. **Use `useFetch()` for data loading** - it handles loading/error states
2. **Implement pagination** - use `usePagination()` for large lists
3. **Memoize expensive components** - use `React.memo()` when needed
4. **Lazy load routes** - use `React.lazy()` for code splitting

---

## 🐛 **Debugging**

### **Enable React DevTools**
1. Install [React Developer Tools](https://reactjs.org/docs/react-dom.html)
2. Inspect components in the console
3. Check state and props in real-time

### **Check Network**
- F12 → Network tab
- Services have 300ms simulated delay
- Watch for CORS issues when adding real API

### **View Console Logs**
- Notifications are logged with timestamps
- Check for TypeScript errors (build console)

---

## 📦 **Building for Production**

When ready to deploy:
```bash
yarn build
```

This creates:
- Optimized JavaScript bundle
- Minified CSS
- Static files in `dist/` folder
- Ready for deployment to any static host

---

## 🔗 **Ready to Extend**

You now have:
- ✅ Complete folder structure
- ✅ Type-safe development
- ✅ Mock data & services
- ✅ Reusable hooks & utils
- ✅ Global state management
- ✅ UI component library
- ✅ Hot reload development

**Start building features!** 🚀

Choose what to implement next:
- [ ] Contact management (list, detail, create)
- [ ] Lead pipeline (drag & drop stages)
- [ ] Task management
- [ ] Company directory
- [ ] Search & filters
- [ ] Charts & reports
