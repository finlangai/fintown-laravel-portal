import { FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

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
        <div className="absolute h-[520px] w-[430px]">
          <div className="absolute h-[200px] w-[200px] rounded-full bg-gradient-to-r from-[#1845ad] to-[#23a2f6] -top-[80px] -left-[80px]"></div>
          <div className="absolute h-[200px] w-[200px] rounded-full bg-gradient-to-r from-[#ff512f] to-[#f09819] -bottom-[80px] -right-[30px]"></div>
        </div>
        <form
          className="relative w-[400px] h-[520px] rounded-lg backdrop-blur-[10px] border-2 border-[rgba(255,255,255,0.1)] shadow-[0_0_40px_rgba(8,7,16,0.6)] p-[50px_35px]"
          onSubmit={submit}
        >
          <h3 className="text-2xl font-medium text-white text-center flex justify-center items-center">
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
            className="block mt-6 text-white text-lg font-medium"
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
            className="w-full h-[50px] bg-[rgba(255,255,255,0.07)] rounded-md p-2 mt-2 text-white text-sm"
          />
          <InputError message={errors.email} className="mt-2  font-bold" />
          <label
            className="block mt-6 text-white text-lg font-medium"
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
            className="w-full h-[50px] bg-[rgba(255,255,255,0.07)] rounded-md p-2 mt-2 text-white text-sm"
          />
          <InputError message={errors.password} className="mt-2 font-bold" />
          <div className="mt-3">
          <Checkbox name="remember"  checked={data.remember} onChange={(e) => setData("remember", e.target.checked)} />{" "}
          <span className="text-white text-sm ms-2">Remember me</span>
          </div>
          <PrimaryButton className="mt-12 w-30 bg-[rgba(255,255,255,0.07)] py-3 text-lg font-semibold rounded-md cursor-pointer" disabled={processing} >
            Log in
          </PrimaryButton>
        </form>
      </div>
    </GuestLayout>
  );
}
