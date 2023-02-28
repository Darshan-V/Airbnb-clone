const createUsers = `create table if not exists users(
    name varchar unique,
    email varchar unique not null,
    password varchar not null,
    created_at timestamp default current_timestamp,
    id serial primary key
)`

const createPlaces = `create table if not exists property(
    name varchar(100),
    address JSON,
    price integer,
    id serial primary key,
    created_at timestamp default current_timestamp,
    type text

)`

const createBookings = `create table if not exists bookings(
    id serial not null,
    check_in date not null ,
    check_out date not null,
    property_id int not null,
    user_id int not null,
    total_price int,
    status varchar,
    created_at timestamp default current_timestamp,
    primary key(id),
    constraint fk_place foreign key(property_id) references property(id),
    constraint fk_user foreign key(user_id) references users(id)
)`

const createImages = `create table if not exists images(
    property_id int primary key  ,
    imageUrl JSON,
    created_at timestamp default current_timestamp,
    constraint fk_property foreign key(property_id) references property(id))`

const createSessions = `create table if not exists sessions(
    user_id int not null,
    session_id varchar not null unique,
    created_at timestamp default current_timestamp,
    constraint fk_user foreign key(user_id) references users(id)
)`

export {
  createBookings,
  createImages,
  createPlaces,
  createUsers,
  createSessions
}
