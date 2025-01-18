### Source

> https://www.youtube.com/watch?v=7UQBMb8ZpuE&t=3575s

### This Git

> https://github.com/samedan/2501_JWT_PERN_stack_Register_Login

### Source Git

> https://github.com/ousecTic/pern-jwt-tutorial

### Create DBB

> CREATE DATABASE jwttutorial;

> .env in SERVER Folder

### Add uuid extension to Database

> CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

### SQL Commands

> /server/database.sql

> ADD UUID extension ->psql: CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

### Generate Token

> /utils/jwtGenerator.js

### Use Token

> /routes/jwtAuth.js -> register, login

### Validate Email

> /middleware/validInfo.js

### Get User Data by Sending Token

# Dashboard Route send 'authorization' middleware

> /routes/dashboard.js -> router.get("/", authorization, async (req, res) => {})

# Return user_name if token is valid

### Check token from Frontend on Backend

# Send saved token to backend

> App.js -> checkIsAuth()

# Send True/false from backend after checking token

> backend_Url/auth/is-verify
