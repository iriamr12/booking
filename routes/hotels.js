var express = require('express');


const {
    createHotel, 
    deleteHotel,
    getHotel,
    getHotels,
    updateHotel,
    countByCity,
    countByType
} = require ("../controllers/hotel")

var router = express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET BY LOCATION
router.get("/countByCity", countByCity)

//GET BY TYPE
router.get("/countByType", countByType)

//GET ALL
router.get("/", getHotels);

module.exports = router;