"use client";
import { commentsSchema } from "@/schemaValidations/comments.schema";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import moment from "moment";
import React from "react";

// Define the comments interface
interface commentsUsers {
  commentsOfUsers: commentsSchema[];
}

export default function Comments({ commentsOfUsers }: commentsUsers) {
  // Function to render stars based on rating
  let renderStars = (stars: number) => {
    let resultStar = Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: 12,
          width: 12,
          fill: index < stars ? "#FFD700" : "#E0E0E0", // Gold for filled, light gray for empty
        }}
      >
        <path
          fillRule="evenodd"
          d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
        />
      </svg>
    ));
    return resultStar;
  };

  // Render each comment
  const renderComments = () => {
    return commentsOfUsers?.map((item: commentsSchema) => (
      <div key={item.id} className="p-4 border-b">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2">
          <div className="sm:w-10 sm:h-10  w-20 h-20">
            <Avatar className=" ">
              <AvatarImage
                src={item.avatar ? item.avatar : "/assets/anonymous.png"}
                alt="user"
                className="object-cover rounded-full w-full h-full"
              />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="text-sm sm:text-left text-center font-semibold">
              {item.tenNguoiBinhLuan}
            </p>
            <p className="text-xs text-center text-gray-500">3 năm hoạt động</p>
          </div>
        </div>

        <div className="mt-2 space-y-1">
          <div className="flex items-center sm:justify-start justify-center space-x-2">
            <span className="text-xs flex space-x-1">
              {renderStars(item.saoBinhLuan)}
            </span>
            <span className="text-xs font-semibold">
              {/* Using Moment.js to format the date */}
              {moment(item.ngayBinhLuan).format("DD MMM YYYY")}
            </span>
          </div>
          <p className="sm:text-xs text-md sm:text-left text-center font-light capitalize">
            {item.noiDung}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 h-96 overflow-scroll">
      {renderComments()}
    </div>
  );
}
