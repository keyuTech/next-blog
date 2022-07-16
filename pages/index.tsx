import type { NextPage } from 'next'
import prisma from 'lib/prisma'
import png from 'assets/images/1.jpg'
import Image from 'next/image';

interface User {
  id: number
  username: string
  password_digest: string
}

interface Props {
  user: User[]
}

const Home: NextPage<Props> = (props) => {
  const {user} = props
  return (
    <div>
      <main>
        <p className={"text-3xl"}>tailwind test</p>
        <Image src={png} alt="image"/>
        {user.map(u => <p className={"text-3xl"} key={u.id}>{u.username}</p>)}
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const user = await prisma.user.findMany({
    where: {
      id: 1
    }

  })
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}
