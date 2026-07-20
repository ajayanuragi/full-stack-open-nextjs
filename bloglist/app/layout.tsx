import "./globals.css";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { NotificationProvider } from "./components/NotificationContext";
import AuthSessionProvider from "./components/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <Notification />
            <Navbar />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
