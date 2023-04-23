import Head from "next/head";

export default function Test() {
    async function testFetch() {
        const response = await fetch(`http://localhost:3001/users`);
        const data = await response.json();
        console.log(data);
    }


  return (
    <div>
      <Head>
        <title>Test</title>
      </Head>
      <button onClick={testFetch}>TEST</button>
    </div>
  );
}
