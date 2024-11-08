import { useEffect, useState } from "react";

const TestPage = () => {
  const colors = [
    "lightcoral",
    "lightsalmon",
    "lightyellow",
    "lightgreen",
    "lightblue",
    "plum",
    "lavender",
  ];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 900);
    // Change color every second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [colors.length]);

  const getQueryParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let params: { [key: string]: string } = {};
    urlParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };
  // Get query parameters
  const queryParams = getQueryParams();

  return (
    <main className="top-0 left-0 fixed flex flex-col justify-center items-center gap-6 bg-slate-600 w-screen h-screen">
      <h1
        className={`font-extrabold text-5xl w-[36rem] leading-[3.6rem] text-center`}
        style={{ color: colors[currentColorIndex] }}
      >
        {" "}
        {queryParams.outcome == "REGISTRATION_FAILED"
          ? "Buồn vậy :9, đăng ký thất bại òi"
          : "Ghê vậy, đăng ký thành công rồi sao!!??"}{" "}
        <br></br>
      </h1>

      <img
        src="https://i.imgur.com/bHuG4rf.gif"
        className="rounded-3xl w-80"
        alt=""
      />
    </main>
  );
};

export default TestPage;
