import { NextPage } from 'next';
import useSWR from 'swr';
import axios from 'axios';

const SignUp: NextPage = () => {
  const handleSignUpClick = () => {
    axios.post(`/api/v1/users`, {username: '1', password: '2'}).then(() => {}, (error) => {

    })
  };
  return <>
    <h1>注册</h1>
    <button onClick={handleSignUpClick}>注册</button>
  </>;
};

export default SignUp;

export const getServerSideProps = async () => {
  return {
    props: {}
  };
};
