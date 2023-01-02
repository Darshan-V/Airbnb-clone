const createUsers = `create table if not exists users(
    name text,
    password varchar,
    id serial primary key
)`

const createPlaces = `create table if not exists property(
    name varchar(100),
    address JSON,
    price varchar(10),
    id serial primary key,
    type text

)`

const createBookings = `create table if not exists bookings(
    id serial not null,
    check_in varchar(20) not null,
    check_out varchar(20) not null,
    property_id int,
    user_id int,
    total_price int,
    primary key(id),
    constraint fk_place foreign key(property_id) references property(id),
    constraint fk_user foreign key(user_id) references users(id)
)`

const createImages = `create table if not exists images(
    property_id int ,
    images JSON,
    constraint fk_place foreign key(property_id) references property(id)
)`

export { createBookings, createImages, createPlaces, createUsers }
