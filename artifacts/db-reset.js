#!/usr/bin/env nodejs

"use strict";

// This script initializes the database. You can set the environment variable
// before running it (default: development). ie:
// NODE_ENV=production node artifacts/db-reset.js

const { MongoClient } = require("mongodb");
const { db } = require("../config/config");

const USERS_TO_INSERT = [
    {
        "_id": 1,
        "userName": "admin",
        "firstName": "Node Goat",
        "lastName": "Admin",
        "password": "Admin_123",
        //"password" : "$2a$10$8Zo/1e8KM8QzqOKqbDlYlONBOzukWXrM.IiyzqHRYDXqwB3gzDsba", // Admin_123
        "isAdmin": true
    }, {
        "_id": 2,
        "userName": "6210110097",
        "firstName": "ณภัทร",
        "lastName": "บริรักษ์กิจดำรง",
        "benefitStartDate": "2030-01-10",
        "password": "kokowa_aeiou"
        // "password" : "$2a$10$RNFhiNmt2TTpVO9cqZElb.LQM9e1mzDoggEHufLjAnAKImc6FNE86",// User1_123
    }, {
        "_id": 3,
        "userName": "6210110107",
        "firstName": "ณัฐนัย",
        "lastName": "ยาพระจันทร์",
        "benefitStartDate": "2025-11-30",
        "password": "kokowa_aeiou"
        //"password" : "$2a$10$Tlx2cNv15M0Aia7wyItjsepeA8Y6PyBYaNdQqvpxkIUlcONf1ZHyq", // User2_123
    }, {
        "_id": 4,
        "userName": "6210110431",
        "firstName": "อาฟิตดีน",
        "lastName": "สะมะแอ",
        "benefitStartDate": "2025-11-30",
        "password": "kokowa_aeiou"
        //"password" : "$2a$10$Tlx2cNv15M0Aia7wyItjsepeA8Y6PyBYaNdQqvpxkIUlcONf1ZHyq", // User2_123
    }, {
        "_id": 5,
        "userName": "6210110502",
        "firstName": "นพนนท์",
        "lastName": "ลิ่มสกุล",
        "benefitStartDate": "2025-11-30",
        "password": "kokowa_aeiou"
        //"password" : "$2a$10$Tlx2cNv15M0Aia7wyItjsepeA8Y6PyBYaNdQqvpxkIUlcONf1ZHyq", // User2_123
    }, {
        "_id": 6,
        "userName": "6210110747",
        "firstName": "ณัฐธิดา",
        "lastName": "คลองเเค",
        "benefitStartDate": "2025-11-30",
        "password": "kokowa_aeiou"
        //"password" : "$2a$10$Tlx2cNv15M0Aia7wyItjsepeA8Y6PyBYaNdQqvpxkIUlcONf1ZHyq", // User2_123
    }];

    const COURSE_TO_INSERT = [
        {
            "_id": 1,
            "course_id": "240-302",
            "title": "ปฏิบัติการวิศวกรรมคอมพิวเตอร์ขั้นสูง 2",
            "credit": "1(0-3-0)",
            "status": "OK",
            "userId": 5
        },
        {
            "_id": 2,
            "course_id": "240-309",
            "title": "ไมโครคอนโทรลเลอร์และการเชื่อมต่อ",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 5
        },
        {
            "_id": 3,
            "course_id": "240-310",
            "title": "การออกแบบและวิเคราะห์ขั้นตอนวิธี",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 5
        },
        {
            "_id": 4,
            "course_id": "240-311",
            "title": "คอมพิวเตอร์แบบกระจายและเทคโนโลยีเว็บ",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 5
        },
        {
            "_id": 5,
            "course_id": "240-312",
            "title": "ความมั่นคงของคอมพิวตอร์",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 5
        },
        {
            "_id": 6,
            "course_id": "240-212",
            "title": "ความน่าจะเป็นและสถิติ",
            "credit": "3(3-0-6)",
            "status": "W",
            "userId": 5
        },
        {
            "_id": 7,
            "course_id": "240-214",
            "title": "การสื่อสารข้อมูลและเครือข่าย",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 5
        },
        {
            "_id": 8,
            "course_id": "200-107",
            "title": "การเชื่อมต่อสรรพสิ่งเพื่อชีวิตยุคดิจิทัล",
            "credit": "2(2-0-4)",
            "status": "OK",
            "userId": 5
        },
        {
            "_id": 9,
            "course_id": "240-302",
            "title": "ปฏิบัติการวิศวกรรมคอมพิวเตอร์ขั้นสูง 2",
            "credit": "1(0-3-0)",
            "status": "OK",
            "userId": 4
        },
        {
            "_id": 10,
            "course_id": "240-309",
            "title": "ไมโครคอนโทรลเลอร์และการเชื่อมต่อ",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 4
        },
        {
            "_id": 11,
            "course_id": "240-310",
            "title": "การออกแบบและวิเคราะห์ขั้นตอนวิธี",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 4
        },
        {
            "_id": 12,
            "course_id": "240-311",
            "title": "คอมพิวเตอร์แบบกระจายและเทคโนโลยีเว็บ",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 4
        },
        {
            "_id": 13,
            "course_id": "240-312",
            "title": "ความมั่นคงของคอมพิวตอร์",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 4
        },
        {
            "_id": 14,
            "course_id": "240-212",
            "title": "ความน่าจะเป็นและสถิติ",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 4
        },
        {
            "_id": 15,
            "course_id": "240-214",
            "title": "การสื่อสารข้อมูลและเครือข่าย",
            "credit": "3(3-0-6)",
            "status": "OK",
            "userId": 4
        },
        {
            "_id": 16,
            "course_id": "200-107",
            "title": "การเชื่อมต่อสรรพสิ่งเพื่อชีวิตยุคดิจิทัล",
            "credit": "2(2-0-4)",
            "status": "OK",
            "userId": 4
        },

    ];

const tryDropCollection = (db, name) => {
    return new Promise((resolve, reject) => {
        db.dropCollection(name, (err, data) => {
            if (!err) {
                console.log(`Dropped collection: ${name}`);
            }
            resolve(undefined);
        });
    });
}

const parseResponse = (err, res, comm) => {
    if (err) {
        console.log("ERROR:");
        console.log(comm);
        console.log(JSON.stringify(err));
        process.exit(1);
    }
    console.log(comm);
    console.log(JSON.stringify(res));
}


// Starting here
MongoClient.connect(db, (err, db) =>  {
    if (err) {
        console.log("ERROR: connect");
        console.log(JSON.stringify(err));
        process.exit(1);
    }
    console.log("Connected to the database");

    const collectionNames = [
        "users",
        "allocations",
        "contributions",
        "memos",
        "counters"
    ];

    // remove existing data (if any), we don't want to look for errors here
    console.log("Dropping existing collections");
    const dropPromises = collectionNames.map((name) => tryDropCollection(db, name));

    // Wait for all drops to finish (or fail) before continuing
    Promise.all(dropPromises).then(() => {
        const usersCol = db.collection("users");
        const coursesCol = db.collection("courses");
        const allocationsCol = db.collection("allocations");
        const countersCol = db.collection("counters");

        // reset unique id counter
        countersCol.insert({
            _id: "userId",
            seq: 3
        }, (err, data) => {
            parseResponse(err, data, "countersCol.insert");
        });

        // insert admin and test users
        console.log("Users to insert:");
        USERS_TO_INSERT.forEach((user) => console.log(JSON.stringify(user)));


        usersCol.insertMany(USERS_TO_INSERT, (err, data) => {
            const finalAllocations = [];

            // We can't continue if error here
            if (err) {
                console.log("ERROR: insertMany");
                console.log(JSON.stringify(err));
                process.exit(1);
            }
            parseResponse(err, data, "users.insertMany");

            data.ops.forEach((user) => {
                const stocks = Math.floor((Math.random() * 40) + 1);
                const funds = Math.floor((Math.random() * 40) + 1);

                finalAllocations.push({
                    userId: user._id,
                    stocks: stocks,
                    funds: funds,
                    bonds: 100 - (stocks + funds)
                });
            });

            console.log("Allocations to insert:");
            finalAllocations.forEach(allocation => console.log(JSON.stringify(allocation)));

            allocationsCol.insertMany(finalAllocations, (err, data) => {
                parseResponse(err, data, "allocations.insertMany");
                console.log("Database reset performed successfully")
                process.exit(0);
            });

            coursesCol.insertMany(COURSE_TO_INSERT, (err, data) => {
                if (err) {
                    console.log("ERROR: insertMany");
                    console.log(JSON.stringify(err));
                    process.exit(1);
                }
            })

        });
    });
});
