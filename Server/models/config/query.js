const createUsers = `create table if not exists users(
    name varchar unique,
    email varchar unique not null,
    password varchar,
    id serial primary key
)`

const createPlaces = `create table if not exists property(
    name varchar(100),
    address JSON,
    price integer,
    id serial primary key,
    type text

)`

const createBookings = `create table if not exists bookings(
    id serial not null,
    check_in date not null ,
    check_out date not null,
    property_id int not null,
    user_id int not null,
    total_price int,
    primary key(id),
    constraint fk_place foreign key(property_id) references property(id),
    constraint fk_user foreign key(user_id) references users(id)
)`

const createImages = `create table if not exists images(
    property_id int primary key  ,
    imageUrl JSON,
    constraint fk_property foreign key(property_id) references property(id))`

export { createBookings, createImages, createPlaces, createUsers }
