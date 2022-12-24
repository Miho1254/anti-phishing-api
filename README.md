# discord-phishing-backend
- Discord Phishing API with Redis and Docker
- Author: https://github.com/phamleduy04/discord-phishing-backend
- Public API: http://wamvn.net:1120/

# API Endpoints
## Authorization
Some API requests require the use of a generated API key. To set API key, please add `AUTHORIZATION` to your `.env` file. If not the default API key is `secret`. To authenticate an API request, you should provide your API key in the Authorization header.

| Method | Endpoint | Description | Require Authorzation Header? |
| :--- | :--- | :--- | :--- |
| `GET` | `/all` | Get all data (includes blacklist links and domains) | No |
| `GET` | `/links` | Get all blacklist domains | No |
| `GET` | `/check?url={query}` | Check if a url is in blacklist | No |
| `GET` | `/trace-redirect?url={query}` | Trace redirect a url (shorten link) | No |
| `POST` | `/adddomain` | Add domain to blacklist **(Require url in body)** | Yes |
| `POST` | `/addlink` | Add link to blacklist **(Require url in body)** | Yes |

# Installation (Miho note)
## Without Docker
### Project
1. Clone the project
2. Rename `example.env` to `.env`
3. Change `REDIS_HOST` to your host (usually `localhost`)
4. Change others variable to fit your environment (`REDIS_PORT`, `REDIS_PASSWORD`, `PORT`, `TIMEZONE`)
5. Install package using `npm install` or `yarn install`
6. Install `redis` using `sudo pacman -S redis` (Arch linux) `sudo apt install redis` (Debian based)
7. Run redis server under background using command `redis-server --daemonize yes`
8. Install redis for nodeJS using `npm i redis`
9. Run `npm start`

## With Docker (not tested yet)
1. Clone the project
2. Rename `example.env` to `.env`
3. Change others variable to fit your environment (`PORT`, `TIMEZONE`)
4. Run `docker-compose up -d` to run the container

## Running with pm2 (not tested yet)
- Run as `pm2 start npm --name "app name" -- start`<br><br>
Example: `pm2 start npm --name "cool-anti-phishing" -- start` 

# Miho note (9/12/2022)
- Không cần file json vì source tự fetch api từ các nguồn và quăng vào redis.
- File json chỉ phục vụ cho việc open source api của author project, mình không cần quan tâm tới 2 file đấy.
- Hiện chưa có nhu cầu update lại các file trong api vì đã đủ dùng và fetch api khá ổn.
- Trong vps có thể dùng redis-cli để thao tác với server (get/set cơ bản).
- Khi chạy trên vps thì đừng kill redis `(pkill redis)` nếu như không có nhu cầu. (để nó chạy 24/7 ko sao vì nó ăn ít ram lắm).
- Port cơ bản của redis là `6379` và port hiện tại expressJS là `1254`.
- Khi gọi api từ tbchan bằng axios thì cứ gọi `localhost:1254/all`.