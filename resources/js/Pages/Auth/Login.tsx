import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("submitting", data);
    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };
  return (
    <GuestLayout>
      <Head title="Log in" />
      {status && (
        <div className="mb-4 font-medium text-green-600 text-sm">{status}</div>
      )}
      <div
        className="relative flex justify-end items-center h-screen"
        style={{ marginLeft: "700px" }}
      >
        <div className="absolute w-[430px] h-[520px]">
          <div className="-top-[80px] -left-[80px] absolute bg-gradient-to-r from-[#1845ad] to-[#23a2f6] rounded-full w-[200px] h-[200px]"></div>
          <div className="-right-[30px] -bottom-[80px] absolute bg-gradient-to-r from-[#ff512f] to-[#f09819] rounded-full w-[200px] h-[200px]"></div>
        </div>
        <form
          className="relative border-[rgba(255,255,255,0.1)] border-2 shadow-[0_0_40px_rgba(8,7,16,0.6)] backdrop-blur-[10px] p-[50px_35px] rounded-lg w-[400px] h-[520px]"
          onSubmit={submit}
        >
          <h3 className="flex justify-center items-center font-medium text-2xl text-center text-white">
            <img
              src="https://fintown.software/imgs/logo.png"
              alt=""
              width={70}
              height={70}
              className="block"
            />
            <span> FinTown</span>
          </h3>
          <label
            className="block mt-6 font-medium text-lg text-white"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(e) => setData("email", e.target.value)}
            placeholder="Email or Phone"
            className="bg-[rgba(255,255,255,0.07)] mt-2 p-2 rounded-md w-full h-[50px] text-sm text-white"
          />
          <InputError message={errors.email} className="mt-2 font-bold" />
          <label
            className="block mt-6 font-medium text-lg text-white"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            className="bg-[rgba(255,255,255,0.07)] mt-2 p-2 rounded-md w-full h-[50px] text-sm text-white"
          />
          <InputError message={errors.password} className="mt-2 font-bold" />
          {/* <div className="mt-3">
            <Checkbox name="remember"  checked={data.remember} onChange={(e) => setData("remember", e.target.checked)} />{" "}
            <span className="text-sm text-white ms-2">Remember me</span>
          </div> */}
          <PrimaryButton
            className="bg-[rgba(255,255,255,0.07)] mt-12 py-3 rounded-md w-30 font-semibold text-lg cursor-pointer"
            disabled={processing}
          >
            Log in
          </PrimaryButton>
        </form>
      </div>
    </GuestLayout>
  );
}
