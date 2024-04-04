import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="min-h-screen">
      <h1>User No: {params.id}</h1>
    </div>
  );
};

export default Page;
