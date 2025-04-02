const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  try {
    const { userId, technicalDesc, nonTechnicalDesc, review, extraCarricular, events, innovation, posted_linkedin } = req.body;
    console.log(technicalDesc);
    const dateNow = new Date().toISOString().split("T")[0];
    const employee = new Employee({
      userId,
      technicalDesc,
      nonTechnicalDesc,
      review,
      extraCarricular,
      events,
      posted_linkedin,
      innovation,
      date: dateNow
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.log("there is an error: ", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.status(200).json(employee);
  } catch (error) {
    console.error("There is an error:", error);
    res.status(500).json({ message: "server error" });
  }
};

const singleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.log("there is an error", error);
    res.status(500).json({ message: "server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { technicalDesc, nonTechnicalDesc, review, extraCarricular, innovation, events, posted_linkedin } = req.body;
    const { id } = req.params; // Extract id from parameters

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        technicalDesc,
        nonTechnicalDesc,
        review,
        extraCarricular,
        events,
        posted_linkedin,
        innovation,
        date: new Date().toISOString().split("T")[0],
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.log("Error updating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// New function to get employee details by userId and date
const getEmployeeByUserIdAndDate = async (req, res) => {
  try {
    const { userId, date } = req.params;

    // Find the employee record matching the userId and date
    const employee = await Employee.findOne({ userId: userId, date: date });

    if (!employee) {
      return res.status(404).json({ message: 'Employee details not found for this date' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee details by user and date:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserLearnings = async (req, res) => {
    const { id, dateAdd } = req.params; 
    console.log("User ID:", id, "Date:", dateAdd);
  
    // Validate dateAdd
    if (!dateAdd || isNaN(Date.parse(dateAdd))) {
        return res.status(400).json({ message: "Invalid or missing date" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Filter learnings based on valid date
        const filteredLearnings = user.learnings.filter(
            (learning) => learning.dateAdded === dateAdd
        );

        if (filteredLearnings.length === 0) {
            return res.status(404).json({ message: "No learnings found for the given date" });
        }

        console.log("Filtered Learnings:", filteredLearnings);
        res.status(200).json(filteredLearnings);
    } catch (err) {
        console.error("Error fetching learnings:", err);
        res.status(500).json({ message: "An error occurred while fetching learnings" });
    }
};


const deleteEmployee = async (req, res) => {
  try {
    const deleteEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deleteEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('there is an error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  singleEmployee,
  getUserLearnings,
  updateEmployee,
  deleteEmployee,
  getEmployeeByUserIdAndDate, // Export the new function
};