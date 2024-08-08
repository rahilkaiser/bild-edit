export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <main className="root">
            <div className="container mx-auto">
                <div className="wrapper">
                    {children}
                </div>
            </div>
        </main>
    );
};
