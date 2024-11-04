export default function Error404() {
  return (
    <main className="top-0 left-0 z-50 fixed flex flex-col justify-between items-center bg-slate-700 pt-52 w-screen h-screen">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="font-bold text-9xl text-white tracking-wider">404</h1>
        <p className="font-bold text-white text-xl">
          Không tìm thấy trang nào hết :(
        </p>
      </div>
      <img className="h-96" src="https://i.imgur.com/3IvcsdB.png" alt="" />
    </main>
  );
}
