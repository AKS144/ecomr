import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import axios from 'axios';
import swal from 'sweetalert';


function AdminPrivateRoute({...rest}){

    const history = useHistory();

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios.get(`api/checkingauthenticated`).then(res =>{
            if(res.status === 200)
            {
                setAuthenticated(true);
            }
            setLoading();
        });
        return () =>{
            setAuthenticated(false);
        };
    },[]);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status === 401)
        {
            swal("Unauthorized",err.response.data.message,"warning");
            history.push('/');
        }
        return Promise.reject();
    });



    if(loading)
    {
        return <h1>Loading...</h1>
    }

    return (
        <Route {...rest}
            render={({props, location}) =>
            // localStorage.getItem('auth_token') ? 
            Authenticated ?
            ( <MasterLayout {...props}/>) :
            ( <Redirect to={{ pathname: "/login", state: {from: location} }} />)
        }
        />
    );
}

export default AdminPrivateRoute;