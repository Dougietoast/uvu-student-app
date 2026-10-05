# UVU Student App — IT 3200 M6: Web in a Box

A small React (Vite) app that displays my full name and UVU student ID,
packaged with Docker and deployed to an AWS EC2 Linux VM.

- Web page: `http://<PUBLIC-IP>:3000/`
- JSON output: `http://<PUBLIC-IP>:3000/student.json`

## Project structure

| File | Purpose |
|---|---|
| `public/student.json` | Student data (name, ID, course, message, meme). The page reads this file, and it is also served directly as JSON. |
| `src/App.jsx` | React component that fetches `student.json` and renders it. |
| `src/main.jsx` | Entry point that mounts `<App />` into `index.html`. |
| `src/App.css` | Styling. |
| `index.html` | The single HTML page the browser loads. |
| `package.json` / `package-lock.json` | Dependencies and npm scripts. |
| `vite.config.js` | Vite build configuration. |
| `Dockerfile` | Multi-stage build: Node builds the app, nginx serves it on port 3000. |
| `nginx.conf` | nginx server config (listens on port 3000). |
| `.dockerignore` | Keeps `node_modules`, `dist`, and `.git` out of the image build. |

## Run locally (Node.js 20+)

```bash
npm install
npm run dev
```

## Run with Docker

```bash
docker build -t student-app .
docker run -d -p 3000:3000 --name student-app student-app
docker ps
```

Open http://localhost:3000

## Deploy to AWS EC2

1. Launch an Ubuntu EC2 instance (t2.micro or t3.micro) with a public IP.
2. Security group inbound rules: SSH (22) from my IP, Custom TCP 3000 from 0.0.0.0/0.
3. SSH in, install Docker Engine, then:

```bash
git clone https://github.com/Dougietoast/uvu-student-app.git
cd uvu-student-app
docker build -t student-app .
docker run -d -p 3000:3000 --name student-app --restart unless-stopped student-app
```

4. Browse to `http://<PUBLIC-IP>:3000`
