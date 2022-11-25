echo 'Start'
docker start blog-data &&
cd /home/blog/app/next-blog &&
git fetch &&
git rebase && 
yarn install --production=false &&
npx prisma generate &&
yarn build && 
docker build -t keyu/blog-app . &&
exist=`docker inspect --format '{{.State.Running}}' blog-app`
if [ "${exist}" == "true" ]
then
    docker kill blog-app &&
    docker rm blog-app &&
    docker run --name blog-app --network=host -p 3000:3000 -d keyu/blog-app &&
else
    docker run --name blog-app --network=host -p 3000:3000 -d keyu/blog-app &&
fi
echo 'OK'