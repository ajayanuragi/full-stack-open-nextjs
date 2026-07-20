import AuthSessionProvider from "./components/SessionProvider";
import Navbar from "./components/Navbar";
import { NotificationProvider } from "./components/NotificationContext";
import Notification from "./components/Notification";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <NotificationProvider>
            <Navbar />
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
