docker start blog-data &&
cd /home/blog/app/next-blog &&
git fetch &&
git rebase && 
yarn install --production=false &&
yarn build && 
docker build -t keyu/blog-app . &&
docker kill blog &&
docker rm blog &&
docker run --name app --network=host -p 3000:3000 -d keyu/blog-app &&
echo 'OK'