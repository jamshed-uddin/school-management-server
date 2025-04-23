## Run the server locally

1.**Clone the repository:**

```bash
 git clone https://github.com/jamshed-uddin/school-management-server.git
 cd school-management-server
```

2.**Install the packages**

```sh
 npm install
```

2.**Setup environment variables**
Create a `.env` file in the root directory and add these environment variables.

```sh
PORT=port
DBURI=your_mySql_uri

```

## Run the server

```sh
node index.js
```

## API endpoints

### Endpoint documentation(postman)

[]()

### 1. Add school

- Route: `POST /api/school `
- Access: Public
- Body

```json
{
  "name": "school 8",
  "address": "Address 8",
  "latitude": 23.33,
  "longitude": 16.32
}
```

- Response

```json
{
  "message": "School added successfully"
}
```

### 2. Get all schools (pagination and sort by geographical distance )

- Route: `GET /api/schools?latitude=23.32&longitude=34.23&page=1&limit=15 `
- Access: Public
- Query parameters

```
latitude
longitude
page(optional)
limit(optional)
```

- Response

```json
{
  "data": [
    {
      "id": 2,
      "name": "school 2",
      "address": "adress 2",
      "latitude": 23.33,
      "longitude": 32.32
    },
    {
      "id": 3,
      "name": "school 4",
      "address": "adress 4",
      "latitude": 25.33,
      "longitude": 36.32
    },
    {
      "id": 4,
      "name": "school 5",
      "address": "address 5",
      "latitude": 23.33,
      "longitude": 16.32
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 15,
    "totalSchools": 4,
    "totalPages": 1
  }
}
```
