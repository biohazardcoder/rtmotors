import Car from '../models/car-model.js';
import fs from "fs/promises";
import path from "path";
import {clerkClient} from "@clerk/express"

const IMAGES_DIR = path.resolve("uploads/images");
const VIDEOS_DIR = path.resolve("uploads/videos");

function getFileNameFromUrl(url) {
  return url.split("/").pop(); 
}

export const getAllCar = async (_, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Problem get cars" });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Problem get car" });
  }
};

export const createCar = async (req, res) => {
  try {
  const { name,
  brand,
  description,
  oldPrice,
  currentPrice,
  miles,
  fuelType,
  transmission,
  year,
  stock,
  type } = req.body;
    const car = new Car({
      name,
      brand,
      description,
      oldPrice,
      currentPrice,
      miles,
      fuelType,
      transmission,
      year,
      stock,
      type,
      images: req.uploadedImages,
    });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: "Problem creating car" });
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    let updatedData = req.body;

    if (req.uploadedImages && req.uploadedImages.length > 0) {
      if (car.images && car.images.length > 0) {
        for (const imageUrl of car.images) {
          const fileName = getFileNameFromUrl(imageUrl);
          const oldImagePath = path.join(IMAGES_DIR, fileName);
          try {
            await fs.unlink(oldImagePath);
          } catch (err) {
            console.error("Error deleting old image:", err.message);
          }
        }
      }
      updatedData.images = req.uploadedImages;
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: "Problem updating car" });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.images && car.images.length > 0) {
      for (const imageUrl of car.images) {
        const fileName = getFileNameFromUrl(imageUrl);
        const imagePath = path.join(IMAGES_DIR, fileName);
        try {
          await fs.unlink(imagePath);
        } catch (err) {
          console.error("Error deleting image file:", err.message);
        }
      }
    }

    res.status(200).json({ message: "Car deleted" });
  } catch (error) {
    res.status(400).json({ message: "Problem deleting car" });
  }
};

export const AddCommentary = async (req, res) => {
    try {
        const { id, userId, message,rating} = req.body

        const car = await Car.findById(id)
        const user =  await clerkClient.users.getUser(userId);
        car.comments.push({
               user:{
                    name: user.fullName,
                    userId: user.id,
                    avatar : user.imageUrl,
                },
                message: message,
                rating: rating || 5
        })

        await car.save()
        res.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding comment" });
    }
} 


export const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;

        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        car.comments = car.comments.filter(comment => comment._id.toString() !== commentId);
        await car.save();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting comment" });
    }
}


export const AddVideo = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        if (req.uploadedVideo && req.uploadedVideo[0]) {
            if (car.video) {
                const fileName = getFileNameFromUrl(car.video);
                const oldVideoPath = path.join(VIDEOS_DIR, fileName);

                try {
                    await fs.unlink(oldVideoPath);
                } catch (err) {
                    console.error("Error deleting old video:", err.message);
                }
            }
            car.video = req.uploadedVideo;

        }
        
        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ message: "Problem adding video" });
    }
}

export const DeleteVideo = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        if (car.video) {
            const fileName = getFileNameFromUrl(car.video);
            const videoPath = path.join(VIDEOS_DIR, fileName);

            try {
                await fs.unlink(videoPath);
            } catch (err) {
                console.error("Error deleting video file:", err.message);
            }
        }

        


        car.video = null;
        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ message: "Problem deleting video" });
        console.log(error);
        
    }
  }
