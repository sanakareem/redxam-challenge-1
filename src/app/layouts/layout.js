import { AuthProvider } from '../utils/AuthContext';

const Layout = ({ children }) => {
    return (
        <AuthProvider>
            <div>{children}</div>
        </AuthProvider>
    );
};

export default Layout;
