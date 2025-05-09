const API_BASE_URL = 'http://localhost:5000/api';

export const projectService = {
  create: async (projectData) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    return response.json();
  },
  getAll: async () => {
    console.log('Fetching projects from:', `${API_BASE_URL}/projects`);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
      }
      const data = await response.json();
      console.log('Projects API response:', data);
      return data;
    } catch (error) {
      console.error('Error in projectService.getAll:', error);
      throw error;
    }
  }
};

export const contractorService = {
  create: async (contractorData) => {
    const response = await fetch(`${API_BASE_URL}/contractors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractorData),
    });
    if (!response.ok) {
      throw new Error('Failed to create contractor');
    }
    return response.json();
  },

  // Add this if needed
  addContractorContract: async (contractIdData) => {
    const response = await fetch(`${API_BASE_URL}/contractors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractIdData),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Contractor contract error response:', errorText);
      throw new Error('Failed to add contractor contract');
    }
  
    return response.json();
  },
  

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/contractors`);
    if (!response.ok) {
      throw new Error('Failed to fetch contractors');
    }
    return response.json();
  }
};

export const advancePaymentService = {
  create: async (paymentData) => {
    const response = await fetch(`${API_BASE_URL}/advance-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) {
      throw new Error('Failed to create advance payment');
    }
    return response.json();
  },
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/advance-payments`);
    if (!response.ok) {
      throw new Error('Failed to fetch advance payments');
    }
    return response.json();
  }
};

export const billPaymentService = {
  create: async (billData) => {
    const response = await fetch(`${API_BASE_URL}/bill-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(billData),
    });
    if (!response.ok) {
      throw new Error('Failed to create bill payment');
    }
    return response.json();
  },
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/bill-payments`);
    if (!response.ok) {
      throw new Error('Failed to fetch bill payments');
    }
    return response.json();
  }
};

export const adjustmentService = {
  create: async (adjustmentData) => {
    const response = await fetch(`${API_BASE_URL}/adjustments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adjustmentData),
    });
    if (!response.ok) {
      throw new Error('Failed to create adjustment');
    }
    return response.json();
  },
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/adjustments`);
    if (!response.ok) {
      throw new Error('Failed to fetch adjustments');
    }
    return response.json();
  }
};