import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";

export default function EmailVerification() {
    const [verified, setVerified] = useState(false);

    const { token } = useParams();

    useEffect(() => {
        async function getData() {
            try {
                let data = await axios.post(`http://localhost:5000/api/v1/auth/verifyemail/${token}`)
                const timer = setTimeout(() => {
                    setVerified(true);
                }, 1800);

                return () => clearTimeout(timer);

            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    return (
        <section className="flex flex-col gap-5 min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
        <h1 className="text-3xl font-bold">E-Earbuds</h1>
            <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-xl">
                
                {!verified ? (
                    <>
                        <Loader2 size={40} className="mx-auto animate-spin text-sky-500" />
                        <h2 className="mt-5 text-xl font-bold text-slate-900">
                            Verifying...
                        </h2>
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
