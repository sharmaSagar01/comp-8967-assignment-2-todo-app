## To Do List App with User Registration &amp; Login

---

This app is a 'To Do List' app with registration and login. Data is read from database, inserted, deleted and updated via API. Transactions are protected by the authentication token generated during registration and login.


![myList](https://user-images.githubusercontent.com/82668865/165477103-f3d5e1dc-51c5-46cd-af1f-f3253cda5bf6.gif)


Password is hashed during registration with `bcryptjs`. The hashed password is compared to the original password at login.

The generated authentication token with `jsonwebtoken` will remain in the local storage for 30 days if not logged out.

---

## Usage

Add `.env` file in root folder.

```
PORT = your port
MONGO_URI = your mongo_uri
JWT_SECRET = your secret key
```

## Install

Backend dependencies:

```
npm install
```

Frontend dependencies:

```
cd frontend
npm install
```

## Run Server and Client

```
npm run server
npm run client
```

---

### MIT License

Copyright (c) 2022 Burkay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
