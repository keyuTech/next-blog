// import type { NextPage } from 'next'
// import prisma from 'lib/prisma'

import PostsIndex, { getServerSideProps } from "./posts";

// const Home: NextPage = (props) => {
//   const {users} = props
//   const handleClick = () => {
//     console.log('onClick');
//   }
//   return (
//     <div>
// 
//     </div>
//   )
// }

// export default Home

// export const getServerSideProps = async () => {
//   const users = await prisma.user.findMany()
//   return {
//     props: {
//       users: JSON.parse(JSON.stringify(users))
//     }
//   }
// }
export default PostsIndex

export {getServerSideProps}