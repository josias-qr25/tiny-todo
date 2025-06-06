# Tiny To-Do List

A very small fullstack app. Functional. Simple. Visually appealing.

Flask + React + TypeScript

![Screenshot](https://github.com/josias-qr25/tiny-todo/blob/main/client/public/tiny-todo.png)

**How do I download this?**
```bash
git clone https://github.com/josias-qr25/tiny-todo.git
cd tiny-todo
```

**Set up the backend (server + database).**
```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
>The terminal that says (venv) is for running the server. 

>Open another terminal when it's time to run the frontend. 

>You can always activate the virtual environment (venv) later with this command:
```bash
cd server
source venv/bin/activate
```

**Set up the frontend (web app).**
```bash
cd ../client
npm install
```

**Run the app (you need two separate terminals).**
- **Backend (Terminal 1)**
```bash
cd server
flask run
```

- **Frontend (Terminal 2)**
```bash
cd client
npm run dev
```

> Web app will be running at `http://localhost:5173` or similar.

Open your web browser and visit the link displayed by the client terminal.

