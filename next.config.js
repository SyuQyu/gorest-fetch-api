/** @type {import('next').NextConfig} */
require("dotenv").config
const nextConfig = {
    env: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN
    }
}

module.exports = nextConfig
