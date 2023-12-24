import Image from "next/image";
import React from "react";

interface IProps {
  id: number;
  name: string;
  profilePicture?: string;
  content: string;
  order?: "left" | "right";
}

const Comment = ({ name, profilePicture, content, order }: IProps) => {
  return (
    <div className="flex gap-4 bg-transparent px-2">
      <div
        className={`flex flex-col gap-2 ${
          order === "left" ? "order-2" : "order-1"
        }`}
      >
        <h2
          className={`${
            order === "left" ? "text-start" : "text-end"
          } text-base font-semibold`}
        >
          {name}
        </h2>
        <div
          className={`flex ${
            order === "left" ? "justify-start" : "justify-end"
          }`}
        >
          <p className="w-max rounded-md bg-white px-4 py-2  shadow-md">
            {content}
          </p>
        </div>
      </div>
      <div className={`${order === "left" ? "order-1" : "order-2"}`}>
        <Image
          className="rounded-full "
          width={50}
          height={50}
          src={profilePicture ?? ""}
          alt={name}
        />
      </div>
    </div>
  );
};

export default Comment;
