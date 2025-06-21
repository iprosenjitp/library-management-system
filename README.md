# Library Management API with Express, TypeScript & MongoDB
A Library Management System built with Express, TypeScript, and MongoDB using Mongoose. This project supports book cataloging, borrowing logic, and inventory tracking with schema validation, business rules, and advanced Mongoose features like middleware, statics, and aggregation pipelines.

| Field      | Type     | Required  | Validation / Notes                      |
| ---------- | -------- | --------- | --------------------------------------- |
| `book`     | ObjectId | ✅ Yes    | References the `Book` model             |
| `quantity` | Number   | ✅ Yes    | Must be a **positive** integer          |
| `dueDate`  | Date     | ✅ Yes    | Date by which the book must be returned |
