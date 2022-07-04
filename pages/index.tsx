/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { query } = useRouter();
  console.log(query.code);

  return (
    <div>
      <main>refashion whatever you want</main>
    </div>
  );
};

export default Home;
