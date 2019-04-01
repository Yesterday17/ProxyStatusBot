# ProxyStatusBot

## Docker

```bash
docker pull yesterday17/proxy-status-checker
docker run --name status-checker -p=8888:8080 -d \
           --env TELEGRAM_TOKEN="YOUR_TELEGRAM_TOKEN" \
           --env SERVER_IP="MTPROXY_SERVER_IP" \
           --env CHECKER_ADDR="PROXY_STATUS_CHECKER_ADDR" \
           --env DD_PADDING="MTPROXY_HAS_DD_PADDING" \
           --env MTPROXY_PASS="MTPROXY_PASS"
           --env ADMIN_ID="" \
           --env GROUP_ID="" \
           --env SUPER_GROUP_ID="" \
           yesterday17/proxy-status-bot
```
