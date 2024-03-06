새싹, 웹 풀스택 기술로 일정관리 서비스 만들기 강의

E:\Frontend\Node.js\sasac>npm start

> sasac@1.0.0 start
> pm2 start src/index.js

[PM2] Spawning PM2 daemon with pm2_home=C:\Users\jskwak\.pm2
[PM2 I/O] Using: Public key: 688iyp3uzphnhwf | Private key: p6ui6s8m02v0544 | Machine name: swdev-5852
[PM2] PM2 Successfully daemonized
[PM2] Starting E:\Frontend\Node.js\sasac\src\index.js in fork_mode (1 instance)
[PM2] Done.
┌────┬──────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name     │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼──────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ index    │ default     │ 1.0.0   │ fork    │ 19496    │ 0s     │ 0    │ online    │ 1.6%     │ 38.8mb   │ jskwak   │ disabled │
└────┴──────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

E:\Frontend\Node.js\sasac>netstat -na| findstr 3000
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING
  TCP    [::]:3000              [::]:0                 LISTENING

E:\Frontend\Node.js\sasac>npm stop

> sasac@1.0.0 stop
> pm2 kill

[PM2] Applying action deleteProcessId on app [all](ids: [ 0 ])
[PM2] [index](0) ✓
[PM2] [v] All Applications Stopped
[PM2] [v] Agent Stopped
[PM2] [v] PM2 Daemon Stopped

E:\Frontend\Node.js\sasac>

