import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  // Contact Information
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^\+?[\d\s\-\(\)]+$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  
  altPhone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^\+?[\d\s\-\(\)]+$/.test(v);
      },
      message: 'Please enter a valid alternate phone number'
    }
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  
  altEmail: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid alternate email address'
    }
  },
  
  // Lead Status and Classification
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    default: 'New',
    required: true
  },
  
  // Educational Background
  qualification: {
    type: String,
    enum: ['High School', 'Diploma', 'Bachelor\'s', 'Master\'s', 'PhD', 'Other'],
    default: 'High School',
    required: true
  },
  
  passoutYear: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^\d{4}$/.test(v);
      },
      message: 'Please enter a valid 4-digit year'
    }
  },
  
  // Interest and Preferences
  interestField: {
    type: String,
    enum: [
      'Web Development', 
      'Mobile App Development', 
      'Data Science', 
      'AI/ML', 
      'Cybersecurity', 
      'Cloud Computing', 
      'UI/UX Design',
      'Digital Marketing',
      'Other'
    ],
    default: 'Web Development',
    required: true
  },
  
  jobInterest: {
    type: String,
    trim: true
  },
  
  // Location
  state: {
    type: String,
    trim: true,
    maxlength: [50, 'State name cannot exceed 50 characters']
  },
  
  city: {
    type: String,
    trim: true,
    maxlength: [50, 'City name cannot exceed 50 characters']
  },
  
  // Lead Source and Assignment
  source: {
    type: String,
    enum: [
      'Website', 
      'Social Media', 
      'Email Campaign', 
      'Cold Call', 
      'Referral', 
      'Advertisement', 
      'Event',
      'Other'
    ],
    default: 'Website',
    required: true
  },
  
  heardFrom: {
    type: String,
    trim: true,
    maxlength: [200, 'Heard from description cannot exceed 200 characters']
  },
  
  assignedTo: {
    type: String,
    required: [true, 'Lead must be assigned to someone'],
    trim: true
  },
  
  // Tracking Fields
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Additional Notes
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  
  // Lead Score (for future use)
  leadScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  
  // Follow-up Information
  lastContactDate: {
    type: Date
  },
  
  nextFollowUpDate: {
    type: Date
  },
  
  // Conversion Tracking
  isConverted: {
    type: Boolean,
    default: false
  },
  
  conversionDate: {
    type: Date
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
leadSchema.index({ email: 1 }, { unique: true });
leadSchema.index({ phone: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ assignedTo: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ source: 1 });

// Virtual for full name display
leadSchema.virtual('displayName').get(function() {
  return this.name;
});

// Virtual for contact info
leadSchema.virtual('primaryContact').get(function() {
  return {
    phone: this.phone,
    email: this.email
  };
});

// Pre-save middleware to update the updatedAt field
leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Pre-save middleware for lead scoring (basic implementation)
leadSchema.pre('save', function(next) {
  let score = 50; // Base score
  
  // Increase score based on qualification
  if (this.qualification === 'Bachelor\'s') score += 10;
  if (this.qualification === 'Master\'s') score += 15;
  if (this.qualification === 'PhD') score += 20;
  
  // Increase score based on source
  if (this.source === 'Referral') score += 15;
  if (this.source === 'Website') score += 10;
  
  // Increase score if alternate contact methods provided
  if (this.altPhone) score += 5;
  if (this.altEmail) score += 5;
  
  this.leadScore = Math.min(score, 100); // Cap at 100
  next();
});

// Static method to get leads by status
leadSchema.statics.findByStatus = function(status) {
  return this.find({ status: status });
};

// Static method to get leads assigned to a person
leadSchema.statics.findByAssignee = function(assignee) {
  return this.find({ assignedTo: assignee });
};

// Instance method to mark as converted
leadSchema.methods.markAsConverted = function() {
  this.isConverted = true;
  this.conversionDate = new Date();
  this.status = 'Closed Won';
  return this.save();
};

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
