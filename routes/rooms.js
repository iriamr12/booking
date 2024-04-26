import express from 'express';
import {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms
} from '../controllers/room.js'

const router = express.Router();

router.post("/:hotelid", createRoom);

//UPDATE
router.put("/:id", updateRoom);

//DELETE
router.delete("/:id/:hotelid", deleteRoom);

//GET
router.get("/find/:id", getRoom);

//GET ALL
router.get("/", getRooms);


export default router;