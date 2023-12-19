import Navbar from "@/components/Navbar";
import NavbarBtm from "@/components/NavbarBtm";
import PostsList from "@/components/PostsList";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerAuthSession();
  if (!session) redirect("/login");
  // console.log(session);

  return (
    <div className="container min-h-screen max-w-lg bg-gray px-4 pb-6 ">
      <Navbar />
      <PostsList />
      <NavbarBtm />
    </div>
  );
};

export default Home;
