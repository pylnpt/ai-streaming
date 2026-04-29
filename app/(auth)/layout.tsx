import Link from "next/link";
import { Logo } from "./_components/logo";

const AuthLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
            <Logo/>
            {children}
            <nav className="text-xs text-muted-foreground flex items-center gap-x-3">
                <Link href="/terms" className="hover:text-primary transition">ÁSZF</Link>
                <span aria-hidden>·</span>
                <Link href="/privacy" className="hover:text-primary transition">Adatvédelem</Link>
            </nav>
        </div>
    );
}

export default AuthLayout;