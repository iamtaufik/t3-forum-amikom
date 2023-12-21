"use client";

interface IProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
}

const Navbar = ({ search, setSearch }: IProps) => {
  return (
    <nav className="mb-6 flex w-full justify-between pt-4">
      <span className="text-2xl font-bold text-primary">Forum Amikom</span>
      <form className="relative flex items-center justify-start">
        <svg
          width="20"
          height="20"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute ml-3"
        >
          <path
            d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search..."
          className="focus-visible:ring-ring placeholder:text-muted-foreground flex h-9 w-32 rounded-2xl  bg-white py-1 pl-10  text-sm shadow-md transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </form>
    </nav>
  );
};

export default Navbar;
