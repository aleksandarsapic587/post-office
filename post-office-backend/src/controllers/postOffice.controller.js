import PostOffice from "../models/PostOffice.js";

// Get all post offices
export const getPostOffices = async (req, res) => {
  try {
    const postOffices = await PostOffice.find();
    res.json(postOffices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new post office
export const createPostOffice = async (req, res) => {
  try {
    const postOffice = new PostOffice(req.body);
    await postOffice.save();
    res.status(201).json(postOffice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update post office
export const updatePostOffice = async (req, res) => {
  try {
    const postOffice = await PostOffice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(postOffice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete post office
export const deletePostOffice = async (req, res) => {
  try {
    await PostOffice.findByIdAndDelete(req.params.id);
    res.json({ message: "Post Office deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
