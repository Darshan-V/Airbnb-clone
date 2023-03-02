import { faker } from "@faker-js/faker"
import { pool } from "./models/config/init.js"
async function insertFake() {
  const type = [
    "island",
    "poolside",
    "camping",
    "beachside",
    "tropical",
    "manison",
    "privatevilla",
    "arctic",
    "farmhouse"
  ]
  for (let i = 0; i <= 500; i++) {
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
  for (let i = 0; i <= 10; i++) {
    let images = faker.image.imageUrl(800, 800, "cat", true)
    store.push(images)
  }
  store = JSON.stringify(store)
  // for (let i = 34; i <= 43; i++) {
  //   // await pool.query(
  //   //   "insert into images(property_id,Imageurl) values($1, $2)",
  //   //   [i, store]
  //   // )
  //   console.log(i, store)
  // }
  return store
}

async function insertImage() {
  for (let i = 1; i <= 501; i++) {
    let images = await fakerImages()
    await pool.query(
      "insert into images(property_id,Imageurl) values($1, $2)",
      [i, images]
    )
  }
}
// fakerImages()
// insertImage()
// insertFake()
