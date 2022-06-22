import { Review } from "@prisma/client";
import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { prisma } from "../lib/prisma";

interface HomeProps {
  reviews: Review[];
}

export default function Home({ reviews }: HomeProps) {
  const { data: session } = useSession();

  console.log(reviews);

  return (
    <div className="w-full flex justify-center text-center mt-4">
      <h1>Hello World </h1>

      {!session && (
        <button className="bg-blue-500" onClick={() => signIn("google")}>
          Login
        </button>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.review.findMany();

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(data)),
    },
  };
};
