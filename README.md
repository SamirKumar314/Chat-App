# Chat App
A simple web-based chat UI.

## Tech stack
- Frontend: HTML, CSS, and JavaScript
- Backend: NodeJS, ExpressJS, and MySQL

## Installation
### 1. Create a database
- Create the database and table as following:

```sql
create database chat_app;
use chat_app;
create table messages (
id int auto_increment primary key,
sender varchar(100) not null,
message text not null,
timestamps timestamp default current_timestamp
);
select * from messages
```

### 2. Install all modules and dependencies and run the backend
- NodeJS should be installed on the system:
```sh
npm install
node .\backend\server.js
```

### 3. Run the frontend
- Open the `index.html` file in a browser or open with live server