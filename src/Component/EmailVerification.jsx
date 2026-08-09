import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EmailVerification() {
    const [verified, setVerified] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                let data = await axios.post(`https://emart-singlevendor-backend-6.onrender.com/api/v1/auth/verifyemail/${token}`)
                    setVerified(true);                    
                    setInterval(() => {
                        navigate("/login")
                    }, 2000);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);
    

    return (
        <section className="flex flex-col gap-5 min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
        <h1 className="text-3xl font-bold text-sky-600">E-Earbuds</h1>
            <div className="w-full max-w-md rounded-2xl bg-sky-300 p-10 text-center shadow-xl">
                
                {!verified ? (
                    <>
                        <Loader2 size={40} className="mx-auto animate-spin text-sky-500" />
                        <h2 className="mt-5 text-xl font-bold text-slate-900">
                            Verifying Failed
                        </h2>
                          <a
                    href="/"
                    className="text-sm font-medium text-sky-800 hover:underline"
                  >
                    Back to Home
                  </a>
                    </>
                ) : (
                    <>
                        <CheckCircle2 size={44} className="mx-auto text-emerald-500" />
                        <h2 className="mt-5 text-xl font-bold text-slate-900">
                            Verification Completed
                        </h2>
                    </>
                )}
            </div>
        </section>
    );
}
