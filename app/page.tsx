import Link from "next/link";
import ProductCard from "./components/ProductCard";

const Home = () => (
  <main>
    <h1>Hello World</h1>
    <Link href="/users">Users</Link>
    <ProductCard />
  </main>
);

export default Home;
