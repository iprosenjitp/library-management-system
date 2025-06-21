# Library Management API with Express, TypeScript & MongoDB
This is a RESTful API for managing a library system, built with Express.js, TypeScript, and MongoDB using Mongoose. It allows users to manage a collection of books and borrowing records, with robust schema validation, filtering, and business logic enforcement.

**The project showcases real-world backend development practices including:**
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


## Project Structure
```
library-management-system/
├── src/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── book.controller.ts
│   │   │   └── borrow.controller.ts
│   │   ├── interfaces/
│   │   │   ├── book.interface.ts
│   │   │   └── borrow.interface.ts
│   │   └── models/
│   │       ├── book.model.ts
│   │       └── borrow.model.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation & Setup
**Follow the steps below to set up and run the project locally:**

**1. Clone the Repository** 
```
git clone https://github.com/iprosenjitp/library-management-system.git
cd library-management-system
```

**2. Install Dependencies** \
Make sure you have Node.js and npm installed.
```
npm install
```

**3. Connect MongoDB** \
Open `src/app/server.ts` and replace the MongoDB URI:

```await mongoose.connect("YOUR_MONGODB_URI");```


**4. Start the Server** \
```npm run dev```

The server will run at: ```http://localhost:5000```


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


## API Routes
**Book Routes**
| Method | Endpoint         | Description                                              |
| ------ | ---------------- | -------------------------------------------------------- |
| POST   | `/api/books`     | Add a new book                                           |
| GET    | `/api/books`     | Get all books with filtering, sorting, and limit options |
| GET    | `/api/books/:id` | Get a single book by ID                                  |
| PATCH  | `/api/books/:id` | Update an existing book                                  |
| DELETE | `/api/books/:id` | Delete a book                                            |

**Query Parameters for `GET /api/books`:**
- **filter:** Filter by genre (e.g., FANTASY)
- **sortBy:** Field to sort by (e.g., createdAt)
- **sort:** asc or desc
- **limit:** Number of results to return (default: 10)

**Borrow Routes**
| Method | Endpoint      | Description                                   |
| ------ | ------------- | --------------------------------------------- |
| POST   | `/api/borrow` | Borrow a book with quantity and due date      |
| GET    | `/api/borrow` | Get borrowed books summary (with aggregation) |

**Borrow a Book**
`POST /api/borrow`

Borrows a specific book after checking availability.

**Business Logic:**
- Checks if enough copies of the book are available.
- Deducts the requested quantity from the book's total copies.
- If copies become 0, updates available to false.
- Saves the borrow record with details.

**Borrowed Books Summary**
`GET /api/borrow`

Returns a summary of total borrowed quantities per book using aggregation.

**Purpose:**
- Show how many times each book has been borrowed and in what quantity.
- Useful for analytics or dashboard insights.

**Aggregation Logic:**
- Group borrow records by book ID
- Sum up the total quantity borrowed
- Populate book `title` and `isbn`


### Author 
[Prosenjit Pal](https://www.linkedin.com/in/iprosenjitp/)