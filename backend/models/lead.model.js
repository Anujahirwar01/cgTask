import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number']
  },
  
  altPhone: {
    type: String,
    trim: true,
    match: [/^[\d\s\-\+\(\)]*$/, 'Please enter a valid alternate phone number']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  altEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid alternate email']
  },
  
  status: {
    type: String,
    required: true,
    enum: {
      values: ['New', 'Qualified', 'Follow-Up', 'Converted', 'Contacted'],
      message: 'Status must be one of: New, Qualified, Follow-Up, Converted, Contacted'
    },
    default: 'New'
  },
  
  qualification: {
    type: String,
    required: true,
    enum: {
      values: ['High School', 'Bachelors', 'Masters', 'PhD', 'Other'],
      message: 'Qualification must be one of: High School, Bachelors, Masters, PhD, Other'
    },
    default: 'High School'
  },
  
  interestField: {
    type: String,
    required: true,
    enum: {
      values: ['Web Development', 'Mobile Development', 'Data Science', 'Digital Marketing', 'UX/UI Design'],
      message: 'Interest field must be one of the available options'
    }
  },
  
  source: {
    type: String,
    required: true,
    enum: {
      values: ['Website', 'Social Media', 'Email Campaign', 'Cold Call', 'Referral'],
      message: 'Source must be one of the available options'
    }
  },

  assignedTo: {
    type: String,
    required: true,
    enum: {
      values: ['John Doe', 'Jane Smith', 'Emily Davis', 'Robert Johnson'],
      message: 'Assigned to must be one of the available team members'
    }
  },
  
  jobInterest: {
    type: String,
    enum: {
      values: ['Select job interest', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Data Analyst', 'Digital Marketer'],
      message: 'Job interest must be one of the available options'
    },
    default: 'Select job interest'
  },
  
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
  
  passoutYear: {
    type: String,
    trim: true,
    match: [/^\d{4}$/, 'Passout year must be a valid 4-digit year']
  },
  
  heardFrom: {
    type: String,
    trim: true,
    maxlength: [200, 'Heard from cannot exceed 200 characters']
  }
}, {
  timestamps: true,
  collection: 'leads'
});

leadSchema.index({ email: 1 }, { unique: true });
leadSchema.index({ phone: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ assignedTo: 1 });
leadSchema.index({ createdAt: -1 });

leadSchema.virtual('displayName').get(function() {
  return this.name;
});

leadSchema.pre('save', async function(next) {
  if (this.isModified('email')) {
    const existingLead = await this.constructor.findOne({ 
      email: this.email,
      _id: { $ne: this._id }
    });
    
    if (existingLead) {
      const error = new Error('Email already exists');
      error.code = 11000;
      return next(error);
    }
  }
  next();
});

leadSchema.methods.getSummary = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    status: this.status,
    assignedTo: this.assignedTo,
    createdAt: this.createdAt
  };
};

leadSchema.statics.findByStatus = function(status) {
  return this.find({ status: status });
};

leadSchema.statics.findByAssignedTo = function(assignedTo) {
  return this.find({ assignedTo: assignedTo });
};

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;