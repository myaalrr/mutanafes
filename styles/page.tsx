import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>مرحبًا بك في الموقع</h1>
        <p>هذه هي الصفحة الرئيسية</p>
      </main>
    </>
  );
}
