import SignUpForm from "@/components/auth/sign-up-form";


const SignUpPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F7F6FC] px-4 py-10">

            <div className="w-full max-w-md">
                <SignUpForm />
            </div>

        </main>
    );
};

export default SignUpPage;