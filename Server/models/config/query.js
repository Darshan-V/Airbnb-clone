const createUsers = `create table if not exists users(
    username text,
    password varchar,
    userid serial primary key 
)`

const createPlaces = `create table if not exists places(
    placename varchar(100),
    environment varchar(200),
    address varchar(200),
    totaloccupancy integer,
    totalbedrooms integer,
    totalbathrooms integer,
    hastv boolean,
    hasinternet boolean,
    hasaircon boolean,
    hasheater boolean,
    price varchar(10),
    longitude varchar(30),
    lattitude varchar(30),
    placeid serial primary key
)`

const createBookings = `create table if not exists bookings(
    bookingid serial,
    checkin varchar(20) not null,
    checkout varchar(20) not null,
    placeid int,
    userid int,
    bookingstatus boolean,
    nights varchar(2),
    primary key(bookingid),
    constraint fk_place foreign key(placeid) references places(placeid),
    constraint fk_user foreign key(userid) references users(userid)
)`

const createImages = `create table if not exists images(
    imageId serial,
    homeMainPicUrl text,
    carouselPic1Url text,
    carouselPic2Url text,
    carouselPic3Url text,
    carouselPic4Url text,
    carouselPic5Url text,
    placeid int,
    primary key (imageId),
    constraint fk_place foreign key(placeid) references places(placeid)
)`

export { createBookings, createPlaces, createUsers, createImages }
