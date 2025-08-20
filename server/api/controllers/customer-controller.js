import Customer from '../models/customer-model.js';
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.resolve("uploads/images");

function getFileNameFromUrl(url) {
  return url.split("/").pop(); 
}

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
    
    const { name, job, message } = req.body;
    const customer = new Customer({
      name,
      image: req.uploadedImages[0],
      job,
      message
    });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: "Problem creating customer" });
  }
};

export const updateCustomer = async (req, res) => {
  
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let updatedData = req.body;

    if (req.uploadedImages && req.uploadedImages[0]) {
      if (customer.image) {
        const fileName = getFileNameFromUrl(customer.image);
        const oldImagePath = path.join(IMAGES_DIR, fileName);

        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.error("Error deleting old image:", err.message);
        }
      }
      updatedData.image = req.uploadedImages[0];
    }

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

    if (customer.image) {
      const fileName = getFileNameFromUrl(customer.image);
      const imagePath = path.join(IMAGES_DIR, fileName);

      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error("Error deleting image file:", err.message);
      }
    }

    res.status(200).json({ message: "Customer deleted" });
  } catch (error) {
    res.status(400).json({ message: "Problem deleting customer" });
  }
};
