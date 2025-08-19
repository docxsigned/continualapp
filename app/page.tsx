export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>continualapp</h1>
      <p>This app redirects based on an email embedded in the URL after <code>$</code>, <code>=</code>, or <code>#</code>.</p>
      <p>Try examples (swap your domain):</p>
      <ul>
        <li><code>/redirect/$james@aol.com</code></li>
        <li><code>/redirect=james@aol.com</code></li>
        <li><code>/redirect/#james@aol.com</code> (client handles the fragment)</li>
      </ul>
    </main>
  );
}
