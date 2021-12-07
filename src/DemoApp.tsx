import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    firstName?: string
}

export interface DemoAppProps {
    name: string;
}

export const DemoApp = ({ name }: DemoAppProps) => {
    const [user, setUser] = useState<User>({})

    useEffect(() => {
        const getUserData = async () => {
            const userResponse = await axios.get('https://randomuser.me/api');

            const { data } = userResponse;
            const user = data.results[0];
            setUser({
                firstName: user.name.first,
            })
        }

        getUserData();
    }, [])

    return (
        <div>
            <h1>Hello, {name}</h1>
            <p>Here is some info about {user.firstName}</p>
        </div>
    )
}