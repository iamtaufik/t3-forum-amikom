"use client";
import { useState } from "react";
import Label from "./Label";

const categories = ["Terbaru", "UKM", "AMIKOM", "Berita", "Saran"];

const CategoryList = () => {
  const [isActive, setIsActive] = useState<string>("Terbaru");
  return (
    <div className="flex justify-between gap-x-2 overflow-x-auto py-2">
      {categories.map((category) => (
        <Label
          key={category}
          text={category}
          className={`${
            isActive === category
              ? "bg-secondary text-white"
              : "bg-white text-dark "
          }`}
          onClick={() => setIsActive(category)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
