interface Props {
    user: string;
}

export default function Home({ user }: Props) {
    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Selamat Datang, {user}!</h1>
            <p>Laravel + Inertia + React TypeScript berhasil dikonfigurasi.</p>
        </div>
    );
}
