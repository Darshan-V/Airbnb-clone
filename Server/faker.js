import { faker } from "@faker-js/faker"
import { pool } from "./models/config/init.js"
async function insertFake() {
  const type = ["island", "poolside", "camping"]
  for (let i = 0; i < 10; i++) {
    let name = faker.address.cityName()
    let address = faker.address.city()
    let latitude = faker.address.latitude()
    let longitude = faker.address.longitude()
    let price = faker.commerce.price(2000, 20000)
    let fullAddress = {
      location: `${name},${address}`,
      lat: latitude,
      long: longitude
    }
    price = Number(price)
    let ptype = type[Math.floor(Math.random() * type.length)]
    await pool.query(
      "insert into property(name,address,price,type) values($1, $2, $3, $4)",
      [name, fullAddress, price, ptype]
    )
    // console.log(name, price, fullAddress)
    // console.log(ptype)
  }
}

async function fakerImages() {
  let store = []
  for (let i = 0; i < 10; i++) {
    let images = faker.image.nature(800, 800, true)
    store.push(images)
  }
  store = JSON.stringify(store)
  for (let i = 24; i <= 33; i++) {
    // await pool.query(
    //   "insert into images(property_id,Imageurl) values($1, $2)",
    //   [i, store]
    // )
    console.log(i, store)
  }
}
fakerImages()
