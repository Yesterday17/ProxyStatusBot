# ProxyStatusBot

## Docker

```bash
docker pull yesterday17/proxy-status-bot
docker run --name proxy-status-bot -p=8888:8080 -d \
           --env TELEGRAM_TOKEN="YOUR_TELEGRAM_TOKEN" \
           --env SERVER_IP="MTPROXY_SERVER_IP" \
           --env CHECKER_ADDR="PROXY_STATUS_CHECKER_ADDR" \
           --env DD_PADDING="MTPROXY_HAS_DD_PADDING" \
           --env MTPROXY_PASS="MTPROXY_PASS"
           --env ADMIN_ID="ID_OF_ADMIN" \
           --env GROUP_ID="ID_OF_GROUP" \
           --env SUPER_GROUP_ID="ID_OF_SUPERGROUP" \
           yesterday17/proxy-status-bot
```
