import Lead from '../models/lead.model.js';
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Leads retrieved successfully',
      data: leads
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch leads'
    });
  }
};


export const createLead = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    const {
      name,
      phone,
      altPhone,
      email,
      altEmail,
      status,
      qualification,
      interestField,
      source,
      assignedTo,
      jobInterest,
      state,
      city,
      passoutYear,
      heardFrom
    } = req.body;

 
    const existingLead = await Lead.findOne({ email: email.toLowerCase() });
    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: 'A lead with this email already exists'
      });
    }


    const lead = new Lead({
      name,
      phone,
      altPhone,
      email,
      altEmail,
      status: status || 'New',
      qualification: qualification || 'High School',
      interestField: interestField || 'Web Development',
      source: source || 'Website',
      assignedTo: assignedTo || 'John Doe',
      jobInterest,
      state,
      city,
      passoutYear,
      heardFrom
    });

    const savedLead = await lead.save();

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: savedLead
    });

  } catch (error) {
    console.error('Error creating lead:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A lead with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error: Could not create lead'
    });
  }
};
