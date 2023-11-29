certbot certonly --standalone --non-interactive --agree-tos --email $CERTBOT_EMAIL -d $CERTBOT_DOMAIN
cron -f