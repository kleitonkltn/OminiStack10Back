const Dev = require('../models/Dev')
const axios = require('axios')
const arrayAsString = require('../utils/parseStringAsArray')
//index:mostrar_todos, show:mostrar_unico, store:criar, destroy:delatar, update:alterar
module.exports = {
    async index(req, res) {
        const devs = await Dev.find()
        return res.json(devs)
    },
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body
        let dev = await Dev.findOne({ github_username })
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = apiResponse.data

            techsArray = arrayAsString(techs)
            const location = {
                type: 'Point',
                coordinates: [ longitude, latitude ]
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

        }
        return res.json(dev)
    },
    async update(req, res) {
        const { github_username, techs, latitude, longitude } = req.body
        let dev = await Dev.findOne({ github_username })
        if (dev !== null) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = apiResponse.data
            techsArray = arrayAsString(techs)
            const location = {
                type: 'Point',
                coordinates: [ longitude, latitude ]
            }

            try {
                dev = await Dev.updateOne({ _id: dev._id }, {
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                })
                return res.json(dev)
            } catch (error) {
                return res.status(404).json({ error: error.name, code: error.code })
            }
        } else {
            return res.status(204).end()
        }

    }, async show(req, res) {
        const { github_username } = req.params
        const dev = await Dev.findOne({ github_username })
        res.json(dev)
    },
    async destroy(req, res) {
        const { github_username } = req.body
        const dev = await Dev.deleteOne({ github_username })
        res.json(dev)
    }

}