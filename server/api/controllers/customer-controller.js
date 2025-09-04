import Customer from '../models/customer-model.js';

export const getAllCustomer = async (_, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Problem get customers" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    
    const { name,  message } = req.body;
    const customer = new Customer({
      name,
      message
    });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: "Problem creating customer" });
    console.log(error);
  }
};

export const updateCustomer = async (req, res) => {
  
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let updatedData = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: "Problem updating customer" });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted" });
  } catch (error) {
    res.status(400).json({ message: "Problem deleting customer" });
  }
};
