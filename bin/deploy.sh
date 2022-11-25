echo 'Start'
docker start blog-data &&
cd /home/blog/app/next-blog &&
git fetch &&
git rebase && 
yarn install --production=false &&
npx prisma generate &&
yarn build && 
docker build -t keyu/blog-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d keyu/blog-app &&
echo 'OK'