import { useEffect, useState } from "react";

function ErrorPage() {

    const [timer, setTimer] = useState(15)

    useEffect(() => {
        if (timer <= 0) {
            // console.log(timer)
            window.location.replace("/")
            return;
        }

        const countDown = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000);

        return () => clearInterval(countDown);
    }, [timer]);

    return (
        <div className="min-h-[100vh] flex flex-col items-center justify-center gap-5">
            <h5>
                somethings wrong, please try again here
            </h5>
            <h5>
                reload after {timer} seconds
            </h5>
            <button onClick={() => window.location.replace("/")}>
                Home Page
            </button>
        </div>
    );
}

export default ErrorPage;