export default function Error404() {
  return (
    <main className="top-0 left-0 z-50 fixed flex flex-col justify-between items-center bg-slate-700 pt-52 w-screen h-screen">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="font-bold text-9xl text-white tracking-wider">404</h1>
        <p className="font-bold text-white text-xl">
          Không tìm thấy trang nào hết :(
        </p>
      </div>
      <img
        className="h-96"
        src="https://media.discordapp.net/attachments/913304070255689742/1298582978758443079/image-removebg-preview.png?ex=671a1724&is=6718c5a4&hm=a56a8b9bcfc7e00019764fe96ed491e86c141a8f859f15e63f282dfeb3d19533&=&format=webp&quality=lossless&width=915&height=515"
        alt=""
      />
    </main>
  );
}
