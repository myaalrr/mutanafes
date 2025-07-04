export default function Hero() {
  return (
    <section
      className="flex justify-center items-center overflow-hidden"
      style={{
        width: '100%',
        height: '700px',
        backgroundImage: "url('/p.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <p
        className="custom-arabic-light text-center"
        style={{
          fontSize: '24px',
          color: '#ffffff',
        }}
      >
        <span
          style={{
            borderBottom: '4px solid #E46A00',
            display: 'inline',
          }}
        >
          مرحبًا بك في <span className="custom-arabic-semibold">متنافس</span>
        </span>
        ، وجهتك الأولى للاستعداد المهني
      </p>
    </section>
  );
}
