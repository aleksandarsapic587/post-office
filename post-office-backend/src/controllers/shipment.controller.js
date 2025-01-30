import Shipment from "../models/Shipment.js";

// Get all shipments
export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.aggregate([
      {
        $lookup: {
          from: "postoffices", // Collection name (case-sensitive)
          localField: "origin_zip_code",
          foreignField: "zip_code",
          as: "origin"
        }
      },
      {
        $lookup: {
          from: "postoffices",
          localField: "destination_zip_code",
          foreignField: "zip_code",
          as: "destination"
        }
      },
      {
        $addFields: {
          origin_address: { $arrayElemAt: ["$origin.location", 0] },
          destination_address: { $arrayElemAt: ["$destination.location", 0] }
        }
      },
      {
        $project: {
          origin: 0,
          destination: 0 // Remove the original arrays
        }
      }
    ]);

    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Add new shipment
export const createShipment = async (req, res) => {
  try {
    console.log(req.body);
    const shipment = new Shipment(req.body);
    await shipment.save();
    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update shipment
export const updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete shipment
export const deleteShipment = async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    res.json({ message: "Shipment deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
