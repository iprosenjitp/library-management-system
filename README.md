# Library Management API with Express, TypeScript & MongoDB
This is a RESTful API for managing a library system, built with Express.js, TypeScript, and MongoDB using Mongoose. It allows users to manage a collection of books and borrowing records, with robust schema validation, filtering, and business logic enforcement.

The project showcases real-world backend development practices including:

- Schema validation and custom error messages

- Business logic enforcement, such as availability control during borrow

- Aggregation pipelines for filtering and sorting

- Use of Mongoose static and instance methods

- Implementation of pre/post middleware hooks

- Filtering, sorting, and pagination features in book retrieval

This project is ideal for learning how to build a full-featured API backend with modern best practices using TypeScript and MongoDB.

## Key Features:
- **Book Management**
    - Create, retrieve, and list books

    - Schema validation with required fields

    - Genre-based filtering and dynamic sorting using query parameters

    - Book availability status auto-updates when copies run out

- **Borrowing System**
    - Borrow books with quantity and due date

    - Validates if requested quantity is available

    - Automatically deducts borrowed copies and updates availability

    - Ensures referential integrity with book references

- **Mongoose Features**

    - Schema validation rules

    - Business logic via instance/static methods

    - Middleware (pre/post hooks) for post-borrow updates

    - Aggregation pipeline for filtered/sorted book queries


## Tech Stack:

**Backend:** Express.js \
**Language:** TypeScript \
**Database:** MongoDB with Mongoose \
**Build Tool:** TypeScript Compiler (tsc) \
**Validation & Logic:** Mongoose schema, methods, and middleware


## Data Models

**Book Model**
| Field         | Type    | Required | Validation / Notes                                                  |
| ------------- | ------- | -------- | ------------------------------------------------------------------- |
| `title`       | String  | ✅ Yes    | Title of the book                                                   |
| `author`      | String  | ✅ Yes    | Author name                                                         |
| `genre`       | String  | ✅ Yes    | One of: FICTION, NON\_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY |
| `isbn`        | String  | ✅ Yes    | Must be unique                                                      |
| `description` | String  | ❌ No     | Optional summary                                                    |
| `copies`      | Number  | ✅ Yes    | Must be a non-negative integer                                      |
| `available`   | Boolean | ❌ No     | Defaults to `true`. Updated automatically based on copies           |


**Borrow Model**
| Field      | Type     | Required  | Validation / Notes                      |
| ---------- | -------- | --------- | --------------------------------------- |
| `book`     | ObjectId | ✅ Yes    | References the `Book` model             |
| `quantity` | Number   | ✅ Yes    | Must be a **positive** integer          |
| `dueDate`  | Date     | ✅ Yes    | Date by which the book must be returned |
