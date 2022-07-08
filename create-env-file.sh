touch .env

for envvar in "$@"
do
  echo "$envvar" >> ./packages/example/.env
done