# Node.js Express File Upload API

## Description
This is a simple Node.js and Express API that allows users to upload files.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/akashelhance/file-upload-backend
   ```
2. Navigate to the project directory:
   ```sh
   cd file-upload-backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage
### Start the server
Run the following command to start the server:
```sh
 npm start
```
By default, the server runs on `http://localhost:5000`.

### API Endpoints
#### Upload a File
- **URL:** `POST http://localhost:5000/api/upload`
- **Headers:** `Content-Type: multipart/form-data`
- **Body:** 
  - `file` (Required) - The file to be uploaded.
- **Response:**
  ```json
  {
    "message": "File uploaded and processed successfully",
    "data": [
        {
            "Origin Port": "New York",
            "Destination Port": "London",
            "Container Type": "20ft",
            "Ocean Freight Rate": 1500,
            "Carrier": "Maersk",
            "Effective Date": "2024-03-07"
        },
        {
            "Origin Port": "Los Angeles",
            "Destination Port": "Tokyo",
            "Container Type": "40ft",
            "Ocean Freight Rate": 2200,
            "Carrier": "MSC",
            "Effective Date": "2024-03-08"
        },
        {
            "Origin Port": "Shanghai",
            "Destination Port": "Hamburg",
            "Container Type": "40ft",
            "Ocean Freight Rate": 1800,
            "Carrier": "CMA CGM",
            "Effective Date": "2024-03-09"
        }
    ]
  }
  ```



## Dependencies
- `express`
- `multer`
- `dotenv`
- `cors`


