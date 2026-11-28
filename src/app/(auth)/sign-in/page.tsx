
import SignInForm from "@/components/auth/sign-in-form";
import BrandLogo from "@/components/shared/brand-logo";

const SignInPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#F7F6FC] px-4 py-10">

            <div className="mb-8">
                <BrandLogo className="text-[#17152B]" />
            </div>

            <SignInForm />

            <p className="mt-6 text-center text-xs text-[#8B85A3]">
                © 2026 MentorLagbe. All rights reserved.
            </p>

        </main>
    );
};

export default SignInPage;