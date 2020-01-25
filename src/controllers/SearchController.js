const Dev = require('../models/Dev')
const axios = require('axios')
const arrayAsString = require('../utils/parseStringAsArray')
module.exports = {
    async index(req, res) {
        console.log(req.query)
        const { latitude, longitude, techs } = req.query
        techsArray = arrayAsString(techs)

        const dev = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [ longitude, latitude ]
                    },
                    $maxDistance: 10000,
                }
            }
        })
        res.json(dev)

    }
}