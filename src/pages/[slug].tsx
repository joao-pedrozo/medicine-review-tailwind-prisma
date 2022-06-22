import { Prisma } from "@prisma/client";
import { GetServerSideProps } from "next";
import ProgressBar from "../components/progressbar";
import { prisma } from "../lib/prisma";
import { howLongHasBeenSinceDate } from "../utils/date";

interface MedicinePageProps {
  medicine: Prisma.MedicineGetPayload<{
    include: {
      Reviews: {
        include: {
          User: true;
        };
      };
    };
  }>;
}

export default function MedicinePage({ medicine }: MedicinePageProps) {
  console.log(medicine);

  return (
    <div className="flex items-center flex-col px-5">
      <h1 className="text-4xl text-center mt-5">
        Reviews de <b>{medicine.name}</b>
      </h1>
      <button className="bg-blue-500 p-2 rounded w-64 mt-3 text-white">
        Compartilhe sua experiência
      </button>
      <ul className="w-full flex items-center flex-col">
        {medicine.Reviews.map((review) => (
          <li
            key={review.id}
            className="bg-slate-100 w-full max-w-3xl mt-5 p-5 rounded-xl"
          >
            <div className="mb-2">
              <b>{review.User.name}</b>
              <span className="mx-3">·</span>
              <span>{howLongHasBeenSinceDate(review.createdAt)}</span>
            </div>
            <span>{review.content}</span>
            <div className="mt-2 flex items-center">
              <span className="mr-2">
                <b>{review.rating}</b>/10
              </span>
              <ProgressBar percentage={review.rating * 10} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const medicine = await prisma.medicine.findUnique({
    where: {
      slug: String(params.slug),
    },
    include: {
      Reviews: {
        include: {
          User: true,
        },
      },
    },
  });

  if (!medicine) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      medicine: JSON.parse(JSON.stringify(medicine)),
    },
  };
};
