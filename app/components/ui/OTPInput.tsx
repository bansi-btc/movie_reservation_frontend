"use client";
import { VerifyOTPURL } from "@/constants/apiConstants";
import { POSTRequest } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

type OTPInputProps = {
  email: string;
};

export default function OTPInput({ email }: OTPInputProps) {
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Check if OTP is complete
    setIsComplete(otp.every((digit) => digit !== ""));

    // Focus first empty input on mount
    const firstEmptyIndex = otp.findIndex((digit) => digit === "");
    if (firstEmptyIndex !== -1) {
      inputRefs.current[firstEmptyIndex]?.focus();
    }
  }, [otp]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const handleSubmitOTP = async (data: { otp: string; email: string }) => {
    const response = await POSTRequest(VerifyOTPURL, data);

    return response as { success?: boolean; message?: string };
  };

  const verifyOTPMutation = useMutation({
    mutationFn: handleSubmitOTP,
    mutationKey: ["verify-otp"],
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message ?? "OTP verified successfully");
        router.push("/login");
        return;
      }
      toast.error(data?.message ?? "OTP verification failed");
    },
    onError: (error?: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error?.response?.data?.message ?? "OTP verification failed unexpectedly"
      );
    },
  });

  const handleSubmit = () => {
    if (!isComplete) {
      toast.error("Please complete the OTP ");
    }

    const currentOTP = otp.join("");

    verifyOTPMutation.mutate({ email, otp: currentOTP });
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto flex flex-col items-center justify-center bg-black rounded-xl text-white">
      <h2 className="text-2xl font-normal mb-2">Verification Code</h2>
      <p className="text-gray-400 text-sm mb-8">
        Enter the 6-digit code sent to your device
      </p>

      <div className="flex justify-between gap-3 w-full mb-6">
        {otp.map((digit, i) => (
          <div key={i} className="relative flex-1">
            <input
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onFocus={() => handleFocus(i)}
              className={`w-full h-12 text-center text-xl font-normal rounded-lg 
                         bg-gray-900 transition-all duration-300
                         ${
                           activeIndex === i
                             ? "border border-gray-600"
                             : "border border-gray-800"
                         }
                         focus:outline-none`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        className={`mt-2 w-full py-3 rounded-lg text-base font-normal transition-all duration-300
                   flex items-center justify-center
                   ${
                     isComplete
                       ? "bg-gray-800 hover:bg-gray-700"
                       : "bg-gray-800 text-gray-400 cursor-not-allowed"
                   }`}
      >
        {verifyOTPMutation.isPending ? "Verifying code" : "Verify Code"}{" "}
        {isComplete && <span className="ml-1">→</span>}
      </button>

      <div className="mt-6 text-center">
        <span className="text-gray-500">Didn&apos;t receive a code? </span>
        <button className="text-white underline">Resend</button>
      </div>
    </div>
  );
}
