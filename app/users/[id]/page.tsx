import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: number;
  };
}

const UserDetailPage = ({ params: { id } }: Props) => {
  if (id > 1) notFound();
  return <div>UserDetailPage {id}</div>;
};

export default UserDetailPage;
