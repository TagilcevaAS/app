import React, { FC } from 'react';
import { routes } from './dataRoutes';
import Layout from '../layout/Layout';
import { BrowserRouter as Router, Routes as ReactRoutes, Route } from 'react-router-dom';
import { useAuth } from '../providers/useAuth';
import Auth from '../pages/auth/Auth';

const Routes: FC = () => {
    const { user } = useAuth();

    return (
        <Router>
            <ReactRoutes>
                {routes.map(route => (
                    <Route
                        path={route.path}
                        key={route.path}
                        element={
                            <Layout>
                                {route.auth && !user ? <Auth /> : <route.component />}
                            </Layout>
                        }
                    />
                ))}
            </ReactRoutes>
        </Router>
    );
}

export default Routes;
